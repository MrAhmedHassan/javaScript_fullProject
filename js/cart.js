console.log("Hello Cart");

// if (!localStorage.getItem("new") === null) {
//   console.log("Yes");
// } else {
//   console.log("no");
// }

// if ("new" in localStorage) {
//   alert("yes");
// } else {
//   alert("no");
// }
let viewItem = () => {
  let items = document.querySelector("#items");

  let itemsFromLocalStorage = JSON.parse(localStorage.getItem("sideCart"));

  itemsFromLocalStorage.forEach(element => {
    // get items data from the local storage
    let product_id = element.Id;
    let product_name = element.name;
    let product_image = element.image;
    let product_price = +element.price;
    let product_number = +element.number;
    let product_max_quantity = +element.quantity;

    //   product column
    let product = document.createElement("div");
    let img = document.createElement("img");
    let productName = document.createElement("div");
    img.src = product_image;
    productName.innerHTML = product_name;
    product.appendChild(img);
    product.appendChild(productName);
    items.appendChild(product);

    //   quantity column
    let quantityField = document.createElement("div");
    let selectBox = document.createElement("select");
    selectBox.setAttribute("id", product_id);
    for (let i = 1; i <= product_max_quantity; i++) {
      let quantity = document.createElement("option");
      quantity.value = i;
      quantity.innerHTML = i;
      if (quantity.value == product_number) {
        quantity.setAttribute("selected", true);
      }
      selectBox.appendChild(quantity);
    }

    quantityField.appendChild(selectBox);
    items.appendChild(quantityField);

    //   price column
    let price = document.createElement("div");
    price.innerHTML = product_price;
    items.appendChild(price);

    //   totalPrice column
    let totalPrice = document.createElement("div");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    totalPrice.value = +selectedValue * product_price;
    totalPrice.innerHTML = +selectedValue * product_price;
    items.appendChild(totalPrice);

    //   removeBtn Column
    let removeItem = document.createElement("button");
    removeItem.innerHTML = "Remove";
    removeItem.setAttribute("id", product_id);
    items.appendChild(removeItem);

    //   bootStrap Classes
    product.classList.add("col-3");
    product.classList.add("col-3");
    quantityField.classList.add("col-3");
    price.classList.add("col-2");
    totalPrice.classList.add("col-2");
    removeItem.classList.add("col-2");
    img.classList.add("img-fluid");

    // change the quantity of the product
    selectBox.addEventListener("input", () => {
      let changedSelectedValue = +selectBox.options[selectBox.selectedIndex]
        .value;
      let localStorageArr = JSON.parse(localStorage.getItem("sideCart"));
      for (let i = 0; i < localStorageArr.length; i++) {
        if (selectBox.getAttribute("id") == localStorageArr[i].Id) {
          localStorageArr[i].number = changedSelectedValue;
        }
      }

      localStorage.setItem("sideCart", JSON.stringify(localStorageArr));
      totalPrice.value = +changedSelectedValue * product_price;
      totalPrice.innerHTML = +changedSelectedValue * product_price;
    });

    // remove any Item
    removeItem.addEventListener("click", () => {
      let localStorageArr = JSON.parse(localStorage.getItem("sideCart"));
      //   localStorageArr.splice( localStorageArr.indexOf('foo'), 1 )
      for (let i = 0; i < localStorageArr.length; i++) {
        if (removeItem.getAttribute("id") == localStorageArr[i].Id) {
          //   localStorageArr[i].number = changedSelectedValue;
          localStorageArr.splice(localStorageArr[i], 1);
          console.log("helllo for");
        }
      }
      localStorage.setItem("sideCart", JSON.stringify(localStorageArr));
      console.log("helllo out for");
    });
  });
};

viewItem();
