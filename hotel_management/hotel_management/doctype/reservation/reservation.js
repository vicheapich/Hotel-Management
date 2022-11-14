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