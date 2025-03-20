import mongoose from "mongoose";

const ExoplanetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    discoverYear: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Exoplanet", ExoplanetSchema);
