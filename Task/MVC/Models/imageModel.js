const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    imageName: {
      public_id:String,
      required: ["Image name is required"],
    },
    imageUrl: {
      type: String,
      required: ["Image URL is required"],
    },
  
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
