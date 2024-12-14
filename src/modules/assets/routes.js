import { Router } from 'express';
import { authenticateJWT } from '../../middleware/auth-middleware.js';
import assetController from './controller.js';

const assetRoutes = Router();

assetRoutes.post('/', authenticateJWT, assetController.createAsset);

assetRoutes.get('/', authenticateJWT, assetController.getAssets);

assetRoutes.get('/:id', authenticateJWT, assetController.getAsset);

assetRoutes.put('/:id', authenticateJWT, assetController.updateAsset);

assetRoutes.delete('/:id', authenticateJWT, assetController.deleteAsset);

export default assetRoutes;
