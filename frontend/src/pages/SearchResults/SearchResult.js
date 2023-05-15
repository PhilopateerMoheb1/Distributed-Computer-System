import React, { useEffect, useState,useRef } from "react";
import "../Home/Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import HomeCard from "../Home/Components/HomeCard";

export default function SearchResult(results){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const [data,setData] = useState([]);
    // const urlParams = new URLSearchParams(queryString);
  useEffect(() => {
    // const product = urlParams.get('product')
    // console.log(product);
    const searchWord = urlParams.get('searchWord')
    const min = urlParams.get('min')
    const max = urlParams.get('max')
    const category = urlParams.get('category')
    const inputs = {search:searchWord,range:[min,max],category:category}
    axios.post('http://localhost:80/search',inputs).then(function (response) {
        setData(response.data);
    });
  }, []);

    return(
        <div class="HomeContainer">
            <div className="home-welcome-one bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Site Store</h1>
                        <p className="lead fw-normal text-white-50 mb-0">A Store You Can Trust</p>
                    </div>
                </div>
            </div>

            <section class="home-welcome-two py-6 bg-light">
                <div class="row justify-content-center">
                    <div class="mb-3 mb-lg-0 text-center col-lg-4 ">
                        <div class="px-0 px-lg-3">
                        <FontAwesomeIcon icon={faSearch} size="7x" />
                            <h3 class="h5">Your Search Results:</h3>
                        </div>
                    </div>

                </div>
            </section>

            <div className="home-products py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                                  data.map((dataItem,index)=>{
                                    return(
                                        <HomeCard 
                                        id = {dataItem.PID}
                                        name = {dataItem.Product_Name}
                                        price = {dataItem.Product_Price}
                                        category = {dataItem.Category}
                                        img = {dataItem.Product_Picture}
                                        available = {dataItem.Quantity_Available==0? <p style={{"color":"red"}}>Out of Stock!</p>:dataItem.Quantity_Available}
                                        />
                                    );
            
                                })}
                    


                    </div>
                </div>
            </div>
        </div>
    );
}

