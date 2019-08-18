
function fetchProducts(cb){
$.get('/api/products',function(data){
    cb(data)
})
}


function addProduct(name,manuf,price,cb){
    $.post('/api/products',{
        name:name,
        manufacturer:manuf,
        price:price
    },function (data){
       cb(data)
    })
}

function createProductCard(product){
    return $(`
            <div class="col-2 card mx-2 p-3" >
              <h4 class="product-name">${product.name}</h4>
              <div class="product-manufacturer">${product.manufacturer}</div>
                <div class="row">
                  <div class="col m-3 p-3">
                      <b>Rs. ${product.price}</b>
                  </div>
                  <button class="col btn btn-danger m-3">Buy</button>
              </div>
            </div>`)
}

$(function(){
    let productlist=$('#product_list')
    let productManufacturer=$('#productManufacturer')
    let productPrice=$('#productPrice')
    let productName=$('#productName')

    fetchProducts(function(products){
        productlist.empty()
        for(product of products){
            productlist.append(createProductCard(product))
        }
    })

    $('#btn_add').click(function(){
        addProduct(productName.val(),productManufacturer.val(),productPrice.val(),
    function(addedProduct){
        window.alert("Added" + addedProduct.name + "to our Database")

    })
    })
    
    
})