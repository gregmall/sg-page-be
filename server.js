const express = require("express");
const app = express();
const cors = require('cors');
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51PT6bf2MmEPWo5ZY2MVQa7zmgq6tf6Np77Uc3u4mNUTt0YEWnwk2koQQou8tUeFoPmYD0wXEmFBF2DarYuflmPAJ00sNnlgALf');
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
const PORT = process.env.PORT || 7890;

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  console.log('hi')
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT} and go fuck yourself asshole`);
});