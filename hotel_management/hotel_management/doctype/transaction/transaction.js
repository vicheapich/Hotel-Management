// Copyright (c) 2022, admin and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Transaction', {
// 	// refresh: function(frm) {

// 	// }
// });

// Calculate Amount in Broken Item
frappe.ui.form.on("Facilities",{
	//find amount by quatity * Rate
	quantity: function (frm, cdt, cdn) {
		let d = locals[cdt][cdn];
		frappe.model.set_value(cdt, cdn, "amount", d.quantity * d.rate);
		refresh_field("amount");
	},
	// set lalve from Facilities to Total Facilities
	amount: function(frm, cdt, cdn){
		let lis = frm.doc.facilities
		let total = 0
		$.each(lis, (i, v) =>{
			total += parseFloat(v.amount)
		})
		console.log(total);
		frm.set_value('total_facilities', total);
		console.log(total_facilities);
	},
	//remove item and total_facilities re-calculate
	facilities_remove: function(frm, cdt, cnd){
		let lis = frm.doc.facilities
		let total = 0
		$.each(lis, (i, v) =>{
			total += parseFloat(v.amount)
		})
		frm.set_value('total_facilities', total)
	}
});