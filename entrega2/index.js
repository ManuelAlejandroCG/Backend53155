const Manager = require("./ProductManager");


const manager = new Manager("./products.json");


(async function (){

    await manager.start();
    console.log("se trae el listado original");
    console.log(manager.getProducts());
    console.log("se agrega el producto de prueba");
    manager.addProduct({"title":"producto prueba", "desciption":"Este es un producto prueba", "price":200, "thumbnail":"Sin imagen", "code":"abc123", "stock":25});
    manager.addProduct({"title":"producto prueba", "desciption":"Este es un producto prueba", "price":200, "thumbnail":"Sin imagen", "code":"abc12", "stock":25});
    console.log("se trae el nuevo listado");
    console.log(manager.getProducts());
    console.log("buscando id existente");
    console.log(manager.getProductsById(1));
    console.log("buscando un id inexistente");
    console.log(manager.getProductsById(2));
    console.log("se actualiza el nombre del producto ID 1 a super producto")
    manager.updateProduct({"title":"super producto", "desciption":"Este es un producto prueba", "price":200, "thumbnail":"Sin imagen", "code":"abc123", "stock":25, "id":1});
    console.log("se carga el listado actualizado");
    console.log(manager.getProducts())
    /*console.log("se elimina el producto 1")
    manager.deleteProduct(1);
    console.log("se muestra el listado vacio")
    console.log(manager.getProducts())*/
})();