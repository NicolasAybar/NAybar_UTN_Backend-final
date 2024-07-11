const express = require('express')
const { postProductController, getProductByIdController, putProductController,deleteProductByIdController, getAllProducts,disableProductByIdController } = require('./products.controller')

const productRouter = express.Router()

/* /api/products */

/* 

Get all :
Post crear producto: /
Put Actualizar producto: /
Delete Eliminar un producto: /
Get by id : /:pid

*/


/* 
TODO: Agregar el middleware de verificacion de token
*/
/* /api/products/ListarProductos */

productRouter.get('/ListarProductos', getAllProducts)

/* /api/product/insertarProductos */
productRouter.post('/insertarProductos', postProductController)
/* /api/product/updateProduct */
productRouter.put('/updateProduct/:pid',putProductController)
productRouter.put('/eliminarProducto/:pid', deleteProductByIdController)
productRouter.get('/:pid', getProductByIdController)
/* /api/products/desabilitarProducto   */
productRouter.put('/desabilitarProducto/:pid', disableProductByIdController)


module.exports = {productRouter}