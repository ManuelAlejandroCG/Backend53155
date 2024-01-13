//const fs = require ('fs')
//const path = require ('path')

import fs from 'fs'
import path from 'path'


export class ProductManager{
    
constructor(archivo){
    this.path = archivo
    this.products = [];
    this.actualId = 1;
}

async load(){
    return fs.promises.readFile(this.path, "utf-8")
    .then(datos => JSON.parse(datos))
}

save() {
    console.log(this.products)
    return fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
}

async start(){
    try {
       const datos = await this.load();
       if (datos.length > 0) {
        this.products = datos;
       } else {
        console.error("Esta comenzando con un archivo vacio o ocurrio un error en la carga de datos")
       }
    } catch (err) {
        console.log(err)
    } 
}

async addProduct(product){
    if (this.products.some(prods => prods.code === product.code)){
        console.error(`Ya existe un objeto con el codigo '${product.code}'`)
        return;
    }
    product.id = this.actualId++
    this.products.push(product)
    try{
        await this.save()
    } catch(err) {
        console.log(err)
    }
}

async updateProduct(product){
    const buscador = this.products.findIndex(prod => prod.id == product.id)
    if (buscador === -1){
        console.log("ese id no existe por favor utilice addProduct")
    } else {            
        this.products[buscador] = product
        try{
            await this.save()
        } catch(err) {
            console.log(err)
        }
    }    
}


async getProducts(){
    return this.products
}

async getProductsById(id){
    const datos = this.products.find(prod => prod.id === id)
    console.log(datos)
    return datos ? datos : "no existe ese ID"
}

async deleteProduct(id){
    const buscador = this.products.findIndex(prod => prod.id == id)
    console.log("antes")
    console.log(this.products)
    this.products.splice(buscador, 1)
    console.log("despues")
    console.log(this.products)
    try{
        await this.save()
    } catch (err) {
        console.log(err)
    }
}


}

//module.exports = ProductManager