const express = require("express"); // calling the express module
const app = express(); // instantiating express in app variable
const data = require("./data.json"); // taking data from our fake API, but usually in production the data will come from a database

// means the express will use json notation
app.use(express.json());

// requests in Express -> endpoint
app.get("/clients", function(req, res) {
    res.json(data); // data response in json
});

// id because we can only give the action to one client
app.get("/clients/:id", function(req, res) {
    const { id } = req.params;// requesting id by req.params - parameter request
    const client = data.find(cli => cli.id == id); // look for the id client that matches the id I want in end-poin / clients/:id and store the value in the variable client ...

    // if the id the user is looking for does not exist, we may return a message
    if (!client) return res.status(204).json();

    res.json(client); // client response in json (variable client)
}); 

// storing data
app.post("/clients", function(req, res) {
    const { name, email } = req.body;

    // save data via Insomnia by POST method
    res.json({ name, email });
}); 
    
// update data
app.put("/clients/:id", function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    const { name } = req.body;

    client.name = name;

    res.json(client);
});

// delete data
app.delete("/clients/:id", function(req, res) {
    const { id } = req.params;
    // bring all clients that the id is different from the id i passed in insomnia
    const clientsFiltered = data.filter(client => client.id != id);
    
    res.json(clientsFiltered); // bring a new list without the id previously informed
});

// starting the server on port 3000
app.listen(3000, function() {
    console.log("Server is running");
});
