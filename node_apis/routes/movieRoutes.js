

const router = require('express').Router()
const Movie = require('../models/Movie')


//rotas da API
router.post('/', async (req, res) => {
    //req.body   vou extrair todos os dados dele
    // {name: "Jonh wicki 4", gender: "acao", year: 2023}
    const {name, gender, year} = req.body;

    if(!name){
       res.status(422).json("error: o nome é obrigatório!")
       return
    }

    const movie = {
      name,
      gender,
      year 
    }


   try {
   await Movie.create( movie)

   res.status(201).json({message:" Filme inserido com successo!"})

   } catch (error) {
   res.status(500).json({error:error})
   }

})

//READ = LEITURA DE DADOS

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.status(200).json(movies)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get('/:id', async(req,res) => {
   
    //extrair o dadoda quesição, pela URL = req.params
    const id = req.params.id 

    try {

        const movie = await Movie.findOne({_id:id})// no mongoDB ELE É CHAMADO PELO _id: 

        if(!movie) {
            res.status(422).json({message: "Usuário não foi encontrado!"})
            return
        }
        
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({error:error}) 
    }
})

//UPDATE - ATUALIZAÇÃO DE DADOS (PUT, PATCH)  patch = atualização parcial!

router.patch('/:id', async(req,res) => {
    const id = req.params.id 

    const {name, gender, year} = req.body

    const movie = { 
        name, 
        gender, 
        year ,
    } 

      try {
        updatedMovie = await Movie.updateOne({_id : id}, movie)
        console.log(updatedMovie)
        
        if(updatedMovie.matchedCount === 0){
        res.status(422).json({message: "Usuário não foi encontrado!"})
        return
        }

        res.status(200).json(movie)        
      } catch (error) {
        res.status(500).json({error:error}) 
      }


})

//Delete - deletar os dados

router.delete('/:id', async (req,res) => {
    const id = req.params.id

    const movie = await Movie.findOne({_id:id})// no mongoDB ELE É CHAMADO PELO _id: 

        if(!movie) {
            res.status(422).json({message: "Usuário não foi encontrado!"})
            return
        }
        try {
            await Movie.deleteOne({_id: id})
            res.status(200).json({message: "    Usuário removido com sucesso!"})
            
        } catch (error) {
           res.status(500).json({error:error}) 
            
        }
})



module.exports = router