const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req, res) {
        res.render('toughts/dashboard')
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtPost(req, res) {

        if(!req.session.userId){
            res.redirect('/login')
        } else {
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
}