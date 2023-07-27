const router = require("express").Router();

// Mounting the route handlers for users
router.use("/user", require("./user"));
router.use("/flights", require("./flight"));
router.use("/track", require("./track"));
router.use("/weather", require("./weather"));
router.use('/plugs', require("./plug"));
router.use("/advisory", require("./advisory"));
router.use("/airportLookup", require("./airportLookup"));

// 404 Handling
router.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
