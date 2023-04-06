const { validationResult, matchedData } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../models/User');
const State = require('../models/State')
const bcrypt = require('bcrypt');

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);
         
        //valida email
        const user = await user.findOne({email: data.email});

        if(!user) {
            res.json({error: 'E-mail ou senha errados'})
            return;
        }
        //valida senha

        const match = await bcrypt.compare(data.password, user.passwordHash);

        if(!match){
            res.json({error: 'E-mail ou senha errados'})
            return;
        }
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();
        
        res.json({token, email: data.email});


    },
    signup: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);

        const user = await User.findOne({
            email: data.email
        });
        if (user) {
            res.json({
                error: { email: { msg: 'Email já existe!' } }
            });
            return;
        }
        if (mongoose.Types.ObjectId.isValid(data.state)) {
            const stateItem = await State.findById(data.State);
            if (!stateItem) {
                res.json({
                    error: { state: { msg: 'Estado não existe' } }
                });
                return;
            }
        } else {
            res.json({
                error: { state: { msg: 'codigo de estado invalido' } }
            });
            return;

        }
        const passwordHash = await bcrypt.hash(data.password, 10)

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state,

        });
        await newUser.save();

        res.json({ token })

    },
}
