const Sequelize = require('sequelize');
// const sequelize = new Sequelize("mydb", "root", "123456", {
//     host: 'localhost',
//     dialect: 'mysql',
//     define: {
//       timestamps: false,
//       createdAt: false,
//       updatedAt: false,
//   }
// });


const sequelize = new Sequelize("mydb", "admin", "adminadmin", {
  host: 'database-1.c4tgykiytsu1.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  define: {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
});


module.exports = sequelize;
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }