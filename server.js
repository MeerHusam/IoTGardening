const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001; // 确保这个端口不与前端端口冲突

app.use(cors());
app.use(bodyParser.json());

// 路由来处理传入的数据
app.post('/save-data', (req, res) => {
  const data = req.body;
  fs.appendFile('./sensorData.json', JSON.stringify(data)+'\n', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data');
    } else {
      res.send('Data saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});