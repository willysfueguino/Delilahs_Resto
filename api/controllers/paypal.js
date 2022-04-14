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
            }
        }],
        application_context: {
            brand_name: `MiTienda.com`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `http://localhost:5000/api/paypal/execute-payment`, // Url despues de realizar el pago
            cancel_url: `http://localhost:5000/api/paypal/cancel-payment` // Url despues de realizar el pago
        }
    }
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, async (err, response) => {
        //console.log("RESPUESTA DESDE PAYPAL ===============================>: ")
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

const executePayment = (req, res) => {
    let token = req.query.token;
    if (!req.query.token){
        token = req.body.token
    }

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const createProduct = (req, res) => {
    const product = {
        name: 'Subscripcion Youtube',
        description: "Subscripcion a un canal de Youtube se cobra mensualmente",
        type: 'SERVICE',
        category: 'SOFTWARE',
        image_url: 'https://avatars.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4'

    }

    //https://developer.paypal.com/docs/api/catalog-products/v1/#products_create
    request.post(`${PAYPAL_API}/v1/catalogs/products`, {
        auth,
        body: product,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const createPlan = (req, res) => {
    const { body } = req
    //product_id

    const plan = {
        name: 'PLAN mensual',
        product_id: body.product_id,
        status: "ACTIVE",
        billing_cycles: [
            {
                frequency: {
                    interval_unit: "MONTH",
                    interval_count: 1
                },
                tenure_type: "REGULAR",
                sequence: 1,
                total_cycles: 12,
                pricing_scheme: {
                    fixed_price: {
                        value: "3", // PRECIO MENSUAL QUE COBRAS 3.30USD
                        currency_code: "USD"
                    }
                }
            }],
        payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: {
                value: "10",
                currency_code: "USD"
            },
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3
        },
        taxes: {
            percentage: "10", // 10USD + 10% = 11 USD
            inclusive: false
        }
    }

    request.post(`${PAYPAL_API}/v1/billing/plans`, {
        auth,
        body: plan,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const generateSubscription = (req, res) => {
    const { body } = req

    const subscription = {
        plan_id: body.plan_id, //P-3HK92642FR4448515MBQHCYQ
        start_time: "2021-11-01T00:00:00Z",
        quantity: 1,
        subscriber: {
            name: {
                given_name: "Leifer",
                surname: "Mendez"
            },
            email_address: "customer@example.com",
        },
        return_url: 'http://localhost/gracias',
        cancel_url: 'http://localhost/fallo'

    }
    request.post(`${PAYPAL_API}/v1/billing/subscriptions`, {
        auth,
        body: subscription,
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
 *    summary: Crear pago de paypal.sionsssfdds
 *    description: Se debe ejecutar el link obtenido mediante navegador para iniciar secion en Paypal y poder ejecutar el pago correctamente.
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


// //--------------------------------- SUBSCRIPCIONES --------------------------------------

// /**
//  * ⚡ Crear producto en PAYPAL
//  */

// router.post(`/create-product`, createProduct)

// /**
//  * ⚡ Crear plan en PAYPAL
//  */

// router.post(`/create-plan`, createPlan)

// /**
//  * ⚡ Crear subscripcion en PAYPAL
//  */

// router.post(`/generate-subscription`, generateSubscription)

module.exports = router