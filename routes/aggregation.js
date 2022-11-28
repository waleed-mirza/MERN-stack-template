const router = require("express").Router();

const User = require("../models/user");
const Department = require("../models/department");

router.route("/").get(async (req, res) => {
  try {
    let result = await User.aggregate().lookup({
      from: "departments",
      localField: "_id",
      foreignField: "userid",
      as: "departments",
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/department", async (req, res) => {
  try {
    const { name, userid } = req.body;
    const department = new Department({ name, userid });
    await department.save();
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
