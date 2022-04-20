const router = require('express').Router()
const request = require('request');

const CLIENT = process.env.PAYPAL_ID;
const SECRET = process.env.PAYPAL_TOKEN;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com

const auth = { user: CLIENT, pass: SECRET }

const createPayment = (req, res) => {

    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: { 
                currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: '115'
            },

        }],
        application_context: {
            brand_name: `Delilahs Resto`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `http://localhost:5000/api/paypal/execute-payment`, // Url despues de realizar el pago
            cancel_url: `http://localhost:5000/api/paypal/cancel-payment` // Url despues de realizar el pago
        }
    }

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, async (err, response) => {
        let approved = await response.body.links
        let isApproved
        approved = approved.forEach( (element) => {
            if(element.rel === "approve"){
                return isApproved = element.href
            }  
        })
        if( isApproved !== undefined){

            res.json({Mensaje: "Ingrese al siguiente link para completar el pago", Link: isApproved})
        }
        
    })
}

/**
 * Esta funcion captura el dinero REALMENTE
 * @param {*} req 
 * @param {*} res 
 */
const executePayment = (req, res) => {
    const token = req.query.token; //<-----------

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

/**
 * @swagger
 * /api/paypal/create-payment:
 *  post:
 *    tags: [Paypal]
 *    summary: Crear pago de paypal
 *    description: Se debe ejecutar el link obtenido mediante navegador para iniciar secion en Paypal y poder ejecutar el pago correctamente. Credenciales de usuario para poder crear el pago. Usuario "sb-32h178251263@personal.example.com" . Contraseña "XY$8TcU3"
 *    responses:
 *      '200':
 *       description: Pedido de pago creado exitosamente.
 */

//    http://localhost:3000/create-payment [POST]
router.post(`/api/paypal/create-payment`, createPayment)

/**
 * @swagger
 * /api/paypal/execute-payment:
 *  get:
 *    tags: [Paypal]
 *    summary: Ejecutar pago de paypal.
 *    description: Ejecutar pago de paypal. 
 *    responses:
 *      '200':
 *       description: Pago ejecutado exitosamente.
 */
router.get(`/api/paypal/execute-payment`, executePayment)

module.exports = router