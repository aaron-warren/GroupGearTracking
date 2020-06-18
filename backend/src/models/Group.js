/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Group",
		{
			GroupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			OwnerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Character",
					key: "CharacterId",
				},
			},
		},
		{
			tableName: "Group",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
