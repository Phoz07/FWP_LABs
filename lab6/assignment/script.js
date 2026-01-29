const orderId = document.getElementById("order-id");
const customerName = document.getElementById("customer-name");
const email = document.getElementById("email");
const productList = document.getElementById("product-list");
const shippingAddress = document.getElementById("shipping-address");

const handleFetch = () => {
  fetch("./orders.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      handleDisplay(data);
    })
    .catch((error) => console.error("Error:", error));
};

const handleDisplay = (data) => {
  orderId.textContent = data.orderId;
  customerName.textContent = data.customer.name;
  email.textContent = data.customer.email;

  data.items.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.productId}</td>
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${product.price}</td>
      <td>${product.quantity * product.price}</td>
    `;
    productList.appendChild(row);
  });

  shippingAddress.textContent =
    data.shipping.address.street +
    ", " +
    data.shipping.address.city +
    ", " +
    data.shipping.address.state +
    " " +
    data.shipping.address.zipCode;
};

window.onload = () => {
  handleFetch();
};
