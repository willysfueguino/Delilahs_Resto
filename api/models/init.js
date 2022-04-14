//console.log('Información de Ambiente: ' + process.env.NODE_ENV);

// carga de información adicional
const usuarios  = require("./usuarios");
const  productos = require("./productos");
const pedidos = require("./pedidos");
const MediosDePago  = require("./mediosDePago");



/*  *********************** FORMAS DE PAGO************************ */
async function CrearMediosDePago(){
  try{
  MP1 = new MediosDePago({codigo: "EF", descripcion: "Efectivo"})
  await MP1.save()
  MP2 = new MediosDePago({codigo: "TCRED", descripcion: "Tarjeta de Crédito"}),
  await MP2.save()
  MP3 = new MediosDePago( {codigo:"TDEB", descripcion: "Tarjeta de Débito"}),
  await MP3.save()
  MP4 = new MediosDePago({codigo: "MP", descripcion: "MercadoPago"})
  await MP4.save()

  console.log(`Los medios de pago de muestra se crearon satisfactoriamente`);

  } catch(err){
    console.log(err)
  } 
}

//console.log('Información de Formas de Pago cargada correctamente.', formasDePago);

/*  ************************* USUARIOS *************************** */
async function createAdmin(){
try {
  const nAccount = new usuarios({ 
    nombre: "admin",
    apellido: "admin",
    nacimiento: "5/31/1934",
    email: "adm@adm",
    direccion: 'elnelew 123',
    telefono: '3243422',
    pais: "ARG",
    pass: "DeLiLaHs",
    isAdmin: true,
    borrado: false });
  await nAccount.save();
  console.log(`El admin fue creado satisfactoriamente`);
} catch (error) {
  if(error){
    console.log(error)
  }
}}

async function createUser(){

  try {
        const nAccount = new usuarios({ 
          "nombre": "Coco",
          "apellido": "Argento",
          "nacimiento": "12/12/1983",
          "email": "cocoargento@gmail.com",
          "pais": "Argentina",
          "pass": "cocoargento",
          "direccion": "San Martin 2323",
          "telefono": "dsnoasd"
        })
    await nAccount.save()
    console.log(`El usuario demo fue creado satisfactoriamente`);
    } catch (error) {
      console.log(error)
  }}
  

/*  ************************* PRODUCTOS *************************** */
async function crearProductos(){
          try {
              if (process.env.NODE_ENV !== "production") {
                hamburguesa1 = new productos({
                  codigo: "HB1",
                  nombre: "Hamburguesa Clasic",
                  descripcion: "Hamburguesa clásico con JyQ",
                  tipo: "Comida",
                  tamanio: "Tamaño Normal",
                  precio:"349.99",
                  stock: "100"
                });
                await hamburguesa1.save()

                hamburguesa2 = new productos({
                  codigo: "HB2",
                  nombre: "Hamburguesa Verde",
                  descripcion: "Hamburguesa en base a vegetales",
                  tipo: "Comida",
                  tamanio: "Tamaño Normal",
                  precio: "399.99",
                  stock: "250"
                });
                await hamburguesa2.save()

                hamburguesa3 = new productos({
                  codigo: "HB3",
                  nombre: "Hamburguesa Power",
                  descripcion: "Hamburguesa con JyQ, tomate, cebolla caramelizada y panceta",
                  tipo: "Comida",
                  tamanio: "Tamaño Normal",
                  precio: "449.99",
                  stock: "60"
                });
                await hamburguesa3.save()

                ensaladaCesar = new productos({
                  codigo: "EC",
                  nombre: "Ensalada César",
                  descripcion: "Ensalada César",
                  tipo: "Comida",
                  tamanio: "Tamaño Normal",
                  precio: "566.99",
                  stock: "20"
                });
                await ensaladaCesar.save();

                cocaGrande = new productos({
                  codigo: "CocaGde",
                  nombre: "Botella Coca Cola",
                  descripcion: "Botella Coca Cola 1.5 Litros",
                  tipo: "Bebida",
                  tamanio: "1,5 Litros",
                  precio: "566.99",
                  stock: "20"
                });
                await cocaGrande.save();
              }
                

            console.log(`Los productos de muestra se crearon satisfactoriamente`);
          } catch (error) {
            console.log(error);
        }
  }


// console.log('Información de productos cargada correctamente.', productos.find())

/*  ************************* PEDIDOS *************************** */

async function createPedidosDemo(){
  
  let productoElegido = await productos.findOne({codProducto:'HB3'}).select({ 'codigo':1, 'nombre':1});
  //console.log(productoElegido.nombre)
  try{
    let pedido1 = new pedidos({
      email: 'cocoargento',
      productos: {
      codProducto: "HB3",
      nombre: productoElegido.nombre,
      cantidad: 3 },
      direccion: "La casa de Moni 321",
      formaPago: "EF",
      estado: "PEN",
      total: productoElegido.precio 
     });
  
     pedido1.save()
     console.log("El pedido de muestra fue creado exitosamente.")

    } catch(err){
      console.log("createPedidosDemo error: " + err.message)
    }

}
//createPedidosDemo()
// console.log('Información de pedidos cargada correctamente.', pedidos.find())

//************************** VERIFICAR DATOS INICIALES **************** */

async function VerificarDatosIniciales() {
  try{
        let existeUsuarioDemo = await usuarios.findOne({email: 'cocoargento@gmail.com'})
  
        if( existeUsuarioDemo === null) {
          try {
            createUser()
            
            } catch(err){
              console.log(err)
            }
        }

        let adminExiste = await usuarios.findOne({isAdmin: true})
                                  //COMPARAR OBJETO MONGOOSE CON STRING PASADO POR EL BODY
        JSON.stringify(adminExiste)
        //console.log(adminExiste)

        if (adminExiste === null ){
          try {
            createAdmin()
            } catch(err){
              console.log(err)
            }  
        }

        let ProductosExisten = await productos.find({$and: [{ "__v": {$eq: '0'}}]},{ codigo:1, nombre:1, descripcion:1, tamanio:1, precio:1,  '_id': false})
        //COMPARAR OBJETO MONGOOSE CON STRING 
        // JSON.stringify(ProductosExisten)
        // console.log(ProductosExisten)

        if (ProductosExisten.length < 1){
          try {
            crearProductos()
            } catch(err){
              console.log(err)
            }
        }

        let pedidosExisten = await pedidos.find()
        //COMPARAR OBJETO MONGOOSE CON STRING 
        // JSON.stringify(ProductosExisten)
        //console.log(pedidosExisten.length)

        if (pedidosExisten.length < 1){
            try {
              setTimeout(createPedidosDemo, 3000)
              
              } catch(err){
                console.log(err)
              }
            }

        let MediosDePagoExisten = await MediosDePago.find()
        //COMPARAR OBJETO MONGOOSE CON STRING 
        // JSON.stringify(ProductosExisten)
        // console.log(ProductosExisten)

        if (MediosDePagoExisten.length < 1){
        CrearMediosDePago()
        }


      }
  catch(err){
    console.log(err)
  }
}

VerificarDatosIniciales()

