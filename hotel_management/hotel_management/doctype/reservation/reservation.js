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

	}
});


const calculateDate = (check_in = '', check_out ='') => {
	var day = 0
	const date1 = new Date(check_in);
    const date2 = new Date(check_out);
	const date = new Date();
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
	if (date1 > date2){
		frappe.throw("Check in must less than Check Out");
	} else if(date.getDate() > date1.getDate()){
		frappe.throw("Check in can't less than Today");
	}
	day = diffDays
	if (Number.isNaN(diffDays)) day = 0; 
	console.log(day);

	return day
}
//calculate in child doctype
frappe.ui.form.on("Restaurant Detail", {
	//find amount by qty*price
	quantity: function (frm, cdt, cdn) {
		let d = locals[cdt][cdn];
		frappe.model.set_value(cdt, cdn, "amount", d.quantity * d.price);
		refresh_field("amount");
	},
	//set value for restaurant_total by get from total amount
	amount: function (frm, ctd, cdn) {
		let lst = frm.doc.restaurant
		let total = 0
		$.each(lst, (i, v) => {
			total += parseFloat(v.amount)
		})
		console.log(total)
		frm.set_value('restaurant_total', total);
	//remove item and calculate it again
	},
	restaurant_remove: function(frm, cdt, cdn){
		let lst = frm.doc.restaurant
		let total = 0
		$.each(lst, (i, v) => {
			total += parseFloat(v.amount)
		})
		// console.log(total)
		frm.set_value('restaurant_total', total);
	}
});




// // compute qty * price = amount
// frappe.ui.form.on('Restaurant Detail', {
// 	quantity: function(frm, cdt, cdn) {
// 		let gridRow = frm.open_grid_row();
// 		if (!gridRow) {
// 			gridRow = frm.get_field('restaurant').grid.get_row(cdn);
// 			console.log(gridRow)
// 		}
// 		calAmount(gridRow);
// 	},
// 	price: function(frm, cdt, cdn) {
// 		let gridRow = frm.open_grid_row();
// 		if (!gridRow) {
// 			gridRow = frm.get_field('restaurant').grid.get_row(cdn);
// 		}
// 		calAmount(gridRow);
// 	},
// });

// function calAmount(gridRow) {
// 	let qty = gridRow.on_grid_fields_dict.quantity.value;
// 	let rate = gridRow.on_grid_fields_dict.price.value;
// 	let amount = qty * rate;
// 	frappe.model.set_value(gridRow.doc.doctype,gridRow.doc.name,'amount',amount);
// }