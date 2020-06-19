module.exports = function (sequelize, DataTypes) {
	const Account = sequelize.define(
		"Account",
		{
			accountId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING(45),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			tableName: "Account",
			freezeTableNames: true,
		}
	);

	Account.associate = (models) => {
		Account.hasMany(models.Character);
	};

	return Account;
};
