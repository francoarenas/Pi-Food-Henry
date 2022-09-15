const axios = require('axios')
const {Recipe, Typeofdiet} = require('../db')
const { API_KEY } = process.env

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=0bb8495786a0444baed44a96d38d45c6&addRecipeInformation=true&number=100')
    const apiInfo = apiUrl.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            name: e.title,
            dietTypes: e.diets,
            summary: e.summary,
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }})
        }
    })
    return apiInfo
}

const addDietsDb = () => {
    const dietsTotal = ['gluten free', 'ketogenic', 'vegetarian', 'ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'paleolithic', 'primal', 'whole 30', 'dairy free']
    dietsTotal.forEach(e => {
         Typeofdiet.findOrCreate({
            where: {name : e}
        })
    })
    return dietsTotal
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Typeofdiet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllInfo = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const totalInfo = apiInfo.concat(dbInfo)
    return totalInfo
}

module.exports = {getApiInfo,getDbInfo,getAllInfo,addDietsDb}
