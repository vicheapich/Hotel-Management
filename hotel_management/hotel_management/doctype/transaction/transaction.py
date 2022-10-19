# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.data import today
from frappe.model.docstatus import DocStatus

class Transaction(Document):
	#everything before save
	def before_save(self):
		self.check_transaction_date()
	#everything after submit
	
#funtions
	#check tancsaction date 
	def check_transaction_date(self):
		if self.transaction_date > today():
			frappe.throw("Transaction Date must Today")
		elif self.transaction_date < today():
			frappe.throw("Transaction Date must Today")
	#change reservation status


	# def before_submit(self):		
	# 	if self.status == "Paid":
	# 		reservation = frappe.get_doc("Reservation", self.reservation)
	# 		reservation.status = "Checked Out"
	# 		reservation.save()
	# 	elif self.status == "Unpaid":
	# 		reservation = frappe.get_doc("Reservation", self.reservation)
	# 		reservation.status = "Staying"
	# 		reservation.save()

