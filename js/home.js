if (localStorage.getItem("noon") === null) {
  console.log("no exixt");
} else {
  console.log("exist");
  if (localStorage.getItem("noon") == "") {
    console.log("empty");
  } else {
    console.log("no empty");
  }
}

let sendHttpRequest = (method, url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.send();

    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status == 200) {
        resolve(xhr.response);
      } else {
        reject("Error => the request doesn't success");
      }
    };

    xhr.onerror = () => {
      reject("Error => there is an error during the request");
    };
  });
  return promise;
};

let getData = () => {
  sendHttpRequest(
    "GET",
    "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
  )
    .then(responseData => {
      useData(responseData);
    })
    .catch(rejection => {
      console.log(`the error after rejection is ${rejection}`);
    });
};

let useData = data => {
  let productsData = data.ProductCollection;
  productsData.forEach(element => {
    viewData(
      element.Name,
      element.Price,
      element.ProductPicUrl,
      element.Quantity,
      element.ProductId,
      element.ProductPicUrl,
      element.Category,
      element.Description
    );
    // console.log(element);
  });
};

let itemDetails = (
  itemImg,
  productId,
  imgLink,
  category,
  productName,
  description,
  productPrice,
  productQuantity
) => {
  itemImg.addEventListener("click", ev => {
    $queryString = `productId=${productId}&imgLink=${imgLink}&category=${category}&productName=${productName}&description=${description}&productPrice=${productPrice}&productQuantity=${productQuantity}`;
    window.open(`../docs/showItem.html?${$queryString}`, "_blank");
    // window.location.href = "../docs/item_description.html";
    console.log($queryString);
  });
};

//function to add product to cart and increment the product no
let addToCart = (
  AddToCart,
  productPrice,
  productQuantity,
  productId,
  productName,
  productImage
) => {
  // create key sideCart in the localStorage
  if (localStorage.getItem("sideCart")) {
    itemsData = localStorage.getItem("sideCart");
    itemsData = JSON.parse(itemsData);
    // console.log(itemsData);
    let itemCounter = document.querySelector("#item-counter");
    itemCounter.setAttribute("value", itemsData.length);
    itemCounter.innerHTML = itemsData.length;

    let totalPrice = 0;
    for (let i = 0; i < itemsData.length; i++) {
      totalPrice = +totalPrice + itemsData[i].price * itemsData[i].number;
    }

    let totalPriceElement = document.querySelector("#total-price");
    totalPriceElement.setAttribute("value", totalPrice);
    totalPriceElement.innerHTML = totalPrice + "$";
  } else {
    itemsData = [];
    localStorage.setItem("sideCart", itemsData);
  }
  AddToCart.addEventListener("click", ev => {
    AddToCart.disabled = true;
    AddToCart.innerHTML = "Done";

    let checkItemExist = false;
    // set item data in the local storage
    for (let i = 0; i < itemsData.length; i++) {
      if (productId == itemsData[i].Id) {
        itemsData[i].number++;
        checkItemExist = true;
      }
    }

    if (!checkItemExist) {
      item = {
        Id: productId,
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image: productImage,
        number: 1
      };

      itemsData.push(item);
    }

    localStorage.setItem("sideCart", JSON.stringify(itemsData));
    //------------------------------------------------------------------------
    // retrieve item data from the localStorage the set it in cart

    itemsData = JSON.parse(localStorage.getItem("sideCart"));

    console.log(itemsData);
    let totalPrice = 0;
    for (let i = 0; i < itemsData.length; i++) {
      totalPrice = +totalPrice + itemsData[i].price * itemsData[i].number;
    }
    let itemCounter = document.querySelector("#item-counter");
    itemCounter.setAttribute("value", itemsData.length);
    itemCounter.innerHTML = itemsData.length;

    let totalPriceElement = document.querySelector("#total-price");
    totalPriceElement.setAttribute("value", totalPrice);
    totalPriceElement.innerHTML = totalPrice + "$";
  });
};

// function to go to the cart page
let goToCartPage = () => {
  let cartSideBtn = document.querySelector("#cart-side-button");
  cartSideBtn.addEventListener("click", ev => {
    // window.location.href = "../docs/card.html";
    window.open("../docs/cart.html", "_blank");
    console.log(cartSideBtn);
  });
};

// function to view data in home.html
let viewData = (
  name,
  price,
  photo,
  quantity,
  id,
  imgLink,
  category,
  description
) => {
  //creat html elements
  let mainDiv = document.querySelector("#allData");
  let itemDiv = document.createElement("div");
  let imgDiv = document.createElement("div");
  let itemImg = document.createElement("img");
  // let cartImg = document.createElement("img");
  let addToCartBtn = document.createElement("button");
  let itemHeader = document.createElement("h5");
  let itemFooter = document.createElement("div");
  let itemPrice = document.createElement("h4");

  //set the values in the elements
  itemHeader.innerText = name;
  itemPrice.innerText = `$${price}`;
  itemImg.src = photo;
  addToCartBtn.innerHTML = "Add To Cart";
  addToCartBtn.setAttribute("class", "display-after-click");
  // cartImg.src = "../resources/cart.png";

  //add bootstrap classes
  itemDiv.classList.add("col-md-4");
  itemDiv.classList.add("d-flex");
  itemDiv.classList.add("flex-column");
  // itemDiv.classList.add("justify-content-center");
  itemHeader.classList.add("align-self-center");
  itemFooter.classList.add("align-self-start");
  itemFooter.classList.add("mt-auto");
  // itemPrice.classList.add("align-self-start");
  // itemPrice.classList.add("mt-auto");
  itemDiv.classList.add("align-content-between");
  itemImg.classList.add("img-fluid");
  imgDiv.classList.add("align-items-center");
  imgDiv.classList.add("m-auto");
  // cartImg.classList.add("img-fluid");
  addToCartBtn.classList.add("align-self-end");
  addToCartBtn.classList.add("btn");
  addToCartBtn.classList.add("btn-outline-primary");

  //add css classes
  itemHeader.classList.add("item-header");
  itemPrice.classList.add("item-price");
  itemDiv.classList.add("item");

  //append element inside each other
  itemDiv.appendChild(itemHeader);
  // addToCartBtn.appendChild(cartImg);
  itemFooter.appendChild(itemPrice);
  itemFooter.appendChild(addToCartBtn);
  imgDiv.appendChild(itemImg);
  itemDiv.appendChild(imgDiv);
  itemDiv.appendChild(itemFooter);
  itemDiv.appendChild(itemPrice);
  mainDiv.appendChild(itemDiv);

  itemDetails(
    imgDiv,
    id,
    imgLink,
    category,
    name,
    description,
    price,
    quantity
  );

  addToCart(addToCartBtn, price, quantity, id, name, imgLink);
};
getData();
goToCartPage();
