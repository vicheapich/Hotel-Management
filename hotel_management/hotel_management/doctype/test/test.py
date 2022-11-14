# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe.model.document import Document

class Test(Document):
	def after_insert(self):
		doc = frappe.new_doc('Room Take Noted')
		doc.check_in = self.check_in
		doc.check_out = self.check_out
		doc.range_of_date = self.range_of_date
		for i in self.room:
			doc.append('room',{
				'room_name': i.room_name,
				'room_price': i.room_price,
				'room_type': i.room_type,
				'room_status': i.room_status,
				'description': i.description
			})
		doc.insert()