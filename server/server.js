const express = require("express");
const app = express();
require("dotenv").config();
/* const stripe = require("stripe")(
  process.env.REACT_APP_STRIPE_CLIENT_SECRET
);
*/
const stripe = require("stripe")(
  "sk_test_51JRPbGARxeHqlHCs3efVcE4D6dhm11OOKc169nPL55FHCiDZQQWT9rH5xR48WxHY5cYhLlXkErBITAX94zdsHLY700aaFhDwO2"
);

const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


//const test = updateDocument(db,"70000316","15","fr","paris");
//console.log(test)

app.post("/stripe/charge", cors(), async (req, res) => {
  let {
    amount,
    currency,
    id,//pmi
    name,
    last,
    email,
    order, //7m
    city,
    country,
    adress,
    postalcode,
    phone,
    brand,
    last4,
    type
  } = req.body;

  console.log("amount & id:", amount, id);
  
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      description: type + ' by ' + name + ' ' + last + ' ' + order,
      payment_method: id,
      payment_method_types: ["card"],
      confirm: true,
      metadata: {
        order_id: order,
      },
    });
    console.log("Payment Intent Result");
    console.log(payment);

    console.log("Other variables");
    console.log(name);
    console.log(last);
    console.log(order);
    console.log(last4);
    console.log(brand);


    res.json({
      message: "Payment Réussi",
      success: true,
    });

  } catch (error) {
    console.log("erreur : ", error);
    res.json({
      message: "le payment à échoué",
      success: false,
    });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log("le serveur à démarée sur le port : ", port);
});
