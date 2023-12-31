const crypto = require("crypto");
const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class User extends Model {
  static async generateSalt() {
    return crypto.randomBytes(16).toString("base64");
  }

  static async encryptPassword(password, salt) {
    return crypto
      .createHash("RSA-SHA256")
      .update(password)
      .update(salt)
      .digest("hex");
  }

  async validatePassword(targetPassword) {
    return (
      (await User.encryptPassword(targetPassword, this.salt)) === this.password
    );
  }
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    githubId: {
      type: DataTypes.STRING,
    },
    favorite: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: "user",
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.salt = await User.generateSalt();
          user.password = await User.encryptPassword(user.password, user.salt);
        }
      },
      // Bulk user creation
      beforeBulkCreate: async (users) => {
        for (let user of users) {
          if (user.changed("password")) {
            // If the password field has changed, generate a new salt
            user.salt = await User.generateSalt();
            // And encrypt the password
            user.password = await User.encryptPassword(
              user.password,
              user.salt
            );
          }
        }
      },
    },
  }
);

module.exports = User;
