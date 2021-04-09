const passport = require("passport");
const Local = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(
  new Local(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const msg = { message: "Incorrect email or password" };
        let user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, msg);
        }
        if (!(await user.verifyPassword(password))) {
          return done(null, false, msg);
        }

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findByPk(id);
    if (!user) throw Error("UNAUTHORIZED");
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.name = "passport";
module.exports = passport;
