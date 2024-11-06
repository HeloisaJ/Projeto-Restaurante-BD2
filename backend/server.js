const express = require("express");
const db = require("./db/dbScript");

const app = express();
const port = 3001;

app.get("/api/dishes", async (req, res) => {
    try {
        const dishes = await db.getDishes();
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching dishes" });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
