var data = [{
	id: 1,
	name: 'Hammer',
	price: 282,
	count: 999
}, {
	id: 2,
	name: 'Boat',
	price: 11282,
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
		'<td>' + encode(rowData.price + '') + '</td>' +
		'<td>' + encode(rowData.count + '') + '</td>';
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
		return String(rowData.id) === String(id);
	});
}
function saveData() {
	editedRowData.name = nameInput.value;
	editedRowData.price = priceInput.value;
	editedRowData.count = countInput.value;
	updateRow(editedRowData);
	nameInput.value = '';
	priceInput.value = '';
	countInput.value = '';
	nameInput.setAttribute('disabled', '');
	priceInput.setAttribute('disabled', '');
	countInput.setAttribute('disabled', '');
	saveButton.setAttribute('disabled', '');
	saveButton.classList.remove('active_button');
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
	saveButton.classList.add('active_button');
}
function onTableClick(event) {
	var rowActive = document.querySelector('.tr_active');
	if (rowActive) {
		rowActive.classList.remove('tr_active');
	}
	var row = event.target.closest('tr');
	if (!row) {
		return;
	}
	row.classList.add('tr_active');
	var id = row.dataset.id;
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