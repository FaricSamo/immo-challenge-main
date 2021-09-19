const puppeteer = require("puppeteer");

const PAGE_URL =
  "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10161";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    // write your querySelectors here
    description_val = document.querySelector("div#description").textContent;
    title_val = document.querySelector("article#detail-description-container h2").textContent;
    price_val = document.querySelector("div.price").textContent;
    address_val = document.querySelector("div.address").textContent;

    return {
      description: description_val,
      title: title_val,
      price: price_val,
      address: address_val,
    };
  });

  console.log(items);

  return items;
};

main().then(function(data) {
  jsonContent = JSON.stringify(data);

  const fs = require('fs');

  fs.writeFile("data.json", jsonContent, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("The file was saved successfully!");
  });
});


