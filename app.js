```javascript
const Plant = require('./models/plant.model.js');

module.exports = function(app) {

    // Retrieve all Plants
    app.get('/plants', (req, res) => {
        Plant.find()
        .then(plants => {
            res.send(plants);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving plants."
            });
        });
    });

    // Retrieve a single Plant with plantId
    app.get('/plants/:plantId', (req, res) => {
        Plant.findById(req.params.plantId)
        .then(plant => {
            if(!plant) {
                return res.status(404).send({
                    message: "Plant not found with id " + req.params.plantId
                });            
            }
            res.send(plant);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Plant not found with id " + req.params.plantId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving plant with id " + req.params.plantId
            });
        });
    });

    // Update a Plant with plantId
    app.put('/plants/:plantId', (req, res) => {
        // Validate Request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Plant content can not be empty"
            });
        }

        // Find plant and update it with the request body
        Plant.findByIdAndUpdate(req.params.plantId, {
            title: req.body.title || "Untitled Plant",
            content: req.body.content
        }, {new: true})
        .then(plant => {
            if(!plant) {
                return res.status(404).send({
                    message: "Plant not found with id " + req.params.plantId
                });
            }
            res.send(plant);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Plant not found with id " + req.params.plantId
                });                
            }
            return res.status(500).send({
                message: "Error updating plant with id " + req.params.plantId
            });
        });
    });

    // Delete a Plant with plantId
    app.delete('/plants/:plantId', (req, res) => {
        Plant.findByIdAndRemove(req.params.plantId)
        .then(plant => {
            if(!plant) {
                return res.status(404).send({
                    message: "Plant not found with id " + req.params.plantId
                });
            }
            res.send({message: "Plant deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Plant not found with id " + req.params.plantId
                });                
            }
            return res.status(500).send({
                message: "Could not delete plant with id " + req.params.plantId
            });
        });
    });
};
```
