const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
     allowNull: false,
     primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creadoendb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: false,
  });
};
