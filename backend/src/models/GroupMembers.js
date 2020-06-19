/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	const GroupMembers = sequelize.define(
		"GroupMembers",
		{
			groupMemberId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			memberId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Group",
					key: "groupId",
				},
			},
		},
		{
			tableName: "GroupMembers",
			freezeTableNames: true,
		}
	);

	GroupMembers.associate = (models) => {
		GroupMembers.belongsTo(Group);
	};

	return GroupMembers;
};
