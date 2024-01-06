class ProductManager{
    
constructor(){
    this.products = [];
    this.actualId = 1;
}

addProduct(code, title, description, price, thumbnail, stock){
    if (this.products.some(prods => prods.code === code)){
        console.error(`Ya existe un objeto con el codigo '${code}'`)
        return;
    }

    const newProduct = {
        id: this.actualId++,
        code,
        title,
        description,
        price,
        thumbnail,
        stock
    };
    this.products.push(newProduct)
    return;
}

getProducts(){
    return this.products
}

getProductsById(id){
    return this.products.find(prod => prod.id === id)
}
}

const List = new ProductManager();
console.log("lista vacia");
console.log(List.getProducts());
List.addProdct('AAA001', 'tornillo plano','tornillo con cabeza plana', 10, 'imagen tornillo plano', 1500);
console.log("lista luego de un add");
console.log(List.getProducts());
List.addProdct('AAA001', 'tornillo cruz','tornillo con cabeza cruz', 20,'imagen tornillo cruz', 2500);
console.log("lista luego de un add fallido");
console.log(List.getProducts());
List.addProdct('BBB010', 'tornillo cruz','tornillo con cabeza cruz', 20, 'imagen tornillo cruz', 2500);
console.log("lista luego de segundo add");
console.log(List.getProducts());
console.log("busqueda de producto id=2");
console.log(List.getProductsById(2));
