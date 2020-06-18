const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = require("graphql");
const db = require("../src/sql/sql");

const AccountType = new GraphQLObjectType({
	name: "Account",
	fields: () => ({
		accountID: { type: GraphQLInt },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		name: { type: GraphQLString },
		cell: { type: GraphQLString },
		address: { type: GraphQLString },
		sessionId: { type: GraphQLString },
	}),
});

const query = new GraphQLObjectType({
	name: "Query",
	fields: () => ({
		accountById: {
			type: AccountType,
			args: {
				id: { type: GraphQLInt },
			},
			resolve(parent, args) {
				return db.account.findOne({ where: { accountID: args.id } });
			},
		},
		accountByEmail: {
			type: AccountType,
			args: {
				email: { type: GraphQLString },
			},
			resolve(parent, args) {
				return db.account.findOne({ where: { email: args.email } });
			},
		},
		accounts: {
			type: new GraphQLList(AccountType),
			description: "List of all Accounts",
			resolve(parent, args) {
				return db.account.findAll();
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
				email: { type: GraphQLNonNull(GraphQLString) },
				password: { type: GraphQLNonNull(GraphQLString) },
				name: { type: GraphQLNonNull(GraphQLString) },
				cell: { type: GraphQLNonNull(GraphQLString) },
				address: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args) => {
				const account = db.account.create({
					email: args.email,
					password: args.password,
					name: args.name,
					cell: args.cell,
					address: args.address,
				});

				return account;
			},
		},
		deleteAccount: {
			type: GraphQLString,
			args: {
				id: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve: (parent, args) => {
				db.account.destroy({
					where: {
						accountID: args.id,
					},
				});

				return `Deleted object with id=${args.id}`;
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: query,
	mutation: mutation,
});

	GraphQLNonNull,
} = require("graphql");
const db = require("../src/sql/sql");

const AccountType = new GraphQLObjectType({
	name: "Account",
	fields: () => ({
		accountID: { type: GraphQLInt },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		name: { type: GraphQLString },
		cell: { type: GraphQLString },
		address: { type: GraphQLString },
		sessionId: { type: GraphQLString },
	}),
});

const query = new GraphQLObjectType({
	name: "Query",
	fields: () => ({
		accountById: {
			type: AccountType,
			args: {
				id: { type: GraphQLInt },
			},
			resolve(parent, args) {
				return db.account.findOne({ where: { accountID: args.id } });
			},
		},
		accountByEmail: {
			type: AccountType,
			args: {
				email: { type: GraphQLString },
			},
			resolve(parent, args) {
				return db.account.findOne({ where: { email: args.email } });
			},
		},
		accounts: {
			type: new GraphQLList(AccountType),
			description: "List of all Accounts",
			resolve(parent, args) {
				return db.account.findAll();
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
				email: { type: GraphQLNonNull(GraphQLString) },
				password: { type: GraphQLNonNull(GraphQLString) },
				name: { type: GraphQLNonNull(GraphQLString) },
				cell: { type: GraphQLNonNull(GraphQLString) },
				address: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args) => {
				const account = db.account.create({
					email: args.email,
					password: args.password,
					name: args.name,
					cell: args.cell,
					address: args.address,
				});

				return account;
			},
		},
		deleteAccount: {
			type: GraphQLString,
			args: {
				id: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve: (parent, args) => {
				db.account.destroy({
					where: {
						accountID: args.id,
					},
				});

				return `Deleted object with id=${args.id}`;
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: query,
	mutation: mutation,
});
