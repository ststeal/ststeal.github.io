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
	$constructor: function ($container) {
		EventEmitter.apply(this);
		this._$table = $('<table>').addClass('table').on('click', this._onTableClick.bind(this));
		$container.append(this._$table);
		this._template = doT.template(
			'<td>{{!it.name}}</td>' +
			'<td>{{!it.price.toFixed(2)}}</td>' +
			'<td>{{!it.count+""}}</td>' +
			'<td><button class="delete">Delete</button></td>'
		);
	},
	appendRow: function (rowData) {
		var $row = $('<tr>').attr('data-id', rowData.id).html(this._generateRowHTML(rowData));
		this._$table.append($row);
	},
	updateRow: function (rowData) {
		this._$table.find('[data-id="' + rowData.id + '"]').html(this._generateRowHTML(rowData));
		this._$table.find('.tr_active').removeClass('tr_active');
	},
	removeRow: function (rowData) {
		this._$table.find('[data-id="' + rowData.id + '"]').remove();
	},
	_generateRowHTML: function (rowData) {
		return this._template(rowData);
	},
	_onTableClick: function (event) {
		var $target = $(event.target);
		var $row = $target.closest('tr');
		if ($row.length===0) {
			return;
		}
		var id = parseInt($row.data('id'));
		if ($target.closest('.delete').length !== 0) {
			this.trigger('remove', id);
			return;
		}
		$('.tr_active').removeClass('tr_active');
		$row.addClass('tr_active');
		this.trigger('rowClick', id);
	}
});

var EditForm = inherit(EventEmitter, {
	$constructor: function () {
		EventEmitter.apply(this);
		this._$nameInput = $('.name');
		this._$priceInput = $('.price');
		this._$countInput = $('.count');
		this._$saveButton = $('.save');
		this._$saveButton.on('click', this._saveData.bind(this));
	},
	startEdit: function (rowData) {
		this._editedRowData = rowData;
		this._$nameInput.val(rowData.name);
		this._$priceInput.val(rowData.price);
		this._$countInput.val(rowData.count);
		this._$nameInput.removeAttr('disabled');
		this._$priceInput.removeAttr('disabled');
		this._$countInput.removeAttr('disabled');
		this._$saveButton.removeAttr('disabled');
	},
	_saveData: function () {
		this._editedRowData.name = this._$nameInput.val() || 'unknown';
		this._editedRowData.price = parseFloat(this._$priceInput.val()) || 0;
		this._editedRowData.count = parseInt(this._$countInput.val()) || 0;
		this._$nameInput.val('').attr('disabled', '');
		this._$priceInput.val('').attr('disabled', '');
		this._$countInput.val('').attr('disabled', '');
		this._$saveButton.attr('disabled', '');
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

$(window).ready(function init() {
	var table = new Table($('.container'));
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