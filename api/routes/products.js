const express = require("express");
const products = require("../mock_data.json");
const router = express.Router();

router.get("/", (req, res) => {
    // let {page, records} = req.params;
    // page = parseInt(page);
    // records = parseInt(records);
    // const startIndex = (page-1)*records;
    // const endIndex = page*records;
    // return res.status(200).json(products.slice(startIndex, endIndex));
    console.log("data fetched from api successfully")
    return res.status(200).json(products);

})

router.route("/:id")
    .get((req, res) => {
        const id = req.params.id;
        const product = products.find(product => product.id === Number(id));
        if(!product){
            console.log("No product with matching id")
            res.status(200).send("No product with matching id")
        } else {
            console.log(`get request completed successfully with id ${id}`);
            return res.status(200).send(product);
        }
        
    })
    .patch((req, res) => {
        const id = req.params.id;
        console.log(`patch request completed successfully with id ${id}`);
        res.end("patch request completed successfully");
    })
    .delete((req, res) => {
        const id = req.params.id;
        console.log(`delete request completed successfully with id ${id}`);
        res.end("delete request completed successfully");
    });

router.post("/", (req, res) => {
    console.log(`post request completed successfully`);
    res.end("post request completed successfully");
});

module.exports = router;