const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
exports.Login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Wrong email" });
    }

    const isvalid = await bcrypt.compare(password, user.password);

    if (!isvalid) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const secrete_key = process.env.SECRETE_KEY

    const token = jwt.sign({ id: user._id, name: user.name }, secrete_key, { expiresIn: "1h" });

    res.status(200).json({ token ,user:user.name});
  } catch (error) {
    console.log(error);
  }

};
exports.Register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashPassword,
  });

  const isRegister = await newUser.save();
  if (isRegister) {
    res.status(200).json({ message: "User Register successfully" });
  }
};


exports.forgotPass = async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aakashnp241002@gmail.com',
      pass: 'ybhu hilx ziug ivyp',
    },
  });
  const mailOptions = {
    from: 'aakashnp241002@gmail.com',
    to: email,
    subject: 'Reset Your Password for AffWordTask',
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="color: #2c3e50;">Reset Your Password</h1>
          <p>Hi there,</p>
          <p>We received a request to reset the password for your <strong>Sovereign</strong> account. If you didn’t make this request, you can safely ignore this email.</p>
          <p>To reset your password, click the link below:</p>
          <a href="http://localhost:3000/updatepass/${email}" 
             style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #3498db; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
          <p><a href="http://localhost:3000/updatepass/${email}" style="color: #3498db;">
            http://localhost:3000/updatepass/${email}
          </a></p>
          <p style="margin-top: 20px;">This link will expire in 24 hours for your security.</p>
          <p>Thank you,<br>The <strong>Sovereign</strong> Team</p>
        </div>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error occurred:', error);
    }
    res.status(200).json({ success: true, msg: `link send to the  ${email}` });
  });
}

exports.UpdatePass = async (req, res) => {

  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not exists" });
    }

    hashPassword = await bcrypt.hash(newPassword, 10);

    const isupdate = await User.updateOne({ email }, { password: hashPassword });

    if (isupdate.acknowledged) {
      res.status(200).json({ message: "Password Change successfully" });
    }
  } catch (error) {
    console.log("Internal server error in update password");
  }

}
