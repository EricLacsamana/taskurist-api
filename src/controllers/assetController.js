import assetService from './service.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';

const assetController = {
    createAsset: async (req, res, next) => {
        const { name, type, serialNumber, purchaseDate, warrantyExpirationDate, currentCondition, location, status, lastServiceDate, nextServiceDue, client } = req.body;
        try {
            const existingAsset = await assetService.findAssetBySerialNumber(serialNumber);
            if (existingAsset) {
                throw new ConflictError('Asset with this serial number already exists');
            }

            const asset = await assetService.createAsset({ name, type, serialNumber, purchaseDate, warrantyExpirationDate, currentCondition, location, status, lastServiceDate, nextServiceDue, client });
            res.status(201).json({ data: asset });
        } catch (error) {
            next(error);
        }
    },
    getAssets: async (req, res, next) => {
        try {
            const assets = await assetService.findAllAssets();
            res.status(200).json({ success: true, data: assets });
        } catch (error) {
            next(error);
        }
    },
    getAsset: async (req, res, next) => {
        const { id } = req.params;
        try {
            const asset = await assetService.findAssetById(id);
            if (!asset) {
                throw new NotFoundError('Asset not found');
            }
            res.status(200).json({ success: true, data: asset });
        } catch (error) {
            next(error);
        }
    },
    updateAsset: async (req, res, next) => {
        const { id } = req.params;
        const { name, type, serialNumber, purchaseDate, warrantyExpirationDate, currentCondition, location, status, lastServiceDate, nextServiceDue, client } = req.body;
        try {
            const existingAsset = await assetService.findAssetById(id);
            if (!existingAsset) {
                throw new NotFoundError('Asset not found');
            }

            const updatedAssetData = await assetService.updateAssetById(id, { name, type, serialNumber, purchaseDate, warrantyExpirationDate, currentCondition, location, status, lastServiceDate, nextServiceDue, client });
            res.status(200).json({ success: true, data: updatedAssetData });
        } catch (error) {
            next(error);
        }
    },
    deleteAsset: async (req, res, next) => {
        const { id } = req.params;
        try {
            const existingAsset = await assetService.findAssetById(id);
            if (!existingAsset) {
                throw new NotFoundError('Asset not found');
            }

            await assetService.deleteAssetById(id);
            res.status(204).json({ success: true });
        } catch (error) {
            next(error);
        }
    },
};

export default assetController;
