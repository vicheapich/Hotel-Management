// Copyright (c) 2022, admin and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Reservation Report"] = {
	"filters": [
		{
			"fieldname":"customer",
			"label":__("Customer"),
			"fieldtype": "Link",
			"options":"Customer",
			"width":80,
			"reqb":1
		},
		{
			"fieldname":"check_in",
			"label":__("Check In"),
			"fieldtype": "Date",
			"width":80,
			"reqb":1
		},
		{
			"fieldname":"check_out",
			"label":__("Check Out"),
			"fieldtype": "Date",
			"width":80,
			"reqb":0,
		},
		{
			"fieldname":"status",
			"label":__("Status"),
			"fieldtype":"Select",
			"default":"",
			"options":["","On the way","Checked In","Cancelled","Staying"],
			"width":80,
			"reqb":0,
		},
	]
};
