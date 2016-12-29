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
!function(a){function b(){function d(){function d(){b.name=JSON.stringify(c)}var b=a.top||a,c=b.name?JSON.parse(b.name):{};return a.addEventListener?a.addEventListener("unload",d,!1):a.attachEvent?a.attachEvent("onunload",d):a.onunload=d,{set:function(a,b){c[a]=b},get:function(a){return c[a]?c[a]:void 0},clear:function(){c={}},dump:function(){return JSON.stringify(c)}}}function e(a,c,e){function h(a,b,c){var d=a.config.data.items;null==c?delete d[b]:d[b]=c,a.config.update(d,"items"),a.config.open()}function i(a){return $.get(a.url,function(b){$(a.id).html(b)})}var g=null;this.name=a,this.spec=null,this.isroot=c,this.config=null,this.shared=null,this.session=null,this.includes=[],this.urls=null,this.init=function(a,c){this.spec=b.folder().scriptfolder(),this.config=new b.JSONConnection(this.spec,this.name),this.config.open(),this.session=new d,void 0!=a&&a&&(void 0!=c?this.setshared(this.spec+"\\"+c):this.setshared(this.spec)),g=new b.shared(this.getshared())},this.value=function(a,b){return 1==arguments.length?this.config.data.items[a]:void h(this,a,b)},this.values=function(){return this.config.data.items},this.setshared=function(a){this.session.set("sharedspec",a)},this.getshared=function(){return this.session.get("sharedspec")},this.shared=function(a,b){return 0==arguments.length?g:1==arguments.length?g.data[a]:void(g.data[a]=b)},this.parentfolder=function(){return b.folder().parentfolder(this.spec)},this.include=function(a,b){var c={url:a,id:b};this.includes.push(c)},this.load=function(a){if(0!=this.includes.length){this.urls=this.includes.map(function(a){return i(a)});var b=$.when.apply(this,this.urls);b.done(function(){a()})}},this.init(c,e)}var b={},c={number:"1.0.10",date:"29-DEC-2016"};return b.versioninfo=function(){return c},b.file=function(){return this.fso=new ActiveXObject("Scripting.FileSystemObject"),this.load=function(a,b,c){var d=1,e=this.fso.OpenTextFile(a,d),f=e.ReadAll();if(e.close(),3==arguments.length){var g=f.split(c);for(i=0;i<g.length;i++)g[i].length>0&&b.push(g[i])}return f},this.rename=function(a,b){if(this.exists(a)){var c=this.fso.GetFile(a);c.name=b,c=null}},this.copy=function(a,b,c){var d=!0;arguments.length>2&&(d=c),this.exists(a)&&this.fso.CopyFile(a,b,d)},this.exists=function(a){return this.fso.FileExists(a)},this.delete=function(a){this.fso.FileExists(a)&&this.fso.DeleteFile(a)},this.browse=function(a){},this.save=function(a,b){var c=this.fso.CreateTextFile(a,!0);c.Write(b),c.close()},this.shell=function(a,b,c,d){var e=5,f=!1;if(arguments.length>2&&(e=c),arguments.length>3&&(f=d),this.exists(a)){var g=new ActiveXObject("wScript.Shell");g.Run(a+' "'+b+'"',e,f)}},this},b.folder=function(){return this.fso=new ActiveXObject("Scripting.FileSystemObject"),this.subfolders=null,this.exists=function(a){return this.fso.FolderExists(a)},this.parentfolder=function(a){var b=this.fso.GetParentFolderName(a);return b},this.scriptfolder=function(){var a=this.fso.GetParentFolderName(document.location),b=a.split("///");return a=b[1].replace(/\//g,"\\")},this.parentof=function(a){var b=this.fso,c="";return b.FolderExists(a)&&(c=b.GetParentFolderName(a)),c},this.browse=function(a,b){var c=null,d="Please select a folder ...";null!=b&&(d=b);var e=new ActiveXObject("Shell.Application"),f=e.BrowseForFolder(0,d,0,a);return null!=f&&(c=f.Items().Item().path),c},this.open=function(a,b){if(this.fso.FolderExists(a)){for(var c=this.fso.GetFolder(a),d=c.SubFolders,e=new Enumerator(d);!e.atEnd();e.moveNext()){var f=e.item(),g=this.fso.GetFolder(f),h=g.name,i={};i.name=h,i.spec=f,b.push(i)}delete e,e=null,d=null,c=null}},this.create=function(a){this.fso.FolderExists(a)?alert("Folder already exists: "+a):this.fso.CreateFolder(a)},this.delete=function(a){this.fso.FolderExists(a)?this.fso.DeleteFolder(a,!0):alert("Unable to locate and delete folder: "+a)},this.files=function(a,b){if(this.fso.FolderExists(a)){for(var c=this.fso.GetFolder(a),d=c.Files,e=new Enumerator(d);!e.atEnd();e.moveNext()){var f=e.item(),g=this.fso.GetFileName(f),h=this.fso.GetFile(f),i=this.fso.GetParentFolderName(f),j=this.fso.GetFolder(i),k={};k.name=g,k.spec=f,k.foldername=j.name,k.mdate=new Date(h.datelastmodified),b.push(k)}delete e,e=null,d=null,c=null}},this},b.XMLConnection=function(a,b){function c(a){function d(a,c){b[a]?(b[a].constructor!=Array&&(b[a]=[b[a]]),b[a][b[a].length]=c):b[a]=c}var b={};if(1==a.nodeType){var e,f;for(e=0;f=a.attributes[e];e++)d(f.name,f.value)}for(e=0;f=a.childNodes[e];e++)1==f.nodeType&&(1==f.childNodes.length&&3==f.firstChild.nodeType?d(f.nodeName,f.firstChild.nodeValue):null==f.nodeValue&&0==f.childNodes.length&&null==f.nodeValue?d(f.nodeName,""):d(f.nodeName,c(f)));return b}this.spec=a,this.source=b,this.filespec=this.spec+"\\"+this.source+".xml",this.data=null,this.DOM=null,this.open=function(a){if(0!=arguments.length){var b=new ActiveXObject("Scripting.FileSystemObject");if(b.FileExists(this.filespec)){var c=this.loadxml(this.filespec);this.data=c[a]}}},this.loadxml=function(a){var b=new ActiveXObject("Microsoft.XMLDOM");return b.load(a),this.DOM=b,c(b)},this.fromxml=function(a){var b=new ActiveXObject("Microsoft.XMLDOM");return b.async=!1,b.loadXML(a),this.DOM=b,c(b)}},b.ADOConnection=function(a){function b(a,b){return null==b?'"'+a+'":null ':'"'+a+'":"'+b+'"'}function c(a,b){try{for(findex=0;findex<b.length;findex++)a=a.replace(b[findex].match,b[findex].with)}catch(a){}return a}this.conn=a,this.data=null,this.formats=[{match:new RegExp(/\\/g),with:"\\\\"},{match:new RegExp(/"/g),with:"'"}],this.dateforado=function(a){if(arguments.length>0)var b=a;else var b=new Date;var c=b.getMonth()+"-"+b.getDate()+"-"+b.getFullYear();return c},this.execute=function(a){try{var b=new ActiveXObject("ADODB.Command");return b.ActiveConnection=this.conn,b.CommandText=a,b.Execute(),!0}catch(a){return alert(a),!1}},this.testconnection=function(a){var b=new ActiveXObject("ADODB.Connection");try{return b.open(a),!0}catch(a){return alert(a),!1}},this.save=function(a,b,c){var d=new ActiveXObject("ADODB.RecordSet");if(d.Open(a,this.conn),1!=d.EOF){var e='"'+d.GetString(2,-1,'","','"\r\n"',"&nbsp;");Scoot.file().save(c,e)}d.Close},this.open=function(a,d,e){var f=!1;arguments.length>1&&(f=!0);var g=!1;arguments.length>2&&(g=!0);var h=new ActiveXObject("ADODB.RecordSet"),j=!0,k="fred",l='{ "'+k+'": [';for(h.Open(a,this.conn);1!=h.EOF;){var m="{ ";for(i=0;i<h.Fields.Count;i++){var n=c(h.Fields(i).Name,this.formats),o=c(h.Fields(i).value,this.formats);m+=i>0?", "+b(n,o):b(n,o)}m+=" } ",j?(l+=m,j=!1):l+=","+m,h.MoveNext()}if(l+=" ] } ",h.Close,this.data=JSON.parse(l).fred,null==d)return this.data[0][e];if(f){if(void 0==d)return;if(Array.isArray(d))return void this.data.forEach(function(a,b){d.push(a),g&&"object"==typeof e&&a[e.key]==e.value&&(e.item=a)});switch(typeof d){case"object":try{for(prop in d)d[prop]=this.data[0][prop]}catch(a){d[prop]=null}break;case"function":this.data.forEach(function(a,b){d.push(a),g&&"object"==typeof e&&a[e.key]==e.value&&(e.item=a)});break;default:this.data.forEach(function(a,b){d.push(a),g&&"object"==typeof e&&a[e.key]==e.value&&(e.item=a)})}}}},b.JSONConnection=function(a,b){function c(a){var b=new ActiveXObject("Scripting.FileSystemObject"),c=1,d=b.OpenTextFile(a,c),e=d.ReadAll();return d.close(),e}function d(a,b){var c=new ActiveXObject("Scripting.FileSystemObject"),d=c.CreateTextFile(a,!0);d.Write(b),d.close()}this.spec=a,this.source=b,this.filespec=this.spec+"\\"+this.source+".json",this.data=null,this.mapindex="",this.open=function(a,b){try{arguments.length>0&&(this.mapindex=a);var d=new ActiveXObject("Scripting.FileSystemObject");if(d.FileExists(this.filespec)){var e=c(this.filespec);return this.data=JSON.parse(e),arguments.length>1&&this.data[this.source].forEach(function(a,c){b.push(a)}),!0}return!1}catch(a){return!1}},this.update=function(a,b){this.data=a;var c={};null==b?c[this.source]=a:c[b]=a;var e=ko.toJSON(c);try{return d(this.filespec,e),!0}catch(a){return alert("Error in saving JSON to "+this.filespec+": "+a),!1}},this.updatetable=function(a,b){var c={};c.index=a,c[this.source]=b;var e=ko.toJSON(c);try{return d(this.filespec,e),!0}catch(a){return alert("Error in saving JSON to "+this.filespec+": "+a),!1}},this.add=function(a){var b=this.data.index+1;return a[this.mapindex]=b,this.data[this.source].push(a),this.UpdateTable(b,this.data[this.source]),a.id},this.get=function(a,b){},this.post=function(a,b,c){},this.query=function(a,b){var c=null,d=this.data[this.source];for(i=0;i<d.length;i++){var e=d[i];if(e[a]==b){c=e;break}}return c},this.narrow=function(a,b){var c=[],d=this.data[this.source];for(i=0;i<d.length;i++){var e=d[i];e[a]==b&&c.push(e)}return c}},b.shared=function(a){this.spec=a,this.data=null,this.sharedname="_pages_shared",this.init=function(){if(void 0!=this.spec&&null!=this.spec){var a=b.data("JSON",this.spec,this.sharedname);a.open(),null!=a.data&&(this.data=a.data[this.sharedname])}},this.update=function(a){if(null!=this.spec){var c=b.data("JSON",this.spec,this.sharedname);c.open(),c.update(a,this.sharedname)}},this.save=function(){this.update(this.data)},this.init()},b.data=function(a,c,d){switch(a.toUpperCase()){case"JSON":return new b.JSONConnection(c,d);case"XML":return new b.XMLConnection(c,d);case"ADO":return new b.ADOConnection(c)}},b.page=function(a,b,c){return new e(a,b,c)},b.pad=function(a,b,c,d){var e="left";if(arguments.length>3&&(e=d.toLowerCase()),"left"==e.toLowerCase()){for(var f=new String(a);f.length<c;)f=b+f;return f}for(var f=new String(a);f.length<c;)f+=b;return f},b.left=function(a,b){return b<=0?"":b>String(a).length?a:String(a).substring(0,b)},b.right=function(a,b){if(b<=0)return"";if(b>String(a).length)return a;var c=String(a).length;return String(a).substring(c,c-b)},b}"undefined"==typeof a.Scoot&&(a.Scoot=b())}(window);