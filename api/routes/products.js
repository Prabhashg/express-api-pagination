const express = require("express");
const products = require("../mock_data.json");
const router = express.Router();

router.get("/", (req, res) => {
    let {page, records} = req.query;
    // console.log(`before parsing Int, value of page: ${page} and !page: ${!page}`);
    // if(!page || !records) {
    //     console.log("page or records or both not defined by client");
    //     return res.status(200).json({});
    // } 

    page = parseInt(page);
    records = parseInt(records);

    // console.log(`after parsing Int, value of page: ${page} and !page: ${!page}`);
    const startIndex = (page-1)*records;
    const endIndex = page*records;
    const data = products.slice(startIndex, endIndex);
    console.log("data fetched from api successfully");
    return res.status(200).json(data);
    // return res.status(200).json(products);

})

// router.get("/length", (req, res) => {
//     res.sendStatus(200).send(products.length);
// })

router.route("/:id")
    .get((req, res) => {
        const id = req.params.id;
        // if(id === "length"){
        //     // console.log(products.length);
        //    return res.status(200).send(Object.keys(products).length);
        // }
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