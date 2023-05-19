import express from "express";
import { BusinessController } from "./controller/BusinessController";

const router = express.Router();
const businessController = new BusinessController();

router.post("/business", businessController.createBusiness);
router.put("/business/:id", businessController.updateBusiness);
router.delete("/business/:id", businessController.deleteBusiness);
router.get("/business/search", businessController.searchBusiness);

export default router;
