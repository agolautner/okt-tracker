require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const mongoose = require('mongoose');

describe("/api/hike tests", () => {
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

  test("/:id - deleted user GET returns nothing", async () => {
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
    
    await User.deleteMany();

    //when
    const response = await client.get("/api/hike/" + id);

    //then
    expect(response.status).toBe(401);
    const responseData = response.body;
    expect(responseData).toStrictEqual(
      {}
    );
  });
});

describe("/api/hike POST tests", () => {
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

  test("/new - returns 200 with valid token and data", async () => {
    //given
    const newUser = new User({
      username: "Macska",
    });
    await newUser.save();
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
    client.set("authorization", token);

    //when
    const response = await client.post("/api/hike/new").send({
      title: "Hike 1",
      description: "Hike 1 description",
      start: "Hike 1 start",
      end: "Hike 1 end",
      date: new Date("2020-01-01")
    });

    //then
    expect(response.status).toBe(200);
    const responseData = response.body;
    const hikes = responseData.hikes;

    expect(hikes).toHaveLength(1);
    expect(hikes[0].title).toStrictEqual("Hike 1");
    expect(hikes[0].description).toStrictEqual("Hike 1 description");
    expect(hikes[0]._id).not.toBeUndefined();
   
    const userInDB = await User.findById(newUser._id);
    
    expect((userInDB.hikes[0]._id).toString()).toBe((hikes[0]._id));
  });

  test("/new - returns 401 with invalid token", async () => {
    //given
    const newUser = new User({
      username: "Macska",
    });
    await newUser.save();
    const token = jwt.sign({userId: newUser._id}, 'random-string')
    client.set("authorization", token);

    //when
    const response = await client.post("/api/hike/new").send({
      title: "Hike 1",
      description: "Hike 1 description",
      start: "Hike 1 start",
      end: "Hike 1 end",
      date: new Date("2020-01-01")
    });

    //then
    expect(response.status).toBe(401);
  });

  test("/new - returns 400 with valid token but missing hike data", async () => {
    //given
    const newUser = new User({
      username: "Macska",
    });
    await newUser.save();
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
    client.set("authorization", token);

    //when
    const response = await client.post("/api/hike/new").send({
      title: "Hike 1",
      description: "Hike 1 description",
      date: new Date("2020-01-01")
    });

    //then
    expect(response.status).toBe(400);
  });

  test("/new - deleted user gets 401", async () => {
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
    
    await User.deleteMany();

    //when
    const response = await client.post("/api/hike/new").send({
      title: "Hike 1",
      description: "Hike 1 description",
      start: "Hike 1 start",
      end: "Hike 1 end",
      date: new Date("2020-01-01")
    });

    //then
    expect(response.status).toBe(401);
  });
});

describe("/api/hike DELETE tests", () => {
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

  test("/:id - if the id matches something in the db, it is deleted", async () => {
    //given
    const newUser = new User({
      username: "Macska",
      hikes: [
        {
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

    const hikes = newUser.hikes;
    const hikeId = hikes[0]._id;

    //when
    const response = await client.delete(`/api/hike/${hikeId}`);

    //then
    expect(response.status).toBe(200);
  });

  test("/:id - if the id matches nothing in the db, the response is 404", async () => {
    //given
    const newUser = new User({
      username: "Macska",
      hikes: [
        {
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

    const randomId = '56cb91bdc3464f14678934fa';

    //when
    const response = await client.delete(`/api/hike/${randomId}`);

    //then
    expect(response.status).toBe(404);
  });
});

describe("/api/hike PATCH tests", () => {
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

  test("/:id - if the id matches something in the db, and the new data is valid, it is updated", async () => {
    //given
    const newUser = new User({
      username: "Macska",
      hikes: [
        {
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

    const hikes = newUser.hikes;
    const hikeId = hikes[0]._id;

    //when
    const response = await client.patch(`/api/hike/${hikeId}`).send({
      title: "New title",
      description: "New description",
      start: "Hike 1 new start",
      end: "Hike 1 new end",
      date: new Date("2020-01-01")
    });

    //then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.title).toBe("New title");
    expect(responseData.description).toBe("New description");
  });

  test("/:id - if the id matches nothing in the db, an error code is sent back", async () => {
    //given
    const newUser = new User({
      username: "Macska",
      hikes: [
        {
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

    const randomId = '56cb78bdc3464f14678934fa';

    //when
    const response = await client.patch(`/api/hike/${randomId}`).send({
      title: "New title",
      description: "New description",
      start: "Hike 1 new start",
      end: "Hike 1 new end",
      date: new Date("2020-01-01")
    });

    //then
    expect(response.status).toBe(404);
  });
});