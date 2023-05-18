import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Footer.css"
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

function Footer() {

    const [showLogin,setShowLogin] = useState(true);

    useEffect(()=>{
        axios.get('http://localhost:80/session').then(
            (response) => {
                var objectConstructor = ({}).constructor;
                if(response.data.constructor === objectConstructor){
                    if("ID" in response.data){
                        console.log("logged in");
                        setShowLogin(false);
                    }
                }
            }
        );
    },[]);

    return (
        <div>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <h6>About</h6>
                            <p className="text-justify">Allmart is the ultimate online destination for all your shopping needs. Whether you are looking for electronics, fashion, home goods, or anything else, you can find it at Allmart. We offer a wide range of products from around the world at affordable prices. Allmart is your one stop worldwide market</p>
                        </div>
                        <div className="quick-links col-md-4 col-sm-6 col-xs-12">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li><a href="/">Home</a></li>
                                <li><a href="/userinfo">Profile</a></li>
                                {showLogin?<li><a href="/login">Login</a></li>:null}
                                {showLogin?<li><a href="/register">Register</a></li>:null}
                            </ul>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2009 All Rights Reserved by 
                        <a href="/"> AllMart</a>.
                            </p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><a className="facebook" href="https://www.facebook.com/Amazon/"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="twitter" href="https://twitter.com/amazon#"><i className="fa fa-twitter"></i></a></li>
                                <li><a className="instagram" href="https://www.instagram.com/amazon/"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;