const assert = require('chai').assert;
const fetch = require('node-fetch');
const urlAPI = 'http://localhost:5000/api/usuario';

describe("", () => {
  it("1.API Signup: Falla por faltante de datos", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "nickName": "datosd",
        "firstName": "prueba"
      }),
    })
    
    .then(data =>{

        //should return a status 500, because information is missing
        //to create the new user
        assert.strictEqual(data.status, 400, 'HttpStatus esperado: 400');
    })
  });

//   it("2. API Signup : Creacion correcta de usuario", async () => {
//     await fetch(urlAPI + "/signup", {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         "nombre": "PEpito",
//         "apellido": "Grillo",
//         "nacimiento": "5/31/1882",
//         "email": "pinocho@gmail.com",
//         "direccion": 'la tierra del nunca jamas 123',
//         "telefono": '0821389231',
//         "pais": "GeppetoLand",
//         "pass": "pepito"
//       }),
//     })
//     .then(responseApi => responseApi.json())
//     .then(data =>{
//         console.log(data)
//         //should return a status 201, because
//         //to created the new user
//         assert.strictEqual(data.status, 201, 'One state expected: 201');
//         assert.exists(data.response.token, 'A token is expected in response');
//     })
//   });

//   it("3.API Signup : Existing email", async () => {
//     await fetch(urlAPI + "/signup", {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         "nombre": "admin",
//         "apellido": "admin",
//         "nacimiento": "01/01/2001",
//         "email": "adm@adm",
//         "direccion": 'la tierra del nunca jamas 123',
//         "telefono": '0821389231',
//         "pais": "GeppetoLand",
//         "pass": "pepito"
//       }),
//     })
//     // .then(responseApi => responseApi.json())
//     .then(data =>{

//         //should return a status 400, because
//         //The email already exists in our databases
//         assert.strictEqual(data.status, 400, 'HttpStatus esperado: 400');
//     })
//   });
});
