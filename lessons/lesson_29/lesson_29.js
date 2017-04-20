/* globals doT $*/

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
	get: function (id) {
		return this._data.find(function (obj) {
			return obj.id === id;
		});
	},
	forEach: function (callback) {
		this._data.forEach(callback);
	}
});

var Table = inherit(EventEmitter, {
	$constructor: function (container) {
		EventEmitter.apply(this);
		this._table = document.createElement('table');
		this._table.className = 'table';
		container.appendChild(this._table);
		this._table.addEventListener('click', this._onTableClick.bind(this));
		this._template = doT.template(
			'<td>{{!it.name}}</td>' +
			'<td>{{!it.price.toFixed(2)}}</td>' +
			'<td>{{!it.count+""}}</td>' +
			'<td><button class="delete">Delete</button></td>'
		);
	},
	appendRow: function (rowData) {
		var row = document.createElement('tr');
		row.innerHTML = this._generateRowHTML(rowData);
		row.setAttribute('data-id', rowData.id);
		this._table.appendChild(row);
	},
	updateRow: function (rowData) {
		var row = this._table.querySelector('[data-id="' + rowData.id + '"]');
		row.innerHTML = this._generateRowHTML(rowData);
		this._table.querySelector('.tr_active').classList.remove('tr_active');
	},
	removeRow: function (rowData) {
		var row = this._table.querySelector('[data-id="' + rowData.id + '"]');
		row.parentNode.removeChild(row);
	},
	_generateRowHTML: function (rowData) {
		return this._template(rowData);
	},
	_onTableClick: function (event) {
		var row = event.target.closest('tr');
		if (!row) {
			return;
		}
		var id = parseInt(row.dataset.id);
		var deleteButton = event.target.closest('.delete');
		if (deleteButton) {
			this.trigger('remove', id);
			return;
		}
		var rowActive = document.querySelector('.tr_active');
		if (rowActive) {
			rowActive.classList.remove('tr_active');
		}
		row.classList.add('tr_active');
		this.trigger('rowClick', id);
	}
});

var EditForm = inherit(EventEmitter, {
	$constructor: function () {
		EventEmitter.apply(this);
		this._nameInput = $('.name');
		this._priceInput = $('.price');
		this._countInput = $('.count');
		this._saveButton = $('.save');
		this._saveButton.on('click', this._saveData.bind(this));
	},
	startEdit: function (rowData) {
		this._editedRowData = rowData;
		this._nameInput.val(rowData.name);
		this._priceInput.val(rowData.price);
		this._countInput.val(rowData.count);
		this._nameInput.removeAttr('disabled');
		this._priceInput.removeAttr('disabled');
		this._countInput.removeAttr('disabled');
		this._saveButton.removeAttr('disabled');
	},
	_saveData: function () {
		this._editedRowData.name = this._nameInput.val() || 'unknown';
		this._editedRowData.price = parseFloat(this._priceInput.val()) || 0;
		this._editedRowData.count = parseInt(this._countInput.val()) || 0;
		this._nameInput.val('');
		this._priceInput.val('');
		this._countInput.val('');
		this._nameInput.attr('disabled', '');
		this._priceInput.attr('disabled', '');
		this._countInput.attr('disabled', '');
		this._saveButton.attr('disabled', '');
		this.trigger('save', this._editedRowData);
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

document.addEventListener('DOMContentLoaded', function init() {
	var table = new Table(document.querySelector('.container'));
	var editForm = new EditForm();
	var storage = new Storage(data);
	storage.on('add', table.appendRow.bind(table));
	storage.on('update', table.updateRow.bind(table));
	storage.on('remove', table.removeRow.bind(table));
	storage.forEach(function (rowData) {
		table.appendRow(rowData);
	});
	table.on('remove', storage.remove.bind(storage));
	table.on('rowClick', function (id) {
		var rowData = storage.get(id);
		editForm.startEdit(rowData);
	});
	editForm.on('save', storage.update.bind(storage));
	$('.add').on('click', function onAddRow() {
		var rowData = {
			name: 'unknown',
			price: 0,
			count: 0
		};
		storage.add(rowData);
	});
});