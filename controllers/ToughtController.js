const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req, res) {

        const userId = req.session.userId

        const user = await User.findOne({
            where: { id: userId },
            include: Tought,
            plain: true,
        })

        if (!user) {
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result) => result.dataValues)
        console.log(toughts)

        res.render('toughts/dashboard', { toughts })
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtPost(req, res) {
        const userId = req.session.userId

        const user = await User.findOne({ where: { id: userId } })

        if (!user) {
            res.redirect('/login')
        }

        const tought = {
            title: req.body.title,
            UserId: req.session.userId
        }

        await Tought.create(tought)
            .then(() => {
                req.session.save(() => {
                    req.flash('message', 'Tought create succesfully!')
                    res.redirect('/toughts/dashboard')
                })
            })
            .catch((err) => console.log(err))

    }
}