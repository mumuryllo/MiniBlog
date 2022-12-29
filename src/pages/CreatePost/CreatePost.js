import "./CreatePost.module.css"

import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {useAuthValue} from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () =>{

    const [titulo, setTitulo] = useState("")
    const [imagem, setImagem] = useState("")
    const [conteudo, setConteudo] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")
    const {insertDocument, response} = useInsertDocument("posts")
    const {user} = useAuthValue()

    const navigate = useNavigate()

   const handleSubmit = (e) =>{
    e.preventDefault();
    setFormError("")

   // validar as imagens

   try {
     new URL(imagem)
   } catch (error) {
    setFormError("A imagem precisa ser uma URL.")
   }

   // array de tags
   const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

   // checar os dados inseridos

   insertDocument({
    titulo,
    imagem,
    conteudo,
    tagsArray,
    uid: user.uid,
    createdBy: user.displayName
   })

   if (titulo || imagem || tags || conteudo){
    setFormError("Por favor preencha todos os campos!")
   }

   if(formError) return; 


  // redirecionar a home
    navigate("/")
   }

    return (
        <div className="create-post">
           <h2>Criar Post</h2> 
           <p>Escreva e compartilhe as melhores novidades aqui!</p>
           <form onSubmit={handleSubmit}>

            <label>
            <span>Título: </span>
            <input type={'text'} 
            name='titulo' 
            required 
            placeholder="Um bom título..."
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
            />
            </label>

            <label>
            <span>URL da imagem: </span>
            <input type={'text'} 
            name='imagem' 
            required 
            placeholder="Insira o link da imagem"
            onChange={(e) => setImagem(e.target.value)}
            value={imagem}
            />
            </label>
           
            <label>
            <span>Conteúdo do Post: </span>
            <textarea name="conteudo" 
            required 
            placeholder="Insira o conteúdo do Post"
            onChange={(e) => setConteudo(e.target.value)}
            value={conteudo}>
            </textarea>
            </label>

            <label>
            <span>Tags: </span>
            <input type={'text'} 
            name='tags' 
            required 
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            />
            </label>
            {!response.loading && <button className="btn">Cadastrar</button>}
            {response.loading && (
                <button className="btn">Aguarde...</button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
           </form>
        </div>
    )
}

export default CreatePost;