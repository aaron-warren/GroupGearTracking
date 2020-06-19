const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLScalarType,
} = require("graphql");
const GraphQLDate = require("graphql-date");
const db = require("../sql/sql");

const AccountType = new GraphQLObjectType({
	name: "Account",
	description: "User accounts",
	fields: () => ({
		accountId: { type: GraphQLNonNull(GraphQLInt) },
		username: { type: GraphQLNonNull(GraphQLString) },
		password: { type: GraphQLNonNull(GraphQLString) },
		createdAt: { type: GraphQLNonNull(GraphQLDate) },
		updatedAt: { type: GraphQLNonNull(GraphQLDate) },
		characters: {
			type: new GraphQLList(CharacterType),
			resolve: (account) => {
				return db.Character.findAll({ where: { AccountId: account.AccountId } });
			},
		},
	}),
});

const CharacterType = new GraphQLObjectType({
	name: "Characters",
	description: "Player characters",
	fields: () => ({
		characterId: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		server: { type: GraphQLNonNull(GraphQLString) },
		datacenter: { type: GraphQLNonNull(GraphQLString) },
		accountId: { type: GraphQLNonNull(GraphQLInt) },
		createdAt: { type: GraphQLNonNull(GraphQLDate) },
		updatedAt: { type: GraphQLNonNull(GraphQLDate) },
		sets: {
			type: new GraphQLList(SetType),
			resolve: (character) => {
				return db.Set.findAll({ where: { CharacterId: character.CharacterId } });
			},
		},
	}),
});

const SetType = new GraphQLObjectType({
	name: "GearSets",
	description: "Sets of gear that belongs to a character",
	fields: () => ({
		setId: { type: GraphQLNonNull(GraphQLInt) },
		class: { type: GraphQLNonNull(GraphQLString) },
		characterId: { type: GraphQLNonNull(GraphQLInt) },
		gear: {
			type: new GraphQLList(FullGearType),
			resolve: (set) => {
				const setIds = db.SetGear.findAll({
					where: { SetId: set.setId },
					raw: true,
				});

				const items = setIds.map((set) => {
					return {
						SetId: set.SetId,
						GearId: set.GearId,
					};
				});

				setIds.forEach((obj, index) => {
					const slot = db.Gear.findByPk(obj.GearId, { raw: true });
					items[index].slot = slot.Slot;
				});

				setIds.forEach((obj, index) => {
					const prop = db.Drop.findByPk(obj.GearId, { raw: true });
					if (prop === null) {
						prop = db.Tome.findByPk(obj.GearId, { raw: true });
						items[index].tome = true;
						items[index].drop = false;
					} else {
						items[index].drop = true;
						items[index].tome = false;
					}

					items[index].prop = prop;
				});

				return items;
			},
		},
	}),
});

const SetGearType = new GraphQLObjectType({
	name: "SetGearLink",
	fields: () => ({
		idSetGear: { type: GraphQLNonNull(GraphQLInt) },
		setId: { type: GraphQLNonNull(GraphQLInt) },
		gearId: { type: GraphQLNonNull(GraphQLInt) },
	}),
});

const GearType = new GraphQLObjectType({
	name: "Gear",
	description: "Abstract gear table",
	fields: () => ({
		gearId: { type: GraphQLNonNull(GraphQLInt) },
		slot: { type: GraphQLNonNull(GraphQLString) },
	}),
});

const DropType = new GraphQLObjectType({
	name: "DroppedGear",
	description: "Child table from Gear, holds drop location of items",
	fields: () => ({
		dropId: { type: GraphQLNonNull(GraphQLInt) },
		floor: { type: GraphQLNonNull(GraphQLString) },
	}),
});

const TomeType = new GraphQLObjectType({
	name: "TomeGear",
	description: "Child table from Gear, holds upgrade object for tome items",
	fields: () => ({
		tomeId: { type: GraphQLNonNull(GraphQLInt) },
		upgrade: { type: GraphQLNonNull(GraphQLString) },
	}),
});

const GroupType = new GraphQLObjectType({
	name: "Groups",
	description: "Group and the owner",
	fields: () => ({
		groupId: { type: GraphQLNonNull(GraphQLInt) },
		ownerId: { type: GraphQLNonNull(GraphQLInt) },
		createdAt: { type: GraphQLNonNull(GraphQLDate) },
		updatedAt: { type: GraphQLNonNull(GraphQLDate) },
	}),
});

const GroupMembersType = new GraphQLObjectType({
	name: "GroupMembers",
	description: "Members in the group",
	fields: () => ({
		groupMemberId: { type: GraphQLNonNull(GraphQLInt) },
		memberId: { type: GraphQLNonNull(GraphQLInt) },
		groupId: { type: GraphQLNonNull(GraphQLInt) },
		createdAt: { type: GraphQLNonNull(GraphQLDate) },
		updatedAt: { type: GraphQLNonNull(GraphQLDate) },
	}),
});

const FullGearType = new GraphQLObjectType({
	name: "FullGearData",
	description: "All known data on specific gear",
	fields: () => ({
		setId: { type: GraphQLNonNull(GraphQLInt) },
		gearId: { type: GraphQLNonNull(GraphQLInt) },
		slot: { type: GraphQLNonNull(GraphQLString) },
		prop: { type: GraphQLNonNull(GraphQLString) },
		tome: { type: GraphQLBoolean },
		drop: { type: GraphQLBoolean },
	}),
});

module.exports = {
	AccountType,
	CharacterType,
	SetType,
	SetGearType,
	GearType,
	DropType,
	TomeType,
	GroupType,
	GroupMembersType,
};
