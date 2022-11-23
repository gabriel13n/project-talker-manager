const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (email === undefined) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regex.test(email)) {
    res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

module.exports = validateEmail;