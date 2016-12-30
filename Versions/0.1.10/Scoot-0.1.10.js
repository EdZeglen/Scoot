/*

Scoot 

The MIT License (MIT)

Copyright (c) 2016,2017 Edward C. Zeglen III

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/
(function (window) {
    // You can enable the strict mode commenting the following line  
    // 'use strict';

    // This function will contain all our code
    function ScootLib() {

        var _Scoot = {};
        
        var myversioninfo = {
            "number": "1.0.10",
            "date": "29-DEC-2016"
        };

        _Scoot.versioninfo = function () {
            return myversioninfo;
        }

        // ======================= FILE 

        _Scoot.file = function () {
            this.fso = new ActiveXObject("Scripting.FileSystemObject");

            this.load = function (filespec, into, spliton) {

                var ForReading = 1;
                var f1 = this.fso.OpenTextFile(filespec, ForReading);
                var text = f1.ReadAll();

                f1.close();

                if (arguments.length == 3) {
                    var temp = text.split(spliton);
                    for (i = 0; i < temp.length; i++) {
                        if (temp[i].length > 0)
                            into.push(temp[i]);
                    }
                }

                return (text);

            }

            this.rename = function (filespec, newfilename) {
                if (this.exists(filespec)) {
                    var f1 = this.fso.GetFile(filespec);
                    f1.name = newfilename;
                    f1 = null;
                }
            }

            this.copy = function (source, destination, overwrite) {
                var _overwrite = true;

                if (arguments.length > 2) {
                    _overwrite = overwrite;
                }

                if (this.exists(source)) {
                    this.fso.CopyFile(source, destination, _overwrite);
                }
            }

            this.exists = function (filespec) {
                return (this.fso.FileExists(filespec));
            }

            this.delete = function (filespec) {
                if (this.fso.FileExists(filespec)) {
                    this.fso.DeleteFile(filespec);
                }
            }

            this.browse = function (startinfolder) {
                //alert("not coded yet.") // find this code we have it somewhere I think? 
                // or do we just use input type-file? i think so.
            }

            this.save = function (filespec, text) {
                var f1 = this.fso.CreateTextFile(filespec, true);
                f1.Write(text);
                f1.close();
            }

            this.shell = function (filespec, cmdargs, windowstyle, waitonreturn) {

                var _windowstyle = 5;
                var _waitonreturn = false;
                
                if (arguments.length > 2) 
                    _windowstyle = windowstyle;
                
                if (arguments.length > 3) 
                    _waitonreturn = waitonreturn;

                if (this.exists(filespec)) {
                    var wShell = new ActiveXObject("wScript.Shell");
                    wShell.Run(filespec + ' "' + cmdargs + '"', _windowstyle, _waitonreturn);
                }
            }

            return (this);

        }

        // ======================= FOLDER

        _Scoot.folder = function () {

            this.fso = new ActiveXObject("Scripting.FileSystemObject");

            this.subfolders = null;
            
            this.exists = function (folderspec) {
                return (this.fso.FolderExists(folderspec));
            }

            this.parentfolder = function (folderspec) {
                var path = this.fso.GetParentFolderName(folderspec);
                return (path);
            }

            this.scriptfolder = function () {

                var path = this.fso.GetParentFolderName(document.location);
                var m = path.split("///");
                path = (m[1].replace(/\//g, "\\"));
                return (path);

            }

            this.parentof = function (thisfolderSpec) {
                var fso = this.fso;
                var path = "";
                if (fso.FolderExists(thisfolderSpec)) {
                    path = fso.GetParentFolderName(thisfolderSpec);
                }
                return (path);
            }

            this.browse = function (startinfolder, dialogtitle) {

                var returnvalue = null;
                var usedialogtitle = "Please select a folder ...";
                if (dialogtitle != null) { usedialogtitle = dialogtitle; }
                var oShell = new ActiveXObject("Shell.Application");
                var f = oShell.BrowseForFolder(0, usedialogtitle, 0, startinfolder);
                if (f != null) { returnvalue = f.Items().Item().path; }
                return (returnvalue);

            }

            this.open = function (folderspec, into) {
                
                if (this.fso.FolderExists(folderspec)) {
                    var oFolder = this.fso.GetFolder(folderspec);

                    // Reference the File collection of the Text directory
                    var filecollection = oFolder.SubFolders;

                    // Traverse through the FileCollection using the FOR loop
                    for (var objEnum = new Enumerator(filecollection) ; !objEnum.atEnd() ; objEnum.moveNext()) {
                        var strFileSpec = objEnum.item();

                        var oSubFolder = this.fso.GetFolder(strFileSpec);
                        
                        var filename = oSubFolder.name; // this.fso.GetFolderName(strFileSpec)

                        var obj = {};
                        obj["name"] = filename;
                        obj["spec"] = strFileSpec;

                        into.push(obj);
                    }

                    // Destroy and de-reference enumerator object
                    delete objEnum;
                    objEnum = null;

                    // De-reference FileCollection and Folder object
                    filecollection = null;
                    oFolder = null;

                }
            }

            this.create = function (folderspec) {
                if (this.fso.FolderExists(folderspec)) {
                    alert("Folder already exists: " + folderspec);
                } else {
                    this.fso.CreateFolder(folderspec);
                }
                
            }

            this.delete = function (folderspec) {
                if (this.fso.FolderExists(folderspec)) {
                    this.fso.DeleteFolder(folderspec, true);
                } else {
                    alert("Unable to locate and delete folder: " + folderspec);
                }

            }

            this.files = function (folderspec, into) {

                if (this.fso.FolderExists(folderspec)) {
                    var oFolder = this.fso.GetFolder(folderspec);

                    // Reference the File collection of the Text directory
                    var filecollection = oFolder.Files;

                    // Traverse through the FileCollection using the FOR loop
                    for (var objEnum = new Enumerator(filecollection) ; !objEnum.atEnd() ; objEnum.moveNext()) {
                        var strFileSpec = objEnum.item();
                        var filename = this.fso.GetFileName(strFileSpec)
                        var filex = this.fso.GetFile(strFileSpec);
                        var folderx = this.fso.GetParentFolderName(strFileSpec);
                        var folder = this.fso.GetFolder(folderx);

                        var obj = {};
                        obj["name"] = filename;
                        obj["spec"] = strFileSpec;
                        obj["foldername"] = folder.name;
                        obj["mdate"] = new Date(filex.datelastmodified);
                        obj["size"] = filex.size;

                        into.push(obj);
                    }

                    // Destroy and de-reference enumerator object
                    delete objEnum;
                    objEnum = null;

                    // De-reference FileCollection and Folder object
                    filecollection = null;
                    oFolder = null;
                }

            }

            return (this);

        }

        // ======================= XML (DATA)

        _Scoot.XMLConnection = function (datalocation, datasource) {

            // properties
            this.spec = datalocation;
            this.source = datasource;
            this.filespec = this.spec + "\\" + this.source + ".xml";
            this.data = null; // 
            this.DOM = null; // Exposes the Open()ned DOM for direct handling if needed.
            this.open = function (datarootname) {

                if (arguments.length == 0) {
                    return;
                }

                var oFS = new ActiveXObject("Scripting.FileSystemObject");
                
                if (oFS.FileExists(this.filespec)) {
                    var jsonData = this.loadxml(this.filespec);
                    this.data = jsonData[datarootname];
                }

            }

            this.loadxml = function (filespec) {
                var xmlDOM = new ActiveXObject("Microsoft.XMLDOM");
                xmlDOM.load(filespec);
                this.DOM = xmlDOM;
                return (XML2jsobj(xmlDOM));
            }

            this.fromxml = function (xml) {
                var xmlDOM = new ActiveXObject("Microsoft.XMLDOM");
                xmlDOM.async = false;
                xmlDOM.loadXML(xml);
                this.DOM = xmlDOM;
                return (XML2jsobj(xmlDOM));
            }

            /**
             * XML2jsobj v1.0
             * Converts XML to a JavaScript object
             * so it can be handled like a JSON message
             *
             * By Craig Buckler, @craigbuckler, http://optimalworks.net
             *
             * As featured on SitePoint.com:
             * http://www.sitepoint.com/xml-to-javascript-object/
             *
             * Please use as you wish at your own risk.
             */

            function XML2jsobj(node) {

                var data = {};

                // append a value
                function Add(name, value) {
                    if (data[name]) {
                        if (data[name].constructor != Array) {
                            data[name] = [data[name]];
                        }
                        data[name][data[name].length] = value;
                    }
                    else {
                        data[name] = value;
                    }
                };

                // element attributes
                if (node.nodeType == 1) {
                    var c, cn;
                    for (c = 0; cn = node.attributes[c]; c++) {
                        Add(cn.name, cn.value);
                    }
                }

                // child elements
                for (c = 0; cn = node.childNodes[c]; c++) {
                    if (cn.nodeType == 1) {
                        if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
                            // text value
                            Add(cn.nodeName, cn.firstChild.nodeValue);
                        }
                        else {
                            // sub-object
                            if ((cn.nodeValue == null) && (cn.childNodes.length == 0)) {
                                // its a text node with no children. it becomes an emptystring property of the object.
                                if (cn.nodeValue == null) {
                                    Add(cn.nodeName, "");
                                } else {
                                    Add(cn.nodeName, XML2jsobj(cn));
                                }
                            } else {
                                Add(cn.nodeName, XML2jsobj(cn));
                            }
                        }
                    }
                }

                return data;

            }

        }

        // ======================= ADO (DATA)

        _Scoot.ADOConnection = function (dataconnectionstring) {

            this.conn = dataconnectionstring;
            this.data = null;
            this.formats = [
                { "match": new RegExp(/\\/g), "with": "\\\\" },
                { "match": new RegExp(/"/g), "with": "'" }
            ];
            
            function kvpToObject(name, value) {

                if (value == null) {
                    return ('"' + name + '":null ');
                }

                return ('"' + name + '":"' + value + '"');
            }

            this.dateforado = function (adate) {

                if (arguments.length > 0)
                    var m = adate;
                else
                    var m = new Date();

                var dateString = m.getMonth() + "-" + m.getDate() + "-" + m.getFullYear();
                return (dateString);

            }

            this.execute = function (sql) {
                try {

                    var adoCmd = new ActiveXObject("ADODB.Command");
                    adoCmd.ActiveConnection = this.conn;
                    adoCmd.CommandText = sql;
                    adoCmd.Execute();

                    return true;
                } catch (err) {
                    alert(err);
                    return false;
                }
            }

            this.testconnection = function (connectionstring) {
                var adoCnn = new ActiveXObject("ADODB.Connection");
                try  {
                    adoCnn.open(connectionstring);
                    return true;
                } catch (err) {
                    alert(err);
                    return false;
                }

            }
            
            function formatField(field, formats) {

                try {
                    for (findex = 0; findex < formats.length; findex++) 
                        field = field.replace(formats[findex].match, formats[findex].with);
                } catch (err) {

                }
                return (field);
            }

            this.save = function (sql, astype, filespec) {
                var adoRS = new ActiveXObject("ADODB.RecordSet");
                adoRS.Open(sql, this.conn);

                if (adoRS.EOF != true) {
                    var text = '"' + adoRS.GetString(2, -1, '","', '"\r\n"', "&nbsp;");
                    //Scoot.file().save("c:\\users\\ed\\testingcsv.csv", text);
                    Scoot.file().save(filespec, text);
                }

                adoRS.Close;
            }

            this.open = function (sql, into, selector) {

                var bInto = false;
                if (arguments.length > 1) bInto = true;

                var bSelector = false;
                if (arguments.length > 2) bSelector = true;

                var adoRS = new ActiveXObject("ADODB.RecordSet");
                var bFirstObject = true;
                var tablename = "fred";
                var sOut = '{ "' + tablename + '": [';

                adoRS.Open(sql, this.conn);
                
                while (adoRS.EOF != true) {

                    var sObject = "{ ";

                    for (i = 0; i < adoRS.Fields.Count; i++) {

                        // note: SQL Fields of type VARCHAR(MAX) will fail here.

                        var fname = formatField(adoRS.Fields(i).Name, this.formats)
                        var fvalue = formatField(adoRS.Fields(i).value, this.formats)
                        
                        if (i > 0)
                            sObject += ", " + kvpToObject(fname, fvalue);
                        else
                            sObject += kvpToObject(fname, fvalue);
                    }

                    sObject += " } ";

                    if (!bFirstObject) {
                        sOut += "," + sObject;
                    } else {
                        sOut += sObject;
                        bFirstObject = false;
                    }

                    adoRS.MoveNext();
                }

                sOut += " ] } ";

                adoRS.Close;
                
                // scoot does not understand a comments field in any sql table!!! EVER  
                // do not include a nullable comments field!!!!! it doesn't work!
                //alert(JSON.stringify(sOut));
                
                this.data = JSON.parse(sOut).fred;
                
                if (into == null) { // nothing here so return whatever value you "selector"ed.
                    return (this.data[0][selector]);
                }

                if (bInto) {

                    if (into == undefined) { // nothing here, get out
                        return;
                    }

                    if (Array.isArray(into)) {  // var x = []
                        this.data.forEach(function (item, index) {
                            into.push(item);
                            if ((bSelector) && (typeof(selector) == 'object')) {
                                if (item[selector.key] == selector.value) {
                                    selector.item = item;
                                }
                            }
                        });
                        return;
                    } 
                    
                    switch (typeof (into)) {
                        case ('object'): 
                            try {
                                for (prop in into) {
                                    into[prop] = this.data[0][prop];
                                }
                            } catch (err) { // return null on errors
                                into[prop] = null
                            }
                            break;
                        case ('function'):
                            this.data.forEach(function (item, index) {
                                into.push(item);
                                if ((bSelector) && (typeof (selector) == 'object')) {
                                    if (item[selector.key] == selector.value) {
                                        selector.item = item;
                                    }
                                }
                            });
                            break;
                        default: // self.x = ko.obserableArray([]);
                            this.data.forEach(function (item, index) {
                                into.push(item);
                                if ((bSelector) && (typeof (selector) == 'object')) {
                                    if (item[selector.key] == selector.value) {
                                        selector.item = item;
                                    }
                                }
                            });
                            break;
                    }
                }
            }
        }

        // ======================= JSON (DATA)

        _Scoot.JSONConnection = function (datalocation, datasource) {

            // properties
            this.spec = datalocation;
            this.source = datasource;
            this.filespec = this.spec + "\\" + this.source + ".json";
            this.data = null;
            this.mapindex = "";

            // methods
            this.open = function (mapindex, into) {
                try {
                    if (arguments.length > 0) {
                        // we also have the mapindex
                        this.mapindex = mapindex;
                    }

                    // load the json from the file
                    var oFS = new ActiveXObject("Scripting.FileSystemObject");
                    
                    if (oFS.FileExists(this.filespec)) {
                        var fileText = loadfiletext(this.filespec);
                        this.data = JSON.parse(fileText);
                        if (arguments.length > 1) {
                            // we have "into"
                            this.data[this.source].forEach(function (item, index) {
                                into.push(item);
                            });
                        }

                        return true;
                    } else {
                        return false;
                    }
                } catch (err) {
                    return false;
                }
            }

            // methods
            this.update = function (data, asname) {
                // save the data as JSON back to an existing the file

                this.data = data;

                var obj = {};

                if (asname == null)
                    obj[this.source] = data;
                else
                    obj[asname] = data;
                
                var JSONText = ko.toJSON(obj);
                
                try {
                    savefiletext(this.filespec, JSONText);
                    return (true);
                }

                catch (err) {
                    alert("Error in saving JSON to " + this.filespec + ": " + err);
                    return (false);
                }

            }

            // used for saving JSON with indexes to simulate "tables".
            this.updatetable = function (index, data) {
                // save the data as JSON back to an existing the file
                
                var obj = {};

                obj["index"] = index;
                obj[this.source] = data;

                var JSONText = ko.toJSON(obj);

                try {
                    savefiletext(this.filespec, JSONText);
                    return (true);
                }

                catch (err) {
                    alert("Error in saving JSON to " + this.filespec + ": " + err);
                    return (false);
                }
            }

            this.add = function (obj) {
                // this assumes your object contains and id property

                var currentindex = this.data["index"] + 1;
                obj[this.mapindex] = currentindex;
                this.data[this.source].push(obj);

                this.UpdateTable(currentindex, this.data[this.source]);

                return (obj.id);

            }

            this.get = function (url, params) {
                // could we do an jQuery ajax get here ??

            }

            this.post = function (url, params, data) {
                // could we do an jQuery ajax post here ??
            }

            // returns an object where the field name = the value provided.
            // query("username", "thisusername") = that user object if its found.
            this.query = function (field, value) {

                var returnvalue = null;
                var ds = this.data[this.source];

                for (i = 0; i < ds.length; i++) {
                    var obj = ds[i];
                    if (obj[field] == value) {
                        returnvalue = obj;
                        break; // you break on the first one, but what if you always returned an array? do it.
                    }
                }

                return (returnvalue);

            }

            this.narrow = function (field, value) {
                // returns a result set narrowed down by the match on the field = value.

                var returnvalue = [];
                var ds = this.data[this.source];

                for (i = 0; i < ds.length; i++) {
                    var obj = ds[i];
                    if (obj[field] == value) {
                        returnvalue.push(obj);
                    }
                }

                return (returnvalue);

            }

            function loadfiletext(filespec) {

                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var ForReading = 1;
                var f1 = fso.OpenTextFile(filespec, ForReading);
                var text = f1.ReadAll();

                f1.close();

                return (text);

            }

            function savefiletext(filespec, text) {

                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var f1 = fso.CreateTextFile(filespec, true);
                f1.Write(text);
                f1.close();

            }

        }

        // ======================= COOKIELESS SESSION ( USED BY .SHARED )

        /*
            Implements cookie-less JavaScript session variables
            v1.0
                 
            By Craig Buckler, Optimalworks.net
            As featured on SitePoint.com
            Please use as you wish at your own risk.
        
            Modified by ECZ for scoot.
            Renamed scoot_Session. Removed testing for JSON.
                
            Usage:
                 
            // store a session value/object
            Session.set(name, object);
                 
            // retreive a session value/object
            Session.get(name);
                 
            // clear all session data
            Session.clear();
                 
            // dump session data
            Session.dump();
        
        */

        function Session() {

            // window object
            var win = window.top || window;

            // session store
            var store = (win.name ? JSON.parse(win.name) : {});

            // save store on page unload
            function Save() {
                win.name = JSON.stringify(store);
            };

            // page unload event
            if (window.addEventListener) window.addEventListener("unload", Save, false);
            else if (window.attachEvent) window.attachEvent("onunload", Save);
            else window.onunload = Save;

            // public methods
            return {

                // set a session variable
                set: function (name, value) {
                    store[name] = value;
                },

                // get a session value
                get: function (name) {
                    return (store[name] ? store[name] : undefined);
                },

                // clear session
                clear: function () { store = {}; },

                // dump session data
                dump: function () { return JSON.stringify(store); }

            };

        }

        // ======================= SHARED

        _Scoot.shared = function (spec) {

            this.spec = spec
            this.data = null;
            this.sharedname = "_pages_shared";
            
            this.init = function () {

                if (this.spec == undefined) return;
                if (this.spec == null) return;

                var dc = _Scoot.data("JSON", this.spec, this.sharedname);
                dc.open();
                
                if (dc.data != null) {
                    this.data = dc.data[this.sharedname];
                }

            }

            this.update = function (data) {

                if (this.spec == null) return;

                var dc = _Scoot.data("JSON", this.spec, this.sharedname);
                dc.open();

                dc.update(data, this.sharedname);

            }

            this.save = function () {
                this.update(this.data);
            }

            // the shared control inits automatically
            this.init();

        }

        // ======================= DATA

        _Scoot.data = function (type, location, name) {
            switch (type.toUpperCase()) {
                case "JSON":
                    return (new _Scoot.JSONConnection(location, name));
                case "XML":
                    return (new _Scoot.XMLConnection(location, name));
                case "ADO":
                    return (new _Scoot.ADOConnection(location));
            }
        }

        // ======================= PAGE ( OBJECT )

        function PageControl(name, isroot, sharedspec) {

            var self = this;

            var oShared = null;

            // properties
            this.name = name;
            this.spec = null;
            this.isroot = isroot;

            this.config = null;
            this.shared = null;
            this.session = null;

            this.includes = [];
            this.urls = null;

            // methods
            this.init = function (isroot, sharedspec) {

                // it knows where its running from
                this.spec = _Scoot.folder().scriptfolder();

                // a name value pair set based on the pagename.json
                this.config = new _Scoot.JSONConnection(this.spec, this.name);
                this.config.open();

                // uses window.name to set a variable we can track across pages.
                this.session = new Session();

                // we are the root page, setup shared according to default or whereever they want it to be.
                if (isroot != undefined) {
                    if (isroot) {
                        if (sharedspec != undefined) {
                            this.setshared(this.spec + "\\" + sharedspec);
                        } else {
                            this.setshared(this.spec);
                        }
                    }
                }

                oShared = new _Scoot.shared(this.getshared());

            }

            this.value = function (name, value) {
                if (arguments.length == 1) {
                    return (this.config.data.items[name]);
                } else {
                    update(this, name, value);
                }
            }

            this.values = function () {
                return (this.config.data.items);
            }

            this.setshared = function (spec) {
                this.session.set("sharedspec", spec);
            }

            this.getshared = function () {
                return (this.session.get("sharedspec"));
            }

            this.shared = function (name, value) {
                if (arguments.length == 0) return oShared;

                if (arguments.length == 1) {
                    return (oShared.data[name]);
                } else {
                    oShared.data[name] = value;
                }
            }

            // methods
            this.parentfolder = function () {
                return (_Scoot.folder().parentfolder(this.spec));
            }

            function update(page, configitemname, configitemvalue) { // private

                // updating a page config value.
                var obj = page.config.data.items;

                if (configitemvalue == null)
                    delete obj[configitemname];
                else
                    obj[configitemname] = configitemvalue;

                page.config.update(obj, "items");

                // you must do this for some reason.
                page.config.open();

            }

            this.include = function (url, id) {
                var obj = { "url": url, "id": id };
                this.includes.push(obj);
            }

            function seturl(obj) {
                return $.get(obj.url, function (data) {
                    $(obj.id).html(data);
                });
            }

            this.load = function (runafterincludesload) {

                if (this.includes.length == 0) return;

                this.urls = this.includes.map(function (obj) {
                    return seturl(obj);
                });

                var tt = $.when.apply(this, this.urls);
                var xx = tt.done(function () {
                    runafterincludesload();
                });

            }

            // the page control inits automatically
            this.init(isroot, sharedspec);

        }


        // ======================= PAGE

        _Scoot.page = function (name, isroot, sharedspec) {
            return (new PageControl(name, isroot, sharedspec));
        }
        
        // ======================= INCLUDED STRING FUNCTIONS 

        _Scoot.pad = function (text, char, length, direction) {

            var paddingDirection = "left";

            if (arguments.length > 3) {
                // we have direction
                paddingDirection = direction.toLowerCase();
            }

            if (paddingDirection.toLowerCase() == "left") {
                var s = new String(text);
                while (s.length < length) s = char + s;
                return (s);
            } else {
                var s = new String(text);
                while (s.length < length) s = s + char;
                return (s);
            }

        }

        _Scoot.left = function (str, n) {
            if (n <= 0)
                return "";
            else if (n > String(str).length)
                return str;
            else
                return String(str).substring(0, n);
        }

        _Scoot.right = function (str, n) {
            if (n <= 0)
                return "";
            else if (n > String(str).length)
                return str;
            else {
                var iLen = String(str).length;
                return String(str).substring(iLen, iLen - n);
            }
        }

        // ======================= END
        
        return _Scoot;
    }

    // We need that our library is globally accesible, then we save in the window
    if (typeof (window.Scoot) === 'undefined') {
        window.Scoot = ScootLib();
    }

})(window); // We send the window variable withing our function

