import { Router } from "express";
import {ProductManager} from "../services/productmanager.js";
import path from 'path';

const router = Router();
const service = new ProductManager();

await service.customConstructor(path.resolve() + "\\src\\db\\products.json");

router.get('/', async (req, res) => {
    let products = await service.getProducts();
    if (!!req.query.limit) products = products.slice(0, req.query.limit);
     if (!!products) return res.status(200).render("home",{ products });
     else return res.status(404).json({
         satus:"Error",
         message: "Products missing",
         data: null
     })
    
})

export default router;