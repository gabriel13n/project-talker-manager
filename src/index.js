const express = require('express');
const bodyParser = require('body-parser');
const { readTalkerData, writeTalkerData, deleteTalker } = require('./utils/fsUtils');
const generateToken = require('./token');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchAt,
  validateRate,
} = require('./middlewares/validateNewTalker');

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

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const dataTalkers = await readTalkerData();
  const filter = dataTalkers.filter((t) => t.name.includes(q));
  if (q === undefined) {
    return res.status(HTTP_OK_STATUS).json(dataTalkers);
  }
  return res.status(HTTP_OK_STATUS).json(filter);
 });

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

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchAt,
  validateRate, async (req, res) => {
  const newTalker = req.body;
  const writeInTalker = await writeTalkerData(newTalker);
  return res.status(201).json(writeInTalker);
});

// O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.
// app.put('/talker/:id',
//   validateToken,
//   validateName,
//   validateAge,
//   validateTalk,
//   validateWatchAt,
//   validateRate,
//  async (req, res) => {
//   const { id } = req.params;
//   const { name, age, talk } = req.body;
//   const editedTalker = await editTalker(id, name, age, talk);

//   res.status(HTTP_OK_STATUS).json(editedTalker);
// });

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  deleteTalker(id);
  res.status(204).json();
});
