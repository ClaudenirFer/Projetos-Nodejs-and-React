import Cars from "../data/Cars";
import Policias from "./Policias";
import React, { useState, useEffect } from "react";

export default function Button(props) {
  const [buttonClick, setbuttonClick] = useState(0);

  return (
    <div>

      {        
        <Policias data={Cars[buttonClick]} /> 
      } 
               

      <h5> Carro {buttonClick + 1} </h5>
      <button onClick={() => setbuttonClick(buttonClick < 12 ? buttonClick + 1 : buttonClick - 12)}>
        {props.name}
      </button>
    </div>
  );
}
