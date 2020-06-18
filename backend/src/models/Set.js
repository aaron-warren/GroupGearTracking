/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Set",
		{
			SetId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			Class: {
				type: DataTypes.STRING(3),
				allowNull: false,
			},
			CharacterId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Character",
					key: "CharacterId",
				},
			},
		},
		{
			tableName: "Set",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
