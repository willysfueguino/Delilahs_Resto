const assert = require('chai').assert;
const fetch = require('node-fetch');
const urlAPI = 'http://localhost:5000/api/usuario';

describe("", (req,res) => {
  it("2. API Signup : Creacion correcta de usuario", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "nombre": "PEpito",
        "apellido": "Grillo",
        "nacimiento": "5/31/1882",
        "email": "pinocho@gmail.com",
        "direccion": 'la tierra del nunca jamas 123',
        "telefono": '0821389231',
        "pais": "GeppetoLand",
        "pass": "pepito"
      }),
    })
    //.then(responseApi => responseApi.json())
    .then(data =>{
        assert.strictEqual(data.status, 201, 'HttpStatus esperado: 201');
        //expect(res.statusCode).to.equal(201);
        //expect(res).to.have.property('body');
        //expect(res.body).to.equal('wrong header');
    })
  });
})
