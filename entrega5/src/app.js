//@ts-check
import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import serveStatic from 'serve-static';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import home from './routes/home.router.js';
import realTimeProductsRouter from './routes/real-time-products.router.js'
import { __dirname } from './utils.js';
import { Server } from "socket.io";
import {ProductManager} from "./services/productmanager.js";

const app = express();
const port = 8080;
const service = new ProductManager();
await service.customConstructor(path.resolve() + "\\src\\db\\products.json");

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(serveStatic(path.join(__dirname, "public")));

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/home", home)
app.use("/real-time-products", realTimeProductsRouter)

app.get('*', (req, res) => {
    res.json('{"error": "Page not found."}');
});

const httpServer = app.listen(port, () =>{
    console.log(`Server listenin port ${port}`)
})

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log(socket.id +" socket conectado")
    socket.on ("addProduct", async (newProd) =>{
        try {
            const addedProductID = await service.addProduct(newProd);
            const addedProduct = await service.getProductById(addedProductID)
            socketServer.emit("newItem", addedProduct);
        } catch (err){
            console.log(err);
        }
    });
});
