const User = require('../models/User')

const getCurrentUserProfile = async (req, res) => {
    res.send(req.user);
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name });

        if (!user) {
            res.status(404).send({ error: 'No user found!' })
        }

        res.json({ user });
    } catch(e) {
        res.status(500).send(e);
    }
};

const createUser = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch(e) {
        res.status(400).send(e);
    }
};

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();

        res.json({ user: req.user });
    } catch(e) {
        res.status(400).send(`Error ${e}`);
    }
};

const deleteUser = async (req, res) => {
    try {
        await req.user.remove();

        res.json({ user: req.user });
    } catch(e) {
        res.status(400).send(`Error ${e}`);
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
   
        res.json({ user, token });
    } catch(e) {
        return res.status(400).send(`Error ${e}`);
    }
};

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send();
    }
};

const logoutAll = async (req, res) => {
    try {
        req.users.tokens = [];
        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send()
    }
};

module.exports = {
    getCurrentUserProfile,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout,
    logoutAll
}