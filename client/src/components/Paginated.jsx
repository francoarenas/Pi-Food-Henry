import React from "react";
import '../stylos/paginated.css'

export default function Paginated({recipesPage, allRecipes, paged}) {
    const pageNumber = []

    for (let i = 0; i < Math.ceil(allRecipes/recipesPage); i++) {
      pageNumber.push(i+1)
    }
return (
    <nav>
        <ul className="pagination">
            {
                pageNumber?.map(number =>(
                 
                    <li className="page" key={number}>
                        <button className="pageBtn" onClick={()=> paged(number)}>{number}</button>
                    </li>
                ))
            }
        </ul>
    </nav>
)
}