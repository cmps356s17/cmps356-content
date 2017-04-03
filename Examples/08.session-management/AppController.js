
class AppController {
    constructor() {
        this.userRepository = require('./UserRepository')
    }

    login(req, res) {
        let loginInfo = req.body
        console.log("app.post(/api/login).req.body", loginInfo)

        this.userRepository.login(loginInfo.username, loginInfo.password).then(user => {
                req.session.user = user
                res.redirect('/home')
            })
            .catch(err => {
                console.log(err)
                res.render('login', { errMessage: err } )
            })
    }

    hala(req, res) {
        console.log('req.cookies.accessCount', req.cookies.accessCount)
        //If there is already an accessCount cookie then increment its value
        let accessCount = 1
        if (req.cookies.accessCount) {
            accessCount = parseInt(req.cookies.accessCount)
            accessCount++
        }

        //Return an accessCount cookie to the client -- expires is optional
        let expiresAfterMilliseconds = 1 * 360 * 1000  //1 hour
        res.cookie('accessCount', accessCount, { expires: new Date(Date.now() + expiresAfterMilliseconds ) })
        res.render('hala')
    }

    addItemToCart(req, res) {
        console.log('app.post(/shop)', req.body.item)
        if (req.session.shoppingCart) {
            req.session.shoppingCart.push( req.body.item )
        } else {
            req.session.shoppingCart = [ req.body.item ]
        }

        res.redirect('/shop')
    }

    logout(req, res) {
        req.session.destroy( () => {
            res.redirect('/')
        })
    }
}

module.exports = new AppController()
