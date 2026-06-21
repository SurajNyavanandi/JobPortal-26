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

app.post("/send-email", async (req, res) => {
  try {
    const { emails } = req.body;

    console.log("\n------ EMAIL REQUEST ------");

    if (!emails || emails.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Emails are required",
      });
    }

    const fileExists = fs.existsSync(RESUME_PATH);

    console.log("Resume Exists:", fileExists);

    if (!fileExists) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found",
      });
    }

    for (const email of emails) {
      console.log("Sending To:", email);

      await transporter.sendMail({
        from: "kanusuraj15@gmail.com",
        to: email,
        subject: "Application for MERN Stack Developer Role - Suraj Nyavanandi",

        html: `
<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
<p>I'm <b>Suraj Nyavanandi</b>, a <b>Fresher MERN Stack Developer</b> with 11 months of hands-on training and production-ready projects.</p>
<p>
<b>Portfolio:</b> https://virattom.com<br>
<b>GitHub:</b> https://github.com/SurajNyavanandi<br>
<b>LinkedIn:</b> https://www.linkedin.com/in/suraj-nyavanandi-305962286<br>
<b>Contact:</b> <a href="tel:+919666635009">+91 96666 35009</a><br>
</p>
</div>
`,

        attachments: [
          {
            filename: "SurajNyavanandi-Resume.pdf",
            path: RESUME_PATH,
          },
        ],
      });

      console.log("✓ Email Sent:", email);
    }

    return res.json({
      success: true,
      message: "Emails sent successfully",
    });

  } catch (error) {
    console.log("\n✗ EMAIL ERROR:\n");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

app.post("/send-whatsapp", async (req, res) => {
  try {
    const { number } = req.body;

    console.log("\n------ WHATSAPP REQUEST ------");

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

Available immediately.

Thanks,
Suraj Nyavanandi
+91-9666635009`;

    const whatsappURL = `https://wa.me/91${cleanedNumber}?text=${encodeURIComponent(
      message
    )}`;

    console.log("WhatsApp URL:", whatsappURL);

    return res.json({
      success: true,
      message: "WhatsApp link generated",
      url: whatsappURL,
    });

  } catch (error) {
    console.log("\n✗ WHATSAPP ERROR:\n");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate WhatsApp link",
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n✓ Server running on http://localhost:${PORT}\n`);
});