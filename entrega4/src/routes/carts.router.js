import { Router } from "express";
import { CartManager } from "../services/cartmanager.js"
import path from 'path';


const router = Router();
const service = new CartManager();
await service.customConstructor(path.resolve() + "\\src\\db\\carts.json");

router.get('/', async (req, res) => {
    let products = await service.getCarts();
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

router.post("/", async (req, res) => {
        const addedCart = await service.addCart();
        if (!!addedCart) {
            ;
            return res.status(200).json({
                status: "Success",
                message: "Cart created successfully",
                data: addedCart
            });
        } else return res.status(400).json({
            status: "Error",
            message: "the cart was not created",
            data: null
        });
});

router.get('/:cid', async (req, res) => {
    const id = req.params.cid;
    const cart = await service.getCartById(id);
    if (!!cart) return res.status(200).json({
        status: "Success",
        message: "Cart found",
        data: cart
    })
    else return res.status(404).json({
        status: "Error",
        message: `Cart with id=${id} not found`,
        data: null
    });
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const addedProduct = await service.addProductToCart(cartId, productId);
    if (!!addedProduct) {
        return res.status(200).json({
            status: "Success",
            message: `Product added to cart ${addedProduct.id} successfully`,
            data: addedProduct.products
        });
    } else return res.status(400).json({
        status: "Error",
        message: "Invalid request.",
        data: null
    });

});

export default router;