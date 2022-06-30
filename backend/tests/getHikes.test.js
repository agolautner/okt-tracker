require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const mongoose = require('mongoose');

describe("/api/hike GET tests", () => {
  let connection;
  let mongod;
  let client;

  beforeAll(async () => {
    [connection, mongod] = await startDb();
    client = mockserver.agent(app);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  afterAll(async () => {
    await stopDb(connection, mongod);
  });

  test("/all - returns an empty list for new users", async () => {
    //given
    const newUser = new User({
      username: "Macska",
    });
    await newUser.save();
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
    client.set("authorization", token);

    //when
    const response = await client.get("/api/hike/all");

    //then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData).toStrictEqual([]);
  });

  test("/all - deleted user GET returns 401 and an empty response", async () => {
    //given

    const newUser = new User({
      username: "Macska",
    });
    await newUser.save();

    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
    client.set("authorization", token);
    
    await User.deleteMany();

    //when
    const response = await client.get("/api/hike/all");

    //then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
  });

  test("/:id - returns a hike with the specified ID if it exists in the database", async () => {
    //given
    const id = '56cb91bdc3464f14678934ca';
    const newUser = new User({
      username: "Macska",
      hikes: [
        {
          _id: id,
          title: "Hike 1",
          description: "Hike 1 description",
          start: "Hike 1 start",
          end: "Hike 1 end",
          date: new Date("2020-01-01")
        }
      ]
    });
    await newUser.save();
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
    client.set("authorization", token);

    //when
    const response = await client.get("/api/hike/" + id);

    //then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData).toStrictEqual(
      {"_id": id, "date": "2020-01-01T00:00:00.000Z", "description": "Hike 1 description", "end": "Hike 1 end", "start": "Hike 1 start", "title": "Hike 1"}
    );
  });

  test("/:id - returns 404 if the specified id cannot be found in the database", async () => {
    //given
    const id1 = '56cb91bdc3464f14678934ca';
    const id2 = '56cb91bdc3464f14678934cb';
    const newUser = new User({
      username: "Macska",
      hikes: [
        {
          _id: id1,
          title: "Hike 1",
          description: "Hike 1 description",
          start: "Hike 1 start",
          end: "Hike 1 end",
          date: new Date("2020-01-01")
        }
      ]
    });
    await newUser.save();
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
    client.set("authorization", token);

    //when
    const response = await client.get("/api/hike/" + id2);

    //then
    expect(response.status).toBe(404);
    const responseData = response.body;
    expect(responseData).toStrictEqual({});
  });
});
