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

"undefined"!=typeof window.Scoot&&(Scoot.Mail=function(){return _Mail={},_Mail.config=function(a,b,c,d){return this.sendusing=2,this.smtpserver="mail.nowhere.com",arguments.length>0&&(this.smtpserver=a),this.port=25,arguments.length>1&&(this.port=b),this.authenticate=1,this.usessl=!0,this.timeout=60,this.username="empty",arguments.length>2&&(this.username=c),this.password="empty",arguments.length>3&&(this.password=d),this},_Mail.new=function(a){var b=null,c="http://schemas.microsoft.com/cdo/configuration/";try{null==a&&(a=new _Mail.config),b=new ActiveXObject("CDO.message");var d=b.Configuration;d.Fields.Item(c+"sendusing")=a.sendusing,d.Fields.Item(c+"smtpserver")=a.smtpserver,d.Fields.Item(c+"smptserverport")=a.port,d.Fields.Item(c+"smtpauthenticate")=a.authenticate,d.Fields.Item(c+"smtpusessl")=a.usessl,d.Fields.Item(c+"smtpconnectiontimeout")=a.timeout,d.Fields.Item(c+"sendusername")=a.username,d.Fields.Item(c+"sendpassword")=a.password,d.Fields.Update()}catch(a){alert("ERROR: NewMessage failed to create a message object."+a.message)}return b},_Mail}(Scoot));