/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Character",
		{
			CharacterId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			Name: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			Server: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			Datacenter: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			AccountId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Account",
					key: "AccountId",
				},
			},
		},
		{
			tableName: "Character",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
