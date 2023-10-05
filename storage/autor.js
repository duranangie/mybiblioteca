import {env} from "../config.js";

const uri = `${env.ssl + env.hotsName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type": "application/json"}};


const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        nombre=null, 
        apellido=null, 
        nacionalidad=null, 
    } = data;

    if(typeof nombre !== 'string') return {status: 400, message: `El nombre '${nombre}' no cumple con el formato`};
    if(typeof apellido !== 'string') return {status: 400, message: `El apellido '${apellido}' no cumple con el formato`};
    if(typeof nacionalidad !== 'string') return {status: 400, message: `La nacionalidad '${nacionalidad}' no cumple con el formato`};
    return data;
}
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/autor`, config)).json();
    return res;
}
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/autor/${id}`, config)).json();
    return res;
}
export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/categoria?_embed=libro`, config)).json();
    return res;
}




// console.log(await post({
//     nombre:"Miguel",
//     apellido:"Castro", 
//     nacionalidad:"Europeo", 
// }));
// console.log(await post({
//     nombre:"Santiago",
//     apellido:"Marquez", 
//     nacionalidad:"Venezolano", 
// }));
// console.log(await post({
//     nombre:"Kevin",
//     apellido:"Esteba", 
//     nacionalidad:"Japones", 
// }));
// console.log(await post({
//     nombre:"Cristian",
//     apellido:"Pardo", 
//     nacionalidad:"Italiano", 
// }));