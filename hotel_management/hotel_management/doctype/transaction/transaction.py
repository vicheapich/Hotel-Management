# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe.model.document import Document
from frappe.utils.data import today

class Transaction(Document):
	def before_save(self):
		self.check_transaction_date()

	def check_transaction_date(self):
		if self.transaction_date > today():
			frappe.throw("Transaction Date must ")
