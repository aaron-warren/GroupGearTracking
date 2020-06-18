/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"GroupMembers",
		{
			GroupMemberId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			MemberId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			GroupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Group",
					key: "GroupId",
				},
			},
		},
		{
			tableName: "GroupMembers",
			timestamps: false,
			freezeTableNames: true,
		}
	);
};
