function EventEmitter() {
	this._handlers = {};
}

EventEmitter.prototype.on = function (name, handler) {
	if (!this._handlers[name]) {
		this._handlers[name] = [];
	}
	this._handlers[name].push(handler);
};

EventEmitter.prototype.trigger = function (name, data) {
	if (!this._handlers[name]) {
		return;
	}
	this._handlers[name].forEach(function (handler) {
		handler.call(this, data);
	}, this);
};

function inherit(base, props) {
	var res = props.$constructor;
	res.prototype = Object.create(base.prototype);
	for (var prop in props) {
		if (props.hasOwnProperty(prop)) {
			res.prototype[prop] = props[prop];
		}
	}
	return res;
}

var Storage = inherit(EventEmitter, {
	$constructor: function (data) {
		EventEmitter.apply(this);
		this._data = data;
		this._id = Math.max.apply(Math, data.map(function (obj) {
			return obj.id;
		}));
	},
	add: function (obj) {
		obj.id = ++this._id;
		this._data.push(obj);
		this.trigger('add', obj);
	},
	remove: function (id) {
		var index = this._data.findIndex(function (obj2) {
			return obj2.id === id;
		});
		var obj = this._data[index];
		this._data.slice(index, 1);
		this.trigger('remove', obj);
	},
	update: function (obj) {
		var index = this._data.findIndex(function (obj2) {
			return obj2.id === obj.id;
		});
		this._data[index] = obj;
		this.trigger('update', obj);
	},
	get:function (id) {
		return this._data.find(function (obj) {
			return obj.id === id;
		});
	},
	forEach: function (callback) {
		this._data.forEach(callback);
	}
});

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
var storage;
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
function onAddRow() {
	var rowData = {
		name: 'unknown',
		price: 0,
		count: 0
	};
	storage.add(rowData);
}
function removeRow(rowData) {
	var row = table.querySelector('[data-id="' + rowData.id + '"]');
	row.parentNode.removeChild(row);
}
function saveData() {
	editedRowData.name = nameInput.value || 'unknown';
	editedRowData.price = parseFloat(priceInput.value) || 0;
	editedRowData.count = parseInt(countInput.value) || 0;
	storage.update(editedRowData);
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
		storage.remove(id);
		return;
	}
	var rowActive = document.querySelector('.tr_active');
	if (rowActive) {
		rowActive.classList.remove('tr_active');
	}
	row.classList.add('tr_active');
	var rowData = storage.get(id);
	startEdit(rowData);
}
function init() {
	storage = new Storage(data);
	storage.on('add',appendRow);
	storage.on('update',updateRow);
	storage.on('remove',removeRow);
	createTable(document.querySelector('.container'));
	storage.forEach(function (rowData) {
		appendRow(rowData);
	});
	initEditForm();
	document.querySelector('.add').addEventListener('click', onAddRow);
	table.addEventListener('click', onTableClick);
}
document.addEventListener('DOMContentLoaded', init);