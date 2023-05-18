import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Button, Form, Container,NavDropdown} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Logo from "../../Assets/svg/Color logo with background.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './Header.css';
import SearchResult from "../../pages/SearchResults/SearchResult"
import { Windows } from "react-bootstrap-icons";
import icon from "../../Assets/png/profile-dropdown.png"
import coin from "../../Assets/25498.jpg"

export default function Header(){

    axios.defaults.withCredentials = true;

    const [range, setRange] = React.useState([0, 15000]);
    const [inputs,setInputs] = useState({});
    const [data,setData] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        setInputs(values => ({...values,["range"]: [0, 15000]}));
        setInputs(values => ({...values,["category"]: "all"}));
        setInputs(values => ({...values,["search"]: ""}));
        axios.get('http://localhost:80/session')     
            .then((response) => {
                var objectConstructor = ({}).constructor;
                console.log(response)
                if (response.data.constructor === objectConstructor) {
                    setData(response.data);
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

    const handleLogout = (event) => {
        axios.get('http://localhost:80/logout').then(function (response) {
            window.location = "./";
        });
    }

    const handleSelect = (event) => {
        const name = event.target.name;
        const id = event.target.id;

        var value = document.getElementById(id).value;

        setInputs(values => ({...values,[name]: value}));
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        let path = "/SearchResult"+"?searchWord="+inputs.search+"&min="+inputs.range[0]+"&max="+inputs.range[1]+"&category="+inputs.category
        window.location = path
        
        
        
    }

    function handleChanges(event,newValue) {
        setRange(newValue)
        setInputs(values => ({...values,["range"]: newValue}));
    }

    return(
        <div className="Header">
            <Navbar className = "Header-Navbar" variant="dark" fixed="top" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/"><img
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
                            <select onChange={handleSelect} id="searchcategory" name="category">
                                <option selected="selected" value="all">All</option>
                                <option value="devices">Devices</option>
                                <option value="fashion">Fashion</option>
                                <option value="arts">Arts</option>
                                <option value="automotive">Automotive</option>
                                <option value="baby">Baby Supplies</option>
                                <option value="beauty">Beauty Items</option>
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
                                <Slider className="slider" style={{zIndex:"99"}} value = {range} min={0} max={15000} onChange = {handleChanges} valueLabelDisplay="auto"/>
                            </div>
                            <button type="submit" className="Header-Button btn mx-auto">Search</button>  
                            </Form>
                        </Nav>
                        {data.constructor ===({}).constructor && "ID" in data ?
                        <Nav
                        className="m-auto my-2 my-lg-0"
                        style={{ maxHeight: '400px',maxWidth:'50%'}}
                        navbarScroll>
                        <NavDropdown className="justify-content-center"
                         title=<div className="pull-left">
                                <img className="thumbnail-image" 
                                    src={icon} 
                                    alt="user"
                                    style={{width:"3rem"}}
                                />
                            </div> id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/userInfo">Profile</NavDropdown.Item>
                            {data.Role==="Seller"?<NavDropdown.Item href="/AddListing">AddListing</NavDropdown.Item>:null}
                            <NavDropdown.Item href="/CreditCard">{data.Cash_Balance}<img className="thumbnail-image" 
                                    src={coin} 
                                    alt="dollars"
                                    style={{width:"3rem"}}
                                /></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                Logout
                        </NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        : <Nav
                        className="m-auto my-2 my-lg-0"
                        style={{ maxHeight: '400px',width:'20%'}}
                        navbarScroll>
                            <Nav.Link  style={{color:"white"}} className="m-auto" href="/login">Login</Nav.Link>
                            <Nav.Link  style={{color:"white"}} className="m-auto" href="/Register">Register</Nav.Link>
                        </Nav> }
                        
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}