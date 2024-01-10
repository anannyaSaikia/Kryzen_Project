import React, { useState } from 'react'
import axios from "axios";
import style from "../Styles/Form.module.css";
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [details, setDetails] = useState({
        name: "",
        age: "",
        address: ""
    })

    const [image, setImage] = useState();

    const navigate = useNavigate();

    const handleSubmit = () => {
        if(!details.name || !details.age || !details.address || !image){
            alert('Please fill all the fields')
        }
        else{
            const formData = new FormData();
        formData.append('name', details.name)
        formData.append('age', details.age)
        formData.append('address', details.address)
        formData.append('image', image)

        const token = localStorage.getItem("token")

        const config = {
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type" : "multipart/form-data"
             }
          };
       
        axios.post("https://kryzen-project-backend.cyclic.app/form/add", formData, config)
            .then((res) => {
                //console.log(res.data)
                navigate("/download")
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className={style.main}>
            <input type="text" placeholder='Enter Name' value={details.name} onChange={(e) => {
                setDetails({
                    ...details, name: e.target.value
                })
            }} />
            <input type="text" placeholder='Enter Age' value={details.age} onChange={(e) => {
                setDetails({
                    ...details, age: e.target.value
                })
            }} />
            <input type="text" placeholder='Enter Address' value={details.address} onChange={(e) => {
                setDetails({
                    ...details, address: e.target.value
                })
            }} />
            <label htmlFor="avatar"><h5>Upload Profile Image</h5></label>
            <input type="file" id="avatar" onChange={(e) => {
                setImage(e.target.files[0])
            }} />

            <button onClick={handleSubmit}>Submit</button>

            <p onClick={()=>{
                navigate("/download")
            }}>Previous Data</p>
        </div>
    )
}

export default Form