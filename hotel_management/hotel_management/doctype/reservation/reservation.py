# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.data import date_diff

class Reservation(Document):
	def before_save(self):
		#find range of date 
		self.range_of_date = date_diff(self.check_out, self.check_in) + 1
		if self.range_of_date == 0: #check range of date can't be 0
			frappe.throw("Invaild value for Check Out!! Plz check it out!!! ")
			
		#check date in can me less than Reservation date
		if self.check_in < self.reservation_date:
			frappe.throw("Sorry Check In must be during or after Reservation")

		# checking room status 
		room_infor = frappe.get_doc("Room Information", self.room_information)
		if room_infor.status == "Issued":
			frappe.throw("Sorry!!! this room can't use because is has a problems")
		elif room_infor.status == "Unavailable":
			frappe.throw("Sorry!!! this room is be long to other Reservation")
		elif room_infor.status == "Available":
			frappe.msgprint("Please check your information before submit")

		#compute accommodation price (price for stay)
		#self.accommodation_price = self.room_price * self.range_of_date

	#change status room when on_submit and on_cancel
	def on_submit(self):
		room_infor = frappe.get_doc("Room Information", self.room_information)
		room_infor.status = "Unavailable"
		room_infor.save()
	def on_cancel(self):
		room_infor = frappe.get_doc("Room Information", self.room_information)
		room_infor.status = "Available"
		room_infor.save()