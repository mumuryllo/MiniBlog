import { useState,useEffect } from "react";
import "./Cadastro.module.css"
import {useAuthentication} from "../../hooks/useAuthentication"

const Cadastro = () =>{
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const {createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        setError("")

        const user = {
            displayName,
            email,
            password
        }

        if(password !== confirmPassword) {
            setError("As senhas precisam ser iguais!")
        }

        const res= await createUser(user);
        console.log(res)
    }

    useEffect(() =>{
        if(authError){
            setError(authError)
        }
    },[authError])

    return (
        <div className="register">
           <h1>Cadastre-se aqui para postar</h1> 
           <p>Crie aqui o seu usuário</p>
           <form onSubmit={handleSubmit}>
            <label>
               <span>Nome:</span> 
               <input
               type={'text'}
               name="nome"
               required
               placeholder="Nome do usuário"
               value={displayName}
               onChange={(e) => setDisplayName(e.target.value)}
               />
            </label>
            <label>
               <span>Email:</span> 
               <input
               type={'email'}
               name="email"
               required
               placeholder="Email do usuário"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
            </label>
            <label>
               <span>Senha:</span> 
               <input
               type={'password'}
               name="senha"
               required
               placeholder="Insira a sua senha"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
            </label>
            <label>
               <span>Confirmação de senha:</span> 
               <input
               type={'password'}
               name="Confirmasenha"
               required
               placeholder="Confirme a sua senha"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               />
            </label>
            {!loading && <button className="btn">Cadastrar</button>}
            {loading && (
                <button className="btn">Aguarde...</button>
            )}
            {error && <p className="error">{error}</p>}
           </form>
        </div>
    )
}

export default Cadastro;