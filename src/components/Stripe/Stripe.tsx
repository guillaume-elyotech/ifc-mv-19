import * as React from "react";
import { useState ,useMemo, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Order } from "../../data/models";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


import {
  IonInput,
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonText,
  useIonAlert,
  IonAlert
} from "@ionic/react";
import "./Stripe.css";


import * as selectors from "../../data/selectors";
import { connect } from '../../data/connect';
import { CountryRegionData } from 'react-country-region-selector';
import { useHistory } from "react-router-dom";


import { Country}  from 'country-state-city';
import { OrderPageMethods, updateMyOrder } from "../../Firebase/FirebaseApi";
import { RouteComponentProps} from "react-router";

import { doc, setDoc,updateDoc } from "firebase/firestore"; 
import {db} from '../../Firebase/Firebase';


interface CheckoutStripeProps {
  currentOrder: Order;

}

const CheckoutStripe: React.FC<CheckoutStripeProps> = ({ currentOrder }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const [typeorder, setTyperOrder] = useState("");
  const [mycardbrand, setMycardbrand] = useState("");
  const [city, setCity] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();


  const useOptions = () => {
    
    const Myoptions = useMemo(
      () => ({
        style: {
          base: {
            fontSize:'18px',
            color: "#424770",
            letterSpacing: "0.025em",
            fontWeight: '500',
            width: "100%",
           paddingBottom: "10px",
            fontFamily: "",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#9e2146"
          }
        }
      }),
      []
    );
  
    return Myoptions;
  };

  const options = useOptions();

  const setCityCountry = (vcity:string) => {
    if(vcity) {
      setCity(vcity);
    }
  }


 

  console.log("My current Order is :",currentOrder);


  var amounteaching = currentOrder?.totalamount;
  
  amounteaching = amounteaching * 100;
  let thecurrency = currentOrder?.currency;
  let orderNum = currentOrder?.orderid;

   const mycountry = (Country.getAllCountries())
   console.log(mycountry)
   
   const [showAlert1, setShowAlert1] = useState(false);
  
  const handleSubmit = async (event:any) => {
  
    event.preventDefault();

    setProcessing(true);
    const types =  currentOrder?.orderitems[0].type
    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      
      type: "card",
      
      card: elements?.getElement(CardNumberElement)!,
    
      billing_details: {
        address: {
          city: city,
          country: country,
          line1: adress,
          postal_code: PostalCode,
          state: country,
        },
        email: email,
        name: gender +  ' ' + lastName + ' ' + name,
        phone: phone,
      },
    });
    
    if (!error) { 
      console.log("Token Generé : ", paymentMethod);
      // envoie du token au serveur
      try {
        const  id  = paymentMethod?.id;
        const last4 = "****"+ paymentMethod?.card?.last4;
        const brand = paymentMethod?.card?.brand;

        const response = await axios.post(
          "http://localhost:8080/stripe/charge",
          {
            amount: amounteaching,
            currency : thecurrency,
            id: id,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            name: name,
            last: lastName,
            email: email,
            order:orderNum,
            city:city,
            country:country,
            line1: adress,
            postal_code: PostalCode,
            phone: phone,
            last4:last4,
            brand:brand,
            type:types
          }
        );
        if (response.data.success) {
          console.log("payment réussi");
          console.log("responde data",response.data );

          const strorderId = "" + orderNum + "";
          
          const resultat = await updateMyOrder(strorderId, last4 ,brand,adress,city,country,id)
          setTimeout(function()
          { //
               if(types === "Shopping"){
                history.push(`/tabs/paymentshoppingconfirmation/${currentOrder?.orderid}`);
              }
              else if(types === "Teaching"){
                history.push(`/tabs/paymentteachingconfirmation/${currentOrder?.orderid}`);
              }
              else{
              history.push(`/tabs/paymentdonationconfirmation/${currentOrder?.orderid}`);
              }
           }
           ,5000);
        }
      } catch (error) {
        console.log("erreur", error);
        setShowAlert1(true)
        setMessageAlert(error.message)
      }
    } else {
     setShowAlert1(true)
     setMessageAlert(error.message)
    }
  };



  const changeHandler = (country : any) => {
    setCountry(country)
   
  }

  const handleChange = async (event: any) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

 

  return (
    <>
      <div>
        <form id="payment-form" onSubmit={handleSubmit}>
        {
              // card Alert
        }
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={'Alert'}
          message={messageAlert}
          buttons={[
            {
              text: 'Continue',
              role: 'ok',
              cssClass: 'primary',
              handler: () => {
                console.log('Confirm ok');
              }
            },
            {
              text: 'Cancel',
              role:'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm cancel');
                history.push('/tabs/home')
              }
            }
          ]}
        />
        <div className="cardnum textaligncenter">
                      <label className="labeltext textaligncenter">
              Card number
              </label>
              <CardNumberElement
                options={options}
                
                onReady={(event) => {
                  console.log("CardNumberElement [ready]",event);
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                  setMycardbrand(event.brand);
                  console.log(mycardbrand);
               //   console.log(event.)
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]" );
                }}
                className="input_numbercard boxshadow textaligncenter"
              />
          
                </div>
                
          <div className="nextcard">
  
<label className="labeltext textaligncenter textpadding">
  <label  className="labeltext textaligncenter textpadding paddingtop">
  Expiration date
  </label>
       
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
          className="input_expiry boxshadow"
         
        />
      </label>
          
      <label className="labeltext textpadding">
        
        <label className="labeltext textaligncenter textpadding paddingtop">
        CVC
        </label>
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
          className="input_ccv boxshadow"
        />
      </label>

  </div>
       
  <div className="divider-block"></div>
  <br/>

          <div className="form_user">
              <IonText className="padding10px paddingtop5px labelform">
             <span className="labeltext">
             Full Name
               </span> 
                <IonInput
                  placeholder="Name please"
                  name="name"
                  type="text"
                  value={name}
                  spellCheck={false}
                  autocapitalize="off"
                  onIonChange={(e) => setName(e.detail.value!)}
                  className="name_input boxshadow"
                  autocomplete="given-name"
                  required
                />
              </IonText>
          </div>
          <IonLabel className="padding10px paddingtop5px labelform email_input">
          <span className="labeltext">
          Email
               </span> 
        
          <IonInput
            placeholder="Email please"
            name="email"
            type="email"
            value={email}
            spellCheck={false}
            autocapitalize="off"
            onIonChange={(e) => setEmail(e.detail.value!)}
            className="name_input boxshadow email_input"
            required
          />
          </IonLabel>
          
          

          <div className="adresscode">
          <IonLabel className="padding10px paddingtop5px labelform">
          <span className="labeltext">
          Adress
               </span>
           
          <IonInput
              placeholder="adress please"
              name="adress"
              type="text"
              value={adress}
              spellCheck={false}
              autocapitalize="off"
              onIonChange={(e) => setAdress(e.detail.value!)}
              className="name_input boxshadow"
              required
            />
          </IonLabel>

          </div>

          <div>

          <span className="city_input">

          <IonLabel className="padding10px paddingtop5px labelform"> 
<span className="labeltext">
City
   </span>
  
  <IonInput
    placeholder="city please"
    name="city"
    type="text"
    value={city}
    spellCheck={false}
    autocapitalize="off"
    onIonChange={(e) => setCity(e.detail.value!)}
    required
    className="name_input boxshadow"
  />
  </IonLabel>

<IonLabel className="padding10px paddingtop5px labelform"> 
<span className="labeltext">
Postal Code
   </span>
  
  <IonInput
    placeholder="postal please"
    name="postal"
    type="number"
    value={PostalCode}
    spellCheck={false}
    autocapitalize="off"
    onIonChange={(e) => setPostalCode(e.detail.value!)}
    required
    className="name_input boxshadow"
  />
  </IonLabel>
 
  
</span>

</div>          
<IonLabel className="padding10px paddingtop5px labelform">
          <span className="labeltext">
          Country
               </span>

               <IonSelect value={country} placeholder="country" onIonChange={e => setCountry(e.detail.value)} 
          className="selectgender boxshadow padding10px country_input" >
              {CountryRegionData.map((city, i) => (
                <IonSelectOption value={city[1]}  onChange={(country) => setCountry(city[1])} key={i}>

                  {city[0]} 
              
                  </IonSelectOption>
                  
               ))}
              
            </IonSelect>

          </IonLabel>


          <div className="twoto adresscode paddingbottom5px">
          <IonLabel className="padding10px paddingtop5px labelform">
          <span className="labeltext">
          Phone
               </span>
               <PhoneInput
            country={'us'}
            value={phone}
            onChange={phone => setPhone( phone )}
            inputClass="inputphone boxshadow paddingleft"
          />
          </IonLabel>

            </div>


                <div className="card textaligncenter">
               
           
      

      
  </div>
          

          <button disabled={!stripe} id="submit" type="submit" className="btn_stripe">
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now" +
                " " +
                currentOrder?.totalamount +
                " " +
                currentOrder?.currencycode
              )}
            </span>
          </button>

          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p
            className={succeeded ? "result-message" : "result-message hidden"}
          ></p>
      
        </form>
      </div>
    </>
  );
};

export default React.memo(CheckoutStripe);
    