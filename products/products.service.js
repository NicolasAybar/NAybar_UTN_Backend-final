const { CustomError } = require("../errors/customErrorManager")
const { insertarProducto,actualizarProducto, seleccionarProductoPorId, deleteProductoPorId, seleccionarProductos,desabilitarProductoPorId } = require("./products.repository")
const {validarProducto}= require('./utils/validation.Product.Util.js')
const { validarPropiedadesProducto } = require("./utils/validarProducto.js")
const crearProducto = async (producto) =>{
    try{       
        const paso = validarPropiedadesProducto(producto)
        if(paso){
            const idCreado = await insertarProducto(producto)
            console.log(idCreado)
            return {ok:true,message:`Producto con id ${idCreado} creado con exito`, idCreado: idCreado}
        }
        else{
            throw {status: 400, message: 'Exception: No se pasaron las validaciones del producto'}
        }
    }
    catch(error){ 
        if(error.status){
            throw error
        }
        else{
            throw {status: 500, message: 'Error interno del servidor service de insertar'}
        }
    }
}

const actualizarProductoService = async (pid,producto) =>{
        try {
            const pasoUpdate = validarProducto(producto);
            const modificarProducto = await actualizarProducto(pid, producto)
            if (!modificarProducto) {
                throw { status: 404, message: `Product with id ${pid} not found` }
            }
            else{
                return { status: 200, message: `Correctly Modified Product ${pid}` }
            }
            
        } catch (error) {
            if (error.status) {
                throw error
            }
            else {
                
                throw { status: 500, message: 'ERROR EN EL SERVIDOR metodo actualizar.' }
            }
        }
}

const obtenerProductoPorId = async (pid) =>{
    try{
        const producto = await seleccionarProductoPorId(pid)
        return {ok: true, status: 200, producto}
    }
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status: 500, message: 'Error interno del servidor'}
        }
    }
}
const eliminarProductoPorId = async (pid)=>{
    try{
        const producto = await deleteProductoPorId (pid)
        return {ok:true, status:200, producto}
    }
    catch (error){
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: "Error interno del servidor"}
        }
    }
}
const buscarProductos = async () => {
    try{
        const productos = await seleccionarProductos()
        if(productos.length === 0){
            throw new CustomError('No hay productos', 404)
        }
        return {status: 200, message: 'productos obtenidos', productos: productos}
    }
    catch(error){
        throw error
    }
} 
 const desabilitarProductoPorIdService = async (pid) =>{
    try{
        const desabilitado = await desabilitarProductoPorId (pid)
        console.log('service tiene')
        console.log(desabilitado)
        return {ok:true, status:200, desabilitado}
    }
    catch (error){
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: "Error interno del servidor"}
        }
    }
 }
module.exports = {crearProducto, actualizarProductoService,obtenerProductoPorId, eliminarProductoPorId, buscarProductos,desabilitarProductoPorIdService}
