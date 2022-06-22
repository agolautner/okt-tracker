const router = require("express").Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
const Stamp = require("../models/stamp");

//this should all be public

router.get("/all", auth({ block: false }), async (req, res) => {
    // return all hikes beloning to the user
    console.log('/api/hike/all called');
    // const stamps = await Stamp.find();
    // res.json({ stamps });
});

router.get("/:id", async (req, res) => {
  // return one hike data
  id = req.params.id;
  console.log(`/api/hike/${id} called`);
//   const stamp = await Stamp.find({ id });
//   if (!stamp) return res.status(404).send("Stamp not found");
//   res.json({ stamp });
});

router.post("/new", auth({ block: true }), async (req, res) => {
  //add a new hike log to the user
    console.log('/api/hike/new called');
    const user = await User.findById(res.locals.user.userId);
    if (!user) return res.status(404).send("User not found");
    console.log(user);
});

router.post("/:id/todos", async (req, res) => {
  // create todo ,
});

router.patch("/:id", async (req, res) => {
  //update existing dashboard
});

router.delete("/:id", async (req, res) => {
  //delete :id dashboard
});

router.delete("/:id/todos/:todoId", async (req, res) => {
  //delete todo
});

module.exports = router;
