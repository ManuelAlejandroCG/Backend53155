import fs from 'fs';
import { Product } from '../models/products.js';

export class ProductManager {
    constructor(){        
    }

    async customConstructor(path){
        this.path = path;
        this.products = await this.getProducts();
    }

    async readFile(){
        return fs.promises.readFile(this.path, "utf-8")
        .then(datos=> JSON.parse(datos))
    }

    async writeFile(newData){
        return await fs.promises.writeFile(this.path, JSON.stringify(newData))
    }

    async addProduct(product){
        if (this.validate(product)) {
            let end
            const products = await this.getProducts()
            const newProduct = new Product(product.title, product.description, product.price, product.thumbnail, product.code, product.stock);
            if (products.length === 0){
                newProduct.setId(1);
                 end = 1;
            } else {
                newProduct.setId(products[products.length -1].id + 1);
                 end = products[products.length -1].id + 1;
            }
            products.push(newProduct)
            try{
                await this.writeFile(products)
                return end
            } catch(err) {
                console.log(err)
            }
        }else {
            console.log("No completo todos los campos necesarios")
            return null;
        }
    }


    async getProducts(){
        const products = await this.readFile();
        return products
    }

    async getProductById(id){
        const products = await this.readFile();
        const datos = products.find(prod => prod.id == id)
        return datos ? datos : "no existe ese ID"
    }

    async updateProduct(id, product){     
        if(this.validateOne(product)){
            const products = await this.readFile();
            const buscador = products.findIndex(prod => prod.id == id)
            if (buscador === -1){
                console.log("ese id no existe por favor realice un post de product")
            } else {            
                products[buscador] = {
                    id: products[buscador].id,
                    ...product,
                };
                await this.writeFile(products)
                return (products[buscador])
            }
        }else {
            console.log("No hay un valor a actualizar")
            return null;
        }
    }


    async deleteProduct(id){
        let objetivo
        const products = await this.readFile();
        const buscador = products.findIndex(prod => prod.id == id)
        objetivo = products[buscador]
        products.splice(buscador, 1)   
        console.log(objetivo)
        try{
            await this.writeFile(products)
            return objetivo
        } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }

    validate(product){
        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category){
            return false;
        } else 
        return true;
    }
    validateOne(product){
        if (!!product.title || !!product.description || !!product.code || !!product.price || !!product.stock || !!product.category || !!product.thumbnails) {
            return true;
        }
        return false;
    }
}
