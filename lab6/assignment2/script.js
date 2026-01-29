function SaveForm() {
  let fname = document.getElementById("FirstName").value;
  let lname = document.getElementById("LastName").value;
  let country = document.getElementById("Country").value;
  // save data to local storage
  localStorage.setItem("userFirstName", fname);
  localStorage.setItem("userLastName", lname);
  localStorage.setItem("userCountry", country);

  alert("Data saved");
}
function LoadData() {
  // load data from local storage
  let fn = localStorage.getItem("userFirstName");
  let ln = localStorage.getItem("userLastName");
  let cn = localStorage.getItem("userCountry");

  document.getElementById("FirstName").value = fn;
  document.getElementById("LastName").value = ln;
  document.getElementById("Country").value = cn;
}

const ClearData = () => {
  localStorage.removeItem("userFirstName");
  localStorage.removeItem("userLastName");
  localStorage.removeItem("userCountry");
};
