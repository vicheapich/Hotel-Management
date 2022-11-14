# Copyright (c) 2013, D-codE and contributors
# For license information, please see license.txt

import frappe
from frappe import _



def execute(filters=None):
	if not filters: filters = {}

	data, columns = [], []

	# columns = get_columns()
	cs_data = get_cs_data(filters)

	# if not cs_data:
	# 	msgprint(_('No records found'))
	# 	return columns, cs_data

	data = []
	for d in cs_data:
		row = frappe._dict({
				'room_name': d.room_name,
				'price': d.price,
				'status': d.status
			})
		data.append(row)

	chart = get_chart_data(data)
	report_summary = get_report_summary(data)
	return columns,  data, None, chart,report_summary


# def get_columns():
# 	return [
# 		{
# 			'fieldname': 'room_name',
# 			'label': _('Room Name'),
# 			'fieldtype': 'Link',
# 			'options':'Room Type',
# 			'width': '120'
# 		},
# 		{
# 			'fieldname': 'price',
# 			'label': _('Price'),
# 			'fieldtype': 'Currency',
# 			'width': '120'
# 		},
# 		{
# 			'fieldname': 'status',
# 			'label': _('Status'),
# 			'fieldtype': 'select',
# 			'width': '120'
# 		},
	
# 	]

def get_cs_data(filters):
	conditions = get_conditions(filters)
	data = frappe.get_all(
		doctype='Room Information',
		fields=['room_name', 'price', 'status'],
		filters=conditions,
		order_by='room_name desc'
	)
	return data

def get_conditions(filters):
	conditions = {}
	for key, value in filters.items():
		if filters.get(key):
			conditions[key] = value

	return conditions


def get_chart_data(data):
	if not data:
		return None

	labels = ['Price = 15','Price = 20']

	price_data = {
		'Price = 20': 0,
		'Price = 15': 0,
	}
	datasets = []

	for entry in data:
		if entry.price <= 15:
			price_data['Price = 15'] += 1
			
		else:
			price_data['Price = 20'] += 1

	datasets.append({
		'name': 'Price Status',
		'values': [price_data.get('Price = 15'),price_data.get('Price = 20')]
	})

	chart = {
		'data': {
			'labels': labels,
			'datasets': datasets
		},
		'type': 'pie',
		'height': 300,
	}

	return chart


def get_report_summary(data):
	if not data:
		return None

	price_Equal_15, price_Eaual_20 = 0, 0

	for entry in data:
		if entry.price <= 15:
			price_Equal_15 += 1
			
		else:
			price_Eaual_20 += 1
	return [
		{
			'value': price_Equal_15,
			'indicator': 'Green',
			'label': 'Price Equal 15',
			'datatype': 'Int',
		},
		{
			'value': price_Eaual_20,
			'indicator': 'Red',
			'label': 'Price Eaual 20',
			'datatype': 'Int',
		}
	]