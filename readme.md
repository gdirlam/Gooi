#Gooi - Client side web application scaffold

##Roadmap
* [GooiAssert] (tree/master/GooiAssert)
    * [Gooi Assert File] (tree/master/GooiAssert/GooiAssert.js)
* [GooiCore] (tree/master/GooiCore/)
    * [Gooi Core File] (tree/master/GooiCore/GooiCore.js)
* [GooiHelper] (tree/master/GooiHelper)
    * [Gooi Helper Strings] (tree/master/Gooihelper/GooiHelperString.js)
* GooiPage
    * GooiPageHeader
        * GooiPageHeaderMenu
    * GooiPageContent
* GooiUx
    * GooiUxButton
    * GooiUxFaceted
    * GooiUxForm
    * GooiUxGrid
* &iquest;GooiType?
* GooiPicto


Roadmap & Documentaion  

 
##Tests
tests still kind of suck, but are somewhat useful now.
* <a href="test/_GooiAssert.htm">Checking Assert</a>
* <a href="test/_GooiCore.htm">Checking Core</a>
    * __todo:__ scripts 
    * <a href="test/_GooiCoreLoader.htm">Checking Loader</a>
        * __todo:__ loader needs to be interact better with DOM ready 
        * __todo:__ scripts need to register to a observer, to get their initializers fired pre-dom ready
    * <a href="test/_GooiCoreSocket.htm">Checking Sockets</a>
* Gooi Helpers
    * <a href="test/_GooiHelperString.htm">Checking String Helper</a>
        * __todo:__ need to make prototype state toggle for when I do not want to modify the inherent primative classes 

##To Do- (Tasks)
* Need to make a better lift file for places where code come from
* I am unhappy with the roadmap with GooiPage and GooiUx... the differences and similariries between these items is troubling. 
* I need to add styling to the dependency loader
* Need to specify which versions of IE that

##Lift
* <a target="_blank" href="http://dean.edwards.name/weblog/2006/03/base/">Dean Edwards Base</a> - thinking about some prototype functionationality - not yet used<br/>
* <a target="_blank" href="//developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array">developer.mozilla.org</a>: Code to upgrade arrays to javascript 1.8<br/>
* <a target="_blank" href="//code.google.com/p/domready/">Dom Ready - Tubal Martin </a> I am using this whole thing<br/>
* <a target="_blank" href="//developer.yahoo.com/yui/yuitest/#start">Philo: Yui Test</a> Not used. <br/>
* <a target="_blank" href="//github.com/amdjs/underscore/blob/master/underscore.js">Underscore</a> Not used. <br/>