require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Stamp = require("../models/stamp");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const mongoose = require('mongoose');

describe("/api/stamp tests", () => {
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

  test("/all - returns 200 and a list of all stamps in the db", async () => {
    //given
    const id = '56cb91bdc3464f14678934ca'
    const newStamp1 = new Stamp({
        _id: id,
        name: "Stamp1",
        id: 1,
        img: "Image1",
        coordinates: {
            lat: 1,
            lng: 1
        },
        sections: [1,2]
    });
    await newStamp1.save();

    //when
    const response = await client.get("/api/stamp/all");

    //then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData).toStrictEqual([{
        "__v": 0,
         "_id": '56cb91bdc3464f14678934ca',
         "coordinates": {
           "lat": "1",
           "lng": "1",
         },
         "id": 1,
         "img": "Image1",
         "name": "Stamp1",
         "sections": [
           1,
           2,
         ],
        }]);
  });

  test("/all - returns 404 if the db is empty", async () => {
    //given
    const id = '56cb91bdc3464f14678934cd'
    const newStamp1 = new Stamp({
        _id: id,
        name: "Stamp1",
        id: 1,
        img: "Image1",
        coordinates: {
            lat: 1,
            lng: 1
        },
        sections: [1,2]
    });
    await newStamp1.save();
    await Stamp.deleteMany();

    //when
    const response = await client.get("/api/stamp/all");

    //then
    expect(response.body).toStrictEqual({});
    expect(response.status).toBe(404); // for some reason this is returning 200?? 
  });

  test("/search - returns 200 and a stamp if the query matches something in the db", async () => {
    //given
    const newStamp1 = new Stamp({
        name: "Stamp1",
        id: 1,
        img: "Image1",
        coordinates: {
            lat: 1,
            lng: 1
        },
        sections: [1,2]
    });
    await newStamp1.save();

    const newStamp2 = new Stamp({
        name: "Stamp2",
        id: 2,
        img: "Image2",
        coordinates: {
            lat: 2,
            lng: 2
        },
        sections: [1,2]
    });
    await newStamp2.save();

    //when
    const response = await client.get("/api/stamp/search?q=1");

    //then
    const responseData = response.body;
    const stamp = responseData[0];

    expect(response.status).toBe(200); 
    expect(stamp.name).toBe("Stamp1");
    expect(stamp.id).toBe(1);
  });

  test("/search - returns 404 if nothing matches the query", async () => {
    //given
    const newStamp1 = new Stamp({
        name: "Stamp1",
        id: 1,
        img: "Image1",
        coordinates: {
            lat: 1,
            lng: 1
        },
        sections: [1,2]
    });
    await newStamp1.save();

    //when
    const response = await client.get("/api/stamp/search?q=3");

    //then
    expect(response.status).toBe(404);
  });

  test("/id/:id - returns 404 if nothing matches the id", async () => {
    //given
    const newStamp1 = new Stamp({
        name: "Stamp1",
        id: 1,
        img: "Image1",
        coordinates: {
            lat: 1,
            lng: 1
        },
        sections: [1,2]
    });
    await newStamp1.save();

    //when
    const response = await client.get("/api/stamp/id/3");

    //then
    expect(response.status).toBe(404);
  });

  test("/id/:id - returns 200 if id matches a stamp in the db", async () => {
    //given
    const newStamp1 = new Stamp({
        name: "Stamp1",
        id: 1,
        img: "Image1",
        coordinates: {
            lat: 1,
            lng: 1
        },
        sections: [1,2]
    });
    await newStamp1.save();

    //when
    const response = await client.get("/api/stamp/id/1");

    //then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData[0].name).toBe("Stamp1");
    expect(responseData[0].id).toBe(1);
  });
});