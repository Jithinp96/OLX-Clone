import React, { useState ,useContext} from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  
  const [username,setUsername] =  useState('')
  const [email,setEmail] = useState('')
  const [number,setNumber] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const auth = getAuth()
  const navigate = useNavigate()
  const {firebase} = useContext(FirebaseContext)
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/;

    if(!username.trim()||!email.trim()||!password.trim()||!number.trim()){
      setLoading(false)
      toast.error('All fields are required')
      return false
    }else if(!usernameRegex.test(username)) {
      setLoading(false)
      toast.error('enter a valid username')
      return false;
    }
    else if(number.length < 10){
      setLoading(false)
      toast.error('number must be 10 digits')
      return false
    }else if(!emailRegex.test(email)){
      setLoading(false)
      toast.error('Please enter a valid email address');
      return false;
    }else if(password.length < 6){
      setLoading(false)
      toast.error('password must be larger')
      return false
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log("Inside .then user credentials");
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: username
      });    
    }).then(()=>{
      addDoc(collection(db,'users'),{
        id:auth.currentUser.uid,
        name :username,
        number:number
      })
    }).then(()=>{
        navigate('/login')
    }).catch((error)=>{
        if(error.code == 'auth/email-already-in-use'){
          toast.error('Email already in use')
        }else{
          console.log("Error: ", error);
           toast.error('server under maintainence')
        }
      })
  }


  return (
    <div>
      <ToastContainer />
     {loading?     
       <div className='loading-container'>
      <ReactLoading  className='loading-wrapper'
       type="spinningBubbles"
       color="green"
       height={100}
       width={70}
   /></div>
        : <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={number}
            onChange={(e)=> setNumber(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Sign Up</button>
        </form>
        <Link to={'/login'} style={{textDecoration:'none', color:'blue'}}>Already in use ? Login</Link>
      </div>}
    </div>
  );
}