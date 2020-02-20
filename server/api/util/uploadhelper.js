const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, '../auth/lanterns-268812-5752374491dc.json');

const {Storage} = Cloud
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: process.env.GCS_PROJECT_ID
})

module.exports = storage