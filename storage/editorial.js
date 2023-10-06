import {env} from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type": "application/json"}};


const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        nombre=null,
        direccion=null,
        telefono = null,
    } = data;
    if(typeof nombre !== 'string') return {status: 400, message: `El nombre '${nombre}' no cumple con el formato`};
    if(typeof direccion !== 'string') return {status: 400, message: `El direccion '${direccion}' no cumple con el formato`};
    if(typeof telefono !== 'string') return {status: 400, message: `El telefono '${telefono}' no cumple con el formato`};
    return data;
}
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/editorial/${id}`, config)).json();
    return (Object.keys(res).length>0) ? res : {status: 401, message: "La editorial no existe", id};
}
export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/editorial`, config)).json();
    return res;
}
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/editorial`, config)).json();
    return res;
}

//ELIMINAR 



//ACTUALIZAR








//
//console.log(await post({nombre:"panamericana",
//direccion:"sotomayor",
//telefono:"3213779030"}));
// console.log(post({nombre:"Romance"}));
//console.log(await deleteOne(1));
// console.log(post({nombre:"Terror"}));
//console.log(await getAll());