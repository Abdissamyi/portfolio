import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Email configuration
const EMAIL_USER = "abdissamiaibbaali4@gmail.com";
const EMAIL_PASS = "hcbojmzcosyohxge";

// Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// API endpoint for sending email
app.post('/api/send_email', async (req, res) => {
    console.log("Email API called");
    
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    console.log("Received data:", { name, email, message });

    try {
        await transporter.sendMail({
            from: EMAIL_USER,
            to: EMAIL_USER,
            replyTo: email,
            subject: "New message from " + name,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        console.log("Email sent successfully to", EMAIL_USER);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
