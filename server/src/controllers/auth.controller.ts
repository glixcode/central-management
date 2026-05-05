import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const register = async (req: Request, res: Response): Promise<void> => {
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
      role: role,
      barangayId,
      profileId
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, email: newUser.email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
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

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const userRole = req.user.role as any;
    res.json({ user: { id: req.user._id, email: req.user.email, role: userRole?.roleName, barangayId: req.user.barangayId } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
