const axios = require('axios');

const GITHUB_OWNER = 'Mr-mail'; // Ganti dengan username GitHub kamu
const REPO_NAME = 'db_store'; // Ganti dengan nama repository kamu
const FILE_PATH = 'data.json'; // Ganti dengan path file dalam repo
const GITHUB_TOKEN = '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'; // Ganti dengan token GitHub kamu

async function addNumberToRepo(newNumber) {
    try {
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

        const { data } = await axios.get(url, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });

        const content = Buffer.from(data.content, 'base64').toString('utf8');
        const jsonData = JSON.parse(content);

        if (jsonData.includes(newNumber)) {
            return console.log('Nomor sudah ada dalam repository.');
        }

        jsonData.push(newNumber);

        const updatedContent = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');

        await axios.put(url, {
            message: `Menambahkan nomor ${newNumber}`,
            content: updatedContent,
            sha: data.sha
        }, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });

        console.log(`Nomor ${newNumber} berhasil ditambahkan ke repository.`);
    } catch (error) {
        console.error('Gagal mengupdate repository:', error.response?.data || error.message);
    }
          }
