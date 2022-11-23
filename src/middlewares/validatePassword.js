const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const lengthPassword = 6;

  if (password === undefined) {
    res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < lengthPassword) {
    res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

module.exports = validatePassword;