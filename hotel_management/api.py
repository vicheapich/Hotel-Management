# @frappe.whitelist()
# def get_author_articles(author):
# articles = frappe.db.sql(f""" SELECT name FROM `tabArticle Library` WHERE article_author='{author}' """, as_dict=True)
# return articles