const route=require('express').Router()
const Product=require('../../db').Product

route.get('/',(req,res)=>{
    // we want to get all products
   Product.findAll()
   .then((products)=>{
    res.status(200).send(products)
   })
   .catch((err)=>{
       res.status(500).send({
           error:"Could not retrieve all products"
           
       })
   })

})

route.post('/',(req,res)=>{
    //validate the values
    if(isNaN(req.body.price)){
        return res.status(403).send({
            error:"Entered price is not valid."
        })
    }
    //we want to add product
    Product.create({
        name:req.body.name,
        manufacturer:req.body.manufacturer,
        price:parseFloat(req.body.price)
    })
    .then((product)=>{
        res.status(201).send(product)
    })
    .catch((err)=>{
        res.status(501).send({
            error:"Could not add a product"
        })
    })
})
exports=module.exports=route
