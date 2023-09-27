
 const actualizar = async (id) => {
   let config = {
    method: "PUT",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       titulo: "como comprar 2millomes de pan",
       fecha: "2040",
       autor: "eldimo",
     }),
   };
   let res = await (await fetch("http://localhost:3000/libros/"+id, config)).json();
 };
 actualizar(2); 