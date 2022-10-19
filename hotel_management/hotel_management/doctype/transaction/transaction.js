// Copyright (c) 2022, admin and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Transaction', {
// 	// refresh: function(frm) {

// 	// }
// });
frappe.ui.form.on("Transaction",{
	setup: function(frm){
		frm.check_duplicate_facilities = function(frm, row){
			frm.doc.facilities.forEach(item => {
				if(row.facilities_name=='' || row.idx == item.idx){
					//pass
				}else {
					if(row.facilities_name==item.facilities_name){
						row.facilities_name ='';
						frappe.throw("Sorry!!! facilities can't be duplicate.")
						frm.refresh_field('facilities_name')
					}
				}
			});
		}
		frm.check_duplicate_restaurant = function(frm, row){
			frm.doc.restaurant.forEach(item => {
				if(row.item=='' || row.idx == item.idx){
					//pass
				}else {
					if(row.item==item.item){
						row.item ='';
						frappe.throw("Sorry!!! item can't be duplicate.")
						frm.refresh_field('item')
					}
				}
			});
		}
	}
});

// Calculate Amount in Broken Item
frappe.ui.form.on("Facilities",{
	facilities_name: function(frm, cdt ,cdn){
		let row = locals[cdt][cdn];
		frm.check_duplicate_facilities(frm, row);
	},
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

//calculate in child doctype
frappe.ui.form.on("Restaurant Detail", {
	//duplicate item
	item: function(frm, cdt ,cdn){
		let row = locals[cdt][cdn];
		frm.check_duplicate_restaurant(frm, row);
	},
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