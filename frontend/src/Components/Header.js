import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Button, Form, Container} from 'react-bootstrap';
import Slider from "@mui/material/Slider";
import Logo from "../Assets/svg/Color logo with background.svg";
import axios from 'axios';
import './Header.css';

export default function Header(){

    const [range, setRange] = React.useState([0, 1000]);
    const [inputs,setInputs] = useState({});
    const [data,setData] = useState([]);
    let seller = false;

    useEffect(()=>{
        setInputs(values => ({...values,["range"]: [0, 1000]}));
        axios.get('http://localhost:80/session')     
            .then((response) => {
                if (response.data === 'Valid') {
                seller=true;
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },[]);
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;       
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
        axios.post('http://localhost:80/search',inputs).then(function (response) {
            setData(response.data[0]);
        });
    }

    function handleChanges(event,newValue) {
        setRange(newValue)
        setInputs(values => ({...values,["range"]: newValue}));
    }

    return(
        <div className="Header">
            <Navbar className = "Header-Navbar" variant="dark" fixed="top" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#"><img
                        alt="Trustify"
                        src={Logo}
                        width="200 rem"
                        className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="m-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' ,width:'100%'}}
                            navbarScroll>
                            <Form onSubmit={handleSubmit} className="mt-auto mt-xs-5 d-flex Header-Navbar-Search">
                            <div className="styled">
                            <select onChange={handleSelect} id="category" name="category">
                                <option selected="selected" value="all">All</option>
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
                            </div>
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            name="search"
                            onChange={handleChange}
                            className="Header-searchbox"
                            aria-label="Search"
                            />
                            <div className="styled" style = {{ width: "20%"}}>
                                <Slider className="slider" style={{zIndex:"99"}} value = {range} min={0} max={1000} onChange = {handleChanges} valueLabelDisplay="auto"/>
                            </div>
                            <Button type="submit" className="Header-Button mx-auto btn-primary" >Search</Button>
                            </Form>
                        </Nav>
                        <Nav
                        className="m-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px',width:'20%'}}
                        navbarScroll>
                            {seller?<Nav.Link  style={{color:"white"}} className="m-auto" href="#deets">Add Listing</Nav.Link>:null}
                            <Nav.Link  style={{color:"white"}} className="m-auto" href="#deets">Profile</Nav.Link>
                            <Nav.Link style={{color:"white"}} className="m-auto" href="#memes">Cart</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}