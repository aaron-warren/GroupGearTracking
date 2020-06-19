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
	}),
});

module.exports = new GraphQLSchema({
	query: query,
	mutation: mutation,
});
