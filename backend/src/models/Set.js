/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	const Set = sequelize.define(
		"Set",
		{
			setId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			class: {
				type: DataTypes.STRING(3),
				allowNull: false,
			},
			characterId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Character",
					key: "characterId",
				},
			},
		},
		{
			tableName: "Set",
			freezeTableNames: true,
		}
	);

	Set.associate = (models) => {
		Set.belongsTo(models.Character);
		Set.belongsToMany(models.Gear, { through: models.SetGear });
	};

	return Set;
};
