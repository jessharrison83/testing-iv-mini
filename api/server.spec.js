const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server.js");

describe("the route handlers", () => {
  afterEach(async () => {
    await db("hobbits").truncate();
  });
  describe("get /", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/");
      expect(response.type).toMatch(/json/i);
    });
    it("sends correct response object", async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual({ api: "up" });
    });
  });
  describe("get /hobbits", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/hobbits");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/hobbits");
      expect(response.type).toMatch(/json/i);
    });
    it("sends correct response object", async () => {
      const response = await request(server).get("/hobbits");
      expect(response.body).toEqual([]);
    });
  });
  describe("post /hobbits", () => {
    it("responds with 201", async () => {
      const body = { name: "bilbo" };
      const response = await request(server)
        .post("/hobbits")
        .send(body);
      expect(response.status).toBe(201);
    });
    it("responds with 400", async () => {
      const body = {};
      const response = await request(server)
        .post("/hobbits")
        .send(body);
      expect(response.status).toBe(400);
    });
  });
});
