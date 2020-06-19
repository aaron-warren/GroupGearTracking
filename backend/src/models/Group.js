/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	const Group = sequelize.define(
		"Group",
		{
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Character",
					key: "characterId",
				},
			},
		},
		{
			tableName: "Group",
			freezeTableNames: true,
		}
	);

	Group.associate = (models) => {
		Group.belongsTo(models.Character);
		Group.hasMany(models.GroupMembers);
	};

	return Group;
};
