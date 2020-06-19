module.exports = function (sequelize, DataTypes) {
	const Character = sequelize.define(
		"Character",
		{
			characterId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			server: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			datacenter: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			accountId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Account",
					key: "accountId",
				},
			},
		},
		{
			tableName: "Character",
			freezeTableNames: true,
		}
	);

	Character.associate = (models) => {
		Character.belongsTo(models.Account);
		Character.belongsToMany(models.Group);
		Character.hasMany(models.Set);
	};

	return Character;
};
