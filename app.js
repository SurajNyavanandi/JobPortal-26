import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESUME_PATH = path.join(
  __dirname,
  "SurajNyavanandi-26R.pdf"
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kanusuraj15@gmail.com",
    pass: "ryxp kwkk rbji itfa",
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// FRESHER EMAIL - NO CHANGES
app.post("/send-fresher-email", async (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || emails.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Emails are required",
      });
    }

    const fileExists = fs.existsSync(RESUME_PATH);

    if (!fileExists) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found",
      });
    }

    for (const email of emails) {
      await transporter.sendMail({
        from: "kanusuraj15@gmail.com",
        to: email,
        subject: "Application for MERN Stack Developer Role - Suraj Nyavanandi",

        html: `
<p>I'm <b>Suraj Nyavanandi</b>, a <b>Fresher MERN Stack Developer</b> with 11 months of hands-on training and production-ready projects.</p>
<p>
<b>Contact:</b> <a href="tel:+919666635009">+91 96666 35009</a><br>
<b>Portfolio:</b> https://virattom.com<br>
<b>E-commerce:</b> https://shop.virattom.com<br>
<b>GitHub:</b> https://github.com/SurajNyavanandi<br>
<b>LinkedIn:</b> https://www.linkedin.com/in/suraj-nyavanandi-305962286<br>
</p>
`,

        attachments: [
          {
            filename: "SurajNyavanandi-Resume.pdf",
            path: RESUME_PATH,
          },
        ],
      });
    }

    return res.json({
      success: true,
      message: "Fresher emails sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send fresher email",
    });
  }
});

// EXPERIENCED EMAIL - Minimalistic
app.post("/send-experienced-email", async (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || emails.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Emails are required",
      });
    }

    const fileExists = fs.existsSync(RESUME_PATH);

    if (!fileExists) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found",
      });
    }

    for (const email of emails) {
      await transporter.sendMail({
        from: "kanusuraj15@gmail.com",
        to: email,
        subject: "Application for MERN Stack Developer Role - Suraj Nyavanandi",

        html: `
<p>Dear Hiring Manager,</p>
<p>I understand you require <b>1+ years of experience</b>.</p>
<p>I don't have professional experience yet, but I have <b>11 months of rigorous training</b> with production-ready projects.</p>
<p><b>I humbly request you to consider my profile as a fresher.</b></p>
<p>
<b>Contact:</b> <a href="tel:+919666635009">+91 96666 35009</a><br>
<b>E-commerce:</b> https://shop.virattom.com<br>
<b>Portfolio:</b> https://virattom.com<br>
<b>GitHub:</b> https://github.com/SurajNyavanandi<br>
<b>LinkedIn:</b> https://www.linkedin.com/in/suraj-nyavanandi-305962286<br>
</p>
`,

        attachments: [
          {
            filename: "SurajNyavanandi-Resume.pdf",
            path: RESUME_PATH,
          },
        ],
      });
    }

    return res.json({
      success: true,
      message: "Experienced emails sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send experienced email",
    });
  }
});

// FRESHER WHATSAPP - NO CHANGES
app.post("/send-fresher-whatsapp", async (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({
        success: false,
        message: "Number is required",
      });
    }

    const cleanedNumber = number.replace(/\D/g, "");

    const message = `Hi,

I'm Suraj Nyavanandi,

*FRESHER MERN STACK DEVELOPER*

Portfolio: https://virattom.com
GitHub: https://github.com/SurajNyavanandi
LinkedIn: https://www.linkedin.com/in/suraj-nyavanandi-305962286
`;

    const whatsappURL = `https://wa.me/91${cleanedNumber}?text=${encodeURIComponent(
      message
    )}`;

    return res.json({
      success: true,
      message: "Fresher WhatsApp link generated",
      url: whatsappURL,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate fresher WhatsApp link",
    });
  }
});

// EXPERIENCED WHATSAPP - Minimalistic
app.post("/send-experienced-whatsapp", async (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({
        success: false,
        message: "Number is required",
      });
    }

    const cleanedNumber = number.replace(/\D/g, "");

    const message = `Hi,

I'm Suraj Nyavanandi.

I understand you need 1+ years experience.

I don't have professional experience yet, but I have 11 months of rigorous training with production-ready projects.

Please consider my profile as a fresher.

Portfolio: https://virattom.com
GitHub: https://github.com/SurajNyavanandi
LinkedIn: https://www.linkedin.com/in/suraj-nyavanandi-305962286
`;

    const whatsappURL = `https://wa.me/91${cleanedNumber}?text=${encodeURIComponent(
      message
    )}`;

    return res.json({
      success: true,
      message: "Experienced WhatsApp link generated",
      url: whatsappURL,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate experienced WhatsApp link",
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n✓ Server running on http://localhost:${PORT}\n`);
});