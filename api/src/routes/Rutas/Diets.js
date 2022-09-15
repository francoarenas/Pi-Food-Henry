const { Router } = require('express');
const { getApiInfo, addDietsDb } = require('../functionsRecipe');
const { Typeofdiet } = require('../../db');

const router = Router();

router.get('/', async (req,res) => {
const apiInfo = await getApiInfo() // Me traigo toda la info de la api
const dietsApi = apiInfo.map(e => e.dietTypes) // Mapeo las dietas y me queda un arreglo con arreglos dentro
const dietsDb = addDietsDb() // seteo la base de datos con los tipos de dieta de spoonacular

if(dietsApi.length) {
const diets = dietsApi.map(e => {  // Mapeo los arreglos dentro dietsApi
    let aux = []
    for (let i = 0; i < e.length; i++) {  // recorro y pusheo cada dieta que alla dentro de cada arreglo
        aux = e[i]
    }
    return aux
})

let filterDiets = diets.filter(e => e.length)

filterDiets.forEach(e => {   // recorro el array obtenido con los tipos de dietas de la api

    if(!dietsDb.includes(e)){
        let aux = e
            dietsDb.push(aux) // si no estan en el array de dietsDb las agrego
    }
})
}
//--------------------------------------------------------------------------------------------------//
dietsDb.forEach( async (e) => {
   await Typeofdiet.findOrCreate({  // Agrego todo los tipos de dietas optenidos a la base de datos ('si ya existe alguno no lo agrega')
        where: {name: e}
    })
})

const totalDiets = await Typeofdiet.findAll();

res.status(200).json(totalDiets) // Se hace un response con el resultado en formato JSON
})

module.exports = router;