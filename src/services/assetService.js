import Asset from '../models/Asset.js';

const assetService = {
    createAsset: async ({ name, type, serialNumber, purchaseDate, warrantyExpirationDate, currentCondition, location, status, lastServiceDate, nextServiceDue, client }) => {
        const newAsset = new Asset({
            name,
            type,
            serialNumber,
            purchaseDate,
            warrantyExpirationDate,
            currentCondition,
            location,
            status,
            lastServiceDate,
            nextServiceDue,
            client
        });

        return newAsset.save();
    },
    findAssetById: async (id) => {
        return Asset.findById(id);
    },
    findAllAssets: async () => {
        return Asset.find();
    },
    updateAssetById: async (id, payload) => {
        return Asset.findByIdAndUpdate(id, payload, { new: true });
    },
    deleteAssetById: async (id) => {
        return Asset.findByIdAndDelete(id);
    },
    findAssetBySerialNumber: async (serialNumber) => {
        return Asset.findOne({ serialNumber });
    }
};

export default assetService;
