import { Router } from "express";
import {ProductManager} from "../services/productmanager.js";
import path from 'path';

const router = Router();
const service = new ProductManager();

await service.customConstructor(path.resolve() + "\\src\\db\\products.json");

router.get('/', async (req, res) => {
    let products = await service.getProducts();
    if (!!req.query.limit) products = products.slice(0, req.query.limit);
    if (!!products) return res.status(200).json({
        status:"Success",
        message: "Products found",
        data: products
    });
    else return res.status(404).json({
        satus:"Error",
        message: "Products missing",
        data: null
    })
})

router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    const product = await service.getProductById(id);
    if (!!product) return res.status(200).json({
        status:"Success",
        message: "Products found",
        data: product
    });
    else return res.status(404).json({
        satus:"Error",
        message: "Products missing",
        data: null
    })
})

router.post("/", async (req, res) => {
    if (!!req.body){
        const product = req.body;
        const addedProductID = await service.addProduct(product);
        const addedProduct = await service.getProductById(addedProductID)
        console.log()
        if (!!addedProduct){;
            return res.status(201).json({
                status: "Success",
                message: `Product created successfully with id=${addedProductID})}`,
                data: addedProduct
            });
        }else return res.status(400).json({
            status: "Error",
            message: "Invalid product on body request.",
            data: null
    });
    } else return res.status(400).json({
        status: "Error",
        message: "No product found to add on body request.",
        data: null
    });
});

router.put("/:pid", async (req, res) => {
    if (!!req.body){
        const id = req.params.pid;
        const product = req.body;
        const updatedProduct = await service.updateProduct(id, product);
        if (!!updatedProduct){;
            return res.status(200).json({
                status: "Success",
                message: "Products updated",
                data: updatedProduct
            });
        }else return res.status(400).json({
            status: "Error",
            message: "Invalid product on body request.",
            data: null
    });
    } else return res.status(400).json({
        status: "Error",
        message: "No product found to add on body request.",
        data: null
    });
});

router.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    const product = await service.deleteProduct(id);
    console.log("afuera")
    console.log(product)
    if (!!product) return res.status(200).json({
        status: "Success",
        message: `Product ${product.id} was successfully deleted`,
        data: product
    })
    else return res.status(404).json({
        status: "Error",
        message: `Product with id=${id} not found`,
        data: null
    });
});

export default router;
