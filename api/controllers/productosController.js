const productos = require("../models/productos");
const redis = require("async-redis");    
const log = (type, fn) => fn ? () => {
  console.log(`connection to Redis: ${type}`);
} : console.log(`connection to Redis: ${type}`);
let RedisPort = process.env.REDIS_PORT;
let RedisHost = process.env.REDIS_HOST
//console.log(RedisPort + " " + RedisHost)
let client = ""

let connectRedis = async function(){
      
      client = await redis.createClient(RedisPort, RedisHost, {
        retry_strategy: (options) => {
            const {error, total_retry_time, attempt} = options;
            if (error && error.code === "ECONNREFUSED") {
                log(error); // take actions or throw exception
            }
            if (total_retry_time > 1000 * 15) { //in ms i.e. 15 sec
                log('Retry time exhausted'); // take actions or throw exception
            }
            if (options.attempt > 10) {
                log('10 attempts done'); // take actions or throw exception
            }
            console.log("Redis Attempting connection");
            // reconnect after
            return Math.min(options.attempt * 1000, 100); //in ms
        },
    });
    
    client.on('connect', log('connect', true));
    client.on('ready', log('ready', true));
    client.on('reconnecting', log('reconnecting', true));
    client.on('error', log('error', true));
    client.on('end', log('end', true));
}

connectRedis();

exports.findProducts = async function(req, res, next){
    listaProductos = await productos.find({$and: [{ "__v": {$eq: '0'}}]},{ codigo:1, nombre:1, descripcion:1, tamanio:1, precio:1,  '_id': false})

    cachedProducts = await client.get('listaProductos')
    cachedProducts = JSON.parse(cachedProducts)
    //console.log(cachedProducts)
    if(!cachedProducts){      
      await client.set('listaProductos', JSON.stringify(listaProductos), 'EX', '60');
      res.status(200).json(listaProductos)
    } else {
      res.status(200).json(cachedProducts)
    }
    next()
}

exports.createProduct = async function (req,res, next) {
  let {codigo, nombre, descripcion, tipo, tamanio, precio, stock} = req.body;

  if (codigo == undefined || nombre == undefined || tipo == undefined ){
    return res.status(500).send("Datos de producto incompletos o faltantes. ")
  }
  
  let product = new productos({
    codigo: codigo,
    nombre: nombre,
    descripcion: descripcion,
    tipo: tipo,
    tamanio: tamanio,
    precio: precio,
  });
  
  try{
    await product.save()
  
    res.status(201).json("El producto " + product.nombre + " fue creado exitosamente.")
  }
  catch (err){
    res.status(500).send("Error")
  }
}

exports.updateProducts =async function(req, res, next){
  let {codigo, nvocodigo, nombre, descripcion, tipo, tamanio, precio, stock} = req.body;

  try{
    let codigoEncontrado = await productos.findOne( {codigo} )
    if (!codigoEncontrado ){
      return res.status(400).json("Codigo de producto a modificar incorrecto.")
    }
  
    let productoActualizado = await productos.findOneAndUpdate(
        { codigo: codigo },
        { $set: {codigo: nvocodigo,
          nombre: nombre,
          descripcion: descripcion,
          tipo: tipo,
          tamanio: tamanio,
          precio: precio
          }},
          { upsert: true,
            returnNewDocument: true }
        )
  
      return res.status(201).json(`El producto ${codigoEncontrado.nombre} fue modificado exitosamente.`)
    }
    catch(err){
      console.log(err)
      res.status(500).send("Error interno.")
    }
}