/**
 * @description In the following function which statement is true
 */
(async function insertMany(db) {
	const options = {
		ordered: Boolean
	};
	const result = await db
		.collection("heroe_inventory")
		.insertMany(
			[
				{ _id: 6, weapon: "sword", qty: 2 },
				{ _id: 6, weapon: "axe", qty: 1 },
				{ _id: 8, weapon: "bow", qty: 1 },
				{ _id: 9, weapon: "magic stone", qty: 1 }
			],
			options
		)
		.catch(e => console.log(e));

	return result;
})();
