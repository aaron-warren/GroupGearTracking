const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = require("graphql");
const {
	AccountType,
	CharacterType,
	SetType,
	SxGType,
	GearType,
	DropType,
	TomeType,
	GroupType,
	GroupMembersType,
} = require("./objectTypes");
const argon2 = require("argon2");
const db = require("../sql/sql");

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
		account: {
			type: GraphQLString,
			args: {
				username: { type: GraphQLNonNull(GraphQLString) },
				password: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args) => {
				const hash = argon2.hash(args.password);
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
