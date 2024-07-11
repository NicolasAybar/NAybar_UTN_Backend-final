const { database, query} = require("../config/connection.sql")


//promisfy
const buscarUsuarioPorEmail = async (email) =>{
     /* Hacemos un select para verificar si previamente existe un usuario con este mail */
    try {
        const consultaExistencia = 'SELECT * FROM usuarios WHERE email = ?'
        const resultados = await query(consultaExistencia, [email])
        
        if(resultados.length > 0){
            console.log('entra al if')
            return resultados[0]
        }
        else{
            return null
        }
    }
    catch (error) {
        console.error('SQL_Error al seleccionar usuarios por email', error)
        throw {status: 500, message: 'Error interno en el servidor repository'}
    }
}

const insertarUsuario = async (usuario) =>{
    console.log('insertar usuario repo')
    try{
        const consulta = 'INSERT INTO usuarios SET ?' 
        /*const consulta = 'INSERT INTO usuarios (email, password,activo,rol) VALUES (?,?,?,?)'*/
        /*const consulta = 'INSERT INTO usuarios SET ?,?,?,?'*/

        const resultado = await query(consulta, usuario)
        console.log('de insertar usuario', resultado)
        return true
    }
    catch(error){
        throw {status: 500, message: 'Error interno en el servidor repository'}
    }
}

module.exports = {buscarUsuarioPorEmail, insertarUsuario}

