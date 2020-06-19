const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = require("graphql");
const GraphQLDate = require("graphql-date");
const {
	AccountType,
	CharacterType,
	SetType,
	SetGearType,
	GearType,
	DropType,
	TomeType,
	GroupType,
	GroupMembersType,
	LoginType,
} = require("./objectTypes");
const argon2 = require("argon2");
const db = require("../sql/sql");
const jwt = require("jsonwebtoken");

const query = new GraphQLObjectType({
	name: "Query",
	fields: () => ({
		accounts: {
			type: new GraphQLList(AccountType),
			description: "List of all accounts",
			resolve: (parent, args) => {
				return db.Account.findAll();
			},
		},
		sets: {
			type: new GraphQLList(SetType),
			description: "List of all sets",
			args: {
				characterId: { type: GraphQLInt, require: false },
			},
			resolve: (parent, args) => {
				if (!args.characterId) {
					return db.Set.findAll();
				} else {
					return db.Set.findAll({ where: { CharacterId: args.characterId } });
				}
			},
		},
	}),
});

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: () => ({
		addAccount: {
			type: AccountType,
			args: {
				username: { type: GraphQLNonNull(GraphQLString) },
				password: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent, args) => {
				const hash = await argon2.hash(args.password);
				const account = db.Account.create({
					username: args.username,
					password: hash,
				});

				return account;
			},
		},
		login: {
			type: LoginType,
			args: {
				username: { type: GraphQLNonNull(GraphQLString) },
				password: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent, args) => {
				const loginInfo = await db.Account.findOne({
					where: { username: args.username },
				});

				try {
					if (await argon2.verify(loginInfo.password, args.password)) {
						var token = jwt.sign(
							{
								accountId: loginInfo.accountId,
								username: loginInfo.username,
							},
							process.env.JWT_TOKEN
						);

						loginInfo.token = token;

						return loginInfo;
					} else {
						loginInfo.accountId = -1;
						loginInfo.token = "";
						return loginInfo;
					}
				} catch (err) {
					return {
						accountId: -1,
						token: "",
					};
				}

				return loginInfo;
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: query,
	mutation: mutation,
});
