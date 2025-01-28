const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res) => {
    try {
        let {username,email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("SUCCESS", "Successfully registered");
            res.redirect("/listings");
        })
        
    }catch(e) {
        req.flash("ERROR", e.message);
        res.redirect("/signup");
    }
  };

module.exports.renderLoginForm =(req, res) => {
    res.locals.successMsg = req.flash("SUCCESS");
    res.locals.errorMsg = req.flash("ERROR");
    res.render("users/login.ejs");
};

module.exports.login = async(req,res) => {
        console.log(req.flash("error")); 
        req.flash("SUCCESS", "Welcome back to Wanderlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("SUCCESS", "your are logged out!");
        res.redirect("/listings");
    })
};