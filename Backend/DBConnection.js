const mongoose = require("mongoose")

async function dbConnection() {
    const connectionString = process.env.DB;
    mongoose
      .connect(connectionString)
      .then((obj) => {
        console.log(
          `Connected to ${obj.connection.host} - ${obj.connection.port}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
}
module.exports = dbConnection;