const defaultURL = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}`;
const defaultHeight = 480;
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const jimp = require("jimp");
const base64 = require("base-64");
const temp = path.resolve(process.cwd(), "tmp");

router.get('/', async (req, res) => {
  try {
    let { url, width, height, code } = req.query;
    let fileName = Date.now().toString()
    let imagePath = path.join(temp, fileName);
    url = base64.decode(url);
    //* image processing
    if (!width && !height) height = defaultHeight;
    height = parseInt(height) || jimp.AUTO;
    width = parseInt(width) || jimp.AUTO;
    let image = await jimp.read({ url });
    image = image.autocrop().resize(width, height);
    if (code) {
      const black_text = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);
      const white_text = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
      image = image
        .print(black_text, 9, 10, code)
        .print(black_text, 11, 10, code)
        .print(black_text, 10, 9, code)
        .print(black_text, 10, 11, code)
        .print(white_text, 10, 10, code);
    }
    image.write(imagePath, () => {
	console.log(image._originalMime)
      res.setHeader('content-type', image._originalMime);
      res.sendFile(imagePath, () => {
        fs.unlink(imagePath, () => null);
      });
    });
  } catch (e) {
    console.error(e);
    res.status(502).json({ error: e.message });
  }
});



router.get("/:fileName", async (req, res) => {
  try {
    let queryString;
    let { url, width, height, code } = req.query;
    let { fileName } = req.params;
    let imagePath = path.join(temp, fileName);
    Object.entries(req.query).forEach(([key, value]) => {
      if (["url", "width", "height", "code"].includes(key)) return;
      queryString = queryString
        ? queryString + "&" + key + "=" + value
        : key + "=" + value;
    });
    url = [url || defaultURL, fileName].join("/") + "?" + (queryString || "");
    //* image processing
    if (!width && !height) height = defaultHeight;
    height = parseInt(height) || jimp.AUTO;
    width = parseInt(width) || jimp.AUTO;
    let image = await jimp.read({ url });
    image = image.quality(80).resize(width, height).autocrop();
    if (code) {
      const black_text = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);
      const white_text = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
      image = image
        .print(black_text, 9, 10, code)
        .print(black_text, 11, 10, code)
        .print(black_text, 10, 9, code)
        .print(black_text, 10, 11, code)
        .print(white_text, 10, 10, code);
    }
    image.write(imagePath, () => {
      res.sendFile(imagePath, () => {
        fs.unlink(imagePath, () => null);
      });
    });
  } catch (e) {
    console.error(e);
    res.status(502).json({ error: e.message });
  }
});

module.exports = router;
