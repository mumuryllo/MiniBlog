import React, { useState } from "react";
import { Link } from "react-router-dom";

// hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";
import "./Home.modules.css"

//components
import PostDetail from "../../components/PostDetail";


const Home = () =>{
    
    const[busca,setBusca]= useState("")
    const {documents: posts, loading} = useFetchDocument("posts")

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
            {loading && <p>Carregando...</p>}
            {posts && posts.map((post)=> 
            <PostDetail key={post.id} post={post}/>
            )}
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