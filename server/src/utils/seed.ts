import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Barangay } from '../models/Barangay.js';
import { Resident } from '../models/Resident.js';
import { UserRole } from '../models/Roles.js';
import { Request, Response } from 'express';

dotenv.config();

export const seedDatabase = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Seeding database...');

    // Ensure roles exist
    const roles = ['SUPER_ADMIN', 'BARANGAY_ADMIN', 'STAFF', 'RESIDENT'];
    const roleDocs: Record<string, any> = {};
    for (const r of roles) {
      let roleDoc = await UserRole.findOne({ roleName: r });
      if (!roleDoc) {
        roleDoc = new UserRole({ roleName: r });
        await roleDoc.save();
      }
      roleDocs[r] = roleDoc._id;
    }

    // 1. Create a dummy Barangay
    let testBarangay = await Barangay.findOne({ name: 'Test Barangay' });
    if (!testBarangay) {

      testBarangay = new Barangay({
        name: 'Test Barangay',
        address: '123 Test Street, Test City',
        contactNumber: '123-456-7890'
      });
      await testBarangay.save();
      console.log('Created Test Barangay');
    }

    // 2. Create a dummy Resident profile
    let testResidentProfile = await Resident.findOne({ firstName: 'Test', lastName: 'Resident' });
    if (!testResidentProfile) {
      testResidentProfile = new Resident({
        barangayId: testBarangay._id,
        firstName: 'Test',
        lastName: 'Resident',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        address: {
          street: 'Test Street',
          houseNumber: '100'
        },
        civilStatus: 'Single',
        contactNumber: '09123456789'
      });
      await testResidentProfile.save();
      console.log('Created Test Resident Profile');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const usersToCreate = [
      {
        email: 'superadmin@test.com',
        role: roleDocs['SUPER_ADMIN'],
      },
      {
        email: 'barangayadmin@test.com',
        role: roleDocs['BARANGAY_ADMIN'],
        barangayId: testBarangay._id
      },
      {
        email: 'staff@test.com',
        role: roleDocs['STAFF'],
        barangayId: testBarangay._id
      },
      {
        email: 'resident@test.com',
        role: roleDocs['RESIDENT'],
        barangayId: testBarangay._id,
        profileId: testResidentProfile._id
      }
    ];

    for (const userData of usersToCreate) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const newUser = new User({
          ...userData,
          passwordHash
        });
        await newUser.save();
        console.log(`Created test user: ${userData.email} with password: password123`);
      } else {
        console.log(`User ${userData.email} already exists.`);
      }
    }

    console.log('Seeding completed successfully.');
    res.send('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ message: 'Error seeding database', error });
  }
};
