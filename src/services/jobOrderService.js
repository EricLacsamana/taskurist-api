import JobOrder from "../models/JobOrder.js";

const jobOrderService = {
  createJobOrder: async (jobOrderData) => {
    try {
      const newJobOrder = new JobOrder(jobOrderData);
      await newJobOrder.save();
      return newJobOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getJobOrderById: async (jobOrderId) => {
    try {
      const jobOrder = await JobOrder.findById(jobOrderId)
        .populate('workersAssigned', 'name email')
        .populate('assetsToRepair', 'name type')
        .populate('inventorySku', 'sku name');
      if (!jobOrder) {
        throw new Error('Job Order not found');
      }
      return jobOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllJobOrders: async () => {
    try {
      const jobOrders = await JobOrder.find()
        // .populate('workersAssigned', 'name email')
        // .populate('assetsToRepair', 'name type')
        // .populate('inventorySku', 'sku name');
      return jobOrders;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateJobOrderStatus: async (jobOrderId, newStatus, updatedBy) => {
    try {
      const jobOrder = await JobOrder.findById(jobOrderId);
      if (!jobOrder) {
        throw new Error('Job Order not found');
      }
      jobOrder.setStatus(newStatus, updatedBy);
      await jobOrder.save();
      return jobOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteJobOrderById: async (jobOrderId) => {
    try {
      const jobOrder = await JobOrder.findByIdAndDelete(jobOrderId);
      if (!jobOrder) {
        throw new Error('Job Order not found');
      }
      return jobOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default jobOrderService;
