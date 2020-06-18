const env = require("dotenv").config();
const { Sequelize } = require("sequelize");

var db = {};

const sequelize = new Sequelize(
	process.env.DB,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
		logging: false,
		pool: {
			max: 10,
			acquire: 30000,
			idle: 10000,
		},
	}
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Account = sequelize.import("../models/Account");
db.Character = sequelize.import("../models/Character");
db.Drop = sequelize.import("../models/Drop");
db.Gear = sequelize.import("../models/Gear");
db.Group = sequelize.import("../models/Group");
db.GroupMembers = sequelize.import("../models/GroupMembers");
db.Set = sequelize.import("../models/Set");
db.SxG = sequelize.import("../models/SxG");
db.Tome = sequelize.import("../models/Tome");

module.exports = db;
