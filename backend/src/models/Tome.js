/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	const Tome = sequelize.define(
		"Tome",
		{
			tomeId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Gear",
					key: "gearId",
				},
			},
			upgrade: {
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

	Tome.associate = (models) => {
		Tome.belongsTo(models.Gear);
	};

	return Tome;
};
