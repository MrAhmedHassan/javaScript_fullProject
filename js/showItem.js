// console.log("Enjoy Mr Abdo :)");
// let url = window.location.href;
// let alllQueryString = url.split("?")[1];
// console.log(queryString);
// subQueryString = queryString.split("&");
// console.log(subQueryString);
let subQueryString = [
  "productId=HT-1002",
  "imgLink = https://openui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1002.jpg",
  "category=Laptops",
  "productName=Notebook%20Basic%2018",
  'description=Notebook%20Basic%2017%20with%202,80%20GHz%20quad%20core,%2017"%20LCD,%204%20GB%20DDR3%20RAM,%20500%20GB%20Hard%20Disc,%20Windows%208%20Pro ',
  "productPrice=1570",
  "productQuantity=10"
];

// console.log(subQueryString);

// let productImage = subQueryString.splice("=");
// let image =(productImage[1]);
// console.log(image);
// let imageHolder = document.getElementById("img1");
// imageHolder.setAttribute("src",image)
// console.log(imageHolder);

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
for (let i = 1; i <= maxQuantity; i++) {
  let optionInSelect = document.createElement("option");
  optionInSelect.value = i;
  optionInSelect.innerHTML = i;
  selectBox.appendChild(optionInSelect);
  // console.log(object);
}

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
