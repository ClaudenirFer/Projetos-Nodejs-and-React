import React from 'react';
import './Card.css';


export default function Card(props) {
    return (
        
        <div className="Card">
            <div className="header">
                {props.head}
            </div>
            <div className="conteudo">
                {props.children}
            </div>
            <div className="Footer">
                
                {props.titulo}
            </div>
        </div>
        
    )
}