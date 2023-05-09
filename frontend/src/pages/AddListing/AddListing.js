import React, { useEffect, useState,useRef } from "react";
import "./AddListing.css"
import Header from "../../Components/Header/Header";
import ImageUpload from "../../Components/ImageUpload"
import axios from 'axios';
import swal from 'sweetalert2'


export default function AddListing(){

    const [inputs,setInputs] = useState({});

    const handleSelect = (event) => {
        const name = event.target.name;
        const id = event.target.id;

        var value = document.getElementById(id).value;
        console.log(value);       

        setInputs(values => ({...values,[name]: value}));
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value);       
        setInputs(values => ({...values,[name]: value}));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:80/upload',inputs).then(function (response) {
            console.log(response.data[0]);
        });
        swal.fire(
            'Done!',
            'Listing Added!',
            'success'
        )
    }

    return(
        <div className="AddListing">
            <Header/>
            <form className="AddListing-form" onSubmit={handleSubmit}>
        
                <h1>Add Listing</h1>
                
                <fieldset>
                
                <legend><span class="number">1</span> Product info</legend>
                
                <label for="name">Name:</label>
                <input onChange={handleChange} type="text" id="name" name="Product_Name" required/>
                
                <label for="price">Price:</label>
                <input onChange={handleChange} type="number" min="0" id="price" name="Product_Price" required/>
                
                <label for="quantity">Quantity Available:</label>
                <input onChange={handleChange} type="number" id="quantity" min="0" max="1000" name="Quantity_Available" required/>
                
                <label for="description">Description:</label>
                <textarea onChange={handleChange} id="description" name="Product_Description" required></textarea>

                <label for="category">Category:</label>
                <select onChange={handleSelect} id="category" name="Category" required>
                    <option value="all">All</option>
                    <option value="devices">Devices</option>
                    <option value="fashion">Fashion</option>
                    <option value="arts">Arts</option>
                    <option value="automotive">Automotive</option>
                    <option value="baby">Baby</option>
                    <option value="beauty">Beauty</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="grocery">Grocery</option>
                    <option value="health">Health</option>
                    <option value="garden">Home</option>
                    <option value="home">Home Related</option>
                    <option value="industrial">Scientific</option>
                    <option value="musical">Instruments</option>
                    <option value="office-products">Office</option>
                    <option value="pet">Pet Supplies</option>
                    <option value="software">Software</option>
                    <option value="sports">Sports</option>
                    <option value="tools">Tools</option>
                    <option value="toys">Toys</option>
                    <option value="videogames">Video Games</option>
                </select>
                </fieldset>
                
                <fieldset>
                
                <legend><span class="number">2</span> Product picture</legend>
        
                
                <label>Upload:</label>
                <ImageUpload
                    callback={(data) => { 
                        setInputs(values => ({...values,["Product_Picture"]: data}));
                    }}
                />
                
                </fieldset>
                
                <button type="submit">Add Listing</button>
                
            </form>
        </div>
    );
}

