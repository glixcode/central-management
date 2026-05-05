import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { UserRole } from "../models/Roles.js";

const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('role');
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });

    const userRole = user.role as any;
    res.json({ token, user: { id: user._id, email: user.email, role: userRole?.roleName, barangayId: user.barangayId } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const registerHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role, barangayId, profileId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      passwordHash,
      role,
      barangayId,
      profileId
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, email: newUser.email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const forgotPasswordHandler = async (req: Request, res: Response): Promise<void> => {
  res.status(501).json({ message: 'Forgot password not yet implemented' });
};

const createRoleHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleName } = req.body;

    const existingRole = await UserRole.findOne({ roleName });
    if (existingRole) {
      res.status(400).json({ message: 'Role already exists' });
      return;
    }

    const newRole = new UserRole({ roleName });
    await newRole.save();

    res.status(201).json({ message: 'Role created successfully', role: { id: newRole._id, roleName: newRole.roleName } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
};

const getRolesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await UserRole.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
};

export {
  loginHandler,
  registerHandler,
  forgotPasswordHandler,
  createRoleHandler,
  getRolesHandler
}