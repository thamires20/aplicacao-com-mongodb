import express from 'express'
import {client} from './mongo-connection.js'
import * as yup from 'yup'

const server = express()

server.use(express.json())

const salgados = []
server.post('/salgado', async (req, res) => {
    const connection = await client.connect()
    
    console.log(connection)
 let schema = yup.object().shape({
     name: yup.string().required("Deve ser obrigatorio").max(20),
     quantidade: yup.number().required("Deve ser obrigatorio").positive("Deve ser positivo"),
    })
    try {
        await schema.validate(req.body, { abortEarly: false, strict: true })
  } catch ({ errors }) {
    return res.status(400).json({
      messages: errors,
    })
  }
  
 const salgado = {
    id: salgados.length+1,
    name: req.body.name,
    quantidade: req.body.quantidade,
  }
  
  salgados.push(salgado)
  connection.db("lanchonete").collection("salgados").insertOne(salgado);
 return res.status(201).json(salgado)
})

server.get('/salgados', async (req, res) => {
    const connection = await client.connect()
    connection.db("lanchonete").collection("salgados").find().toArray((err, result) => {
        if (err) throw err
        res.send(result);
      });

})


server.listen(3000)