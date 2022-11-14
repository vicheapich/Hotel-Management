# Copyright (c) 2022, admin and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.data import date_diff, today

class Reservation(Document):
	def validate(self):		
		#checking room status 
		room_infor = frappe.get_doc("Room Information", self.room_information)
		if room_infor.status != "Available":
			frappe.throw('Sorry for {} is Unavailable '.format(self.room_information))
	def on_submit(self):
		self.status = 'Checked In'        
		doc = frappe.get_doc('Reservation', self.name)
		doc.db_set('status', 'Checked In')
		room_infor = frappe.get_doc("Room Information", self.room_information)
		room_infor.status = "Unavailable"
		room_infor.save()
	def on_cancel(self):		
		self.status = 'Cancelled'        
		doc = frappe.get_doc('Reservation', self.name)
		doc.db_set('status', 'Cancelled')
		room_infor = frappe.get_doc("Room Information", self.room_information)
		room_infor.status = "Available"
		room_infor.save()
			
	def before_save(self):
		#find range of date 
		self.range_of_date = self.calculate_stay_days()
		#check range of date can't be 0
		if self.range_of_date == 0:
			frappe.throw("Invaild value for Check Out!! Plz check it out!!! ")
		# today is reservation 
		self.check_reservation_date()
		#check date in can me less than Reservation date
		if self.check_in < self.reservation_date:
			frappe.throw("Sorry Check In must be during or after Reservation")

		# #checking room status
		# room_infor = frappe.get_doc("Room Information", self.room_information)
		# if room_infor.status == "Issued":
		# 	frappe.throw("Sorry!!! this room can't use because is has a problems")
		# # elif room_infor.status == "Unavailable":
		# # 	frappe.throw("Sorry!!! this room is be long to other Reservation")
		# elif room_infor.status == "Available":
		# 	frappe.msgprint("Please check your information before submit")
		



	#change status room when on_submit and on_cancel
	# def on_submit(self):
	# 	room_infor = frappe.get_doc("Room Information", self.room_information)
	# 	room_infor.status = "Unavailable"
	# 	room_infor.save()
	# def on_cancel(self):
	# 	room_infor = frappe.get_doc("Room Information", self.room_information)
	# 	room_infor.status = "Available"
	# 	room_infor.save()

#functions
	def check_reservation_date(self):
		if self.reservation_date > today():
			frappe.throw("Reservation Date must Today")
		elif self.reservation_date < today():
			frappe.throw("Reservation Date must Today")
	def calculate_stay_days(self):
		if frappe.utils.data.date_diff(self.check_out, self.check_in) == 0:
			return 1
		else:
			return frappe.utils.data.date_diff(self.check_out, self.check_in)
	#change status for room
	# def change_status_room(self):
	# 	if self.status == "Staying":	
	# 		room_infor = frappe.get_doc("Room Information", self.room_information)
	# 		room_infor.status = "Available"
	# 		room_infor.save()
	# 	elif self.status == "Checked Out":			
	# 		room_infor = frappe.get_doc("Room Information", self.room_information)
	# 		room_infor.status = "Unavailable"
	# 		room_infor.save()