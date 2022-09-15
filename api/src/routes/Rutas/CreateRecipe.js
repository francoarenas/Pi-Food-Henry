const { Router } = require('express')
const { Recipe, Typeofdiet } = require('../../db')

const router = Router();

router.post('/', async (req,res) => {
    let {
        name,
        summary,
        healthScore,
        steps,
        image,
        typeofdiets
    } = req.body

   let newRecipe = await Recipe.create({
        name,
        summary,
        healthScore,
        steps,
        image
   })

   let dietsDb = await Typeofdiet.findAll({
    where : {name : typeofdiets}
   })

   newRecipe.addTypeofdiet(dietsDb)

    res.status(201).send('Creado con Exito')
})

module.exports = router;