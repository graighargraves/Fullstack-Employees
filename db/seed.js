import db from "#db/client";
import { createEmployee } from "./queries/employees.js";


// await seedEmployees();



async function seedEmployees() {
  await db.connect();
  await createEmployee("Harry Potter", '2000-01-01', 1000000)
  await createEmployee("Ron Wesley", '2001-01-01', 2000000)
  await createEmployee("Hermione Granger", '2002-01-01', 3000000)
  await createEmployee("Severus Snape", "2003-01-01", 4000000)
  await createEmployee("Albus Dumbledore", '2004-01-01', 5000000)
  await createEmployee("Minerva Mogonagol", '2005-01-01', 6000000)
  await createEmployee("Draco Malfoy", '2006-01-01', 7000000)
  await createEmployee("Tom Riddle", '2007-01-01', 8000000)
  await createEmployee("Sirius Black", '2009-01-01', 9000000)
  await createEmployee("Beletrix Lestrange", '2010-01-01', 10000000)
  await db.end();
  console.log("🌱 Database seeded.");
}

seedEmployees()
