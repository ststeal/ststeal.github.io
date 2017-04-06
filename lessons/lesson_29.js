var data = [{
	id: 1,
	name: 'Hammer',
	price: 282,
	count: 999
}, {
	id: 2,
	name: 'Boat',
	price: 11282.12,
	count: 6
}];
var idIncrement = 3;
var table;
var nameInput, priceInput, countInput, saveButton;
var editedRowData;
function encode(str) {
	return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function createTable(container) {
	table = document.createElement('table');
	table.className = 'table';
	container.appendChild(table);
}
function generateRowHTML(rowData) {
	return '<td>' + encode(rowData.name) + '</td>' +
		'<td>' + encode(rowData.price.toFixed(2)) + '</td>' +
		'<td>' + encode(rowData.count + '') + '</td>' +
		'<td><button class="delete">Delete</button></td>';
}
function appendRow(rowData) {
	var row = document.createElement('tr');
	row.innerHTML = generateRowHTML(rowData);
	row.setAttribute('data-id', rowData.id);
	table.appendChild(row);
}
function updateRow(rowData) {
	var row = table.querySelector('[data-id="' + rowData.id + '"]');
	row.innerHTML = generateRowHTML(rowData);
}
function addRow() {
	var rowData = {
		id: idIncrement++,
		name: 'unknown',
		price: 0,
		count: 0
	};
	data.push(rowData);
	appendRow(rowData);
}
function getRowDataById(id) {
	return data.find(function (rowData) {
		return rowData.id === id;
	});
}
function removeRow(id) {
	data = data.filter(function (rowData) {
		return rowData.id !== id;
	});
}
function saveData() {
	editedRowData.name = nameInput.value || 'unknown';
	editedRowData.price = parseFloat(priceInput.value) || 0;
	editedRowData.count = parseInt(countInput.value) || 0;
	updateRow(editedRowData);
	nameInput.value = '';
	priceInput.value = '';
	countInput.value = '';
	nameInput.setAttribute('disabled', '');
	priceInput.setAttribute('disabled', '');
	countInput.setAttribute('disabled', '');
	saveButton.setAttribute('disabled', '');
	document.querySelector('.tr_active').classList.remove('tr_active');
}
function initEditForm() {
	nameInput = document.querySelector('.name');
	priceInput = document.querySelector('.price');
	countInput = document.querySelector('.count');
	saveButton = document.querySelector('.save');
	saveButton.addEventListener('click', saveData);
}
function startEdit(rowData) {
	editedRowData = rowData;
	nameInput.value = rowData.name;
	priceInput.value = rowData.price;
	countInput.value = rowData.count;
	nameInput.removeAttribute('disabled');
	priceInput.removeAttribute('disabled');
	countInput.removeAttribute('disabled');
	saveButton.removeAttribute('disabled');
}
function onTableClick(event) {
	var row = event.target.closest('tr');
	if (!row) {
		return;
	}
	var id = parseInt(row.dataset.id);
	var deleteButton = event.target.closest('.delete');
	if (deleteButton) {
		row.parentNode.removeChild(row);
		removeRow(id);
		return;
	}
	var rowActive = document.querySelector('.tr_active');
	if (rowActive) {
		rowActive.classList.remove('tr_active');
	}
	row.classList.add('tr_active');
	var rowData = getRowDataById(id);
	startEdit(rowData);
}
function init() {
	createTable(document.querySelector('.container'));
	data.forEach(function (rowData) {
		appendRow(rowData);
	});
	initEditForm();
	document.querySelector('.add').addEventListener('click', addRow);
	table.addEventListener('click', onTableClick);
}
document.addEventListener('DOMContentLoaded', init);