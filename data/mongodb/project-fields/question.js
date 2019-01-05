/**
 * @description With the following documents in collection
 * 							what will return the projection
 */
const collection = [
	{ _id: 6, weapon: "sword", qty: 2 },
	{ _id: 7, weapon: "axe", qty: 1 },
	{ _id: 8, weapon: "bow", qty: 1 },
	{ _id: 9, weapon: "magic stone", qty: 1 }
];

(async function projectField(db) {
	const result = await db
		.collection("heroe_inventory")
		.query({}, { weapon: 1 })
		.catch(e => console.log(e));

	return result;
})();
