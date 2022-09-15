const { Router } = require('express')
const {getAllInfo} = require('../functionsRecipe')
const { Recipe, Typeofdiet } = require('../../db')

const router = Router();

router.get('/', async (req,res) => {
    let {name} = req.query
    const apiInfo = await getAllInfo()
    if(name){
        const recipeName = apiInfo.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))

        recipeName.length ?
        res.status(200).send(recipeName) :
        res.status(404).send('RECETA NO ENCONTRADA')
    }
    else{
    res.status(200).send(apiInfo)
}
})

router.get('/:id', async (req,res) => {
    const {id} = req.params
    const allRecipes = await getAllInfo()
    const recipesId = allRecipes.filter(e => e.id == id)
    recipesId.length ?
    res.status(200).json(recipesId) :
    res.status(404).send('No se encontro la RECETA')
})

module.exports = router;