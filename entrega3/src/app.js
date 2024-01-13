import express from 'express'
import {ProductManager} from './ProductManager.js'

const app = express();
const port = 8080;
const service = new ProductManager("./products.json");

await service.start();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/products', async (req, res) => {
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

app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    const product = await service.getProductsById(id);
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

app.get('*', (req, res) => {
    return res.status(404).json({
        status: "Error",
        message: "Page not found",
        data: null
    });
});

app.listen(port, () =>{
    console.log(`Server listenin port ${port}`)
})