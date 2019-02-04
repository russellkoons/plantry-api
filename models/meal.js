module.exports = (sequelize, type) => {
  return sequelize.define('meals', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      meal: type.STRING,
      time: type.ENUM('Breakfast', 'Lunch', 'Dinner'),
      notes: type.STRING
  })
}