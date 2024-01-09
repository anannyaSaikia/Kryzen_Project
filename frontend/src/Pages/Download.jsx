import React, { useEffect, useState } from 'react'
import axios from "axios";
import { saveAs } from 'file-saver';
import style from '../Styles/Download.module.css';

const Download = () => {
    const [data, setData] = useState([])

    const token = localStorage.getItem("token")

    const handleDownload = () =>{
        axios.get("http://localhost:8000/form/download", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            responseType : 'blob'
        })
        .then((res)=>{
            //console.log("blob data : " + res.data)
            const pdfBlob = new Blob([res.data], {type : 'application/pdf'})
            saveAs(pdfBlob, 'user.pdf')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getData = () => {
        axios.get("http://localhost:8000/form/data", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then((res) => {
                console.log(res.data)
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={style.main}>
            <h3>Your Details</h3>
            <div>
                {
                    data?.map((ele, i) => {
                        return <div key={i}>
                            <img src={`http://localhost:8000/uploads/${ele.image}`} alt="avatar" />
                            <p>Name : {ele.name}</p>
                            <p>Age : {ele.age}</p>
                            <p>Address : {ele.address}</p>
                        </div>
                    })
                }
            </div>
            <button onClick={handleDownload}>Download</button>
        </div>

    )
}

export default Download