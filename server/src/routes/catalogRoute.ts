import express  from "express"
import * as catalogController from "../controllers/catalogController"

const router = express.Router()

router.get("/", catalogController.getCatalogs)

router.post("/", catalogController.createCatalog)

router.put("/index/:id", catalogController.setIndex)

router.put("/:id", catalogController.updateCatalog)

router.delete("/", catalogController.deleteCatalog)

export default router
