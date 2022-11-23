const express = require('express');
const bodyParser = require('body-parser');
const { readTalkerData } = require('./utils/fsUtils');
const generateToken = require('./token');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
//

app.get('/talker', async (req, res) => {
  const allTalkers = await readTalkerData();
  return res.status(HTTP_OK_STATUS).json(allTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const allTalkers = await readTalkerData();
  const findTalkerById = allTalkers.find((talker) => talker.id === Number(id));
  
  if (!findTalkerById) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(HTTP_OK_STATUS).json(findTalkerById);
  }
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});