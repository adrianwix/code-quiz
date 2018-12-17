/**
 * @description In the following function which statement is true
 */
(async function insertOne(db) {
	const result = await db
		.collection("heroe")
		.insertOne({
			name: "Fire Man",
			skills: ["fireball", "flamethrower", "flameshield"],
			attributes: {
				strength: 90,
				speed: 70,
				endurance: 60,
				mana: 70
			},
			active: true
		})
		.catch(e => console.log(e));

	return result;
})();
