const express = require("express");
const { database, storage } = require("firebase-admin");
const router = express.Router();
const Product = require("../src/Product");
const Guard = require("../src/guard");
const databaseName = process.env.FIREBASE_DATABASE_NAME;
const multer = require("multer");
const upload = multer({ dest: `${process.cwd()}/tmp` });
const crc32 = require("crc32");
const axios = require("axios").default;
const fs = require("fs");

router.get("/", Guard.firebase("moderator", "admin"), async (req, res) => {
  try {
    const dbRef = database().ref(databaseName).child("products");
    const snapshot = await dbRef.get();
    const response = [];
    const products = Object.entries(snapshot.val() || {});
    for (let [id, data] of products) {
      let product = new Product({ id, ...data });
      await product.fetch({ stocks: true });
      response.push(product);
    }
    return res.json(response.reverse());
  } catch (e) {
    console.error(e);
    res.status(e.code || 400).end();
  }
});

router.post(
  "/",
  Guard.firebase("admin", "moderator"),
  upload.any(),
  async (req, res) => {
    try {
      const dbRef = database().ref(`${databaseName}/products`);
      const product = new Product(req.body);
      if ((req.files || []).length) {
        for (let file of req.files) {
          let { filename, path } = file;
          await storage().bucket().upload(path);
          let storageRef = storage().bucket().file(filename);
          storageRef.makePublic();
          product.images.push(storageRef.publicUrl());
          fs.unlink(path, () => null);
        }
      }
      product.uid = req.auth.uid;
      product.createdAt = database.ServerValue.TIMESTAMP;
      product.id = (await dbRef.push(product.val())).key;
      await database()
        .ref(`${databaseName}/metadata/collection`)
        .update({
          products: database.ServerValue.increment(1),
        });
      if (product.category) {
	await axios({ url: `http://${req.headers.host}/categories`, method: "POST", data:{ title: product.category }, headers: { 'x-access-token': req.accessToken }});
      }
      if (product.colors && product.colors.length) {
	for (let color of product.colors) {
  	   axios({
	    url: `http://${req.headers.host}/colors`,
	    method: "POST",
	    data: {
	     title: color 
	    },
	    headers: {
	      'x-access-token': req.accessToken 
	    }
	  });
	}
      }
      product.createdAt = Date.now();
      res.status(201).json(product);
    } catch (e) {
      console.error(e);
      res.status(e.code || 400);
    }
    res.end();
  }
);

router.get("/:id", Guard.firebase("admin", "moderator"), async (req, res) => {
  const { id } = req.params;
  try {
    const dbRef = database().ref(`${databaseName}/products/${id}`);
    const snapshot = await dbRef.get();
    if (!snapshot.exists()) {
      throw { code: 404 };
    }
    let product = new Product({
      id: snapshot.key,
      ...snapshot.toJSON(),
    });
    await product.fetch({ owner: true, stocks: true });
    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(e.code || 400);
  }
  res.end();
});

router.post(
  "/:id",
  Guard.firebase("admin", "moderator"),
  upload.any(),
  async (req, res) => {
    const { id } = req.params;
    try {
      let product = new Product(req.body);
      product.updatedUid = req.auth["uid"];
      await database()
        .ref(`${databaseName}/products/${id}`)
        .update(product.onUpdate());
      product.id = id;
      res.json(product);
    } catch (e) {
      console.error(e);
      res.status(e.code || 400);
    }
    res.end();
  }
);

router.delete("/:id", Guard.firebase("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    await Product.remove(id);
    res.status(202).end();
  } catch (e) {
    console.error(e);
    res.status(e.code || 400);
  }
  res.end();
});

module.exports = router;
