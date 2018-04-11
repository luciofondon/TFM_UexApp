const nodemailer = require('nodemailer'),
    path = require('path'),
    config = require('../../config/config');

exports.sendMail = function(email, head, body){
    if (email != undefined  && head != undefined && body != undefined) 
        sendMail(email, head, body);
    else
        console.log("ERROR! El mensaje no ha podido enviarse"); 
}

function sendMail(email, head, body){
    let transporter = nodemailer.createTransport({
        host: config.SERVER_MAIL,
        tls: { rejectUnauthorized:false },
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {            
            user: config.USER_MAIL, 
            pass: config.PASSWORD_MAIL
        }
    });

    let ruta = path.join(__dirname,'../../public/assets/img/uex.png');
    let footer = '<br><p>Mensaje generado por UexApp. Universidad Extremadura.<br> <img src="cid:logogamma.png" height="100"/>'
    let mailOptions = {
        from: config.USER_MAIL,
        to: email,
        subject: head, 
        html: body + footer,
        attachments: [{
            filename: 'logogamma.png',
            path: ruta,
            cid: 'logogamma.png'
        }]
    };


    transporter.sendMail(mailOptions, function(err, info){
    if(err){ 
        console.log("ERROR! El mensaje no ha podido enviarse"); 
    }else{ 
        console.log("INFO! Nuevo mensaje enviado: " + info.response); 
    }
    });      
} 
