const express = require("express");
const app = express();
const port = process.env.PORT || 3000; 
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs").promises;

app.use(cors());
app.use(bodyParser.json({ extended: true }));

app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
    res.send({ message: "Connected to Backend server!" });
});

// POST route to add an item
app.post("/add/item", addItem);

// Function to handle adding an item
async function addItem(request, response) {
    try {
        const { id, task, currentDate: curDate, dueDate } = request.body.jsonObject;

        const newTask = {
            ID: id,
            Task: task,
            Current_date: curDate,
            Due_date: dueDate,
        };

        const data = await fs.readFile("database.json");
        const json = JSON.parse(data);

        json.push(newTask);

        await fs.writeFile("database.json", JSON.stringify(json));

        console.log("Successfully wrote to file");
        response.sendStatus(200);
    } catch (err) {
        console.error("Error: ", err);
        response.sendStatus(500);
    }
}
