import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthentication } from './hooks/useAuthentication';

//Hooks
import { useState, useEffect } from 'react';

// context
import { AuthProvider } from './context/AuthContext';

// páginas
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Dashboard from './pages/Dashboard/Dashboard'
import CreatePost from './pages/CreatePost/CreatePost'

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=>{
   
   onAuthStateChanged(auth,(user) =>{
    setUser(user)
   })

  },[auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
     <AuthProvider value={{user}}>
     <BrowserRouter>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sobre' element={<Sobre/>}/>
          <Route path='/login' 
          element={!user ? <Login/> : <Navigate to={"/"}/>}/>
          <Route path='/cadastro' 
          element={!user ? <Cadastro/> : <Navigate to={"/"}/>}/>
          <Route path='/dashboard' 
          element={user ? <Dashboard/> : <Navigate to={"/login"}/>}/>
          <Route path='/posts/create' 
          element={user ? <CreatePost/> : <Navigate to={"/login"}/>}/>
        </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
