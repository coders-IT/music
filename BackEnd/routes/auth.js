var jwt = require("jsonwebtoken");
const secret = "94n88N&*&ad4f#45d4N*u;muf$os#fds$%asdf$i";

const fetchUser = (req, resp, next) => {
    try {
        var decoded = jwt.verify(req.body.tokken, secret);
        req.body.id = decoded.id;
        next();
    } catch (error) {
        resp.status(400).json({ error: "Invaild details" });
    }
};

module.exports = fetchUser;
