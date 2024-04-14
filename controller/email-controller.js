import nodemailer from 'nodemailer';

export const email = (req, res, next) => {
    const { id, movie, date, time, seats, email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'gsmtp.gmail.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Booking Confirmation',
        html: `<h1>Booking Confirmation</h1>
               <p>Your booking details:</p>
               <ul>
                  <li>Movie: ${id}</li>
                  <li>Movie: ${movie}</li>
                  <li>Date: ${date}</li>
                  <li>Time: ${time}</li>
                  <li>Seats: ${seats}</li>
               </ul>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }

        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
};
