const { crearProducto, actualizarProductoService, obtenerProductoPorId, eliminarProductoPorId, buscarProductos,desabilitarProductoPorIdService } = require("./products.service")

/* metodo insertar productos   */
const postProductController = async (req, res) =>{

    /* const {descripcion, titulo, precio, stock, codigo} = req.body */
    try{
        const result = await crearProducto(req.body)
        
        res.status(200).json(result)
    }
    catch(error){

        res.status(error.status).json(error)
    }
}
/* fin de insertar productos  */
/* metodo actualizar productos   */
const putProductController = async (req, res) =>{

    try{
        const {pid}=req.params
        if(!(pid && !isNaN(pid))){
            throw {status:400, message:"El parametro pid debe ser un valor numerico" }
        }
        const result = await actualizarProductoService(pid,req.body)
        console.log(result)
        res.status(200).json(result)
    }
    catch(error){        
        res.status(error.status).json(error)
    }
}
/* fin de actualizar productos  */
const getProductByIdController = async (req, res) => {
    try{
        const {pid} = req.params
        
        if( !(pid && !isNaN(pid))  ){
            throw {status: 400, message: 'El parametro pid debe ser un valor numerico valido'}
        }
        const result = await obtenerProductoPorId(pid)
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}

const deleteProductByIdController = async (req, res)=>{
    try{
        const{pid} = req.params //obtenemos el producto por id
        if(!(pid && !isNaN(pid))){
            throw {status:400, message:"El parametro pid debe ser un valor numerico" }
        }
        const result = await eliminarProductoPorId (pid)
        res.status(200).json(result)
    }
    catch(error){
        
        res.status(error.status).json(error)
    }
}

const getAllProducts = async (req, res) => {
    try{
        const result = await buscarProductos()
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}


const disableProductByIdController = async (req, res) => {
    try{
        const {pid} = req.params
        if( !(pid && !isNaN(pid))  ){
            throw {status: 400, message: 'El parametro pid debe ser un valor numerico valido'}
        }
        const result = await desabilitarProductoPorIdService(pid)
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}


module.exports = {postProductController,putProductController, getProductByIdController, deleteProductByIdController, getAllProducts,disableProductByIdController}