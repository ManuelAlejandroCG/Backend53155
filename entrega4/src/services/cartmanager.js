import fs from 'fs';
import { Cart } from '../models/carts.js';

export class CartManager {
    constructor () {}

    async customConstructor(path){
        this.path = path;
        this.carts = await this.getCarts();
    }

    async readFile(){
        return fs.promises.readFile(this.path, "utf-8")
        .then(datos=> JSON.parse(datos))
    }

    async writeFile(newData){
        return await fs.promises.writeFile(this.path, JSON.stringify(newData))
    }

    async getCarts() {
        const carts = await this.readFile();
        return carts
        }

    async addCart(){
        let end
        const carts = await this.readFile();
        console.log(carts)
        const cart = new Cart();
        if (carts.length === 0){
            cart.setId(1);
            end = 1;
        } else {
            cart.setId(carts[carts.length -1].id + 1) ;
            end = carts[carts.length -1].id + 1;
        }
        carts.push(cart);
        console.log(carts)
        try{
            await this.writeFile(carts)
            return end
        } catch(err) {
            console.log(err)
        }   
    }
    
    async getCartById(id){
        const carts = await this.readFile();
        const datos = carts.find(cart => cart.id == id)
        return datos ? datos : "no existe ese ID"
    }

    async addProductToCart(cartId, productId){
        let buscadorProductos
        const carts = await this.readFile();
        const buscador = carts.findIndex(cart => cart.id == cartId)
        if (buscador === -1){
            console.log("ese id no existe por favor utilice realice un post de cart")
        } else {            
            buscadorProductos = carts[buscador].products.findIndex(prod => prod.id == productId)
            if(buscadorProductos === -1){                
                carts[buscador].products.push({"id": productId, "quantity": 1})
            } else {
                carts[buscador].products[buscadorProductos].quantity++;
            }
            try{
                await this.writeFile(carts)
                return carts[buscador]
            } catch(err) {
                console.log(err)
            }   
        }
    }
}