import {env} from "../config.js"
const uri = `${env.ssl + env.hostName}:${env.port}/`;


//testear si la uri esta bien programacion defenciva

// console.log(uri)

const config = {method:null,headers:{"content-type": "application/json"}};

export const getAll =async() =>{
    config.method= "GET";
    let res = await(await fetch(`${uri}/libro`,config)).json();
    console.log(res)
}

export const post =async(obj) =>{
    config.method= "POST";
    config.body = JSON.stringify(obj);
    let res = await(await fetch(`${uri}/libro`,config)).json();
    return res; 
}

export const deleteOne =async(id) =>{
    if(typeof id !== "number") {
        return{status:400, message:`Los datos '${id}' no cumple con el formato `}}
    config.method= "DELETE";
    let res = await(await fetch(`${uri}/libro/${id}`, config)).json();
    return res; 
}

export const putOne =async(obj={}) =>{
    if(!obj.id){return {status:400, message:`Usuario introduzca los datos `}}
    // const {id, autorId, categoriaId, editorialId, titulo, fechaLanzamiento, isbn, numPaginacion, estadoId} = obj;
    const {fechaLanzamiento} = obj;
    let date = new Date(fechaLanzamiento);
    if(!(date && date.getFullYear()<=2040)) {
        return{status:400, message:`Los datos'${fechaLanzamiento}' no cumple con el formato`}}
    // if(typeof id !== 'number') {
    //     return{status:400, message:`Los datos'${id}' no cumple con el formato`}}
    // if(typeof autorId !== 'number') {
    //     return{status:400, message:`Los datos'${autorId}' no cumple con el formato`}}
    // if(typeof categoriaId !== 'number') {
    //     return{status:400, message:`Los datos'${categoriaId}' no cumple con el formato`}} 
    // if(typeof editorialId !== 'number') {
    //    return{status:400, message:`Los datos'${editorialId}' no cumple con el formato`}}
    // if(typeof titulo !== 'number') {
    //     return{status:400, message:`Los datos'${titulo}' no cumple con el formato`}}
    // if(typeof isbn !== 'string') {
    //     return{status:400, message:`Los datos'${isbn}' no cumple con el formato`}}
    // if(typeof numPaginacion !== 'number') {
    //     return{status:400, message:`Los datos'${numPaginacion}' no cumple con el formato`}}
    // if(typeof estadoId !== 'number') {
    //     return{status:400, message:`Los datos'${estadoId}' no cumple con el formato`}} 
    return "todo ok"
};


//console.log(await post({titulo:"pepito",fecha:"2023-0/-10"}));
// console.log(await getAll());
//console.log(await deleteOne(2));

console.log(putOne({fechaLanzamiento:"24-08-2020"}));