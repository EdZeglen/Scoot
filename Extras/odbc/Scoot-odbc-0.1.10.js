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

if (typeof (window.Scoot) !== 'undefined') {

    Scoot.odbc = function () {
        
        _ODBC = { };
        _ODBC.reg = Scoot.registry;
        _ODBC.keys = [
            "HKEY_LOCAL_MACHINE\\SOFTWARE\\ODBC\\ODBCINST.INI\\SQL Server\\Driver",
            "HKEY_LOCAL_MACHINE\\SOFTWARE\\ODBC\\ODBCINST.INI\\SQL Server Native Client 11.0\\Driver",
            "HKEY_LOCAL_MACHINE\\SOFTWARE\\ODBC\\ODBCINST.INI\\SQL Server Native Client 10.0\\Driver",
            "HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\ODBC\\ODBCINST.INI\\SQL Server\\Driver",
            "HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\ODBC\\ODBCINST.INI\\SQL Server Native Client 11.0\\Driver",
            "HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\ODBC\\ODBCINST.INI\\SQL Server Native Client 10.0\\Driver"
        ]; 
        _ODBC.drivers = [];
                
        _ODBC.init = function () {
            for (index = 0; index < _ODBC.keys.length; index++) {
                var regpath = _ODBC.keys[index];
                if (this.reg.keyexists(regpath)) {
                    var pathdata = regpath.split("\\");
                    var name = pathdata[pathdata.length - 2];
                    var alias = "{" + name.toLowerCase() + "}";
                    var obj = { "name": name, "alias": alias, "value": regpath };
                    if (!WasAdded(_ODBC, name))
                        _ODBC.drivers.push(obj);
                }
            }
        }

        _ODBC.newconn = function (trusted) {
            var obj = {
                "driver": "",
                "server": "",
                "database": "",
                "trusted_connection": trusted,
                "userid": "",
                "pwd": ""
            }
            return (obj);
        }

        function WasAdded(ths, name) {
            var wasadded = false;
            for (var index = 0; index < ths.drivers.length; index++) {
                if (ths.drivers[index].name == name) {
                    wasadded = true;
                    break;
                }
            }
            return (wasadded);
        }

        _ODBC.fromconnection = function (string) {

            var obj = this.newconn("no");

            var conna = string.toLowerCase().split(';');
            for (var i = 0; i < conna.length; i++) {
                var nvp = conna[i].split("=");
                var pname = nvp[0];
                if (pname == 'user id')
                    pname = 'userid';
                if (pname == 'password')
                    pname = 'pwd';
                obj[pname] = nvp[1];
            }

            return obj
        }

        _ODBC.toconnection = function (obj) {
            var connstring = "DRIVER=" + obj.driver + ";SERVER=" + obj.server + ";DATABASE=" + obj.database + ";";

            if (obj.trusted_connection == "yes") {
                connstring += "Trusted_Connection=Yes";
            } else {
                connstring += "user id=" + obj.userid + ";pwd=" + obj.pwd + ";";
            }
            return (connstring);
        }
      
        return (_ODBC);

    }(Scoot);

}

