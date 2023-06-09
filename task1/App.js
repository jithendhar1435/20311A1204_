const express = require('express');
const axios = require('axios');

const app = express();

app.get('/numbers', async (req, res) => {
  let urls = req.query.url;
  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  const promises = urls.map(url => 
    axios.get(url, {timeout: 200}) // Set the timeout to 200ms
    .then(response => response)
    .catch(e => {
      console.error(`${e.config.url} request failed`);
      return null;  // Return null if a request fails or times out
    })
  );
  
  const responses = await Promise.all(promises);

  const numbers = responses
    .filter(response => response && response.data && Array.isArray(response.data.numbers))
    .flatMap(response => response.data.numbers);

  const uniqueNumbers = [...new Set(numbers)];
  const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
  
  res.json({ numbers: sortedNumbers });
});

const port = process.env.PORT || 8008;
app.listen(port, () => console.log(`Server is running on port ${port}`));
