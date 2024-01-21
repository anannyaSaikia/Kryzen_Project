import React, { useEffect, useState } from 'react'
import axios from "axios";
import { saveAs } from 'file-saver';
import style from '../Styles/Download.module.css';

const Download = () => {
    const [data, setData] = useState({})

    const token = localStorage.getItem("token")

    const handleDownload = () => {
        axios.get("http://localhost:8000/form/download", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            responseType: 'blob'
        })
            .then((res) => {
                //console.log("blob data : " + res.data)
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
                saveAs(pdfBlob, 'user.pdf')
            })
            .catch((err) => {
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
                setData(res.data.data[0])
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
                    data ? <div>
                        <img src={`http://localhost:8000/uploads/${data.image}`} alt="avatar" />
                        <p>Name : {data.name}</p>
                        <p>Age : {data.age}</p>
                        <p>Address : {data.address}</p>
                        <table>
                            <thead><tr><th>Numbers List</th></tr></thead>
                            <tbody>
                            {
                                data.num_array?.map((ele, i)=>{
                                    return <tr key={i}>
                                             <td>{ele}</td>
                                           </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                        : <h4>No Data Found</h4>
                }
            </div>
            <button onClick={handleDownload}>Download</button>
        </div>

    )
}

export default Download