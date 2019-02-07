const hobbits = require("./hobbitsModel");
const db = require("../data/dbConfig");

describe("the hobbit model", () => {
  afterEach(async () => {
    await db("hobbits").truncate();
  });

  it("should insert new hobbitses", async () => {
    const ids = await hobbits.insert({ name: "bilbo" });
    expect(ids.length).toBe(1);
    expect(ids[0]).toBe(1);
  });
});
