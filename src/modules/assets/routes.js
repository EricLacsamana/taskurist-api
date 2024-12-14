import { Router } from 'express';
import { authenticateJWT } from '../../middleware/auth-middleware.js';
import assetController from './controller.js';

const assetRoutes = Router();

// Create a new asset
assetRoutes.post('/', authenticateJWT, assetController.createAsset);

// Get all assets
assetRoutes.get('/', authenticateJWT, assetController.getAssets);

// Get a single asset by ID
assetRoutes.get('/:id', authenticateJWT, assetController.getAsset);

// Update asset by ID
assetRoutes.put('/:id', authenticateJWT, assetController.updateAsset);

// Delete asset by ID
assetRoutes.delete('/:id', authenticateJWT, assetController.deleteAsset);

export default assetRoutes;
