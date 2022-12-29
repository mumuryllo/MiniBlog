import React from "react";
import  "./Navbar.modules.css"
import { NavLink } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";


const Navbar = () => {
    const {user} = useAuthValue()
    const  {logout} = useAuthentication()

    return (
        <nav className="navbar">
            <NavLink to="/" className="brand">
                Mini <span>Blog</span> React
            </NavLink>
            <ul className="links_list">
                {!user && (
                    <>
                     <li>
                    <NavLink to="/login">Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/cadastro">Cadastrar</NavLink>
                </li>
                    </>
                )}
                {user && (
                    <>
                       <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                      <li>
                    <NavLink to="/posts/create"> Novo Post</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/sobre"> Contato</NavLink>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
                    </>
                )}        
            </ul>
        </nav>
    )
}

export default Navbar;