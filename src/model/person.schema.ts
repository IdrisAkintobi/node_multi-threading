import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../db/connectDB";

class Person extends Model<
  InferAttributes<Person>,
  InferCreationAttributes<Person>
> {
  declare uid: number;
  declare data: string;
  toJSON() {
    return JSON.parse(this.data);
  }
}

Person.init(
  {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "person",
    modelName: "Person",
  }
);

export default Person;
