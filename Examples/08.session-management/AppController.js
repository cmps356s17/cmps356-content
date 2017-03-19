'use strict'

class AppController {
    constructor() {
        this.userRepository = require('./UserRepository');
    }

    login(req, res) {
        let userCredentials = req.body;
        console.log("app.post(/api/login).req.body", userCredentials);

        this.userRepository.login(userCredentials).then(user => {
                req.session.user = user;
                res.redirect(user.redirectTo);
            })
            .catch(err => {
                console.log(err);
                res.render('login', {errMessage: err})
                //res.statusMessage = err;
                //res.status(400).end();
            });
    }

    hala(req, res) {
        console.log('req.cookies.accessCount', req.cookies.accessCount);
        //If there is already an accessCount cookie then increment its value
        let accessCount = 1;
        if (req.cookies.accessCount) {
            accessCount = parseInt(req.cookies.accessCount);
            accessCount++;
        }
        //Return an accessCount cookie to the client -- expires is optional
        res.cookie('accessCount', accessCount, { expires: new Date(Date.now() + 1000 * 360 * 1) });
        //res.sendFile(path.join(__dirname + '/views/hala.html'));
        res.render('hala');
    }

    addItemToCart(req, res) {
        console.log('app.post(/shop)', req.body.item);
        if (req.session.shoppingCart) {
            req.session.shoppingCart.push(req.body.item);
        } else {
            req.session.shoppingCart = [req.body.item];
        }

        res.render('shop', {shoppingCart: req.session.shoppingCart});
    }

    logout(req, res) {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    }
}

module.exports = new AppController();
