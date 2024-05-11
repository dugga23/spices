// import { photoupload } from "../model/photoupload.js";
// //const middleware= require('../middleware/upload');

// export const imageupload= async(req,res)=>{
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).json({ message: 'No files were uploaded' });
//     }
    
//     const { caption } = req.body;
//     const images = req.files['image']; // Use req.files['photos'] for photos field
    
//     if (!images) {
//         return res.status(400).json({ message: 'No photo was uploaded' });
//     }
    
//     // If you're expecting only one photo, you can directly access its path
//     const imagePath = images[0].path;
    
//     const photo = new photoupload({ url: imagePath, caption }); // Change 'images' to 'url' here
//     await photo.save();

    
//     return res.json({ message: 'Photo created successfully', photoId: photo._id });
// } catch (err) {
//     return res.status(500).json({ message: err.message });
// }
// };










import { photoupload } from "../model/photoupload.js";

export const imageupload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file was uploaded' });
        }

        const { caption } = req.body;
        const imagePath = req.file.path;

        const photo = new photoupload({ url: imagePath, caption });
        await photo.save();

        return res.json({ message: 'Photo created successfully', photoId: photo._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to upload photo', error: err.message });
    }
};
