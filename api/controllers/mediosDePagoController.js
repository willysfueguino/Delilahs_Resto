const MediosDePago = require("../models/mediosDePago")

exports.listarMediosDePago = async function(req, res,next){
    
    let mediosDePago = await MediosDePago.find({$and: [{ borrado: {$eq: 'false'}}]},{ codigo:1, descripcion:1,  '_id': false})

    if (mediosDePago.length < 1){
        return res.status(400).json("No existen medios de pago creados.") 
    } else {
        return res.status(200).json(mediosDePago)
    }
}

exports.listarMediosDePagoAdmin = async function(req, res,next){
    
    let mediosDePago = await MediosDePago.find()

    if (mediosDePago.length < 1){
        res.status(400).json("No existen medios de pago creados.") 
    } else {
        res.status(200).json(mediosDePago)
    }
}

exports.crearMediosDePago = async function(req, res, next){

    let {codigo, descripcion} = req.body;
    //console.log("estoy en crear MDPs")
    try{
            let mpExiste = await MediosDePago.findOne({codigo: codigo})
            //COMPARAR OBJETO MONGOOSE CON STRING PASADO POR EL BODY
            JSON.stringify(mpExiste)
            //console.log(mpExiste)

            if (mpExiste === null ){
                
                let MDP = new MediosDePago({codigo: codigo, descripcion: descripcion})
                await MDP.save()
                res.status(201).json("Medio de pago creado exitosamente.")

            } else{
                res.status(400).json("El medio de pago ya existe.")
            }
    } catch(err){
        console.log(err);
    }
}

exports.eliminarMediosDePago = async function(req, res, next){
    let codigo = req.body.codigo;
    //console.log("estoy en crear MDPs")
    try{
            let mpExiste = await MediosDePago.findOne({codigo})
            //COMPARAR OBJETO MONGOOSE CON STRING PASADO POR EL BODY
            
            //console.log("mpExiste = "+ mpExiste)

            if (mpExiste === null ){
                
                res.status(400).json("El medio de pago no existe o el código ingresado es incorrecto.")

            } else{
                let MDPaBorrar = await MediosDePago.findOne({codigo})
                 //console.log(MDPaBorrar.codigo)
                let MDP = await MediosDePago.findOneAndUpdate(
                    {codigo },
                    ({ $set:  {codigo: MDPaBorrar.codigo, descripcion: MDPaBorrar.descripcion, borrado: 'true' }}),
                    { upsert: true,
                      returnNewDocument: true }
                    )
                await MDP.save()
                res.status(201).json("El medio de pago fue eliminado correctamente.")
            }
    } catch(err){
        console.log(err);
    }
}

exports.modificarMediosDePago = async function(req, res, next){
    let {codigo, nvoCodigo, descripcion} = req.body;
    //console.log("estoy en crear MDPs")
    try{
            let mpExiste = await MediosDePago.findOne({codigo})
            //console.log("mpExiste = "+ mpExiste)

            if (mpExiste === null ){
                
                res.status(400).json("El medio de pago no existe.")

            } else{
                let MDPaActualizar = await MediosDePago.findOne({codigo})
                 //console.log(MDPaActualizar.codigo)

                let MDP = await MediosDePago.findOneAndUpdate(
                    {codigo} ,
                    { $set: {codigo: nvoCodigo, descripcion: descripcion, borrado: 'false'}},
                    { upsert: true,
                      returnNewDocument: true }
                    )
                await MDP.save()
                res.status(200).json("El medio de pago fue actualizado correctamente.")
            }
    } catch(err){
        console.log(err);
    }
}