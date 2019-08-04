/**
 * @author werachon phunta
 * @desc A sample project
 */
const server = require('express');
const PORT = process.env.PORT || 9999;
const request = require('request');
const bodyParser = require('body-parser');

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ PORT }`))
    // เพิ่มส่วนของ Webhook เข้าไป
    .post('/webhook', function (req, res) {
        let replyToken = req.body.events[0].replyToken;
        let message = req.body.events[0].message.text;
        
        console.log(`Message token : ${ replyToken }`);
        console.log(`Message from chat : ${ message }`);

        lineMessaging.replyMessage(replyToken, message).then(function (rs) {

            console.log(`Reply message result : ${ rs }`);

            res.json({
                status: 200,
                message: `Sent message!`
            });
        });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
