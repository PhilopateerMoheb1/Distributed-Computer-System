import "./Login.css"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




export default function Login(){

    axios.defaults.withCredentials = true;

    const [inputs,setInputs] = useState({});
    const [data,setData] = useState([]);

    useEffect(()=>{
        setInputs(values => ({...values,["range"]: [0, 1000]}));
        axios.get('http://localhost:80/session').then(
            (response) => {
                var objectConstructor = ({}).constructor;
                if(response.data.constructor === objectConstructor){
                    if("ID" in response.data){
                        console.log("logged in");
                        window.location = "./";
                    }
                }
            }
        );
    },[]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;       
        setInputs(values => ({...values,[name]: value}));
    }

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:80/login',inputs).then(function (response) {
            var objectConstructor = ({}).constructor;
            if(response.data.constructor === objectConstructor){
                if("ID" in response.data){
                    console.log("logged in");
                    window.location = "./";
                }
            }
            else{ 
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.slice(0,-2),
                  })
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
                            <input onChange={handleChange} type={passwordShown ? "text" : "password"} name="upassword" className="form-control" id="exampleInputPassword1"  required/>
                            {!passwordShown?<i onClick ={togglePassword} class="field-icon fa-solid fa-eye"></i>
                            :<i onClick={togglePassword} class="field-icon fa-solid fa-eye-slash"></i>}
                        </div>
                        
                        <div className="mb-3 justify-content-center login-form-actions">
                            <button type="submit" className="btn  login_form_btn">Login</button>
                        </div>
                            <label for="register" className="form-label login_label">new user?</label>
                        <div className="mb-3 justify-content-center login-form-actions">
                            <a href="/Register">
                            <button id="register" type="button" className="btn  login_form_btn">Register</button>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}