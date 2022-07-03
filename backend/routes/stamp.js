const router = require("express").Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
const Stamp = require("../models/stamp");
const axios = require("axios");

//this should all be public, as there is no personal data in the stamps

router.get("/all", async (req, res) => {
    // return all stamps data
    console.log('/api/stamp/all called');
    const stamps = await Stamp.find().sort({id: 1});
    console.log('stamps: ', stamps);
    if (!stamps.length) return res.status(404).send("Stamps not found");
    res.json(stamps);
});

router.get("/id/:id", async (req, res) => {
  // return one stamp data
  id = req.params.id;
  console.log(`/api/stamp/${id} called`);
  const stamp = await Stamp.find({ id });
  if (!stamp.length) return res.status(404).send("Stamp not found");
  res.json(stamp);
});

router.get("/search", async (req, res) => {
  // query stamps by name
  const { q } = req.query;
  const stamps = await Stamp.find({ name: { $regex: q, $options: "i" } }).sort({id: 1});
  if (!stamps.length) return res.status(404).send("Stamps not found");
  res.json(stamps);
});

module.exports = router;
