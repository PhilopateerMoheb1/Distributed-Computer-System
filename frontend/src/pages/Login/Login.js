import "./Login.css"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Login(){

    axios.defaults.withCredentials = true;

    const [inputs,setInputs] = useState({});
    const [data,setData] = useState([]);


    useEffect(()=>{
        setInputs(values => ({...values,["range"]: [0, 1000]}));
        axios.get('http://localhost:80/session').then(
            (response) => {
                console.log(response)
                if("ID" in response.data){
                    console.log("logged in");
                    //redirect to home here
                    //How to access data:
                    //check using this condition if("ID" in response.data)? logged in : not logged in
                    //how to access data ? if logged in name=response.data["name"]
                }
                else{
                    //this is for testing
                    console.log("not logged in");
                }
            }
        );
    },[]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;       
        setInputs(values => ({...values,[name]: value}));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:80/login',inputs).then(function (response) {
            console.log(response.data);
            if (response.data.trim()=="Wrong Password") {
                // handle successful upload
                
                Swal.fire({
                    title: 'Wrong Password',
                    icon: 'error'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else if(response.data.trim()=="Email doesn't exist!") {
                Swal.fire({
                    title: "Email doesn't exist!",
                    icon: 'error'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
            else{
                //redirect to home page
            }
        });
    }
   
    return(
        <div className="login">
            <div className="login_body">
                <div className="container min-vh-100 d-flex justify-content-center align-items-center ">
                    <form className="login_form" onSubmit={handleSubmit}>
                        <h2 className="login_form_header">LOGIN</h2>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label login_label">Email address</label>
                            <input onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="uemail" required/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label login_label">Password</label>
                            <input onChange={handleChange} type="password" name="upassword" className="form-control" id="exampleInputPassword1"  required/>
                        </div>

                        <div className="mb-3 justify-content-center login-form-actions">
                            <button type="submit" className="btn btn-outline-primary login_form_btn">Submit</button>
                            <br/>
                            <div className="new-user-register">
                                <a href="../Register/register_page.php" className="new_user_link">
                                        new user? Register
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}