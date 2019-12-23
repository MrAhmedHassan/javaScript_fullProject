let sendHttpRequest = (method, url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.send();

    xhr.responseType = "json";

    xhr.onload = () => {
      resolve(xhr.response);
    };
  });
  return promise;
};

let getData = () => {
  sendHttpRequest(
    "GET",
    "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
  ).then(responseData => {
    useData(responseData);
  });
};

let useData = data => {
  let productsData = data.ProductCollection;
  console.log(productsData);
  productsData.forEach(element => {
    viewData(element.Name, element.Price, element.ProductPicUrl);
    console.log(element);
  });
};

let viewData = (name, price, photo) => {
  //creat html elements
  let mainDiv = document.querySelector("#allData");
  let itemDiv = document.createElement("div");
  let imgDiv = document.createElement("div");
  let itemImg = document.createElement("img");
  let itemHeader = document.createElement("h5");
  let itemPrice = document.createElement("h4");

  //set the values in the elements
  itemHeader.innerText = name;
  itemPrice.innerText = `$${price}`;
  itemImg.src = photo;

  //add bootstrap classes
  itemDiv.classList.add("col-md-4");
  itemDiv.classList.add("d-flex");
  itemDiv.classList.add("flex-column");
  // itemDiv.classList.add("justify-content-center");
  itemHeader.classList.add("align-self-center");
  itemPrice.classList.add("align-self-start");
  itemPrice.classList.add("mt-auto");
  itemDiv.classList.add("align-content-between");
  itemImg.classList.add("img-fluid");
  imgDiv.classList.add("align-items-center");
  imgDiv.classList.add("m-auto");

  //add css classes
  itemHeader.classList.add("item-header");
  itemPrice.classList.add("item-price");
  itemDiv.classList.add("item");

  //append element inside each other
  itemDiv.appendChild(itemHeader);
  imgDiv.appendChild(itemImg);
  itemDiv.appendChild(imgDiv);
  itemDiv.appendChild(itemPrice);
  mainDiv.appendChild(itemDiv);
};
getData();
