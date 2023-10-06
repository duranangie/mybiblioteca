import {env} from "../config.js";
import {getOne as getOneUser} from "./usuario.js";



const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type": "application/json"}};


const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        usuarioId=null,
        fechaPrestamo=null,
        fechaDevolucion=null,
        estado = null,
    } = data;
    let date = new Date(fechaPrestamo);
    let fecha = new Date(fechaDevolucion);
    if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `La fechaLanzamiento '${fechaPrestamo}' no cumple con el formato`};
    if(!(fecha && date.getFullYear()<=2040)) return {status: 400, message: `La fechaLanzamiento '${fechaDevolucion}' no cumple con el formato`};

    if(typeof usuarioId !== 'number') return {status: 400, message: `El telefono '${usuarioId}' no cumple con el formato`};
    if(typeof estado !== 'string') return {status: 400, message: `El telefono '${estado}' no cumple con el formato`};
    return data;
}
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/prestamo/${id}`, config)).json();
    return (Object.keys(res).length>0) ? res : {status: 401, message: "el estado no existe", id};
}


export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/prestamo`, config)).json();
    return res;
}
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/prestamo`, config)).json();
    return res;
}

//ELIMINAR 



//ACTUALIZAR


console.log(await post({ usuarioId:1,
fechaPrestamo:"2023-08-30",
fechaDevolucion:"2024-05-21",
estado:"El libro se encuentra en biblioteca"
}));
// console.log(post({nombre:"Romance"}));
//console.log(await deleteOne(1));
// console.log(post({nombre:"Terror"}));
//console.log(await getAll());