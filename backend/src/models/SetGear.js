/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"SetGear",
		{
			idSetGear: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			setId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Set",
					key: "setId",
				},
			},
			searId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Gear",
					key: "gearId",
				},
			},
		},
		{
			tableName: "SetGear",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
