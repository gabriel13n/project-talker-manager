const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (token.length !== 16 || typeof token !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const lengthNameMin = 3;
  
  if (name === undefined) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < lengthNameMin) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const ageMin = 18;

  if (age === undefined) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }  

  if (age < ageMin) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }  
  
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (talk === undefined) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const validateWatchAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const validateDate = regex.test(watchedAt);

  if (watchedAt === undefined) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!validateDate) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchAt,
  validateRate,
};