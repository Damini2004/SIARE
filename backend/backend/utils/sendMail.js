const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInquiryMail = async (data) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,

      to: process.env.ORG_EMAIL,

      subject: `New Contact Inquiry - ${data.subject}`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7;">
          
          <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e5e5e5;">

            <div style="background: #071d4f; padding: 20px;">
              <h2 style="color: #ffffff; margin: 0;">
                New Inquiry Received
              </h2>
            </div>

            <div style="padding: 25px;">

              <table style="width: 100%; border-collapse: collapse;">

                <tr>
                  <td style="padding: 10px 0; font-weight: bold; width: 140px;">
                    Name
                  </td>

                  <td style="padding: 10px 0;">
                    ${data.name}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">
                    Email
                  </td>

                  <td style="padding: 10px 0;">
                    ${data.email}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">
                    Phone
                  </td>

                  <td style="padding: 10px 0;">
                    ${data.phone || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">
                    Subject
                  </td>

                  <td style="padding: 10px 0;">
                    ${data.subject}
                  </td>
                </tr>

              </table>

              <div style="margin-top: 25px;">
                
                <h3 style="margin-bottom: 10px; color: #071d4f;">
                  Message
                </h3>

                <div style="
                  background: #f8f9fc;
                  border: 1px solid #dbe2ef;
                  padding: 15px;
                  border-radius: 8px;
                  line-height: 1.7;
                  color: #333;
                ">
                  ${data.message}
                </div>

              </div>

            </div>

            <div style="
              background: #f3f4f6;
              padding: 15px;
              text-align: center;
              font-size: 12px;
              color: #666;
            ">
              This email was generated automatically from the SIARE contact form.
            </div>

          </div>

        </div>
      `,
    };

    // SEND MAIL
    const info = await transporter.sendMail(mailOptions);

    // SUCCESS LOG
    console.log("====================================");
    console.log("MAIL SENT SUCCESSFULLY");
    console.log(info.response);
    console.log("====================================");

    return info;
  } catch (error) {
    console.log("====================================");
    console.log("MAIL SENDING FAILED");
    console.log(error);
    console.log("====================================");

    throw error;
  }
};

module.exports = sendInquiryMail;