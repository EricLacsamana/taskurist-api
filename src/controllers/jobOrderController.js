// controllers/jobOrderController.js
import jobOrderService from '../services/jobOrderService.js';
import { NotFoundError } from '../errors/NotFoundError.js';

const jobOrderController = {
  createJobOrder: async (req, res, next) => {
    const { title, description, jobType, status, serviceDetails, schedules, assignedPersonnel } = req.body;

    try {
      const jobOrderData = { title, description, jobType, status, serviceDetails, schedules, assignedPersonnel };
      const jobOrder = await jobOrderService.createJobOrder(jobOrderData);
      res.status(201).json({ success: true, data: jobOrder });
    } catch (error) {
      next(error);
    }
  },

  getJobOrders: async (req, res, next) => {
    const query = req.query;

    try {
      const jobOrders = await jobOrderService.getAllJobOrders(query);
      res.status(200).json({ success: true, data: jobOrders });
    } catch (error) {
      next(error);
    }
  },

  getJobOrder: async (req, res, next) => {
    const { id } = req.params;

    try {
      const jobOrder = await jobOrderService.getJobOrderById(id);
      if (!jobOrder) {
        throw new NotFoundError('Job Order not found');
      }
      res.status(200).json({ success: true, data: jobOrder });
    } catch (error) {
      next(error);
    }
  },

  updateJobOrder: async (req, res, next) => {
    const { id } = req.params;
    const { title, description, jobType, status, serviceDetails, schedules, assignedPersonnel } = req.body;
  
    try {

      const existingJobOrder = await jobOrderService.getJobOrderById(id);
      if (!existingJobOrder) {
        throw new NotFoundError('Job Order not found');
      }

      const updatedJobOrderData = {
        title,
        description,
        jobType,
        status,
        serviceDetails,
        schedules,
        assignedPersonnel
      };

      const updatedJobOrder = await jobOrderService.updateJobOrder(id, updatedJobOrderData);
      res.status(200).json({ success: true, data: updatedJobOrder });
    } catch (error) {
      next(error);
    }
  },

  updateJobOrderStatus: async (req, res, next) => {
    const { id } = req.params;
    const { newStatus, updatedBy } = req.body;
    try {
      const updatedJobOrder = await jobOrderService.updateJobOrderStatus(id, newStatus, updatedBy);
      res.status(200).json({ success: true, data: updatedJobOrder });
    } catch (error) {
      next(error);
    }
  },

  deleteJobOrder: async (req, res, next) => {
    const { jobOrderId } = req.params;
    try {
      const jobOrder = await jobOrderService.deleteJobOrderById(jobOrderId);
      if (!jobOrder) {
        throw new NotFoundError('Job Order not found');
      }
      res.status(204).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
};

export default jobOrderController;
