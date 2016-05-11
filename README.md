# WUI (Webteam User Interface) #
[http://www.wui-js.com/wui-1-2/](http://www.wui-js.com/wui-1-2/)

Version: 1.3, Last updated: 05/11/2016

Version 1.3 Design Goals
------------------------

 - Full Javascript backward compatibility with WUI 1.2.1
    - Where method or variable names are confusing they should be fixed. Variable names should be
      as long as necessary and no longer or shorter. Methods that are renamed should have a pointer
      method that retains the old name.
    - Exception: Any security flaws that cannot be fixed in a backward compatible way will still be
      fixed.
 - No promise of CSS backward compatibility
    - Specifically, flexbox rules should be removed from 1.2.1 css
    - Possibility of using CSX library to create custom WUI CSS per the version.

<img src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" alt="browserStack logo" width="200px"/>

BrowserStack testing commands:

Local: `./node_modules/nightwatch/bin/nightwatch ./nightwatch_tests/ -c ./nightwatch-local.json`

Remote `./node_modules/nightwatch/bin/nightwatch ./nightwatch_tests/ -e chrome,firefox,ie,safari`

## License ##
Copyright (c) 2013-2016 Stephen Rolfe Nielsen
Licensed under the MIT license.  
[http://www.wui-js.com/wui-1-2/license.html](http://www.wui-js.com/wui-1-2/license.html)

