import request from "supertest";
import app from "../app";
import Persons from "../model/person.schema";
import worker from "../utils/workerInstance";

describe("Test modules", () => {
  it("Schema is defined", () => {
    const properties = Object.getOwnPropertyNames(Persons);
    expect(properties.includes("sequelize")).toBeTruthy();
    expect(properties.includes("rawAttributes")).toBeTruthy();
  });
  it("Worker is defined", () => {
    expect(worker.constructor.name).toBe("Worker");
  });
});

describe("Test app path", () => {
  it("Root path return 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
  it("Not found path return 404", async () => {
    const response = await request(app).get("/not-found");
    expect(response.statusCode).toBe(404);
  });

  it("Status path return 200", async () => {
    const response = await request(app).get("/api/v1/update-db-status");
    expect(response.statusCode).toBe(200);
  });
});
