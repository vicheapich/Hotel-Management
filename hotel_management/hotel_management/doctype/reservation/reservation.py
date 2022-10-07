# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.data import date_diff

class Reservation(Document):
	def before_save(self):
		self.range_of_date = date_diff(self.check_out, self.check_in)



		# if self.range_of_date == 0:
		# 	frappe.throw("Invaild value for Check Out!! Plz check it out!!! ")
		# room_infor = frappe.get_doc("Room Information", self.room_information)
		# if room_infor.status == "Issued":
		# 	frappe.throw("HI IM HERE")
		# elif room_infor.status == "Unavailable":
		# 	frappe.throw("HI IM HERE TOO")
		# elif room_infor.status == "Available":
		# 	frappe.msgprint("Welcame")
		# 	room_infor.status = "Unavailable"
		# 	room_infor.save()
		# else:
		# 	frappe.throw("Incorrect room status")