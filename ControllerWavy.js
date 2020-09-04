const axios = require('axios').default;

module.exports.dadosSMS = (event) => {
    //console.log("Este é o evento: ", event)
    return new Promise((resolve, reject) =>{
        event.body = JSON.parse(event.body)

        let endpoint = "https://api-messaging.movile.com/v1/send-sms"

        const headers = { 
            headers: {
                "Content-Type": "application/json",
                "authenticationtoken": event.queryStringParameters.token,
                "username": event.queryStringParameters.user
            }, 
    }
        axios.post('https://api-messaging.movile.com/v1/send-sms', {
            destination: event.body.to.replace(/[^\d]/g, ""),
            messageText: event.body.text 
    }, headers)
        .then(function(res){
            // console.log("Sucesso!")
            console.log(res.data)
            let dadosSMS = res
            return resolve({
                dadosSMS: dadosSMS
            })
        }).catch(function (err) {
            console.log("Erro function dadosSMS: ", err)
            return reject (err);
        });
})
}
