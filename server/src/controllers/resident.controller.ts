import { Request, Response } from 'express';
import { Resident } from '../models/Resident.js';
import { IUserRole } from '../models/Roles.js';

export const getResidents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { barangayId } = req.query;
    
    // Build query based on tenant scope
    const query: any = {};
    if (barangayId) {
      query.barangayId = barangayId;
    }

    const residents = await Resident.find(query).populate('barangayId', 'name');
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching residents', error });
  }
};

export const getResidentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { barangayId } = req.query;
    const { id } = req.params;

    const query: any = { _id: id };
    if (barangayId) {
      query.barangayId = barangayId;
    }

    const resident = await Resident.findOne(query).populate('barangayId', 'name');
    if (!resident) {
      res.status(404).json({ message: 'Resident not found or unauthorized' });
      return;
    }

    res.json(resident);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resident', error });
  }
};

export const createResident = async (req: Request, res: Response): Promise<void> => {
  try {
    // barangayId is injected by tenantAware middleware for non-SuperAdmins
    const newResident = new Resident(req.body);
    await newResident.save();
    
    res.status(201).json(newResident);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resident', error });
  }
};

export const updateResident = async (req: Request, res: Response): Promise<void> => {
  try {
    const { barangayId } = req.body; // or req.query depending on how we structure it. 
    // Usually tenantAware puts it in req.body for PUT/POST.
    const { id } = req.params;

    const query: any = { _id: id };
    const userRole = req.user?.role as IUserRole | undefined;
    if (barangayId && userRole?.roleName !== 'SUPER_ADMIN') {
      query.barangayId = barangayId;
    }

    const updatedResident = await Resident.findOneAndUpdate(query, req.body, { new: true });
    if (!updatedResident) {
      res.status(404).json({ message: 'Resident not found or unauthorized' });
      return;
    }

    res.json(updatedResident);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resident', error });
  }
};

export const deleteResident = async (req: Request, res: Response): Promise<void> => {
  try {
    const { barangayId } = req.query; // For delete requests, it's typically in query/params
    const { id } = req.params;

    const query: any = { _id: id };
    const userRole = req.user?.role as IUserRole | undefined;
    if (barangayId && userRole?.roleName !== 'SUPER_ADMIN') {
      query.barangayId = barangayId;
    }

    const deletedResident = await Resident.findOneAndDelete(query);
    if (!deletedResident) {
      res.status(404).json({ message: 'Resident not found or unauthorized' });
      return;
    }

    res.json({ message: 'Resident deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resident', error });
  }
};
