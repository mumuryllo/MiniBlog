import React from "react";
import { Link } from "react-router-dom";
import  "./Sobre.modules.css"


const Sobre = () =>{
    return (
        <div className="about">
           <h2>Sobre o Mini
            <span>Blog</span>
           </h2>
           <p>É um projeto feito com React no Front-End e FireBase no Back-end</p>
           <Link to={'/posts/create'} className='btn'>
           Criar um Post
        </Link>
        </div>
       
    )
}

export default Sobre;