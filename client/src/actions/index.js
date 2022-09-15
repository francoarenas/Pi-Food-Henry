import axios from 'axios';

export function getRecipes() {
    return async function (dispatch) {
       let json = await axios.get('http://localhost:3001/recipes');
       return dispatch({
           type: 'GET_RECIPES',
           payload: json.data})

}}

export function getAlldiets() {
    return async function (dispatch) {
       let diets = await axios.get('http://localhost:3001/diets');
       return dispatch({
           type: 'GET_ALL_DIET',
           payload: diets.data})

}}

export function searchRecipe(name){
    return async function(dispatch){
        try {
            let recipeByName = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            dispatch({
                type : 'SEARCH_RECIPE',
                payload : recipeByName.data
            })
            
        } catch {
            return alert('RECIPE NOT FOUND')
        }
    }
}

export function getDetail(id){
    console.log('llego detail action')
    return async function(dispatch){
        try {
            let detail = await axios.get('http://localhost:3001/recipes/' + id)
            dispatch({
                type : 'GET_DETAIL',
                payload : detail.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function createRecipe(post){
    return async function(){
        let response = await axios.post('http://localhost:3001/createrecipe',post)
       return response
    }
}

export function filterTypeDiets(payload){
    return {
        type: 'FILTER_DIETS',
        payload
    }
}

export function alfabetic(payload){
    return {
        type : 'ALFABETIC',
        payload
    }
}

export function healthScore(payload){
    return {
        type : 'HEALTH_SCORE',
        payload
    }
}