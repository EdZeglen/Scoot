/*

Scoot Mail

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

    Scoot.Mail = function () {

        _Mail = {};

        _Mail.config = function (server, port, user, pass) {

            // defaults and overrrides based on given data.

            this.sendusing = 2; //NTLM method

            this.smtpserver = "mail.nowhere.com";
            if (arguments.length > 0)
                this.smtpserver = server;

            this.port = 25;
            if (arguments.length > 1)
                this.port = port;

            this.authenticate = 1;
            this.usessl = true;
            this.timeout = 60;

            this.username = "empty";
            if (arguments.length > 2)
                this.username = user;

            this.password = "empty";
            if (arguments.length > 3)
                this.password = pass;

            return (this);

        }

        _Mail.new = function (config) {

            var oMessage = null;
            var configPrefix = "http://schemas.microsoft.com/cdo/configuration/";

            try {

                if (config == null) {
                    config = new _Mail.config();
                }

                oMessage = new ActiveXObject("CDO.message");
                var msgconfig = oMessage.Configuration;

                msgconfig.Fields.Item(configPrefix + "sendusing") = config.sendusing;
                msgconfig.Fields.Item(configPrefix + "smtpserver") = config.smtpserver; // "smtp.gmail.com";
                msgconfig.Fields.Item(configPrefix + "smptserverport") = config.port;

                msgconfig.Fields.Item(configPrefix + "smtpauthenticate") = config.authenticate
                msgconfig.Fields.Item(configPrefix + "smtpusessl") = config.usessl;
                msgconfig.Fields.Item(configPrefix + "smtpconnectiontimeout") = config.timeout;

                msgconfig.Fields.Item(configPrefix + "sendusername") = config.username;
                msgconfig.Fields.Item(configPrefix + "sendpassword") = config.password;

                msgconfig.Fields.Update();

            } catch (err) {
                alert("ERROR: NewMessage failed to create a message object." + err.message);

            }

            return (oMessage);

        }

        return (_Mail);

    }(Scoot);

}

