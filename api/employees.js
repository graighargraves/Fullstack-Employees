import express from "express";
const router = express.Router();
export default router;

import {
  createEmployee,
  getEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee
} from "#db/queries/employees";


function isInvalidId(idParam) {
  const id = Number(idParam);
  return isNaN(id) || !Number.isInteger(id); 
}


router.get("/", async (req, res) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch employees." });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, birthday, salary } = req.body || {};
    if (!name || !birthday || !salary) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  } catch (err) {
    res.status(500).send({ error: "Failed to create employee." });
  }
});

router.get("/:id", async (req, res) => {
  const idParam = req.params.id;
  if (isInvalidId(idParam)) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  const id = Number(idParam);
  try {
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }
    res.send(employee);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch employee." });
  }
});


router.put("/:id", async (req, res) => {
  const idParam = req.params.id;
  if (isInvalidId(idParam)) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  const { name, birthday, salary } = req.body || {};
  if (!name || !birthday || !salary) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const id = Number(idParam);
  try {
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    const updated = await updateEmployee({ id, name, birthday, salary });
    res.status(200).send(updated);
  } catch (err) {
    res.status(500).send({ error: "Failed to update employee." });
  }
});


router.delete("/:id", async (req, res) => {
  const idParam = req.params.id;
  if (isInvalidId(idParam)) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  const id = Number(idParam);
  try {
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    await deleteEmployee(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ error: "Failed to delete employee." });
  }
});