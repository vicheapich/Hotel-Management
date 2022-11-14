# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt
from __future__ import unicode_literals
from frappe import _
import frappe


def execute(filters=None):
	return get_columns(), get_data(filters)
def get_data(filters):
	checkin, checkout = filters.get('check_in'), filters.get('check_out')
	conditions = "1=1"
	if(filters.get('customer')):conditions += f" and customer = '{filters.get('customer')}'"
	if(filters.get('check_in')):conditions += f" and check_in >= '{checkin}'"
	if(filters.get('check_out')):conditions += f" and check_out <= '{checkout}'"
	if(filters.get('status')):conditions += f" and status = '{filters.get('status')}'"
	# print("========================================> status: ",status)
	data = frappe.db.sql(f"""SELECT customer,customer_name,room_information,
	room_type,room_price,check_in,check_out,range_of_date,reservation_date,accommodation_price,
	status FROM `tabReservation` where {conditions};""")
	return data
def get_columns():
		return[
			"ID:Link/Reservation:100",
			"Customer Name:Data:120",
			"Room Information:Link/Room Information:130",
			"Room Type:Data:120",
			"Room Price:Currency:100",
			"Check In:Date:120",
			"Check Out:Date:120",
			"Range of Date:Int:80",
			"Reservation Date:Date:140",
			"Accommodation Price:Currency:120",
			"Status:Select:120"
		]