const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const config = require("config");
const User = require("../models/User");

beforeEach(async () => {
  await mongoose.connect(config.get("mongoUriTest"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.create({
    firstName: "Test",
    lastName: "Testtest",
    email: "test@test.com",
    password: "123456",
    isAdmin: false,
  });
});

afterEach(() => {
  mongoose.connection.db.dropDatabase(async () => {
    await mongoose.connection.close();
  });
});

test("Testing signup router - POST /api/auth/signup.", async () => {
  const newUser = {
    firstName: "Ivan",
    lastName: "Sidorov",
    email: "test2@test2.com",
    password: "654321",
    isAdmin: false,
  };

  await supertest(app)
    .post("/api/auth/signup")
    .send(newUser)
    .expect(201)
    .then(async (res) => {
      expect(res.body).toEqual({ message: "Вы успешно зарегистрировались." });

      console.log(process.env.NODE_ENV);

      // Проверить данные в БД
      const user = await User.findOne({ email: newUser.email });
      expect(user).toBeTruthy();
      expect(user).toHaveProperty("_id");
      expect(user.password).toHaveLength(60);
    });

  const newUserNoCorrectData = {
    firstName: "Ivan",
    email: "test@test.com",
    password: "123456",
    isAdmin: false,
  };

  await supertest(app)
    .post("/api/auth/signup")
    .send(newUserNoCorrectData)
    .expect(400);
});

test("Testing login router - POST /api/auth/login.", async () => {});
