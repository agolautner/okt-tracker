require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

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
});
