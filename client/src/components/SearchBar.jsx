import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../actions/index"

export default function(){

const dispatch = useDispatch()

const [nameRecipe, setRecipe] = useState('')

function handleChange(e){
    e.preventDefault()
    setRecipe(e.target.value)
    console.log(nameRecipe)
}

function handleClick(e){
    e.preventDefault()
    dispatch(searchRecipe(nameRecipe))
    setRecipe('')
}
    return(
       <div>
        <input type='text' placeholder='Search...' value={nameRecipe} onChange={e => handleChange(e)}/>
        <button onClick={e => handleClick(e)}>SEARCH</button>
       </div>   
)
}