import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getExoplanets,
  getExoplanetsCount,
  createExoplanet,
  getExoplanet,
  updateExoplanet,
  deleteExoplanet,
} from "../controllers/exoplanet.controller.js";
import { validatorSchema } from "../middlewares/validator.middleware.js";
import { createExoplanetSchema, updateExoplanetSchema } from "../schemas/exoplanet.schema.js";

const router = Router();

router.get("/Exoplanets/page/:page", authRequired, getExoplanets);
//router.get("/Exoplanets/count", authRequired, getExoplanetsCount);
router.get("/Exoplanets/:id", authRequired, getExoplanet);
router.post(
  "/Exoplanets",
  authRequired,
  validatorSchema(createExoplanetSchema),
  createExoplanet
);
router.delete("/Exoplanets/:id", authRequired, deleteExoplanet);
router.put(
  "/Exoplanets/:id",
  authRequired,
  validatorSchema(updateExoplanetSchema),
  updateExoplanet
);

export default router;
