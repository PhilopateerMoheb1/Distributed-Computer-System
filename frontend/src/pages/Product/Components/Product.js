
import swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import axios from 'axios';
let usermoney = 100



function Product(props){


    return(
        <div class="card">
        <div class="card__title">
          <div class="icon">
            <a href="#"><i class="fa fa-arrow-left"></i></a>
          </div>
          <h3>New products</h3>
        </div>
        <div class="card__body">
          <div class="half">
            <div class="featured_text">
              <p class="sub">{props.name}</p>
              <p class="price">{props.Proudct_Price} L.E.</p>
            </div>
            <div class="image">
              <img src={props.img} alt=""/>
            </div>
          </div>
          <div class="half">
          <div class="featured_text">
              <p class="sub second">Product Description</p>
            </div>
            <div class="description">
              <p>{props.description}</p>
            </div>
            <span class="stock"><i class="fa fa-pen"></i> In stock</span>
            <div class="reviews">
              <ul class="stars">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star-o"></i></li>
              </ul>
              <span>(64 reviews)</span>
            </div>
          </div>
        </div>
        <div class="card__footer fake">
        </div>
      </div>
    );
}

export default Product;