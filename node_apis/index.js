//config inicial
require('dotenv').config()
const express = require('express') //vai encontrar esse arquivo na node_modules
const mongoose = require('mongoose')
const app  =  express() //vai executar o expres como uma função




//forma de ler json/ middlewares : recursos que são executados entre as nossa requisiçoes de respostas
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//rotas da api
const movieRoutes = require('./routes/movieRoutes')

app.use('/movie', movieRoutes)


//criar uma rota inicial/ endpoint
app.get('/',(req,res) =>{ //precisa ser em uma calback

    res.json({message:'oi express!'}) //opcional

})


//entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

//mongodb+srv://vivianevgomesdev:DRUfN9qWS0G2hKkR@cluster0.lxecfln.mongodb.net/bancodaapi?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lxecfln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)


.then(() =>{
    console.log("conectamos ao MongoDB!")
    app.listen(3001)
})
.catch((err) => console.log(err))


app.listen(3000)        //concretizando a porta que eu havia colocado no package json