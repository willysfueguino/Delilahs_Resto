const express = require("express");
const router = require('express').Router()
const cors = require('cors')
const axios = require('axios').default

router.use(cors())
router.use(express.json())

const ordersURL = 'https://api-m.sandbox.paypal.com/v2/checkout/orders'
const client = process.env.PAYPAL_ID
const secret = process.env.PAYPAL_TOKEN
const auth = { user: client, pass: secret }
 
const currencyCode = 'USD'

router.post('/api/paypal/pay', async (req, res) => {
  try {
    // los datos del usuario de sandbox (comprador)
    const payerData = {
      paypalEmail: 'sb-32h178251263@personal.example.com',
      paypalId: 'XY$8TcU3'
    }
    /**
     * body de postman
{
    "items": [{
        "name": "zapatos deportivos",
        "value": 300,
        "quantity": 3
    }, {
        "name": "pantalones deportivos",
        "value": 100,
        "quantity": 3
    }]
}
     */
    const itemsData = req.body

    let items = []
    let totalValue = 0
    itemsData.items.forEach(item => {
      totalValue = totalValue + (item.value * item.quantity)
      items.push({
        name: item.name,
        unit_amount: {
          currency_code: currencyCode,
          value: item.value.toString(),
        },
        quantity: item.quantity.toString(),
      })
    })

    const data = {
      payer: {
        email_address: payerData.paypalEmail,
        payer_id: payerData.paypalId
      },
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currencyCode,
          value: totalValue.toString(),
          breakdown: {
            item_total: {
              currency_code: currencyCode,
              value: totalValue.toString(),
            },
          }
        },
        items
      }]
    }

    const response = await axios.post(ordersURL, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(response.data)
    const caputreLink = response.data.links.find(link => link.rel === 'capture')

    const responsePayment = await axios.post(caputreLink.href, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(responsePayment.data)
    res.json(responsePayment.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
  
})

module.exports = router