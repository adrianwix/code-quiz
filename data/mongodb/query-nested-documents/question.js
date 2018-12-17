/**
 * @description Which value should hold query to return
 * 							the hero object from the dbs
 */
(async function queryNestedDocuments(db) {
	let query;
	const hero = {
		name: "Fire Man",
		skills: ["fireball", "flamethrower", "flameshield"],
		attributes: {
			strength: 90,
			speed: 70,
			endurance: 60,
			mana: 70
		},
		active: true
	};
	const result = await db
		.collection("hero")
		.find(query)
		.limit(1)
		.catch(e => console.log(e));

	return result;
})();
