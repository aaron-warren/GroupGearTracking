/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Account",
		{
			AccountId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			Username: {
				type: DataTypes.STRING(45),
				allowNull: false,
				unique: true,
			},
			Password: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
		},
		{
			tableName: "Account",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
