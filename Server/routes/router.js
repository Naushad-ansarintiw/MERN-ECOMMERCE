const express = require('express');
const router = express.Router();
const Products = require('../models/productsSchema');
const USER = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authentication');

// get productsdata api to get the data
router.get('/getproducts', async (req, res) => {
  try {
    const productdata = await Products.find();
    res.status(200).json(productdata);
  } catch (error) {
    res.send(400).json(productdata);
    console.log(error);
  }
});

// getting the individual data 
router.get('/getproductsone/:id', async (req, res) => {
  try {
    var { id } = req.params;
    // console.log(id);
    const individualdata = await Products.findOne({ id });
    // console.log(individualdata);
    res.status(201).json(individualdata);
  } catch (error) {
    res.send(400).json(individualdata);
    console.log(error.message);
  }
})

// register data for userSign-Up

router.post('/register', async (req, res) => {
  // console.log(req.body);

  const { fname, email, number, password, cpassword } = req.body;
  console.log({ fname, email, number, password, cpassword });

  if (!fname || !email || !number || !password || !cpassword) {
    res.status(422).json({ error: "fill the all data" })
    console.log('Not data available');
  };

  try {
    const preuser = await USER.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: 'this user is already present' });
    } else if (password !== cpassword) {
      res.status(422).json({ error: 'password and cpassword not match' });
    } else {
      const finalUser = new USER({
        fname, email, number, password, cpassword
      });

      // using bcryptjs to hash the password 

      // password hasing process

      const storedata = await finalUser.save();
      // console.log(storedata);

      res.status(201).json(storedata);
    }

  } catch (error) {
    console.log(error.message);
  }
})

//Login User api

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //  console.log({email,password});

  if (!email || !password) {
    res.status(400).json({ error: 'Fill the all details' });
  };

  try {
    const userlogin = await USER.findOne({ email: email });
    console.log(userlogin);
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      console.log(isMatch);
      // console.log('hods');

      if (!isMatch) {
        res.status(400).json({ error: "invalid detalis" });
      } else {
        // Token generate and cookies 
        const token = await userlogin.generateAuthToken();
        // console.log(token);

        // Generate the cookie 
        res.cookie('Amazonweb', token, {
          maxAge: 2000000000000000,
          httpOnly: true,
          secure: false,
          path: '/',
          domain: 'localhost'
        });
        res.status(200).json({ message: "password match" })
      }
    } else {
      res.status(400).json({ error: 'invalid details' });
    }
  } catch (error) {
    res.status(400).json(error);
  }
})

// adding the data into cart 

router.post('/addcart/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const cart = await Products.findOne({ id: id });
    console.log(cart + 'cart value');

    const UserContact = await USER.findOne({ _id: req.userID })
    console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: 'invalid User' });
    }

  } catch (error) {
    res.status(401).json({ error: 'invalid User' });
  }
});

// get cart details

router.get('/cartdetails',authenticate,async(req,res)=>{
  try {
     const buyuser = await USER.findOne({_id: req.userID});
     res.status(201).json(buyuser);
  } catch (error) {
    console.log('error' + error);
  }
})


// get valid user 

router.get('/validuser',authenticate,async(req,res)=>{
  try {
    const validuserone = await USER.findOne({_id: req.userID});
    res.status(201).json(validuserone);
 } catch (error) {
   console.log('error' + error);
 }
})

// remove item from cart 
router.delete('/remove/:id',authenticate,async(req,res)=>{
  try {
    const {id} = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((currentValue)=>{
       return currentValue.id != id;
    });
    req.rootUser.save();
    res.status(201).json(req.rootUser);
  } catch (error) {
    res.status(400).json(req.rootUSer);
    console.log('error' + error);
  }
})


// for user logout

router.get('/logout',authenticate,(req,res)=>{
  try {
    // console.log("Logoout KJSdlfj " + req.rootUser);
    req.rootUser.tokens  = req.rootUser.tokens.filter((currentElement)=>{
      // console.log(currentElement);
        return currentElement.token !== req.token;
    });

    res.clearCookie('Amazonweb',{path:"/"});

    req.rootUser.save();

    res.status(201).json(req.rootUser.tokens);
    console.log("user logout "+ message);
  } catch (error) {
    console.log("error for user logout " + error);
  }
})



module.exports = router;