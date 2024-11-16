import React,{useContext, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/**
 * ? ===== Import Components =====
 */
import Home from './Pages/Home';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login'
import Create from './Components/Create/Create.jsx'
import View from './Components/View/View.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context, FirebaseContext } from './store/FirebaseContext.jsx'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Product from './store/PostContext.jsx';
import SearchCon from './store/SearchContext.jsx';

function App() {

  const {setUser} = useContext(Context)
  const auth = getAuth()

  useEffect(()=>{
    let unSubscribe = onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log(user,"ehehhe");
        setUser(user)
      }else{
        setUser(null)
      }
    })
    return () =>{ if(unSubscribe) unSubscribe()}
  },[])

return (
    <div>
     <ToastContainer/>
      <Product>
          <SearchCon>
        <Routes>
          <Route  path='/' element={<Home/>}></Route>|
          <Route path='/Signup' element={< Signup/>}></Route>
          <Route path='/login' element={< Login/>}></Route>
          <Route path='/create' element={< Create/>}></Route>
          <Route path='/view' element={< View/>}></Route>
        </Routes>
          </SearchCon>
        </Product>
    </div>
  );
}

export default App;
