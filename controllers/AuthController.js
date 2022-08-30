const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthControler {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        // find user
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            req.flash('message', "Email or Password does not exists")
            res.render('auth/login')

            return
        }

        // check if password match
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            req.flash('message', "Email or Password does not exists")
            res.render('auth/login')

            return
        }

        // initialize session
        req.session.userId = user.id

        req.flash('message', 'Login successfully!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // password match validation
        if (password != confirmpassword) {
            req.flash('message', "Passwords don't match")
            res.render('auth/register')

            return
        }

        // filled fields validation 
        if (name === '') {
            req.flash('message', "Name cannot be empty")
            res.render('auth/register')

            return
        } else if (email === '') {
            req.flash('message', "Email cannot be empty")
            res.render('auth/register')

            return
        } else if (password === '' || confirmpassword === '') {
            req.flash('message', "Password cannot be empty")
            res.render('auth/register')

            return
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash('message', "Email already exists")
            res.render('auth/register')

            return
        }

        // create password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        await User.create(user)
            .then((user) => {

                req.session.userId = user.id

                req.flash('message', 'Registered successfully!')

                req.session.save(() => {
                    res.redirect('/')
                })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}