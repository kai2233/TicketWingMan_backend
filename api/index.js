const router = require("express").Router();

// Mounting the route handlers for users
router.use("/user", require("./user"));

router.use("/weather", require("./weather"));

router.use("/advisory", require("./advisory"));

// 404 Handling
router.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
