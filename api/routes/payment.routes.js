const express = require("express");
const { createOrder, receiveWebHook } = require("../controllers/payment.controller");
const router = express.Router();

router.post('/create-order', createOrder);
router.get('/success', (req,res)=>{res.send('success')}) ;
router.get('/pending', (req,res)=>{res.send('pending')})
router.get('/failure', (req,res)=>{res.send('failure')});
router.post('/webhook', receiveWebHook );
router.post('/addParticipant', (req,res)=>{res.send('participante creado')})

module.exports = router;
