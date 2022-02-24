const {app} = require("../app.js");
const supertest = require("supertest");
const { idText } = require("typescript");
const request = supertest(app);

it("gets the login endpoint", async done => {
    const res = await request.post("/login");
    console.log(res);
    done();
})