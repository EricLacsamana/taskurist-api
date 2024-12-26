// routes/jobOrderRoutes.js
import express from 'express';
import jobOrderController from '../controllers/jobOrderController.js';

const jobOrderRoutes = express.Router();

jobOrderRoutes.post('/', jobOrderController.createJobOrder);

jobOrderRoutes.get('/', jobOrderController.getJobOrders);

jobOrderRoutes.get('/:id', jobOrderController.getJobOrder);

jobOrderRoutes.put('/:id', jobOrderController.updateJobOrder);

jobOrderRoutes.put('/:id/status', jobOrderController.updateJobOrderStatus);

jobOrderRoutes.delete('/:id', jobOrderController.deleteJobOrder);

export default jobOrderRoutes;
