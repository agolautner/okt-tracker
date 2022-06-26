const router = require("express").Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
const Stamp = require("../models/stamp");

//this should all be public, as there is no personal data in the stamps

router.get("/all", async (req, res) => {
    // return all stamps data
    console.log('/api/stamp/all called');
    const stamps = await Stamp.find();
    res.json(stamps);
});

router.get("/id/:id", async (req, res) => {
  // return one stamp data
  id = req.params.id;
  console.log(`/api/stamp/${id} called`);
  const stamp = await Stamp.find({ id });
  if (!stamp) return res.status(404).send("Stamp not found");
  res.json(stamp);
});

router.get("/search", async (req, res) => {
  // query stamps by name
  console.log('search called');
  const { q } = req.query;
  const stamps = await Stamp.find({ name: { $regex: q, $options: "i" } });
  res.json(stamps);
});

// router.post("/", async (req, res) => {
//   //create a dashboard, send cerated id
// });

// router.post("/:id/todos", async (req, res) => {
//   // create todo ,
// });

// router.patch("/:id", async (req, res) => {
//   //update existing dashboard
// });

// router.delete("/:id", async (req, res) => {
//   //delete :id dashboard
// });

// router.delete("/:id/todos/:todoId", async (req, res) => {
//   //delete todo
// });

module.exports = router;
