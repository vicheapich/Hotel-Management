# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

import frappe
from frappe import throw
from frappe.model.document import Document

class RoomInformation(Document):
	def validate(self):
		if self.room_type == "Single Room":
			self.price = 15
			self.description = "HI THIS IS SINGLE ROOM"
		elif self.room_type == "Double Room":
			self.price = 20
			self.description= "HI THIS IS DOUBLE ROOM"
		elif self.room_type == "Deluxe Room":
			self.price = 25
			self.description = "HI THIS IS DELUXE ROOM"
		elif self.room_type == "Meeting Room":
			self.price = 50
			self.description = "HI THIS IS MEETING ROOM"
		else: 
			frappe.throw("INPUT ROOM AGAIN!!!!!")