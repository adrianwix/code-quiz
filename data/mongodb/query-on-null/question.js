(async function queryOnNull(db) {
	const result = await db
		.collection("test")
		.find({ a: { $in: [4, 5, 6] }, b: { $gte: 5 }, c: null })
		.limit(1)
		.catch(e => console.log(e));

	return result;
})();
