# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.data import date_diff

class Reservation(Document):
	def before_save(self):
		#find range of date 
		self.range_of_date = date_diff(self.check_out, self.check_in)
		if self.range_of_date == 0: #check range of date can't be 0
			frappe.throw("Invaild value for Check Out!! Plz check it out!!! ")

		# checking room status 
		room_infor = frappe.get_doc("Room Information", self.room_information)
		if room_infor.status == "Issued":
			frappe.throw("Sorry!!! this room can't use because is has a problems")
		elif room_infor.status == "Unavailable":
			frappe.throw("Sorry!!! this room is be long to other Reservation")
		elif room_infor.status == "Available":
			frappe.msgprint("Please check your information before submit")

		#check date in can me less than Reservation date
		if self.check_in < self.reservation_date:
			frappe.throw("Sorry Check In must be during or after Reservation")

		#compute accommodation price (price for stay)
		self.accommodation_price = self.room_price * self.range_of_date
	def before_submit(self):
		room_infor = frappe.get_doc("Room Information", self.room_information)
		room_infor.status = "Unavailable"
		room_infor.save()
		# #discount for person who pay more than 50 dis 5% and 100 dis 10%
		# if self.accommodation_price >= 50:
		# 	room_discount = self.accommodation_price - (self.accommodation_price * 0.05)
		# elif self.accommodation_price >= 100:
		# 	room_discount = self.accommodation_price - (self.accommodation_price * 0.1 )