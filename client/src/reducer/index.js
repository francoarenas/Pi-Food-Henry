
const initialState = {
     recipes: [],
     allRecipes: [],
     diets : [],
     detail : []
}

function rootReducer (state = initialState,action) {
    switch (action.type) {
        case 'GET_RECIPES':
            console.log('llego la action')
            return {
                ...state,
                recipes : action.payload,
                allRecipes : action.payload
            }

        case 'FILTER_DIETS':
            console.log('llego la action FILTER')
            console.log(action.payload)
            const allRecipes = state.allRecipes
            const recipesFilter = action.payload === 'all'
            ? allRecipes
            :allRecipes.filter(r => r.dietTypes?.some(d => d.toLowerCase().includes(action.payload.toLowerCase())))
            
            return {
                ...state,
                recipes : recipesFilter
            }

        case 'GET_ALL_DIET': {
            console.log('llego la action DIETS')
            console.log(action.payload)
            return {
                  ...state,
                  diets: action.payload,
                };
            }
        case 'ALFABETIC':{
            let ordenados = [...state.recipes]
            console.log('ALFABETIC')
            ordenados = ordenados.sort((a,b)=>{
                if(action.payload === 'atoz'){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    return 0
                }
                else{
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    return 0
                }
            })
            console.log(ordenados)
            console.log(state.recipes)
            return{
                ...state,
                recipes : ordenados
            }
        }

        case 'HEALTH_SCORE':{
            let score = [...state.recipes]
            console.log('HEALTH_SCORE')
            score = score.sort((a,b)=>{
                if(action.payload === 'asc'){
                    if(a.healthScore > b.healthScore) return 1
                    if(a.healthScore < b.healthScore) return -1
                    return 0
                }
                else{
                    if(a.healthScore < b.healthScore) return 1
                    if(a.healthScore > b.healthScore) return -1
                    return 0
                }
            })
            console.log(state.recipes)
            return{
                ...state,
                recipes : score
            }
        }

        case 'SEARCH_RECIPE':{
            console.log(state.recipes)
            return{
                ...state,
                recipes : action.payload
            }
        }

        case 'GET_DETAIL':{
            console.log('llego detail reducer')
            return{
                ...state,
                detail : action.payload
            }
        }
    
        default: return state
    }
}


export default rootReducer