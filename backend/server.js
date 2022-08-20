const app = require("./src/index");

const connect = require("./src/config/db");

app.listen(process.env.PORT || 5000, async(req, res)=> {
    try{
        await connect();
        console.log("listening on port 5000");
    } 
    catch(err) {
        console.log('err', err)

    }
})