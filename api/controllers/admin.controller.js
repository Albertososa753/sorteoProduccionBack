const Admin = require("../model");
const { generateToken } = require("../auth/tokens");

exports.registerAdmin = (req, res) => {
  Admin.create(req.body).then((admin) => {
    res.send(admin).status(201);
  });
};

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  Admin.findOne({ where: { email } }).then((admin) => {
    if (!admin) return res.sendStatus(401);
    admin.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        name: admin.name,
        email: admin.email,
      };

      const token = generateToken(payload);

      res.cookie("token", token);
      res.send(payload);
    });
  });
};

exports.meAdmin = (req, res) => {
  res.send(req.user);
};

exports.logoutAdmin = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};
