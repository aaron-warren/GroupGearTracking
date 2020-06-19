const express = require("express");
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const schema = require("./src/graphql/schema");
const db = require("./src/sql/sql");
const app = express();

app.use(cors());

app.use(
	"/api",
	expressGraphQL({
		schema: schema,
		graphiql: true,
	})
);

// sync();

async function sync() {
	await db.sequelize.sync({ force: true, match: /_test$/ });
	console.log("Synchronized tables");
}

// app.use("/", async (req, res) => {
// const test = await db.account.findOne({ where: { accountID: 1 } });
// test.setDataValue("name", "Albina Scarsbrick");
// test.save();
// res.send(test.getData);
// res.send(test);
// });

// async function test() {
// 	const test = await db.account.findAll({ raw: true });
// 	// console.log(test);
// 	return test;
// }

app.listen(5000, () => console.log("Server listening on port 5000..."));
