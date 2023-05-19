import { Model, DataTypes } from "sequelize";
import sequelize from "../database/configDb";

class Business extends Model {}

Business.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Tambahkan kolom lain sesuai kebutuhan
  },
  {
    sequelize,
    modelName: "business",
  }
);

export default Business;
