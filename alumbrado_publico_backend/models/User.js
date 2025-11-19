module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 50],
          msg: "El username debe tener entre 3 y 50 caracteres"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Debe ser un email válido"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user" // admin | user
    }
  }, {
    tableName: "users", // nombre tabla en BD
    timestamps: true // createdAt & updatedAt
  });

  return User;
};
