require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connection = require("./config/config");
const subscriptionRouter = require("./routes/corporateSubscription.route");
const OrderRouter = require("./routes/corporateOrder.route");
const corporateUserRouter = require("./routes/corporateUser.route");
const { auth } = require("./middlewares/auth");
const paymentGatewayProxy = require("./middlewares/proxyMiddleware");
const CorporateCartRouter = require("./routes/corporateCart.route");


const app =  express();
app.use(cors({origin:"*"}))
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use("/corporateUser", corporateUserRouter)

app.use('/paymentgateway', paymentGatewayProxy);

app.use(auth)

app.use('/corporateSubscription', subscriptionRouter);

app.use('/corporateOrder', OrderRouter);

app.use("/corporateCart", CorporateCartRouter)

app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("Connected to Mongo Atlas");
    } catch (err) {
      console.log(err)
      console.log("Couldn't connect to Mongo Atlas");
    }
    console.log(`Server started on port ${process.env.port}`);
  });