// Copyright (c) 2022, admin and contributors
// For license information, please see license.txt

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
		console.log(total)
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