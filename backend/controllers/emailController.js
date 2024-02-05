import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const sendInviteEmail = async (req, res) => {
    const { email, project, name } = req.body;
    
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.NODEJS_GMAIL_APP_USER,
            pass: process.env.NODEJS_GMAIL_APP_PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'NXB Estimation App',
            link: 'http://localhost:5173/'
            // link: 'http://10.28.81.105:3006/'
        }
    });

    let response = {
        body: {
            name: name,
            intro: 'Welcome to NXB Estimation App! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with NXB Estimation, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Go to NxB Estimation',
                    link: 'http://localhost:5173/'
                    // link: 'http://10.28.81.105:3006/'
                }
            }
        }
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: 'daniyal.nxb@gmail.com',
        to: email,
        subject: 'You are invited to project' + project,
        html: mail,
    };

    transporter.sendMail(message).then((info) => {
        return res.status(201).json(
            {
                msg: "Email sent",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info),
            }
        )
    }).catch((err) => {
        return res.status(500).json({ msg: err });
    }
    );
}