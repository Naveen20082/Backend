const express = require("express");
const Router = express();
const User = require("./models/users")


Router.post("/", async (req, res) => {
    const { name, password, cpassword, email, designation } = req.body;
    //checking WHether we got all required fields
    if (!name || !password || !cpassword || !email || !designation) {
        res.json({ error: "Enter all values" })
    }

    try {
        // Checking Whether the email already exists
        const email_exist = await User.findOne({ email: email });
        if (email_exist) {
            return res.status(422).json({ error: "Email already Exist" });
        }

        //Making new User to save to mongo database
        const user = new User({
            name, password, cpassword, email, designation
        });
        
        // Checking whether the password and confirm password are same
        if (password == cpassword) {
            const saved_user = await user.save();
            res.status(201).json({ Message: "Saved to Dtabase", saved_user });
        } else {
            res.status(404).json({ Message: " password donot match" })
        }


    } catch (e) {
        res.status(400).json({Error: "An Unexpected Error Occured", e});
    }
})

Router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(user)
        res.send(users);

    } catch (e) {
        res.status(404).send(e)
    }
})

Router.get("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const user = await User.findOne({ name: name });
        console.log(user);
        res.status(200).send(user)
        // res.send(name)
        // console.log(name)
    } catch (e) {
        res.status(404).send("Not Found")
    }
})
Router.patch("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const find_user = await User.findOne({ name: name });
        if (find_user) {
            console.log("No user Found");
            res.json({ Error: " No User Found" })
        }
        const user = await User.updateOne({ name: name }, req.body);
        if (!user) {
            res.status(404).send("try err")
        } else {
            res.status(200).json({ Succes: "User Updated" })
        }
    } catch (e) {
        res.status(404).send(e)
    }
})
Router.delete("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const user = await User.deleteOne({ name: name });
        if (!user) {
            res.status(404).send("try err")
        } else {
            res.status(200).send(user)
        }
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports = Router;