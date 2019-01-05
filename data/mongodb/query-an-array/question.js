(async function queryArray(db) {
	let query;
	const hero = {
		name: "Fire Man",
		skills: ["fireball", "flamethrower", "flameshield", "fireblade"],
		attributes: {
			strength: 90,
			speed: 70,
			endurance: 60,
			mana: 70
		},
		active: true
	};
	const result = await db
		.collection("test")
		.find(query)
		.limit(1)
		.catch(e => console.log(e));

	return result;
})();
