// Copyright (c) 2022, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer', {
	refresh: function(frm){
		frm.add_custom_button('Create Reservation', () =>{
			frappe.new_doc('Reservation',{
				customer:frm.doc.name
			})
		})
	}
});