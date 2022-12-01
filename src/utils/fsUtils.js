const fs = require('fs').promises;
const path = require('path');

const talkersDataPath = '../talker.json';

async function readTalkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, talkersDataPath));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (err) {
    console.log(`Erro na leitura do arquivo ${err}`);
  }
}

async function writeTalkerData(newTalker) {
  try {
    const oldTalkers = await readTalkerData();
    const id = Number(oldTalkers[oldTalkers.length - 1].id) + 1;
    const newTalkerData = { id, ...newTalker };
    const allTalkers = JSON.stringify([...oldTalkers, newTalkerData]);

    await fs.writeFile(path.resolve(__dirname, talkersDataPath), allTalkers);
    return { id, ...newTalker };
  } catch (err) {
    console.error(`Erro na escrita do arquivo ${err}`);
  }
}

// const editDataTalker = async (id, body) => {
//   const dataTalker = await readTalkerData();
//   const editTalker = { id: Number(id), ...body };
//   const findIndex = dataTalker.findIndex((talker) => talker.id === Number(id));
//   dataTalker.splice(findIndex, 1, editTalker);

//   await fs.writeFile(path.resolve(__dirname, talkersDataPath), dataTalker);

//   return editTalker;
// };

const deleteTalker = async (id) => {
  const dataTalkers = await readTalkerData();
  const deletedTalker = dataTalkers.filter((element) => Number(element.id) !== Number(id));
  const newDataTalkers = JSON.stringify(deletedTalker, null, 2);
  await fs.writeFile(path.resolve(__dirname, talkersDataPath), newDataTalkers);
  return newDataTalkers;
};

module.exports = {
  readTalkerData,
  writeTalkerData,
  deleteTalker,
};