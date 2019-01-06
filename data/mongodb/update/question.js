/**
 * @description Which value should have "update" variable to
 * 							increase the amount of potion by 2
 */
(async function updateOne(db) {
	const inventory = [
		{ _id: 2, weapon: "potion", qty: 2 },
		{ _id: 6, weapon: "sword", qty: 2 },
		{ _id: 7, weapon: "axe", qty: 1 },
		{ _id: 8, weapon: "bow", qty: 1 },
		{ _id: 9, weapon: "magic stone", qty: 1 }
	];
	let update;
	const result = await db
		.collection("test")
		.updateOne({ _id: 2 }, update)
		.limit(1)
		.catch(e => console.log(e));

	return result;
})();
