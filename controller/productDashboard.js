import { photoupload } from "../model/photoupload.js";

export const getproductDashboard = async (req, res) => {
    try {
        // Fetch all photos from the database
        const photos = await photoupload.find({}, { url: 1, caption: 1 });

        // If no photos found, return an empty array
        if (!photos || photos.length === 0) {
            return res.status(404).json({ message: 'No photos found' });
        }

        // Return the photos with their captions
        return res.json({ message: 'Dashboard retrieved successfully', photos });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to fetch dashboard', error: err.message });
    }
};
