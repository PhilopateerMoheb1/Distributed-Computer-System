import React from "react";
import Card from "react-credit-cards";
import swal from 'sweetalert2'
import axios from 'axios';
import SupportedCards from "./Cards";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";

export default class App extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {



    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
        axios.get('http://localhost:80/users')
        .then(function (response) {
        var newBalance =parseInt(response.data[0].Cash_Balance)+parseInt(formData.Tokens);
        let inputs = ["Cash_Balance",newBalance,"Name",response.data[0].Name]
        axios.post('http://localhost:80/transaction',inputs);
  })
      var success = "You've Successfully Bought ";
      var msg = success.concat(formData.Tokens," Tokens!");
      swal.fire(
        'Done!',
        msg,
        'success'
      )


  
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      
      <div key="Payment" class="Payment">
        <div className="App-payment">
          <h1 class="creditH1">Credit Card Form</h1>
          <h4 class="creditH4">Please Fill out The Form in Order to Buy Tokens</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form class="cardForm" ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="form-group">
              <input
                type="Number"
                name="Tokens"
                className="form-control"
                placeholder="Amount of Tokens (Up to 10000 at a time)"
                min = "0"
                max = "10000"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="gotcha form-actions">
            <button  class=" paybutton btn btn-primary btn-lg">Pay</button>
            
            </div>
            
          </form >
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}

          <hr style={{ margin: "30px 0" }} />
          <SupportedCards />
          <script>{
    function openForm() {
      document.getElementById("myForm").style.display = "block";
      }
  }
</script>
        </div>

      </div>
    );
  }
}
