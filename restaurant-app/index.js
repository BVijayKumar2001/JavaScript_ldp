//Tables initial input

var tables = [
     {
      table_name: "table1",
      cost: 0,
      items: 0,
      orders: {},
    },
    {
      table_name: "table2",
      cost: 0,
      items: 0,
      orders: {},
    },
    {
      table_name: "table3",
      cost: 0,
      items: 0,
      orders: {},
    }
    ];

  const NO_OF_TABLES = tables.length;
  
//menu input

  const menu = {
    item1: {
      name: "French Fries",
      cost: 149,
      category: "starter",
    },
    item2: {
      name: "Manchuria",
      cost: 199,
      category: "starter",
    },
    item3: {
      name: "Chicken65",
      cost: 255,
      category: "starter",
    },
    item4: {
      name: "Chicken manchow soup",
      cost: 179,
      category: "starter",
    },
    item5: {
      name: "Chicken Biryani",
      cost: 255,
      category: "main course",
    },
    item6: {
      name: "curd rice" ,
      cost: 159,
      category: "main course",
    },
    item7: {
      name: "Mutton Biryani",
      cost: 320,
      category: "Main Course",
    },
    item8: {
      name: "Butter Naan",
      cost: 45,
      category: "Main Course",
    },
    item9: {
      name: "Kaddu ki Kheer",
      cost: 70,
      category: "Desserts",
    },
    item10: {
      name: "Double ka Meeta",
      cost: 70,
      category: "Desserts",
    }
  };
  
  const NO_OF_MENU_ITEMS = Object.keys(menu).length;

var tableId = document.getElementById("tables");
var menuId = document.getElementById("menu-items");
var modal = document.getElementById("myModal");

//function to display tables
function displayTables() {
    tableId.innerHTML = "";
    for( i = 0; i < NO_OF_TABLES; i++) {
      let cost = tables[i].cost; 
      let items = tables[i].items;
      let id = i+1;
      let table = `<li onclick="openModal('table${id}')" ondrop="drop(event,'table${id}')" ondragover="allowDrop(event)">
        <h3>Table ${id}</h3><br>
        <p>Rs ${cost} | Total items: ${items}</p>
        </li>`;
      tableId.insertAdjacentHTML("beforeend", table);
    }
  }

//function to display Menu
  function displayMenu() {
    menuId.innerHTML = "";
    for(i = 1; i <= NO_OF_MENU_ITEMS; i++) {
      let { name, cost, category } = menu["item" + i];
      let item = `<li id="item${i}" draggable="true" ondragstart="drag(event)">
        <h3>${name}</h3>
        <p>${cost}</p>
		    <p id="category">${category}</p>
        </li>
        `;
      menuId.insertAdjacentHTML("beforeend", item);
    }
  }


  displayTables();
  displayMenu();

  // function to search tables.
  function searchTable() {
    let searchKey = document.getElementById("table-search").value;
    
    searchKey = searchKey.toLowerCase();
    tableId.innerHTML = "";
    searchKey = searchKey.split(" ").join("");
    for( i = 0; i < NO_OF_TABLES; i++)
    {
        if( tables[i].table_name.includes(searchKey) )
        {
            let id = i+1;
            let cost = tables[i].cost; 
            let items = tables[i].items;
            let tableSearch = `<li onclick="openModal('table${id}')" ondrop="drop(event,'table${id}')" ondragover="allowDrop(event)">
            <h2>Table ${id}</h2>
            <p>Rs ${cost} | Total items: ${items}</p>
            </li>`;
        
            tableId.insertAdjacentHTML("beforeend", tableSearch);
        }
    }
  }

  //function to search items in menu
  function searchMenu() {
    let searchKey = document.getElementById("menu-search").value;
    searchKey = searchKey.toLowerCase();
  
    let i = 1;
  
    if (searchKey == "") {
      return;
    }
  
    menuId.innerHTML = "";
  
    while (menu["item" + i] != null) {
      let { name, cost, category } = menu["item" + i];
      let itemName = name.toLowerCase();
      let itemCategory = category.toLowerCase();
  
      if (itemName.includes(searchKey) || itemCategory.includes(searchKey)) {
        let item = `<li id="item${i}" draggable="true" ondragstart="drag(event)">
        <h2>${name}</h2>
		<p id="category">${category}</p>
        <p>${cost}</p>
        </li>`;
        menuId.insertAdjacentHTML("beforeend", item);
      }
      i++;
    }
  }

  //Drop start
function drag(e) {
    e.dataTransfer.setData("id", e.target.id);
  }
  
  //DropOver
  //By default dropping is not allowed but we disable it
  function allowDrop(e) {
    e.preventDefault();
  }
  
  //After dropping the item on table
  function drop(e, tableName) {
    addItemToTable(tableName, e.dataTransfer.getData("id"));
  }
  
  //For adding item to the table after dropping
  function addItemToTable(tableName, itemId) {
    let item = menu[itemId];
    let tableNumber = tableName[5] - 1; 
    if (tables[tableNumber]["orders"][itemId] == undefined) {
      tables[tableNumber]["orders"][itemId] = 1;
    } else {
      tables[tableNumber]["orders"][itemId] += 1;
    }
  
    //Displaying cost of items
    tables[tableNumber].cost += item.cost;
    tables[tableNumber]["items"] += 1;
    displayTables();
  }

  //Modal close
function closeModal() {
  modal.style.display = "none";
}
  
// Adding content to Modal
function openModal(tableNo) {
  modal.style.display = "block";
  let tableNumber = tableNo[5];
  document.getElementById("modal-header").innerHTML = `
	<h3>Table-${tableNumber} | Order Details</h3>
	<span class="close" onclick="closeModal()">&times;</span>
	`;

  let rows = document.getElementById("rows");
  rows.innerHTML = `<tr>
	<th>S.No</th>
	<th>Item</th>
	<th>Total Price</th>
	<th>Quantity</th>
	</tr><br>`;
  
  let table = tables[tableNumber-1];
  let cost = table.cost;
  let items = table.orders;
  let i = 1;
  // let n = items.length;
  // console.log(n);
  for (let [item, qty] of Object.entries(items)) {
    rows.insertAdjacentHTML(
      "beforeend",
      `
		<tr>
			<td>${i}.</td>
			<td>${menu[item].name}</td>
			<td>${menu[item].cost * qty}</td>
			<td><input type="number" id="qty${i}" min = "0" value="${qty}" oninput="changeQty('${i}','${item}','${tableNo}', this.value)" /></td>
			<td><button id="delete" onclick="deleteItem('${item}','${tableNo}')"><i class="fa fa-trash-o"></i></button></td>
		</tr><br>
		`
    );
    i++;
  }
  let total = document.getElementById("total");
  total.innerHTML = `TOTAL: ${cost}.00`;
  document.getElementById(
    "modal-footer"
  ).innerHTML = `<button id="bill" onclick="generateBill('${tableNo}')" >BILL</button>`;
}






//Change quantity of item
function changeQty(i, itemId, tableNo,val) {
  
  if(val<=0){
    
    return deleteItem(itemId, tableNo);
  }

  let qty = document.getElementById(`qty${i}`).value;
  
  
  let tableNumber = tableNo[5];
  let table = tables[tableNumber-1];
  
  table.orders[itemId] = parseInt(qty);
  let items = 0;
  let total = 0;
  for (let [item, qty] of Object.entries(table.orders)) {
    items += qty;
    total += menu[item].cost * qty;
  }
  table.items = items;
  table.cost = total;
  displayTables();
  openModal(tableNo);
  if(qty==0){
    delete table.orders[items];
    table.cost -= itemCost * itemQty;
    table.items -= itemQty;
    tables[tableNumber] = table;
    displayTables();
    openModal(tableNo);
  }
}

//Delete item from order
function deleteItem(item, tableNo) {
  
  let tableNumber = tableNo[5]-1;
  
  let table = tables[tableNumber];
  
  let itemCost = menu[item].cost;
  
  let itemQty = table.orders[item];
  
  

  delete table.orders[item];

  table.cost -= itemCost * itemQty;
  
  table.items -= itemQty;
  
  tables[tableNumber] = table;
 
  displayTables();
  openModal(tableNo);
  
}

// generate bill
function generateBill(tableNo) {

  let tableNumber = tableNo[5]-1;
  let table = tables[tableNumber];
  let total = table.cost;
  if(total===0){
    document.getElementById('bill').disabled=true;
    
  }
  if (total > 0) {
    table.cost = 0;
    table.items = 0;
    table.orders = {};
    tables[tableNo] = table;
    num=tableNumber+1;
    alert("Billing done for Table-"+num+" | Amount :"+total);
    closeModal();
    displayTables();
  }
}