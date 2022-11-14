// Copyright (c) 2022, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on('Test', {
	restaurant: (frm) => {
		if (frm.doc.restaurant == 1) {
			frm.set_df_property('room', 'hidden', 0)
		} else {
			frm.set_df_property('room', 'hidden', 1)
			cur_frm.clear_table("room")//this funtion use for clear all record in child doctype
			cur_frm.refresh_fields();
		}
	},
	check_in: (frm) => {
		frm.set_value("range_of_date", calculateDate(frm.doc.check_in, frm.doc.check_out))
	},
	check_out: (frm) => {
		frm.set_value("range_of_date", calculateDate(frm.doc.check_in, frm.doc.check_out))
	},
	onload: function(frm){
		frm.set_query("room_name","room", function(){
			let a = ''
			frm.doc.room.forEach(row => {
				a = row.room_type
			});
			return {
				"filters": {
					"room_status":"Available",
					"room_type": a,
				}
			};
		})
	}
});
const calculateDate = (check_in = '', check_out = '') => {
	var day = 0
	const date1 = new Date(check_in);
	const date2 = new Date(check_out);
	const date = new Date();
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	if (date1 > date2) {
		frappe.throw("Check in must less than Check Out");
	} else if (date.getDate() > date1.getDate()) {
		frappe.throw("Check in can't less than Today");
	}
	day = diffDays
	if (Number.isNaN(diffDays)) day = "Not Enough Value";
	if (day == 0) {
		day = day + 1
		//console.log("hi")
		return day
	}
	else {
		return day
	}
}