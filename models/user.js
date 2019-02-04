module.exports = (sequelize, type) => {
  return sequelize.define('users', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING,
      password: type.STRING
  })
}