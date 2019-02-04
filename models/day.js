module.exports = (sequelize, type) => {
  return sequelize.define('days', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      day: type.STRING
  })
}