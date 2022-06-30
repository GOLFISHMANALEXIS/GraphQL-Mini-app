const express = require('express');
const { graphqlHTTP } = require('express-graphql'); 
const { buildSchema } = require('graphql');


var schema = buildSchema(`
        type Cliente{
            id: Int
            nombre: String
            telefono: String
        }

        type Query{
            clientes: [Cliente]
            cliente(id: Int): Cliente
        }

        type Mutacion {
            addCliente(nombre: String, telefono: String): Cliente
        }
`);

var clientes = [];
var counter=1;

var root = {
    clientes: () => { return clientes; },

    cliente: ( data ) => {
       for ( var i=0; i<clientes.length; i++ )
         if ( clientes[i].id==data.id ) 
         return clientes[i];    


    return null;
    },
    addCliente: ( data ) => { 
           var c={'id': counter, 'nombre':data.nombre, 'telefono': data.telefono}; 
           clientes.push( c );
           counter++;
           return c;
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphql: true,
}));

app.listen(4000);
console.log(`Dale click clickk a http://localhost:4000/grapql`)

