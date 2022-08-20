const express = require("express");
const router = express.Router();
const User = require("../model/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")



router.get("/get/all", async (req, res) => {
    try {
        const user = await User.find().lean().exec();

        return res.status(200).send(user);

    }
    catch (err) {
        return res.status(400).send({ err: err.message })
    }
})


router.get("/get/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();

        return res.status(200).send(user);

    }
    catch (err) {
        return res.status(400).send({ err: err.message })
    }
})




router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;

        let user = await User.findOne({ email: { $eq: email } }).lean().exec();

        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {

                if (result === false) {
                    return res.status(400).send({ error: "Please try to login with correct credentials" })
                } else {
                    const data = {
                        user: {
                            id: user._id
                        }
                    }
                    const jwtSecret = "nehasen@newsecret";
                    const auth_token = jwt.sign(data, jwtSecret)
                    return res.status(200).send({ authtoken: auth_token, user: user });
                }
            })
        } else {
            const jwtSecret = "nehasen@newsecret";
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                password: secPass,
                type: req.body.type,
                email: req.body.email
            })

            const data = {
                user: {
                    id: user._id
                }
            }

            const auth_token = jwt.sign(data, jwtSecret)

            return res.status(200).send({ authtoken: auth_token, user: user });
        }

    }
    catch (err) {
        return res.status(400).send({ err: err.message })
    }
})

module.exports = router;