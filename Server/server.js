const app = require("./src/app/app");
const config = require("./src/config/config");
const ConnectDb = require("./src/config/db");


ConnectDb()
app.listen(config.PORT , ()=>{
    console.log("Server is running on port")
})