import { getOne as getOneCategoria  }  from "./categoria.js";
import { getOne as getOneAutor  }  from "./autor.js";
import {env} from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type": "application/json"}};

const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        autorId=null, 
        categoriaId=null, 
        editorialId=null, 
        titulo=null, 
        fechaLanzamiento=null, 
        isbn=null, 
        numPaginacion=null, 
        estadoId=null
    } = data;
    let date = new Date(fechaLanzamiento);
    if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `La fechaLanzamiento '${fechaLanzamiento}' no cumple con el formato`};
    
    if(typeof autorId !== 'number') return {status: 400, message: `El autorId '${autorId}' no cumple con el formato`};
    if(typeof categoriaId !== 'number') return {status: 400, message: `El categoriaId '${categoriaId}' no cumple con el formato`};
    if(typeof editorialId !== 'number') return {status: 400, message: `El editorialId '${editorialId}' no cumple con el formato`};
    if(typeof titulo !== 'string') return {status: 400, message: `El titulo '${titulo}' no cumple con el formato`};
    if(typeof isbn !== 'string') return {status: 400, message: `El isbn '${isbn}' no cumple con el formato`};
    if(typeof numPaginacion !== 'number') return {status: 400, message: `El numPaginacion '${numPaginacion}' no cumple con el formato`};
    if(typeof estadoId !== 'number') return {status: 400, message: `El estadoId '${estadoId}' no cumple con el formato`};
    return data;
}
const validarDataBasic = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        titulo=null, 
        fechaLanzamiento=null, 
        isbn=null, 
        numPaginacion=null, 
    } = data;
    let date = new Date(fechaLanzamiento);
    if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `La fechaLanzamiento '${fechaLanzamiento}' no cumple con el formato`};
    if(typeof titulo !== 'string') return {status: 400, message: `El titulo '${titulo}' no cumple con el formato`};
    if(typeof isbn !== 'string') return {status: 400, message: `El isbn '${isbn}' no cumple con el formato`};
    if(typeof numPaginacion !== 'number') return {status: 400, message: `El numPaginacion '${numPaginacion}' no cumple con el formato`};
    return data;
}
export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/libro`, config)).json();
    return res;
}
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    return res;
}
export const getRelationships = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/libro`, config)).json();
    res = await Promise.all(res.map(async(data,id)=>{
        let {categoriaId:catId, autorId:autId} = data;
        let cat = await getOneCategoria(catId);
        let aut = await getOneAutor(autId);
        data.categoriaId = cat;
        data.autorId = aut;
        return data;
    }))
   
    return res;
}
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro`, config)).json();
    return res;
}
export const deleteOne = async(id)=>{
    if(typeof id !== 'number') return {status: 400, message: `El datos '${id}' no cumple con el formato`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    return res;
}
export const putOne = async(obj={})=>{
    let all = undefined;
    const {id, limit="1.0.0"} = obj;
    if(typeof id !== 'number') return {status: 400, message: `El id '${id}' no cumple con el formato`};
    if(limit == "1.0.0") {
        obj = validarExtructura(obj);
        if(obj.status) return obj;   
    }
    if(limit == "2.0.0") {
        obj = validarDataBasic(obj);
        if(obj.status) return obj;  
        all = await getOne(id);
    }
    const {limit:lin, ...objUpdate} = obj;
    obj = {...all, ...objUpdate};
  
    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    return res;
}


//console.log(await getRelationships());




// console.log(await post({
//     titulo:"El olor del miedo", 
//     fecha: "2023-08-30", 
//     autorId:1, autaautAuthenticatorAttestationResponse
//     categoriaId:1, 
//     editorialId:1, 
//     isbn:"380554", 
//     numPaginacion: 552, 
//     estadoId:1
// }));
// console.log(await post({
//     titulo:"FORASTERA", 
//     fecha: "2006-08-30", 
//     autorId:1, 
//     categoriaId:2, 
//     editorialId:1, 
//     isbn:"9788418173745", 
//     numPaginacion: 764, 
//     estadoId:1
// }));
// console.log(await post({
//     titulo:"Valle de la calma", 
//     fecha: "2018-04-02", 
//     autorId:1, 
//     categoriaId:3, 
//     editorialId:1, 
//     isbn:"273059", 
//     numPaginacion: 296, 
//     estadoId:1
// }));
// console.log(await post({
//     titulo:"Prometeo encadenado", 
//     fecha: "2020-01-01", 
//     autorId:1, 
//     categoriaId:1, 
//     editorialId:1, 
//     isbn:"16758", 
//     numPaginacion: 296, 
//     estadoId:1
// }));



//console.log(await getAll());
// console.log(await deleteOne(1));
 //console.log(await putOne({id: 1, limit:"2.0.0", titulo: "Miguel", isbn: "456", numPaginacion:700}));