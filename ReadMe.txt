Description:
	LinkManager allows user to store his links (or any url address) in the database.

Features:
	- User is able to add new links, edit existing links and delete them.
	- Before deleting a link, user has to confirm action.
	- Maximum number of links, which are displayed on the page at the same time is, by default, 10.
	- There is located navigation bar under link table.
	- User can also filter links, which are displaying.
	- Link input validation is implemented (user can't add empty link or enter non link)
	  on both server and client sides.
Unsolved problems:
	- When user tries to delete a link for the first time there is a 
	few seconds gap before confirmation window appears. The reason is that html
	template has to be downloaded from the server.
	- If user decides to go to the ~Link/ConfirmationDialog page he will see html template
	which is not supposed to be displayed separately.
