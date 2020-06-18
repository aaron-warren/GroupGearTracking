/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Drop",
		{
			DropId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Gear",
					key: "GearId",
				},
			},
			Floor: {
				type: DataTypes.STRING(5),
				allowNull: false,
			},
		},
		{
			tableName: "Drop",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
