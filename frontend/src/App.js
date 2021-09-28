import React from 'react';
import ReactDom from 'react-dom';
import axios from "axios";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {handling: "",
                  name: "",
                  email: "",
                  phone: "",
                  address: "N/A",
                  lechon: "",
                  siomai: "",
                  firstRand: Math.floor(Math.random() * 5) + 1,
                  secondRand: Math.floor(Math.random() * 5) + 1,
                  validation: 0
                };
   }

   componentDidMount(){

     document.getElementById("validation-label").innerHTML = "VALIDATION: " + this.state.firstRand + " * " + this.state.secondRand;
   }

   changeHandler = (event) => {

     let stateName = event.target.name;
     let stateValue = event.target.value;
     if (stateName == "lechon" || stateName == "siomai"){

        this.setState({[stateName] : stateName.toUpperCase() + " x" + stateValue });
     }

     else if (stateName == "validation"){

       this.setState({[stateName] : stateValue});
     }

     else{

       this.setState({[stateName] : stateName.toUpperCase() + ": " +stateValue.toUpperCase()});
     }
   }

   submitForm = (event) => {

     event.preventDefault();

     let solution = this.state.firstRand * this.state.secondRand;

     if(solution != this.state.validation){

       alert("VALIDATION INCORRECT. PLEASE ANSWER ONCE AGAIN");
     }

     else{

       try{
         axios.post("http://localhost:4000/submitform", this.state)
               .then((resp) => {

                 console.log(resp)
                 let i = "";
                 for(i in this.state){

                    if ((i != "validation") && (i != "firstRand") && (i != "secondRand")){
                      let header = document.createElement("h4");
                      let text = document.createTextNode(this.state[i]);
                      header.appendChild(text);
                      document.getElementById("confirmation").appendChild(header);
                    }
                 }

                 document.getElementById("order-form").reset();
                 document.getElementById("order-form").style.display = "none";
                 document.getElementById("confirmation").style.display = "block";
               }, (err) => {

                 console.log("Something went wrong with post", err)
                 alert("SOMETHING WENT WRONG WITH YOUR REQUEST. PLEASE TRY AGAIN LATER.")
                 document.getElementById("order-form").reset();
               });
       }
       catch(err){
         console.log("Something went wrong with axios", err);
       }

       /*let i = "";

       for(i in this.state){

          if ((i != "validation") && (i != "firstRand") && (i != "secondRand")){
            let header = document.createElement("h4");
            let text = document.createTextNode(this.state[i]);
            header.appendChild(text);
            document.getElementById("confirmation").appendChild(header);
          }
       }

       document.getElementById("order-form").reset();
       document.getElementById("order-form").style.display = "none";
       document.getElementById("confirmation").style.display = "block";*/
     }
   }

  render(){

    return(
      <div className = "body" id = "menu">
        <div className = "banner">
          
        </div>
        <form id = "order-form" onSubmit = {this.submitForm}>
          <h1>ORDER HERE OR DM US</h1><br/>
          <div id = "handling">
            <label htmlFor = "pickup">PICK UP</label>
            <input type = "radio" id = "pickup" value = "PICK UP"
            name = "handling" onChange = {this.changeHandler} required/>
            <label htmlFor = "delivery">DELIVERY</label>
            <input type = "radio" id = "delivery" value = "DELIVERY"
            name = "handling" onChange = {this.changeHandler} required/>
          </div>
          <div id = "order">
            <label htmlFor = "name">NAME</label>
            <input type = "text" id = "name" name = "name" placeholder = "ie John Doe"
            onChange = {this.changeHandler} required/>
            <label htmlFor = "email">EMAIL ADDRESS</label>
            <input type = "email" id = "email" name = "email" placeholder = "ie email@email.com"
            onChange = {this.changeHandler} required/>
            <label htmlFor = "phone">PHONE</label>
            <input type = "tel" id = "phone" name = "phone" placeholder = "ie 123-456-7891"
            pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange = {this.changeHandler} required/>
            <label htmlFor = "address">ADDRESS</label>
            <input type = "text" id = "address" name = "address" placeholder = "ie 10-11 12th Ave, NY, NY 12345"
            maxLength = "50" onChange = {this.changeHandler} required/>
            <label htmlFor = "siomai">SIOMAI</label>
            <input type = "number" id = "siomai" min = "0"
            name = "siomai" onChange = {this.changeHandler}/>
            <label htmlFor = "lechon">LECHON</label>
            <input type = "number" id = "lechon" min = "0"
            name = "lechon" onChange = {this.changeHandler}/>
            <label htmlFor = "validation" id = "validation-label">VALIDATION</label>
            <input type = "text" id = "validation" name = "validation" placeholder = "Please answer before submission"
            onChange = {this.changeHandler} required/>
            <input type = "submit" value = "SUBMIT ORDER"/>
          </div>
        </form>
        <div id = "confirmation">
          <h2>Thank you!</h2>
          <h2>We will call or email to confirm your order.</h2><br/>
          <h3><u>ORDER DETAILS</u></h3>
        </div>
      </div>
    );
  }
}

export default App;
