/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Tome",
		{
			TomeId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Gear",
					key: "GearId",
				},
			},
			Upgrade: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
		},
		{
			tableName: "Tome",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
