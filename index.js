const puppeteer = require("puppeteer");

const PAGE_URL =
    "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10161";

const main = async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(PAGE_URL);

    const items = await page.evaluate(() => {
        // write your querySelectors here
        var description_val = "";
        var title_val = "";
        var price_val = "";
        var address_val = "";

        let description_cont = document.querySelector("div#description");
        let title_cont = document.querySelector("article#detail-description-container h2");
        let price_cont = document.querySelector("div#detail-title div.price");
        let address_cont = document.querySelector("div#detail-title div.address");

        let array = [description_cont, title_cont, price_cont, address_cont];
        let array_val = [description_val, title_val, price_val, address_val];

        for (i = 0; i < array.length; i++)
        {
            if (array[i] == null)
            {
                array_val[i] = "";
            }
            else 
            {
                array_val[i] = array[i].textContent;
            }
        }

        return {
            description: array_val[0],
            title: array_val[1],
            price: array_val[2],
            address: array_val[3],
        };
    });

    console.log(items);

    await browser.close();

    return items;

};

main().then(function(data) {
    jsonContent = JSON.stringify(data);

    const fs = require('fs');

    fs.writeFile("data.json", jsonContent, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved successfully!");
    });
});