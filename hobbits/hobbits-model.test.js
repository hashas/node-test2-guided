// test the functions in hobbits-model.js, as these functions
// interact with db these are more integration tests than unit tests

// running jest with "--verbose" flag in package.json gives us test details
// such as which tests ran and how long they took

const db = require("../data/config")
const hobbitsModel = require("./hobbits-model")

beforeEach(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy()
})

test("insert", async () => {
	const res = await hobbitsModel.insert({ name: "bilbo" })
	expect(res.name).toBe("bilbo")
})

test("findById", async () => {
	const res = await hobbitsModel.findById(1)
	expect(res.name).toBe("sam")
})

test("update", async () => {
	const res = await hobbitsModel.update(1, { name: "bilbo" })
	expect(res.name).toBe("bilbo")
})

test("remove", async () => {
	await hobbitsModel.remove(1)
	const hobbits = await db("hobbits").select()
	expect(hobbits).toHaveLength(3)
})