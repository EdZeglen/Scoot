/*

Scoot Registry

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

    Scoot.registry = function () {

        // this can never write keys, windows will not allow it,
        // and if you try you will get no errors, it just wont save.
        // do not try it. its a waste of time. its an undocumented 
        // block on the registry. Read from it all you like.

        _Registry = {};

        _Registry.shell = new ActiveXObject("WScript.Shell");

        _Registry.getkey = function (path, defaultv) {
            try {
                var value = this.shell.RegRead(path);
                return (value);
            } catch (err) {
                return (defaultv);
            }
        }

        _Registry.keyexists = function (path) {
            try {
                var value = this.shell.RegRead(path);
                return true;
            } catch (err) {
                return false
            }
        }
      
        return (_Registry);

    }(Scoot);

}

