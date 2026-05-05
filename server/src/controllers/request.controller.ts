import { Request as ExpressRequest, Response } from 'express';
import { Request } from '../models/Request.js';
import { RequestStatus } from '../models/Request.js';
import { IUserRole } from '../models/Roles.js';

export const getRequests = async (req: ExpressRequest, res: Response): Promise<void> => {
  try {
    const { barangayId } = req.query;

    const query: any = {};
    if (barangayId) {
      query.barangayId = barangayId;
    }

    const userRole = req.user?.role as IUserRole | undefined;

    // If the user is a resident, they should only see their own requests
    if (userRole?.roleName === 'RESIDENT') {
      if (!req.user?.profileId) {
        res.status(403).json({ message: 'Resident profile not linked' });
        return;
      }
      query.residentId = req.user.profileId;
    }

    const requests = await Request.find(query)
      .populate('residentId', 'firstName lastName')
      .populate('barangayId', 'name')
      .populate('processedBy', 'email');
      
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
};

export const createRequest = async (req: ExpressRequest, res: Response): Promise<void> => {
  try {
    const { documentType, remarks, residentId, barangayId } = req.body;

    const userRole = req.user?.role as IUserRole | undefined;

    // A Resident can only request for themselves
    let finalResidentId = residentId;
    let finalBarangayId = barangayId;

    if (userRole?.roleName === 'RESIDENT') {
      finalResidentId = req.user?.profileId;
      finalBarangayId = req.user?.barangayId;
    }

    const newRequest = new Request({
      barangayId: finalBarangayId,
      residentId: finalResidentId,
      documentType,
      remarks,
      status: 'PENDING'
    });

    await newRequest.save();
    
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error });
  }
};

export const updateRequestStatus = async (req: ExpressRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    const { barangayId } = req.query; // From tenant middleware

    const query: any = { _id: id };
    const userRole = req.user?.role as IUserRole | undefined;
    if (barangayId && userRole?.roleName !== 'SUPER_ADMIN') {
      query.barangayId = barangayId;
    }

    const updatedRequest = await Request.findOneAndUpdate(
      query,
      { 
        status: status as RequestStatus, 
        remarks, 
        processedBy: req.user?._id 
      },
      { new: true }
    );

    if (!updatedRequest) {
      res.status(404).json({ message: 'Request not found or unauthorized' });
      return;
    }

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error });
  }
};
