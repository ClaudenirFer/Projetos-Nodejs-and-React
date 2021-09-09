const mongoose = require('mongoose');

function Conn(url, user, pass, database) {
  mongoose
    .connect(`${url}/${database}`, {
      user: user,
      pass: pass,
      useNewUrlParse: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB has been configured successfully");
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = Conn;
