const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = class ThoughtController {
    static async showThoughts(req, res) {
        res.render('thoughts/home')
    }

    static async dashboard(req, res) {

        const userId = req.session.userId

        const user = await User.findOne({
            where: { id: userId },
            include: Thought,
            plain: true,
        })

        if (!user) {
            res.redirect('/login')
        }

        const thoughts = user.Thoughts.map((result) => result.dataValues)

        let emptyThoughts = false

        if(thoughts.length === 0){
            emptyThoughts = true
        }

        res.render('thoughts/dashboard', { thoughts, emptyThoughts })
    }

    static createThought(req, res) {
        res.render('thoughts/create')
    }

    static async createThoughtPost(req, res) {
        const userId = req.session.userId

        const user = await User.findOne({ where: { id: userId } })

        if (!user) {
            res.redirect('/login')
        }

        const thought = {
            title: req.body.title,
            UserId: req.session.userId
        }

        await Thought.create(thought)
            .then(() => {
                req.flash('message', 'Thought create succesfully!')
                req.session.save(() => {
                    res.redirect('/thoughts/dashboard')
                })
            })
            .catch((err) => console.log(err))

    }

    static async deleteThought(req, res) {

        const id = req.body.id
        const userId = req.session.userId

        await Thought.destroy({
            where: { id: id, UserId: userId }
        })
            .then(() => {
                req.flash('message', 'Thought delete succesfully!')
                req.session.save(() => {
                    res.redirect('/thoughts/dashboard')
                })
            })
            .catch((err) => console.log(err))

    }
}