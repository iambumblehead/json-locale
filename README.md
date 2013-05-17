json-locale
===========
**(c)[Bumblehead][0], 2013** [MIT-license](#license), [Unicode Terms](#terms)

### OVERVIEW:

The [official Unicode ldml-JSON][1] files are provided here. These files provide **standardised** format descriptors for display of times, dates, currencies, etc., using the [Unicode standard][5]. Additional scripts included help you generate new collections of JSON files that contain needed data only.

The benefits of libraries that follow the Unicode Standard for number and date formatting:  
 * compatible with other systems that follow the standard
 * usable with international (locale-specific) content

The original JSON files include formatting rules for multiple types of calendar and other information you probably do not need. Use this script to generate your own collection of these files that contain only the information you need.

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: http://www.unicode.org/repos/cldr-aux/json/22.1/   "unicode JSON"
[4]: http://www.unicode.org/reports/tr35/                  "ldml spec"
[5]: http://cldr.unicode.org/index/cldr-spec/json  "ldml-to-json spec"

---------------------------------------------------------
#### <a id="install"></a>INSTALL:

json-local may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install json-locale
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/json-locale.git
 ```

---------------------------------------------------------

#### <a id="get-started">Get Started:

 1. **Before Starting...**   

 'Examples demonstrate usage from a shell but this script is also usable from a javascript file. Each environment uses the same modifiers. Only the syntax is different. 'Both examples would produce the same output.
 
 > *shell*

 > ```bash
   $ node ./json-locale.js \  
     --inputPath=./JSONlocale/main \
     --keep=numbers,currencies,languages \
     --keepCalendars=gregorian \
     --keepCalendarItems=months,days,dateFormats,timeFormats \
     --keepNumberItems=symbolsFormatsNumberSystemLatn,currencies
   ```

 > *javascript file*

 > ```javascript
   var jsonLocale = require('json-locale');
   jsonLocale.convert({  
     inputDir : './JSONlocale/main',
     keep : ["numbers", "languages", "calendars"],  
     keepCalendars : ["gregorian"],
     keepCalendarItems : [
       "months",
       "days",
       "dateFormats",
       "timeFormats"
     ],
     keepNumberItems : [
       "symbolsFormatsNumberSystemLatn", 
       "currencies"
     ]
   }, function (err, res) {
     if (err) return console.log(err);
     console.log('finished!')
   });
   ```

 2. **Generate a Collection of JSON files**

 > ```bash
   $ node ./json-locale.js \  
    --inputPath=./JSONlocale/main \
    --keep=numbers,currencies,languages \
    --keepCalendars=gregorian \
    --keepCalendarItems=months,days,dateFormats,timeFormats \
    --keepNumberItems=symbolsFormatsNumberSystemLatn,currencies
   ```

---------------------------------------------------------

#### <a id="modifiers">Modifiers:

 - **--inputDir= _path_**, _default: ./JSONlocale/main_  
   
   a systempath to a directory or file.

 - **--outputDir= _path_**, _default: ./JSONlocaleNew_  
 
   a systempath to a directory or file.
   
 - **--keep= _item_, _anotheritem_**, _default: allItems_     
 
   direct json-local to keep specific items. if no items are specified, all items are kept. available items are elements of the `keep` array:

 > ```javascript
   keep : [
     "identity",
     "languages",
     "scripts",
     "territories",
     "variants",
     "keys",
     "types",
     "measurements",
     "codePatterns",
     "layouts",
     "characters",
     "calendars",
     "currencies",
     "numbers",
     "units"
   ];
   ```
    
 - **--keepCalendars= _item_, _anotheritem_**, _default: allItems_     
 
   direct json-local to keep specific items. if no items are specified, all items are kept. available items are elements of the `keepCalendars` array: 

 > ```javascript
   keepCalendars : [
     "buddhist", 
     "chinese", 
     "coptic", 
     "dangi",
     "ethiopic", 
     "ethiopicAmeteAlem",
     "gregorian",
     "hebrew", 
     "indian",
     "islamic", 
     "islamicCivil", 
      "japanese",
     "persian", 
     "roc"
   ];
   ```
 
 - **--keepCalendarItems= _item_, _anotheritem_**, _default: allItems_      
 
   direct json-local to keep specific items. if no items are specified, all items are kept. available items are elements of the `keepCalendarsItems` array:  

 > ```javascript
   keepCalendarsItems : [
     "months",
     "days",
     "quarters",
     "eras",
     "dateFormats",
     "timeFormats",
     "dateTimeFormats",
     "fields"      
   ];
   ```
 
 - **--keepNumberItems= _item_, _anotheritem_**, _default: allItems_      
 
   direct json-local to keep specific items. if no items are specified, all items are kept. available items are elements of the `keepNumbersItems` array:   

 > ```javascript
   keepNumbersItems : [
     "currencyFormatsNumberSystemLatn",
     "symbolsNumberSystemLatn",
     "decimalFormatsNumberSystemLatn",
     "currencies"
   ]
   ```
 
---------------------------------------------------------

#### <a id="license">License:

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


---------------------------------------------------------

#### <a id="unicodeLicense">Unicode License:

(The Unicode License) http://unicode.org/copyright.html

* Unicode Copyright.

  1. Copyright © 1991-2013 Unicode, Inc. All rights reserved.
  
  2. Certain documents and files on this website contain a legend indicating that "Modification is permitted." Any person is hereby authorized, without fee, to modify such documents and files to create derivative works conforming to the Unicode® Standard, subject to Terms and Conditions herein.
  
  3. Any person is hereby authorized, without fee, to view, use, reproduce, and distribute all documents and files solely for informational purposes in the creation of products supporting the Unicode Standard, subject to the Terms and Conditions herein.

  4. Further specifications of rights and restrictions pertaining to the use of the particular set of data files known as the "Unicode Character Database" can be found in Exhibit 1.

  5. Each version of the Unicode Standard has further specifications of rights and restrictions of use. For the book editions (Unicode 5.0 and earlier), these are found on the back of the title page. The online code charts carry specific restrictions. All other files, including online documentation of the core specification for Unicode 6.0 and later, are covered under these general Terms of Use.

  6. No license is granted to "mirror" the Unicode website where a fee is charged for access to the "mirror" site.

  7. Modification is not permitted with respect to this document. All copies of this document must be verbatim.

* Restricted Rights Legend. Any technical data or software which is licensed to the United States of America, its agencies and/or instrumentalities under this Agreement is commercial technical data or commercial computer software developed exclusively at private expense as defined in FAR 2.101, or DFARS 252.227-7014 (June 1995), as applicable. For technical data, use, duplication, or disclosure by the Government is subject to restrictions as set forth in DFARS 202.227-7015 Technical Data, Commercial and Items (Nov 1995) and this Agreement. For Software, in accordance with FAR 12-212 or DFARS 227-7202, as applicable, use, duplication or disclosure by the Government is subject to the restrictions set forth in this Agreement.

* Warranties and Disclaimers.

  1. This publication and/or website may include technical or typographical errors or other inaccuracies . Changes are periodically added to the information herein; these changes will be incorporated in new editions of the publication and/or website. Unicode may make improvements and/or changes in the product(s) and/or program(s) described in this publication and/or website at any time.

  2. If this file has been purchased on magnetic or optical media from Unicode, Inc. the sole and exclusive remedy for any claim will be exchange of the defective media within ninety (90) days of original purchase.

  3. EXCEPT AS PROVIDED IN SECTION C.2, THIS PUBLICATION AND/OR SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. UNICODE AND ITS LICENSORS ASSUME NO RESPONSIBILITY FOR ERRORS OR OMISSIONS IN THIS PUBLICATION AND/OR SOFTWARE OR OTHER DOCUMENTS WHICH ARE REFERENCED BY OR LINKED TO THIS PUBLICATION OR THE UNICODE WEBSITE.

* Waiver of Damages. In no event shall Unicode or its licensors be liable for any special, incidental, indirect or consequential damages of any kind, or any damages whatsoever, whether or not Unicode was advised of the possibility of the damage, including, without limitation, those resulting from the following: loss of use, data or profits, in connection with the use, modification or distribution of this information or its derivatives.

* Trademarks & Logos.

  1. The Unicode Word Mark and the Unicode Logo are trademarks of Unicode, Inc. “The Unicode Consortium” and “Unicode, Inc.” are trade names of Unicode, Inc. Use of the information and materials found on this website indicates your acknowledgement of Unicode, Inc.’s exclusive worldwide rights in the Unicode Word Mark, the Unicode Logo, and the Unicode trade names.

  2. The Unicode Consortium Name and Trademark Usage Policy (“Trademark Policy”) are incorporated herein by reference and you agree to abide by the provisions of the Trademark Policy, which may be changed from time to time in the sole discretion of Unicode, Inc.

  3. All third party trademarks referenced herein are the property of their respective owners.

* Miscellaneous.

  1. Jurisdiction and Venue. This server is operated from a location in the State of California, United States of America. Unicode makes no representation that the materials are appropriate for use in other locations. If you access this server from other locations, you are responsible for compliance with local laws. This Agreement, all use of this site and any claims and damages resulting from use of this site are governed solely by the laws of the State of California without regard to any principles which would apply the laws of a different jurisdiction. The user agrees that any disputes regarding this site shall be resolved solely in the courts located in Santa Clara County, California. The user agrees said courts have personal jurisdiction and agree to waive any right to transfer the dispute to any other forum.

  2. Modification by Unicode Unicode shall have the right to modify this Agreement at any time by posting it to this site. The user may not assign any part of this Agreement without Unicode’s prior written consent.

  3. Taxes. The user agrees to pay any taxes arising from access to this website or use of the information herein, except for those based on Unicode’s net income.

  4. Severability.  If any provision of this Agreement is declared invalid or unenforceable, the remaining provisions of this Agreement shall remain in effect.

  5. Entire Agreement. This Agreement constitutes the entire agreement between the parties. 


---------------------------------------------------------

#### <a id="unicodeTerms">Unicode Terms:


(Unicode inc, License Agreement) http://unicode.org/copyright.html

EXHIBIT 1
UNICODE, INC. LICENSE AGREEMENT - DATA FILES AND SOFTWARE

Unicode Data Files include all data files under the directories http://www.unicode.org/Public/, http://www.unicode.org/reports/, and http://www.unicode.org/cldr/data/. Unicode Data Files do not include PDF online code charts under the directory http://www.unicode.org/Public/. Software includes any source code published in the Unicode Standard or under the directories http://www.unicode.org/Public/, http://www.unicode.org/reports/, and http://www.unicode.org/cldr/data/.

NOTICE TO USER: Carefully read the following legal agreement. BY DOWNLOADING, INSTALLING, COPYING OR OTHERWISE USING UNICODE INC.'S DATA FILES ("DATA FILES"), AND/OR SOFTWARE ("SOFTWARE"), YOU UNEQUIVOCALLY ACCEPT, AND AGREE TO BE BOUND BY, ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT. IF YOU DO NOT AGREE, DO NOT DOWNLOAD, INSTALL, COPY, DISTRIBUTE OR USE THE DATA FILES OR SOFTWARE.

COPYRIGHT AND PERMISSION NOTICE

Copyright © 1991-2013 Unicode, Inc. All rights reserved. Distributed under the Terms of Use in http://www.unicode.org/copyright.html.

Permission is hereby granted, free of charge, to any person obtaining a copy of the Unicode data files and any associated documentation (the "Data Files") or Unicode software and any associated documentation (the "Software") to deal in the Data Files or Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, and/or sell copies of the Data Files or Software, and to permit persons to whom the Data Files or Software are furnished to do so, provided that (a) the above copyright notice(s) and this permission notice appear with all copies of the Data Files or Software, (b) both the above copyright notice(s) and this permission notice appear in associated documentation, and (c) there is clear notice in each modified Data File or in the Software as well as in the documentation associated with the Data File(s) or Software that the data or software has been modified.

THE DATA FILES AND SOFTWARE ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR HOLDERS INCLUDED IN THIS NOTICE BE LIABLE FOR ANY CLAIM, OR ANY SPECIAL INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THE DATA FILES OR SOFTWARE.

Except as contained in this notice, the name of a copyright holder shall not be used in advertising or otherwise to promote the sale, use or other dealings in these Data Files or Software without prior written authorization of the copyright holder.

Unicode and the Unicode logo are trademarks of Unicode, Inc. in the United States and other countries. All third party trademarks referenced herein are the property of their respective owners.
