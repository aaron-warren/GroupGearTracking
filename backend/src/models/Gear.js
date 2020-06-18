/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Gear",
		{
			GearId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			Slot: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
		},
		{
			tableName: "Gear",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
