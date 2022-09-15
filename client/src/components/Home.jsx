import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes,filterTypeDiets,getAlldiets,alfabetic,healthScore } from "../actions";
import Card from "../components/Card";
import Paginated from "./Paginated"
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import '../stylos/card.css'

export default function Home(){
    
    const dispatch = useDispatch()

    const allRecipes = useSelector((state) => state.recipes)
    const allDiets = useSelector((state) => state.diets)

    const [page, setPage] = useState(1)
    const [recipesPage, setRecipesPage] = useState(9)
    const [order, setOrder] = useState('')
    const [socre, setScore] = useState('')

    const lastRecipeIndex = page * recipesPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPage;
    var recipesPerPage = allRecipes.slice(firstRecipeIndex,lastRecipeIndex)
    
    const paged = function(pageNumber) {
        setPage(pageNumber)
    };
    
    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getAlldiets())
    },[dispatch])
    
function handleRecipe(e){
    dispatch(getRecipes())
    dispatch(getAlldiets())
    setPage(1)
}

function handleChange(e){
    e.preventDefault()
    setPage(1)
    dispatch(filterTypeDiets(e.target.value))
}

function handleAlfabetic(e){
    e.preventDefault()
    setPage(1)
    dispatch(alfabetic(e.target.value))
    setOrder(`RENDER Order ${e.target.value}`)
}

function handleScore(e){
    e.preventDefault()
    setPage(1)
    dispatch(healthScore(e.target.value))
    setScore(`RENDER Score ${e.target.value}`)
}

    return (
        <div>
            <h1>Home</h1>
            <Link to="/createrecipe"><button className="addButton">Add new recipe</button></Link>

            <button onClick={handleRecipe}>Volver a cargar todas las Recetas</button>

            <select onChange={e => handleAlfabetic(e)}>
                    <option defaultChecked>Alphabetical</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
            </select>

            <select onChange={e => handleScore(e)}>
                    <option defaultChecked>Score</option>
                    <option value="asc">From Min to Max</option>
                    <option value="desc">From Max to Min</option>
            </select>

            <select onChange={e => handleChange(e)}>
                    <option disabled>Select...</option>
                    <option value="all" defaultValue>All</option>

                    {
                    allDiets?.map((e) => (
                    <option value={e.name} key={e.id}>{e.name}</option>
                      ))
                    }
            </select>

        <div>

        <SearchBar/>

        <Paginated recipesPage={recipesPage} 
        allRecipes={allRecipes.length}
        paged={paged}/>
        </div>
        <div>
        {
             recipesPerPage.length ? recipesPerPage.map(e => (
            <>
            <Link className="recipeName" to={'home/' + e.id}>
            <Card name={e.name} 
            image={e.image} 
            dietTypes={e.dietTypes} 
            dishTypes={e.dishTypes} 
            score={e.healthScore}
            key={e.id}/>
            </Link>
            </>
            )
            ) : <h1>Loading...</h1>
        }
        </div>
     
        </div>
    )
}