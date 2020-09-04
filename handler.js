'use strict';
const ControllerWavy = require('./ControllerWavy');

module.exports.main = event => {
  let path = event.path;
  // console.log("Este é o evento: ", event)
  return new Promise(async (resolve, reject) => {
    
    try{
      if (path === "/send") {
        let dadosSMS = await ControllerWavy.dadosSMS(event);
        console.log("Sucesso!")
        return resolve({
          statusCode: 200,
          body: JSON.stringify("Sucesso!")
        })
    }
    }catch(e){
      console.log("Erro funcion Main ", e)
      return reject({
        statusCode: 500,
        body: JSON.stringify("Error")
      });
    }
  })
};

module.exports.WavySmsEnqeueLambda = async event => {

  return new Promise(async (resolve, reject) => {
      try {
          event.body = JSON.parse(event.body);
          event.body.route = event.path;

          console.log(event.body);

          let response = await controllerSQS.sendMessage(0, event.body, event.path, sqsendpoint);

          console.log('RESPONSE', response);

          return resolve({
              statusCode: 200,
              body: JSON.stringify(
                  {
                      message: 'Enqeued!',
                      input: response
                  },
                  null,
                  2
              ),
          });
      } catch (e) {
          console.log(`Error:`);
          console.log(e);

          return reject({
              statusCode: 500
          });
      }
  });
};