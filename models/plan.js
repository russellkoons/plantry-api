module.exports = (sequelize, type) => {
  return sequelize.define('plans', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: type.STRING
  })
}