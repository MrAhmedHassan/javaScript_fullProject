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
  "description=Notebook%20Basic%2018%20with%202,80%20…M,%201000%20GB%20Hard%20Disc,%20Windows%208%20Pro",
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
catHolder.innerHTML=cat;


// to insert product name
let pro = subQueryString[3].split("=")[1].split("%20");
let proHolder = document.getElementById("proname");
proHolder.innerHTML=pro;

// to insert description
let desc = subQueryString[4].split("=")[1].split("%20");
let descHolder = document.getElementById("desc");
descHolder.innerHTML=desc;


// to insert price 
let pri = subQueryString[5].split("=")[1];
let priHolder = document.getElementById("1");
priHolder.innerHTML=pri + "$";

