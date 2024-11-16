import React, { Fragment, useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import  {Context, FirebaseContext } from '../../store/FirebaseContext';
import { storage } from '../../firebase/config';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ReactLoading from 'react-loading';


const Create = () => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const {db} = useContext(FirebaseContext)
  const [loading,setLoading] = useState(false)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const dates = new Date(Date.now())

  const handleSubmit = ()=>{
    setLoading(true)
    if(!name.trim()||!category.trim()||!price.trim() || Number(price) <= 0){
      setLoading(false)
      toast.error('all fields are required and price must be greater than zero')
      return
    }

    const storageRef = ref(storage,`images/${image.name}`)
    uploadBytes(storageRef,image).then((url)=>{
      getDownloadURL(storageRef).then((url)=>{
        addDoc(collection(db,'products'),{
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt:dates.toISOString().split('T')[0]
        })
      })
    })
    navigate('/')
  }

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) > 0) {
      setPrice(value);
    } else {
      toast.error('Price must be a number greater than zero');
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            {/* <input className="input"  value={price}
              onChange={(e)=> setPrice(e.target.value)} type="number" id="fname" name="Price" /> */}

            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={handlePriceChange}
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="150px" height="150px" src={image?URL.createObjectURL(image):''}></img>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
