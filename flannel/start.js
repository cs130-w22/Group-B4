const {server} = require("./app.js");
const port = 3000;

server.listen(port, () => {
    console.log("server is running!");
});