module.exports = (sequelize, type) => {
  return sequelize.define('ingredients', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ingredient: type.STRING
  })
}