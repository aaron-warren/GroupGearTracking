module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"account",
		{
			accountID: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			cell: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			sessionID: {
				type: DataTypes.STRING(45),
				allowNull: true,
			},
		},
		{
			tableName: "account",
			timestamps: false,
			freezeTableNames: true,
			getterMethods: {
				getData() {
					return this.name + " " + this.accountID;
				},
			},
			setterMethods: {
				updateName(value) {
					this.setDataValue("name", value);
				},
			},
		}
	);
};
