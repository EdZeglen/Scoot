# Scoot
Scoot is an open-source, MIT licensed, JavaScript library intended for rapid application development (RAD) with Microsoft 
.HTA's using pure JavaScript, jQuery and Knock Out. 

Structure
---------

Basic structure for a Scoot application looks like this.

	/data
	/footer
	/header
	/images
	/pages
	/scripts
	myApp.ico
	myApp.hta
	myApp.json

Usage
-----

Make sure you include both the Knock Out libaray and the Scoot library.

    <script type="text/javascript" src="../Scripts/ko/knockout-3.4.0-min.js"></script>
    <script type="text/javascript" src="../Scripts/Scoot/0.1.10/scoot-0.1.10-min.js"></script>

Using Scoot in a page is simple.

	<script language="javascript">

		var objPage = new Scoot.page("MyAppStartPage", true, "data");

		objPage.include('../header/header1.html', '#header'); // Optional Header include
		objPage.include('../footer/footer1.html', '#footer'); // Optional Footer include
    
	</script>

Here objPage is declared a new Scoot.page(name, isroot, data). The first parameter is the name of the .hta file itself. The second parameter is
true or false. If true, this .hta page is the first and root page of the application. If false, then the .hta page is a child
page and will have access to shared data differently than a root page. The last is the name of the shared data folder. This is
usually "data". For more information see the Documentation. [link?]

Scoot App
---------
App-Specific data is stored in JSON format inside the data folders _pages_shared.json file. This data is availabe to 
(and updateable by) any page in the Scoot application. Here is one example of application data stored in _pages_shared.

	{
	  "_pages_shared": {
		"myapplication": {
		  "appid": "CE75CCF4-32D0-4723-8E98-9879CF9FF984",
		  "appname": "Name",
		  "appconn": "DRIVER=;INITIALCATALOG=;USER=;PWD=;",
		},
		"exportfolder": "C:\\Users\\[someusername]\\export",
		"linkeduser": null,
		"linkedrole": null
	  }
	}
	
Scoot Page
----------

Page-Specific data is stored in JSON format inside the [pagename].json file. For instance if your page includes a drop down for detail types. You could create 
MyAppStartPage.json with the following JSON.

	{
		"items": {
			"detailtypes": [
				{ "name": "DetailType1", "value": "1" },
				{ "name": "DetailType2", "value": "2" },
				{ "name": "DetailType3", "value": "3" },
				{ "name": "DetailType4", "value": "4" }
			]
		}
	}


A Basic Scoot Page
------------------


