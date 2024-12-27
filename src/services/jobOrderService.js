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

  getJobOrderById: async (id) => {
    try {
      const jobOrder = await JobOrder.findById(id)
        .populate('assignedPersonnel', 'name email')
        // .populate('assets', 'name type')
        // .populate('inventorySku', 'sku name');
      if (!jobOrder) {
        throw new Error('Job Order not found');
      }
      return jobOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllJobOrders: async (query) => {

    try {
      const jobOrders = await JobOrder.find(query).sort({ createdAt: -1 });

      return jobOrders;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateJobOrder: async (id, updateData) => {
    try {
      const jobOrder = await JobOrder.findById(id);
      if (!jobOrder) {
        throw new Error('Job Order not found');
      }
      // Update job order with the new data
      jobOrder.set(updateData);
      await jobOrder.save();
      return jobOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateJobOrderStatus: async (id, newStatus, updatedBy) => {
    try {
      const jobOrder = await JobOrder.findById(id);
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

  deleteJobOrderById: async (id) => {
    try {
      const jobOrder = await JobOrder.findByIdAndDelete(id);
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
