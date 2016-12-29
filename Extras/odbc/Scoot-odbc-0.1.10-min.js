/*

Scoot ODBC

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
"undefined"!=typeof window.Scoot&&(Scoot.odbc=function(){function a(a,b){for(var c=!1,d=0;d<a.drivers.length;d++)if(a.drivers[d].name==b){c=!0;break}return c}return _ODBC={},_ODBC.reg=Scoot.registry,_ODBC.keys=["HKEY_LOCAL_MACHINE\\SOFTWARE\\ODBC\\ODBCINST.INI\\SQL Server\\Driver","HKEY_LOCAL_MACHINE\\SOFTWARE\\ODBC\\ODBCINST.INI\\SQL Server Native Client 11.0\\Driver","HKEY_LOCAL_MACHINE\\SOFTWARE\\ODBC\\ODBCINST.INI\\SQL Server Native Client 10.0\\Driver","HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\ODBC\\ODBCINST.INI\\SQL Server\\Driver","HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\ODBC\\ODBCINST.INI\\SQL Server Native Client 11.0\\Driver","HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\ODBC\\ODBCINST.INI\\SQL Server Native Client 10.0\\Driver"],_ODBC.drivers=[],_ODBC.init=function(){for(index=0;index<_ODBC.keys.length;index++){var b=_ODBC.keys[index];if(this.reg.keyexists(b)){var c=b.split("\\"),d=c[c.length-2],e="{"+d.toLowerCase()+"}",f={name:d,alias:e,value:b};a(_ODBC,d)||_ODBC.drivers.push(f)}}},_ODBC.newconn=function(a){var b={driver:"",server:"",database:"",trusted_connection:a,userid:"",pwd:""};return b},_ODBC.fromconnection=function(a){for(var b=this.newconn("no"),c=a.toLowerCase().split(";"),d=0;d<c.length;d++){var e=c[d].split("="),f=e[0];"user id"==f&&(f="userid"),"password"==f&&(f="pwd"),b[f]=e[1]}return b},_ODBC.toconnection=function(a){var b="DRIVER="+a.driver+";SERVER="+a.server+";DATABASE="+a.database+";";return b+="yes"==a.trusted_connection?"Trusted_Connection=Yes":"user id="+a.userid+";pwd="+a.pwd+";"},_ODBC}(Scoot));