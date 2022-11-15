// Copyright (c) 2022, admin and contributors
// For license information, please see license.txt


//calculate price accommodation 
frappe.ui.form.on("Reservation", {
	check_in: (frm) => {

		frm.set_value("range_of_date", calculateDate(frm.doc.check_in,frm.doc.check_out))
		frm.doc.accommodation_price = frm.doc.range_of_date * frm.doc.room_price
		refresh_field("accommodation_price");

	},
	check_out: (frm) => {
		//console.log(calculateDate(frm.doc.check_in,frm.doc.check_out));
		frm.set_value("range_of_date", calculateDate(frm.doc.check_in,frm.doc.check_out))
		frm.doc.accommodation_price = frm.doc.range_of_date * frm.doc.room_price
		refresh_field("accommodation_price");

	},
	onload: function(frm){
		frm.set_query("room_name","room_selection", function(){
			let a = ''
			frm.doc.room_selection.forEach(row => {
				a = row.room_type
			});
			return {
				"filters": {
					"status":"Available",
					"type": a,
				}
			};
		})
	},
	setup: function(frm){
		frm.check_duplicate_room = function(frm, row){
			frm.doc.room_selection.forEach(item => {
				if(row.room_name=='' || row.idx == item.idx){
					//pass
				}else {
					if(row.room_name==item.room_name){
						row.room_name ='';
						frappe.throw("Sorry!!! Room can't be duplicate.")
						frm.clear_table('room_name')
					}
				}
			});
		}
	}
})
frappe.ui.form.on("Room Table", {
	room_name: function(frm, cdt ,cdn){
		let row = locals[cdt][cdn];
		frm.check_duplicate_room(frm, row);
	},
})
const calculateDate = (check_in = '', check_out ='') => {
	var day = 0
	const date1 = new Date(check_in);
    const date2 = new Date(check_out);
	const date = new Date();
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	if (date1 > date2){
		frappe.throw("Check in must less than Check Out");
	} else if(date.getDate() > date1.getDate()){
		frappe.throw("Check in can't less than Today");
	}
	day = diffDays
	if (Number.isNaN(diffDays)) day = "Not Enough Value"; 
	console.log(day);
	if(day==0){
		day = day + 1
		//console.log("hi")
		return day
	}
	else{
		return day
	}
}