const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (err) {
    console.log(`Erro na leitura do arquivo ${err}`);
  }
}

module.exports = {
  readTalkerData,
};