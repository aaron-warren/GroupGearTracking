/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	const Gear = sequelize.define(
		"Gear",
		{
			gearId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			slot: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
		},
		{
			tableName: "Gear",
			timestamps: false,
			freezeTableNames: true,
		}
	);

	Gear.associate = (models) => {
		Gear.belongsToMany(models.Set, { through: models.SetGear });
	};

	return Gear;
};
