import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { Link } from 'react-router-dom'

export default function(props){

    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    const recipeDetails = useSelector(state => state.detail);
console.log(recipeDetails)
    return(
        <div>
            {
                recipeDetails.length ?
                <div>
                    <h1> {recipeDetails[0].name} </h1>

                    <img src={recipeDetails[0].image ? recipeDetails[0].image : 'https://i.pinimg.com/736x/7d/02/2f/7d022f309e0d6c1c120bb5fb24e5b8fb.jpg'} />
                    
                    <h4> Diet Type: {recipeDetails[0].dietTypes?.map(e => (
                    
                        <h4 key={e}>{e}</h4>
                    )
                )} </h4>
                    
                    <h4> Dish Type: {recipeDetails[0].dishTypes?.map(e => (
                    
                    <h4 key={e}>{e}</h4>
                )
            )} </h4>

            <h4> Summary: {recipeDetails[0].summary} </h4>

            <h2>Score: {recipeDetails[0].healthScore}</h2>

            <h4> Steps: {recipeDetails[0].steps?.map(e => (
                    
                    <h4 key={e.number}>{e.step}</h4>
                )
            )} </h4>
   
                </div>
                :  <h1>Loading...</h1>
            }
            <Link to="/home"><button className="backButton">Go back to recipes</button></Link>
        </div>
    )
}