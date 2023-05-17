import "./Register.css"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Register(){

    axios.defaults.withCredentials = true;

    useEffect(()=>{
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

    const [inputs,setInputs] = useState({});
    const [showPassowrdMissmatch,setShowPasswordMissmatch] = useState(false);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name==="ConfirmPassword"){
            if(!(inputs["Password"]===value)){
                setShowPasswordMissmatch(true);
            }
            else{
                setShowPasswordMissmatch(false);
            }
        }
        else if(name==="Password"){
            if("ConfirmPassword" in inputs){
                if(!(inputs["ConfirmPassword"]===value)){
                    setShowPasswordMissmatch(true);
                }
                else{
                    setShowPasswordMissmatch(false);
                }
            }
        }
        
        setInputs(values => ({...values,[name]: value}));
    }
    const handleSelect = (event) => {
        const name = event.target.name;
        const id = event.target.id;

        var value = document.getElementById(id).value;

        setInputs(values => ({...values,[name]: value}));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:80/register',inputs).then(function (response) {
            var stringConstructor = ("text").constructor;
            console.log(response)
            if(response.data.constructor === stringConstructor){
                if(response.data.trim() === "success"){
                    console.log("registered");
                    window.location = "/login";
                }
                else{ 
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.slice(0,-1),
                      })
                }
            }
        });
    }
   
    return(
        <div className="Register">
            <div class ="register_body">
                <div className="min-vh-100 d-flex justify-content-center align-items-center">
                    <form className="register_form" onSubmit={handleSubmit}>
                        <h2 className="register_form_header">Register</h2>
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label for="reg_name" className="form-label register_label">Full Name</label>
                                    <input onChange={handleChange} type="text" className="form-control" id="reg_Name" name="Name"
                                    placeholder="full name" required pattern="[A-Za-z][A-Za-z\s]*[A-Za-z]$" title="Name can have charachters and spaces only"/>
                                    
                                </div>

                                <div className="mb-3">
                                    <label for="reg_email" className="form-label register_label">Email address</label>
                                    <input onChange={handleChange} type="email" className="form-control" id="reg_Email" aria-describedby="emailHelp"
                                    name="Email" placeholder="Email address" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="invalid email" />
                                                

                                </div>
                                
                                <div className="mb-3">
                                    <label for="street-address" className="form-label register_label">Street address</label>
                                    <input onChange={handleChange} type="text" className="form-control" id="street-address" name="Address"
                                    autocomplete="street-address" pattern="\S(.*\S)?" title="This field is required" placeholder="street address" required/>                        
                                </div>

                                <div className="mb-3">
                                    <label for="reg_phone" className="form-label register_label">Phone number</label>
                                    <input onChange={handleChange} type="tel" className="form-control" id="reg_phone" name="Phone_Number"
                                    placeholder="Phone number" required pattern="^(010|011|012|015|\+2010|\+2011|\+2012|\+2015)[0-9]{8}$" title="invalid phone number"/>
                                     {showPassowrdMissmatch? <p style={{"color":"transparent"}}>passwords must match</p>:null}
                                </div>
                                
                                <div className="mb-3">
                                    <label for="reg_birthday" className="form-label register_label" >Birthday:</label>
                                    <input onChange={handleChange} type="date" className="form-control" id="reg_birthday" name="DOB" required
                                    min="1905-01-01" max="2005-12-31"/>   
                            </div>
                            </div>   
                                <div className="col-md-6">
                                <div className="mb-3">
                                    <label for="reg_gender" className="form-label register_label">Gender</label>

                                    <select onChange={handleSelect} id="reg_gender_select" className="form-select" aria-label="Default select example"
                                    name="Gender" required title="field required">
                                        <option value ="" selected disabled hidden>Choose...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="none">Would rather not say</option>
                                        
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label for="reg_Role" className="form-label register_label">Role</label>
                                    <select onChange={handleSelect} id="reg_role_select" className="form-select" aria-label="Default select example" name="Role" required title="field required">
                                        <option value ="" selected disabled hidden>Choose...</option>
                                        <option>User</option>
                                        <option>Seller</option>
                                    </select>


                                </div>

                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label register_label">Password</label>
                                    <input onChange={handleChange} type="password" name="Password" className="form-control" id="exampleInputPassword1" placeholder="Password" required
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    />
                                
                                </div>
                                
                                <div className="mb-5">
                                    
                                    <label for="exampleInputPassword1" className="form-label register_label">Confirm Password</label>
                                    
                                    <input onChange={handleChange} type="password" name="ConfirmPassword" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" required/>
                                    
                                    {showPassowrdMissmatch? <p style={{"color":"red"}}>passwords must match</p>:null}
                                </div>

                                <div className="mb-3 justify-content-center align-items-center register-form-actions">
                                    <button type="submit" className="btn register_form_btn">Register</button>                            
                                    <div className="old-user-login">
                                            Have An Account?
                                    </div>
                                    <a href="/login">
                                    <button type="button" className="btn register_form_btn">Login</button> 
                                    </a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}