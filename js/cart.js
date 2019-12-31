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

  let totalItemsPriceDiv = document.createElement("div");
  totalItemsPriceDiv.setAttribute("value", 0);

  let totalItemsPrice = 0;

  itemsFromLocalStorage.forEach(element => {
    // get items data from the local storage
    let product_id = element.Id;
    let product_name = element.name;
    let product_image = element.image;
    let product_price = +element.price;
    let product_number = +element.number;
    let product_max_quantity = +element.quantity;

    totalItemsPrice = totalItemsPrice + product_price * product_number;
    totalItemsPriceDiv.setAttribute("value", totalItemsPrice);
    totalItemsPriceDiv.innerHTML = totalItemsPrice;

    let container_12col_parent = document.createElement("div");
    let container_row_child = document.createElement("div");
    container_12col_parent.appendChild(container_row_child);
    items.appendChild(container_12col_parent);

    //   product column
    let product = document.createElement("div");
    let img = document.createElement("img");
    let productName = document.createElement("div");
    img.src = product_image;
    productName.innerHTML = product_name;
    product.appendChild(img);
    product.appendChild(productName);
    container_row_child.appendChild(product);

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
    container_row_child.appendChild(quantityField);

    //   price column
    let price = document.createElement("div");
    price.innerHTML = product_price;
    container_row_child.appendChild(price);

    //   totalPrice column
    let totalPrice = document.createElement("div");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    totalPrice.value = +selectedValue * product_price;
    totalPrice.innerHTML = +selectedValue * product_price;
    container_row_child.appendChild(totalPrice);

    //   removeBtn Column
    let removeItemDiv = document.createElement("div");
    let removeItem = document.createElement("button");
    removeItem.innerHTML = "Remove";
    removeItem.setAttribute("id", product_id);
    removeItemDiv.appendChild(removeItem);
    container_row_child.appendChild(removeItemDiv);

    container_row_child.appendChild(totalItemsPriceDiv);

    //   bootStrap Classes
    product.classList.add("col-md-3");
    quantityField.classList.add("col-md-3");
    price.classList.add("col-md-2");
    totalPrice.classList.add("col-md-2");
    removeItemDiv.classList.add("col-md-2");
    img.classList.add("img-fluid");
    container_12col_parent.classList.add("col-12");
    container_row_child.classList.add("row");
    container_row_child.classList.add("item-row");

    // change the quantity of the product
    selectBox.addEventListener("input", () => {
      totalItemsPrice = 0;
      let changedSelectedValue = +selectBox.options[selectBox.selectedIndex]
        .value;
      let localStorageArr = JSON.parse(localStorage.getItem("sideCart"));
      for (let i = 0; i < localStorageArr.length; i++) {
        if (selectBox.getAttribute("id") == localStorageArr[i].Id) {
          localStorageArr[i].number = changedSelectedValue;
        }

        // console.log(totalItemsPrice);
        totalItemsPrice =
          totalItemsPrice +
          localStorageArr[i].number * localStorageArr[i].price;
      }
      totalItemsPriceDiv.setAttribute("value", totalItemsPrice);
      totalItemsPriceDiv.innerHTML = totalItemsPrice;

      localStorage.setItem("sideCart", JSON.stringify(localStorageArr));
      totalPrice.value = +changedSelectedValue * product_price;
      totalPrice.innerHTML = +changedSelectedValue * product_price;
    });

    // remove any Item
    removeItem.addEventListener("click", () => {
      totalItemsPrice = 0;
      removeItem.parentElement.parentElement.parentElement.remove();
      let localStorageArr = JSON.parse(localStorage.getItem("sideCart"));

      let arrayAfterDeleteItem = localStorageArr.filter(element => {
        if (element.Id != product_id) {
          return element;
        }
      });

      for (let i = 0; i < arrayAfterDeleteItem.length; i++) {
        totalItemsPrice =
          totalItemsPrice +
          arrayAfterDeleteItem[i].number * arrayAfterDeleteItem[i].price;
      }
      totalItemsPriceDiv.setAttribute("value", totalItemsPrice);
      totalItemsPriceDiv.innerHTML = totalItemsPrice;
      console.log(totalItemsPrice);
      localStorage.setItem("sideCart", JSON.stringify(arrayAfterDeleteItem));
    });
  });
};

viewItem();
