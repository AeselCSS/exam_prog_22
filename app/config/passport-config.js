const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

//null is for the error

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (err) {
      return done(err)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  //serialize user and save it to the session
  passport.serializeUser((user, done) => done(null, user.id))
  //deserialize user on the saved session id
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
