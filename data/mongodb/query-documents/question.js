(async function queryDocuments(db) {
	const result = await db
		.collection("test")
		.find({ a: { $in: [2, 8, 9] }, b: { $eq: 3 }, c: { $lt: 1 } })
		.limit(1)
		.catch(e => console.log(e));

	return result;
})();
