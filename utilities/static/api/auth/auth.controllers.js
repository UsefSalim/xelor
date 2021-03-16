//! require dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//! require User Model
const User = require('../models/user.models');
//! require validations
const {
  registerValidations,
  loginValidations,
} = require('../validations/auth.validations');

// create a token with jwt
const createToken = (data) =>
  jwt.sign({ data }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

/* ! @Route  : POST => /register
     Desc    : Regsiter the users
     @Access : Pubic
*/
exports.registerController = async (req, res) => {
  //! validation de la data envoyer par l'utilisateur
  const { error } = registerValidations(req.body);
  if (error)
    return res.status(400).json({ validationError: error.details[0].message });
  try {
    //! verification de l'existance de l"adress mail d'enregistrement
    if (await User.findOne({ email: req.body.email }))
      return res
        .status(400)
        .json({ message: `adress mail : ${req.body.email} deJa existant` });
    //! creation d'un nouveau utilisateur
    const newUser = new User({
      ...req.body,
    });
    //! hash password
    newUser.password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    //! enregistrer l'utilisateur dans la database
    if (await newUser.save()) return res.status(201).json({ newUser });
  } catch (error) {
    res.status(400).json({ registerControllerError: error });
  }
};

/* ! @Route  : POST => /login
     Desc    : login the users
     @Access : Pubic
*/
exports.loginController = async (req, res) => {
  //! validation de la data envoyer par l'utilisateur
  const { error } = loginValidations(req.body);
  if (error)
    return res.status(400).json({ validationError: error.details[0].message });
  try {
    //! verification de l'existance de l"adress mail  et du password !!!
    const currentUser = await User.findOne({ email: req.body.email });
    if (
      !currentUser ||
      !(await bcrypt.compare(req.body.password, currentUser.password))
    )
      return res.status(400).json({ message: 'mail ou password incorrect' });
    //! creation de la data a renvoyer avec le token
    const { _id, name, email, role } = currentUser;
    const data = { _id, name, email, role };
    //! creation de token
    const token = createToken(data);
    res.cookie('logToken', token, {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRATION_TIME,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ loginControllerError: error });
  }
};
/* ! @Route  : POST => /logout
     Desc    : Logout the users
     @Access : Pubic
*/
exports.logoutController = (req, res) => {
  res.cookie('logToken', '', { maxAge: 1 });
  res.redirect('/');
};
