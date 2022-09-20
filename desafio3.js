const express = require("express")
const app = express();

const PORT = 8080
const server = app.listen(PORT, ()=>{
  console.log("servidor iniciado")
})

const productos = [                                                                                                                                                     
    {                                                                                                                                                    
      title: 'Escuadra',                                                                                                                                 
      price: 123.45,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
      id: 1                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Calculadora',                                                                                                                              
      price: 234.56,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
      id: 2                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Globo Terráqueo',                                                                                                                          
      price: 345.67,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
      id: 3                                                                                                                                              
    }                                                                                                                                                    
  ]         

const fs = require("fs");

class Contenedor {
    async save(producto){
        try{
            await  fs.promises.writeFile(
                "./productos.txt",
            JSON.stringify(producto,null,2),
            "utf-8");
        } catch (e) {
            console.log(e);
        }
    }
    async getAll() {
      try {

        const contenido = await fs.promises.readFile("./productos.txt", "utf-8");

        return contenido

      } catch (error) {}

    }
    async saveNew(productoNuevo) {
      const contenido = await this.getAll();
      const indice = contenido.sort((a,b) =>b.id - a.id)[0].id;
      productoNuevo.id = indice + 1;
      contenido.push(productoNuevo);
      this.save(contenido);
    }
    async getById(id){
      const contenido = fs.readFileSync("./productos.txt", "utf-8");
      return JSON.parse(contenido,null,2)
    }
    async deleteById(id) {
        const contenido = await this.getAll();
        const productoEliminado = contenido.filter((producto) => producto.id !== id);
        this.save(productoEliminado)
        console.log(productoEliminado)
    }
    async deleteAll(){
      const contenido = await this.getAll();
      const productosEliminados = contenido.splice(0, contenido.length);
      console.log(productosEliminados);
      //console.log(contenido);
      this.save(contenido);
    }
}

const contenedor = new Contenedor();
//contenedor.save(productos);
//contenedor.getAll();
const productoN = {
  title: 'lapiz',                                                                                                                          
      price: 500,                                                                                                                                    
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',   
}
//contenedor.saveNew(productoN);
//contenedor.getById(2);
//contenedor.deleteById(1);
//contenedor.deleteAll();

app.get("/productos",async (req, resp)=>{
  resp.type('json')
  resp.send(`<p> productos: ${ awaitcontenedor.getAll() }`);
});

app.get("/productosRandom",(res, resp)=>{
  const random = Math.floor(Math.random()*3+1)
  resp.send(`<p> producto: ${contenedor.getById(random)}`);
});