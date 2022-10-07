# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class Customer(Document):
	def validate(self):
		if self.gender == "Male":
			self.full_name = f'mr. {self.first_name} {self.last_name or " "}'.upper()
		elif self.gender == "Female":
			self.full_name = f'ms.{self.first_name} {self.last_name or " "}'.upper()
		else:
			self.full_name = f'{self.first_name} {self.last_name or " "}'.upper()