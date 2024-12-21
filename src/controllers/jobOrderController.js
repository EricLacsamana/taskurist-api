// controllers/jobOrderController.js
import jobOrderService from '../services/jobOrderService.js';
import { NotFoundError } from '../errors/NotFoundError.js';

const jobOrderController = {
  createJobOrder: async (req, res, next) => {
    const { title, description, jobType, serviceDetails } = req.body;

    try {
      const jobOrderData = { title, description, jobType, serviceDetails };
      const jobOrder = await jobOrderService.createJobOrder(jobOrderData);
      res.status(201).json({ success: true, data: jobOrder });
    } catch (error) {
      next(error);
    }
  },

  getJobOrders: async (req, res, next) => {
    try {
      const jobOrders = await jobOrderService.getAllJobOrders();
      res.status(200).json({ success: true, data: jobOrders });
    } catch (error) {
      next(error);
    }
  },

  getJobOrder: async (req, res, next) => {
    const { jobOrderId } = req.params;
    try {
      const jobOrder = await jobOrderService.getJobOrderById(jobOrderId);
      if (!jobOrder) {
        throw new NotFoundError('Job Order not found');
      }
      res.status(200).json({ success: true, data: jobOrder });
    } catch (error) {
      next(error);
    }
  },

  updateJobOrderStatus: async (req, res, next) => {
    const { jobOrderId } = req.params;
    const { newStatus, updatedBy } = req.body; // assuming updatedBy is the ID of the user making the update
    try {
      const updatedJobOrder = await jobOrderService.updateJobOrderStatus(jobOrderId, newStatus, updatedBy);
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
