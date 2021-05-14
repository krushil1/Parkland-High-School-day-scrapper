//Written by Krushil Amrutiya
const express = require('express'); // Adding Express
const app = express(); // Initializing Express
const puppeteer = require('puppeteer'); // Adding Puppeteer
// Wrapping the Puppeteer browser logic in a GET request
app.get('/', function(req, res) {
  // Launching the Puppeteer controlled headless browser and navigate to the Digimon website
  puppeteer.launch().then(async function(browser) {
    const page = await browser.newPage();
    let url = 'https://phs.parklandsd.org/about/calendar';
    await page.goto(url, {waitUntil: 'networkidle2'});
    let day = await page.evaluate(() => {
      var d = new Date();
      var n = d.getDay();
      let dayData = document.querySelector('div[class="fsTitle ae-label"').innerText;
      let dataDay = dayData.replace(/[^0-9]/g, '');
      if (n == 3) {
        let newday = dataDay + "E";
        return newday;
      } else {
        let newday = dataDay;
        return newday;
      }
    })
    await browser.close();
    var json = {day};
    res.send(json);
  });      
});

var port = process.env.PORT || 3000;
console.log('Running on localhost:' + port);
app.listen(port);