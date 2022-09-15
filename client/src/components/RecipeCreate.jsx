import React from "react";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {createRecipe} from '../actions'
import { Link } from "react-router-dom";
import { getAlldiets } from "../actions";

export default function(){

const dispatch = useDispatch()
const diets  = useSelector((state)=> state.diets)
const [post,setPost] = useState({

        name: "",
        summary: "",
        healthScore: 0,
        steps: [],
        typeofdiets: [],
        image: ""
})

const [errors, setErrors] = useState({})

useEffect(()=>{
    dispatch(getAlldiets())
},[])

function handleImput(e){
    console.log(e.target,e.target.value)
    setPost({
        ...post,
        [e.target.name] : e.target.value
    })
    setErrors(validate({
        ...post,
        [e.target.name] : e.target.value
    }))
}

function handleStep(e) {
    setPost({
      ...post,
      steps: [e.target.value],
    });
  }

function handleSelect(e){
    if (!post.typeofdiets.includes(e.target.value)) {
    setPost({
        ...post,
        typeofdiets : [...post.typeofdiets,e.target.value]
    })
    setErrors(validate({
        ...post,
        typeofdiets : [...post.typeofdiets,e.target.value]
    }))
}
    e.target.value = ''
}

function handleDelete(e){
setPost({
    ...post,
    typeofdiets : post.typeofdiets.filter(el => el !== e.target.value)
})
}



function handleSubmit(e){
    e.preventDefault()
    dispatch(createRecipe(post))
    setPost({
        name: "",
        summary: "",
        healthScore: 0,
        steps: [],
        typeofdiets: [],
        image: ""
    })
    alert('RECIPE CREATE SUCEFULL!')
}
console.log(post.steps)

    return(
        <div>
            <h1>CREATE RECIPE!</h1>
            <Link to='/home'><button>BACK</button></Link>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                  <label>Name: </label>
                    <input 
                    type="text"
                    placeholder="Add a Recipe name:"
                    value={post.name}
                    name='name'
                    onChange={e => handleImput(e)}
                    />
                  </div>

                    {errors.name && <p>{errors.name}</p>}

                  <div>
                  <label>Summary: </label>
                    <input 
                    type="text"
                    placeholder="Enter a Recipe Description"
                    value={post.summary}
                    name='summary'
                    onChange={e => handleImput(e)}
                    />
                  </div>

                  {errors.summary && <p>{errors.summary}</p>}

                  <div>
                  <label>HealthScore: </label>
                    <input 
                    type="number"
                    value={post.healthScore}
                    name='healthScore'
                    onChange={e => handleImput(e)}
                    />
                  </div>

                  {errors.healthScore && <p>{errors.healthScore}</p>}

                  <div>
                  <label>Steps: </label>
                    <textarea
                    cols="40"
                    rows="3"
                    placeholder="Enter the steps to create the recipe"
                    value={post.steps}
                    name='steps'
                    onChange={e => handleStep(e)}
                    />
                  </div>

                  <div>
                  <label>TypeOfDiets: </label>
                  <select onChange={e => handleSelect(e)}>
                    {diets.map(e => <option value={e.name}>{e.name}</option>)}
                  </select>
                  </div>

                  {errors.typeofdiets && <p>{errors.typeofdiets}</p>}

                  <div>
                  <label>Image: </label>
                    <input 
                    type="text"
                    placeholder="image path"
                    value={post.image}
                    name='image'
                    onChange={e => handleImput(e)}
                    />
                  </div>

                  <button type="submit">CREATE RECIPE</button>
            </form>
                    {post.typeofdiets.map(e => (
                        <div>
                            <p>{e}</p>
                            <button value={e} onClick={el => handleDelete(el)}>X</button>
                        </div>
                    ))}
        </div>
    )
}

function validate(post){
    let error = {}
    if(!post.name) error.name = 'Name is require'
    if(!post.summary) error.summary = 'Summary is require'
    if(!post.typeofdiets.length) error.typeofdiets = 'Select at least one type of diet'
    if(post.healthScore < 0 || post.healthScore > 100) error.healthScore = 'Health score between 0 and 100'
    return error
}