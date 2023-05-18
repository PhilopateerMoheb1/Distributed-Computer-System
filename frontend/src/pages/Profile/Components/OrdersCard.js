import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTrash } from '@fortawesome/free-brands-svg-icons';

export default function OrdersCard(props){
    axios.defaults.withCredentials = true;
    const handleDelete= (event) => {
      axios.post('http://localhost:80/delete',{"PID":props.pid}).then(function (response) {
        window.location = "./orders";
        });
    }

    const handleEdit= (event) => {
      window.location = "./EditListing/"+props.pid;
    }

    return(
        <div>
              <div href="#" class="list-group-item mb-2">
              <div class="row">
                <div class="col col-lg-2">
                  <img src={props.img} alt="" class="img-fluid"/>
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{props.name}</h5>
                    {props.quantity>0? <small>Quantity Left: {props.quantity}</small>:<p style={{"color":"Green"}}>Sold Out!</p>}
                    <div className="edit-delete-container">
                      <a onClick={handleDelete} className="icon-action-listing"><i class="fa-solid fa-trash"></i></a>
                      <a onClick={handleEdit} className="icon-action-listing"><i class="fa-solid fa-pen-to-square"></i></a>
                    </div>
                  </div>
                  <p class="mb-1">Category: {props.category}</p>
                  <small>{props.description}</small>
                </div>
              </div>
            </div>
        </div>

    );

}