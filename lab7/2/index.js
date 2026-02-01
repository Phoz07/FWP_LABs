const express = require("express");
const path = require("path");
const foods = require("./public/data/foods.json");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/food/:id", (req, res) => {
  const foodId = parseInt(req.params.id);
  const food = foods.find((item) => item.id === foodId);

  if (!food) {
    return res
      .status(404)
      .send('<h1>404 - ไม่พบเมนูอาหารนี้</h1><a href="/">กลับหน้าหลัก</a>');
  }

  const ingredientsHtml = food.ingradients
    .map((ing) => `<li>${ing}</li>`)
    .join("");
  const methodsHtml = food.methods.map((step) => `<li>${step}</li>`).join("");

  const cleanImgPath = food.imageUrl.replace(/^\./, "");

  const html = `
    <!doctype html>
    <html lang="th">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${food.name} - Food Catalog</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                body { padding: 40px; color: #333; }

                .container {
                    margin: 0 auto;
                    max-width: 1000px;
                }

                .food-layout {
                    display: flex;
                    gap: 40px;
                    align-items: flex-start;
                }

                .left-column {
                    flex: 0 0 400px;
                }

                .food-img {
                    width: 100%;
                    border: 1px solid #ccc;
                }

                .right-column {
                    flex: 1;
                }

                h1 { margin-bottom: 20px; }
                h2 { margin-top: 20px; margin-bottom: 10px; }
                ul, ol { margin-left: 20px; margin-bottom: 20px; }
                li { margin-bottom: 5px; }
            </style>
        </head>
        <body>
            <main>
                <div class="container">

                    <div class="food-layout">
                        <div class="left-column">
                            <img src="${cleanImgPath}" alt="${food.name}" class="food-img">
                        </div>

                        <div class="right-column">
                            <h1>${food.name}</h1>

                            <h2>วัตถุดิบ</h2>
                            <ul>${ingredientsHtml}</ul>

                            <h2>วิธีทำ</h2>
                            <ol>${methodsHtml}</ol>

                            <hr style="margin: 20px 0;">

                            <a href="/">Back to Home</a>
                            &nbsp;|&nbsp;
                            <a href="${food.ref}" target="_blank">Wongnai Reference</a>
                        </div>
                    </div>

                </div>
            </main>
        </body>
    </html>
    `;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}`);
});
