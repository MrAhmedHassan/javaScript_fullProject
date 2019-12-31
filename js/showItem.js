// console.log("Enjoy Mr Abdo :)");
let url = window.location.href;
let alllQueryString = url.split("?")[1];
// console.log(queryString);
subQueryString = alllQueryString.split("&");
console.log(subQueryString);

//  to insert an image
let image = subQueryString[1].split("=")[1];
let imageHolder = document.getElementById("img1");
imageHolder.setAttribute("src", image);

// to insert category
let cat = subQueryString[2].split("=")[1];
let catHolder = document.getElementById("cat1");
catHolder.innerHTML = cat;

// to insert product name
let pro = subQueryString[3]
  .split("=")[1]
  .split("%20")
  .join(" ");
let proHolder = document.getElementById("proname");
proHolder.innerHTML = pro;

// to insert description
let desc = subQueryString[4]
  .split("=")[1]
  .split("%20")
  .join(" ");
console.log(desc);
let descHolder = document.getElementById("desc");
descHolder.innerHTML = desc;

// to insert price
let price = subQueryString[5].split("=")[1];
let priceDiv = document.getElementById("price");
priceDiv.value = price;
priceDiv.innerHTML = price + "$";
// priHolder.innerHTML = pri + "$";

let maxQuantity = +subQueryString[6].split("=")[1];
console.log(maxQuantity);

let productId = subQueryString[0].split("=")[1];
console.log(productId);

let selectBox = document.querySelector("#selectBox");
// for (let i = 1; i <= maxQuantity; i++) {
//   let optionInSelect = document.createElement("option");
//   optionInSelect.value = i;
//   optionInSelect.innerHTML = i;
//   selectBox.appendChild(optionInSelect);
//   // console.log(object);
// }

for (let i = 1; i <= maxQuantity; i++) {
  let quantity = document.createElement("option");
  quantity.value = i;
  quantity.innerHTML = i;
  // if (quantity.value == product_number) {
  //   quantity.setAttribute("selected", true);
  // }
  selectBox.appendChild(quantity);
}

// for (let i = 1; i <= maxQuantity; i++) {
//   let quantity = document.createElement("option");
//   quantity.value = i;
//   quantity.innerHTML = i;
//   if (quantity.value == product_number) {
//     quantity.setAttribute("selected", true);
//   }
//   selectBox.appendChild(quantity);
// }
// selectBox.addEventListener("input" , )
// if (localStorage.getItem("sideCart")) {
//   localStorageData = JSON.parse(localStorage.getItem("sideCart"));
//   console.log(localStorageData);
//   localStorageData.forEach(element => {
//     if (element.Id == productId) {
//       element.number;
//     }
//   });
// }

let AddToCart = document.querySelector("#add");

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
  } else {
    itemsData = [];
    localStorage.setItem("sideCart", itemsData);
  }

  for (let i = 0; i < itemsData.length; i++) {
    if (productId == itemsData[i].Id) {
      itemsData[i].number++;
      checkItemExist = true;
    }
  }

  AddToCart.addEventListener("click", ev => {
    AddToCart.disabled = true;
    AddToCart.innerHTML = "Done";

    let number = +selectBox.options[selectBox.selectedIndex].value;
    let checkItemExist = false;
    // set item data in the local storage
    for (let i = 0; i < itemsData.length; i++) {
      if (productId == itemsData[i].Id) {
        itemsData[i].number = number;
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
        number: number
      };

      itemsData.push(item);
    }

    localStorage.setItem("sideCart", JSON.stringify(itemsData));
  });
};

addToCart(AddToCart, price, maxQuantity, productId, pro, image);

// if (localStorage.getItem("noon") === null) {
//   console.log("no exixt");
// } else {
//   console.log("exist");
//   if (localStorage.getItem("noon") == "") {
//     console.log("empty");
//   } else {
//     console.log("no empty");
//   }
// }
