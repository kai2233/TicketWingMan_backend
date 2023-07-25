const express = require("express");
const router = express.Router();
const { User } = require("../db/models");

// Handles GET of all users: localhost:8080/api/user/
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll({ attributes: ["id", "email"] });

    allUsers
      ? res.status(200).json(allUsers)
      : res.status(400).send("User List Not Found");
  } catch (error) {
    next(error);
  }
});

// Handles DELETE of a specific user using their email: localhost:8080/api/user/email-goes-here
router.delete("/:email", async (req, res, next) => {
  try {
    const userEmail = req.params.email;
    const foundUser = await User.findAll({ where: { email: userEmail } });

    if (!foundUser) {
      res.status(404).send("User not found");
    } else {
      await User.destroy({ where: { email: userEmail } });
      res.status(200).send("User deleted successfully");
    }
  } catch (error) {
    next(error);
  }
});

// Handles GET of a specific user using their email: localhost:8080/api/user/email-goes-here
router.get("/:email", async (req, res, next) => {
  try {
    const userEmail = req.params.email;
    console.log(userEmail);
    const foundUser = await User.findAll({ where: { email: userEmail } }); //fetching a User student from database
    foundUser
      ? res.status(200).json(foundUser)
      : res.status(404).send("User Not Found");
  } catch (error) {
    next(error);
  }
});

// Handles POST of a new user: localhost:8080/api/user/
router.post("/", async (req, res, next) => {
  try {
    const results = await User.create(req.body);
    if (!results) {
      res.status(400).send("Failed to create User");
    } else {
      res.status(200).send("User added successfully");
    }
  } catch (error) {
    next(error);
  }
});

// Handles PUT to update a specific user using their email: localhost:8080/api/user/email-goes-here
router.put("/:email", async (req, res, next) => {
  try {
    const userEmail = req.params.email;
    const foundUser = await User.findOne({ where: { email: userEmail } });

    if (!foundUser) {
      res.status(404).send("User not found");
    } else {
      // If newPassword is provided, update the password
      if (req.body.password) {
        foundUser.password = req.body.password;
      }

      // Update other user information
      foundUser.firstName = req.body.firstName || foundUser.firstName;
      foundUser.lastName = req.body.lastName || foundUser.lastName;
      foundUser.email = req.body.email || foundUser.email;

      // Save the updated user
      await foundUser.save();

      res.status(200).send("User updated successfully");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
