const express = require('express')
const {WebhookClient} = require('dialogflow-fulfillment')
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.send("Server Is Working......")
})

/**
* on this route dialogflow send the webhook request
* For the dialogflow we need POST Route.
* */
app.post('/webhook', (req, res) => {
    // get agent from request
    let agent = new WebhookClient({request: req, response: res})

    // create intentMap for handle intent
    let intentMap = new Map();

    // add intent map 2nd parameter pass function
    intentMap.set('Default Welcome Intent', welcomeHandler)
    intentMap.set('get-agent-name', getAgentNameHandler)
    intentMap.set('get_credit_card_Bill', getCreditCardBill)

    // now agent is handle request and pass intent map
    agent.handleRequest(intentMap)
})

function welcomeHandler(agent) {
    agent.add(`Welcome to my agent!`);
}

function getAgentNameHandler(agent) {
    agent.add('From fulfillment: My name is Dialogflow!');
}

function getCreditCardBill(agent) {
    agent.add('Your minimum payment due on your card is $200 and your full payment due is $500.  Is there anything else can I help you with?');
}

/**
* now listing the server on port number 3000 :)
* */

const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
})