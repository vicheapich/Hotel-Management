frappe.ready(function() {
	// bind events here
	// frappe.web_form.validate = function(){
	// 	let value = frappe.web_form.get_value("age");
	// 	let value1 = frappe.web_form.get_value("phone");
	// 	if(value == value1){
	// 		console.log("HIIIIIIII");
	// 		frappe.throw(__('Can not equal'));
	// 		return true;
	// 	}
	// },
	frappe.web_form.on('phone', (field, value) => {
		let test = frappe.web_form.get_value("age");
		let tet = frappe.web_form.get_value("phone");
		if(test == tet){
			console.log("HIIIIIIII");
			frappe.throw('Can not equal');
		}
	});	
});