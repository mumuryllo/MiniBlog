import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.modules.css"


const Home = () =>{
    
    const[busca,setBusca]= useState("")
    const [posts] = useState([])

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    return (
        <div className="home">
           <h1>Veja as novidade mais recentes</h1> 
           <form onSubmit={handleSubmit} className="search_form">
            <input type={'text'} 
            placeholder="Ou busque por tags..."
            onChange={(e) =>setBusca(e.target.value)} />
            <button className="btn btn-dark">Pesquisar</button>
           </form>
           <div>
            <h1>Posts...</h1>
            {posts && posts.length === 0 && (
                <div className="noposts">
                    <p>Não foram encontrados posts</p>
                    <Link to={"/posts/create"} className="btn">Criar o primeiro Post</Link>
                </div>
            )}
           </div>

        </div>
    )
}

export default Home;