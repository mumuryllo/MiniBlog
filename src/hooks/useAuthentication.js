import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
   signOut 
} from 'firebase/auth'
import { db } from '../firebase/config'

import { useState, useEffect } from 'react'


export const useAuthentication = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)


    const [cancelled, setCancelled] = useState(false)


    const auth = getAuth();

    function ckeckIfisCancelled () {
        if (cancelled) {
            return;
        }
    }

    // POST
    const createUser = async (data) =>{
        ckeckIfisCancelled()

        setLoading(true)
        setError(null)

        try {
            
            const {user}= await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
             
             await updateProfile(user,{
                displayName: data.displayName
             })

              return user;

                } catch (error) {
                 console.log(error.message)
                 console.log(typeof error.message)

                 let systemErrorMessage

                 if(error.message.includes("Password")){
                    systemErrorMessage = "A senha precisa ter pelo menos 6 caracteres."
                 } else if(error.message.includes("email-already")){
                    systemErrorMessage = "E-mail já Cadastrado!."
                 } else {
                    systemErrorMessage = "Ocorreu um erro por favor tente novamente mais tarde!."
                 }
                 setLoading(false)
                 setError(systemErrorMessage)
        }
    }

    // logout - sign out
    const logout =() =>{
     ckeckIfisCancelled();
     signOut(auth);
    }

    // login - sign in

    const login = async(data) =>{
        ckeckIfisCancelled()
        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth,data.email,data.password)
            setLoading(false)
        } catch (error) {
              let systemErrorMessage

                 if(error.message.includes("user-not-found")){
                    systemErrorMessage = " Usuário não encontrado."
                 } else if(error.message.includes("wrong-password")) {
                    systemErrorMessage = "Senha incorreta"
                 }else {
                    systemErrorMessage = "Ocorreu um erro por favor tente novamente mais tarde!."
                 }

                 setError(systemErrorMessage)
                 setLoading(false)
        }
    }


     
     useEffect(() =>{
        return () => setCancelled(true)
     },[])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}   