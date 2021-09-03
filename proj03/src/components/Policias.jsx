import React from 'react';
import './Components.css'


export default function Policias({ data }) {
    
    function getCarsListItem(data) {
        
        return (
            <div classNome="container">
                {
                    <div>
                    {/* {data.id} */}                    
                    <img src={data.imgUrl} alt={data.local}/>
                    <h3>{data.local}</h3>
                    </div>
                }

        </div>            
       )}   

    return (
        <div>
            {/* <h2> Carros de Polícia</h2> */}
            <ul>
                {getCarsListItem(data)}
            </ul>
        </div>
    )

    

}
