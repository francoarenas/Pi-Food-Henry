import React from "react";
import '../stylos/card.css'

export default function Card ({name,image,dietTypes,dishTypes,score}){
return (
    <div className="recipe">
    <img className="recipeImg" src={image} alt={`Imagen de ${name}`} />
    <h1 className="recipeName"> {name} </h1>
    <h3> {dietTypes} </h3>
    <h3> {dishTypes} </h3>
    <h3> {score} </h3>
    </div>
)
}