const tableBody = document.getElementById("table-body");

const handleFetch = () => {
  const data = fetch("./employees.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderTable(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  return data;
};

const renderTable = (data) => {
  data.map((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.id}</td>
      <td>${employee.FirstName} ${employee.LastName}</td>
      <td>${employee.Gender === "Male" ? "M" : "F"}</td>
      <td>${employee.Position}</td>
      <td>${employee.Address}</td>
    `;
    tableBody.appendChild(row);
  });
};

window.onload = () => {
  handleFetch();
};
