
//How to use passport in our routes!!!
app.post('/login', passport.authenticate('local', {
    successRedirect: '/Homepage',
    failureRedirect: '/login',
    //show message from passport-config
    failureFlash: true
    //Remember to show it in the html syntax for messages.error!!!
}))
//If we want to use the store username from our session in the render function
app.get('/', (req, res) => {
    res.render('homepage.html', { name: req.user.name})
})

        // I tvivl om hvor den skal være
        //se server.js
/*
//protect the different routes when logged in. THE CHECK AUTHENTICATE FUNCTION, middleware
//+ to stay logged in
//Anywhere in the routes you wanna check for user authentication just use checkauthenticated or checkNotAuthenticated after
//e.g. app.get('/', checkAuthenticated, (req, res)) for the homepage
//e.g. app.get('/', checkNotAuthenticated, (req, res)) for the login and register
const checkAuthenticated = (req, res, next) => {
    if (req, isAuthenticated()) {
        return next()
    }
    //Redirect to login if they arent logged in
    res.redirect('/login')
}
//When the user is logged in, we dont want them to be able to return to the login page
const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    //If they arent authenticated
    next()
}
*/
