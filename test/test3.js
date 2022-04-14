const assert = require('chai').assert;
const fetch = require('node-fetch');
const urlAPI = 'http://localhost:5000/api/usuario';

describe("", () => {
  it("3.API Signup : Existing email", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "nombre": "admin",
        "apellido": "admin",
        "nacimiento": "01/01/2001",
        "email": "adm@adm",
        "direccion": 'la tierra del nunca jamas 123',
        "telefono": '0821389231',
        "pais": "GeppetoLand",
        "pass": "pepito"
      }),
    })
    // .then(responseApi => responseApi.json())
    .then(data =>{

        //should return a status 400, because
        //The email already exists in our databases
        assert.strictEqual(data.status, 400, 'HttpStatus esperado: 400');
    })
  });
});
