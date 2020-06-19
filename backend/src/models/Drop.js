module.exports = function (sequelize, DataTypes) {
	const Drop = sequelize.define(
		"Drop",
		{
			dropId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Gear",
					key: "gearId",
				},
			},
			floor: {
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

	Drop.associate = (models) => {
		Drop.belongsTo(models.Gear);
	};

	return Drop;
};
