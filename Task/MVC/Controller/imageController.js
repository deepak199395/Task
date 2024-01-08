const cloudinary = require("cloudinary");
const Image = require("../Models/imageModel");
require("dotenv").config();

// cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const result = await cloudinary.v2.uploader.upload_stream(
//       { resource_type: "auto" },
//       async (error, result) => {
//         if (error) {
//           return res.status(500).json({ message: "Cloudinary upload error" });
//         }

//         const newImage = new Image({
//           imageName: {
//             public_id: result.public_id,
//           },
//           imageUrl: result.secure_url,
//         });

//         const savedImage = await newImage.save();

//         res.status(201).json({
//           success: true,
//           message: "Image uploaded successfully",
//           image: savedImage,
//         });
//       }
//     );

//     req.file.stream.pipe(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// module.exports = uploadUserImage;
const uploadUserImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
  
      cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ success: false, message: "Cloudinary upload error", error: error.message });
          }
  
          if (!result) {
            return res.status(500).json({ success: false, message: "Cloudinary upload failed, result is undefined" });
          }
  
          const newImage = new Image({
            imageName: {
              public_id: result.public_id,
            },
            imageUrl: result.secure_url,
          });
  
          const savedImage = await newImage.save();
  
          res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image: savedImage,
          });
        }
      ).end(req.file.buffer); 
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
  module.exports = uploadUserImage;
  