export default (req, res, next) => {
  res.locals.flash_message = req.flash("success_message")[0];
  next(); // passe au middleware suivant
};