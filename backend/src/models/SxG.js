/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"SxG",
		{
			idSxG: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			SetId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Set",
					key: "SetId",
				},
			},
			GearId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Gear",
					key: "GearId",
				},
			},
		},
		{
			tableName: "SxG",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
