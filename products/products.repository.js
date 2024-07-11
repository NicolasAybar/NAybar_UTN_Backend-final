const { query } = require("../config/connection.sql")


const insertarProducto = async ({titulo, descripcion, precio, stock, codigo}) => {
    try{
        const consultaString = 'INSERT INTO productos (titulo, descripcion, stock, precio, codigo) VALUES (?,?,?,?,?)'
        const valores = [titulo, descripcion, stock, precio, codigo]
        const resultado = await query(consultaString, valores)
        return resultado.insertId
    }
    catch(error){
        throw {status:500, message: 'Error interno en el servidor'}
    }
}

const actualizarProducto = async (pid,producto) => {
     /* destructuracion de productos  */
     console.log('entro a actualizar repository')
        const {titulo,descripcion,precio,stock,codigo} = producto
    try{
       
        const consultaString = 'UPDATE productos SET titulo=?,descripcion=?,precio=?,stock=?,codigo=? WHERE id = ?'
        const valores = [titulo,descripcion,precio,stock,codigo,pid]
        
        const resultado = await query(consultaString, valores)
        console.log('resultado de repository', resultado)
        if(resultado.affectedRows === 0){
            throw {status: 404, message: `Producto con id ${pid} no encontrado`}
        }
        else{
            console.log(resultado)
            return resultado
        }     
    }
    catch(error){
        if(error.status === 404){
            throw error
        }
        else{
        throw {status:500, message: 'Error interno en el servidor'}
    }
 }
} 

const seleccionarProductoPorId = async (pid) =>{
    try{
        const consultaString = 'SELECT * FROM productos WHERE id = ?'
        const resultado = await query(consultaString, [pid])

        if(resultado.length === 0){
            throw {status: 404, message: 'Producto con id ' + pid + ' no encontrado'}
        }
        else{
            return resultado[0]
        }
        
    }
    catch(error){

        if(error.status === 404){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor'}
        }
        
    }
}

const deleteProductoPorId = async(pid) =>{
    try{
        const consultaString = 'DELETE FROM productos WHERE id = ?'
        const resultado = await query(consultaString, [pid])
       
        if(resultado.length === 0){
            throw {status: 404, message: 'Producto con id ' + pid + ' no existe'}
        }
        else{
            return {status: 200, message: 'Producto con id ' + pid + ' eliminado correctamente'}
        }     
    }
    catch(error){
        
        if(error.status === 404){
            throw error
        }
        else{ 
            throw {status:500, message: 'Error interno en el servidor'}           
        }      
    }
}

const desabilitarProductoPorId = async(pid) =>{
    try{
        const consultaString = 'UPDATE productos SET activo = 0 WHERE id = ?'
        const resultado = await query(consultaString, [pid])

        console.log('pasa por reository',resultado)
       
        if(resultado.length === 0){
            throw {status: 404, message: 'Producto con id ' + pid + ' no existe'}
        }
        else{
            return {status: 200, message: 'Producto con id ' + pid + ' eliminado correctamente'}
        }     
    }
    catch(error){
        
        if(error.status === 404){
            throw error
        }
        else{ 
            throw {status:500, message: 'Error interno en el servidor'}           
        }      
    }
}

const seleccionarProductos = async () =>{
    try{
        const consultaString = 'SELECT * FROM productos WHERE activo = 1'
        const productos = await query(consultaString)
        return productos
    }
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor'}
        }
    }
}


module.exports = { insertarProducto, actualizarProducto,seleccionarProductoPorId, deleteProductoPorId, seleccionarProductos,desabilitarProductoPorId}