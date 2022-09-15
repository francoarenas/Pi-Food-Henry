const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require('./Rutas/Recipes')
const dietsRouter = require('./Rutas/Diets')
const createRecipe = require('./Rutas/CreateRecipe')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter)
router.use('/diets', dietsRouter)
router.use('/createrecipe', createRecipe)

module.exports = router;