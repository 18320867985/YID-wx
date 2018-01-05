/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */
(function(){function k(a,b){return[].slice.call((b||document).querySelectorAll(a))}if(window.addEventListener){var e=window.StyleFix={link:function(a){try{if("stylesheet"!==a.rel||a.hasAttribute("data-noprefix"))return}catch(b){return}var c=a.href||a.getAttribute("data-href"),d=c.replace(/[^\/]+$/,""),h=(/^[a-z]{3,10}:/.exec(d)||[""])[0],l=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(d)||[""])[0],g=/^([^?]*)\??/.exec(c)[1],m=a.parentNode,f=new XMLHttpRequest,n;f.onreadystatechange=function(){4===f.readyState&&
n()};n=function(){var b=f.responseText;if(b&&a.parentNode&&(!f.status||400>f.status||600<f.status)){b=e.fix(b,!0,a);if(d)var b=b.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(b,a,c){return/^([a-z]{3,10}:|#)/i.test(c)?b:/^\/\//.test(c)?'url("'+h+c+'")':/^\//.test(c)?'url("'+l+c+'")':/^\?/.test(c)?'url("'+g+c+'")':'url("'+d+c+'")'}),c=d.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"),b=b.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+c,"gi"),"$1");c=document.createElement("style");c.textContent=
b;c.media=a.media;c.disabled=a.disabled;c.setAttribute("data-href",a.getAttribute("href"));m.insertBefore(c,a);m.removeChild(a);c.media=a.media}};try{f.open("GET",c),f.send(null)}catch(p){"undefined"!=typeof XDomainRequest&&(f=new XDomainRequest,f.onerror=f.onprogress=function(){},f.onload=n,f.open("GET",c),f.send(null))}a.setAttribute("data-inprogress","")},styleElement:function(a){if(!a.hasAttribute("data-noprefix")){var b=a.disabled;a.textContent=e.fix(a.textContent,!0,a);a.disabled=b}},styleAttribute:function(a){var b=
a.getAttribute("style"),b=e.fix(b,!1,a);a.setAttribute("style",b)},process:function(){k('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);k("style").forEach(StyleFix.styleElement);k("[style]").forEach(StyleFix.styleAttribute)},register:function(a,b){(e.fixers=e.fixers||[]).splice(void 0===b?e.fixers.length:b,0,a)},fix:function(a,b,c){for(var d=0;d<e.fixers.length;d++)a=e.fixers[d](a,b,c)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(b,a){return a.toUpperCase()}).replace("-",
"")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(b){return"-"+b.toLowerCase()})}};(function(){setTimeout(function(){k('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()}})();
(function(k){function e(b,c,d,h,l){b=a[b];b.length&&(b=RegExp(c+"("+b.join("|")+")"+d,"gi"),l=l.replace(b,h));return l}if(window.StyleFix&&window.getComputedStyle){var a=window.PrefixFree={prefixCSS:function(b,c,d){var h=a.prefix;-1<a.functions.indexOf("linear-gradient")&&(b=b.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(b,a,c,d){return a+(c||"")+"linear-gradient("+(90-d)+"deg"}));b=e("functions","(\\s|:|,)","\\s*\\(","$1"+h+"$2(",b);b=e("keywords","(\\s|:)","(\\s|;|\\}|$)",
"$1"+h+"$2$3",b);b=e("properties","(^|\\{|\\s|;)","\\s*:","$1"+h+"$2:",b);if(a.properties.length){var l=RegExp("\\b("+a.properties.join("|")+")(?!:)","gi");b=e("valueProperties","\\b",":(.+?);",function(a){return a.replace(l,h+"$1")},b)}c&&(b=e("selectors","","\\b",a.prefixSelector,b),b=e("atrules","@","\\b","@"+h+"$1",b));b=b.replace(RegExp("-"+h,"g"),"-");return b=b.replace(/-\*-(?=[a-z]+)/gi,a.prefix)},property:function(b){return(0<=a.properties.indexOf(b)?a.prefix:"")+b},value:function(b,c){b=
e("functions","(^|\\s|,)","\\s*\\(","$1"+a.prefix+"$2(",b);b=e("keywords","(^|\\s)","(\\s|$)","$1"+a.prefix+"$2$3",b);0<=a.valueProperties.indexOf(c)&&(b=e("properties","(^|\\s|,)","($|\\s|,)","$1"+a.prefix+"$2$3",b));return b},prefixSelector:function(b){return b.replace(/^:{1,2}/,function(b){return b+a.prefix})},prefixProperty:function(b,c){var d=a.prefix+b;return c?StyleFix.camelCase(d):d}};(function(){var b={},c=[],d=getComputedStyle(document.documentElement,null),h=document.createElement("div").style,
l=function(a){if("-"===a.charAt(0)){c.push(a);a=a.split("-");var d=a[1];for(b[d]=++b[d]||1;3<a.length;)a.pop(),d=a.join("-"),StyleFix.camelCase(d)in h&&-1===c.indexOf(d)&&c.push(d)}};if(0<d.length)for(var g=0;g<d.length;g++)l(d[g]);else for(var e in d)l(StyleFix.deCamelCase(e));var g=0,f,k;for(k in b)d=b[k],g<d&&(f=k,g=d);a.prefix="-"+f+"-";a.Prefix=StyleFix.camelCase(a.prefix);a.properties=[];for(g=0;g<c.length;g++)e=c[g],0===e.indexOf(a.prefix)&&(f=e.slice(a.prefix.length),StyleFix.camelCase(f)in
h||a.properties.push(f));!("Ms"!=a.Prefix||"transform"in h||"MsTransform"in h)&&"msTransform"in h&&a.properties.push("transform","transform-origin");a.properties.sort()})();(function(){function b(a,b){h[b]="";h[b]=a;return!!h[b]}var c={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};c["repeating-linear-gradient"]=
c["repeating-radial-gradient"]=c["radial-gradient"]=c["linear-gradient"];var d={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","max-content":"width","min-content":"width","fit-content":"width","fill-available":"width"};a.functions=[];a.keywords=[];var h=document.createElement("div").style,e;for(e in c){var g=c[e],k=g.property,g=e+"("+g.params+")";!b(g,k)&&
b(a.prefix+g,k)&&a.functions.push(e)}for(var f in d)k=d[f],!b(f,k)&&b(a.prefix+f,k)&&a.keywords.push(f)})();(function(){function b(a){e.textContent=a+"{}";return!!e.sheet.cssRules.length}var c={":read-only":null,":read-write":null,":any-link":null,"::selection":null},d={keyframes:"name",viewport:null,document:'regexp(".")'};a.selectors=[];a.atrules=[];var e=k.appendChild(document.createElement("style")),l;for(l in c){var g=l+(c[l]?"("+c[l]+")":"");!b(g)&&b(a.prefixSelector(g))&&a.selectors.push(l)}for(var m in d)g=
m+" "+(d[m]||""),!b("@"+g)&&b("@"+a.prefix+g)&&a.atrules.push(m);k.removeChild(e)})();a.valueProperties=["transition","transition-property"];k.className+=" "+a.prefix;StyleFix.register(a.prefixCSS)}})(document.documentElement);
/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton; http://www.modernizr.com/license/
 *
 * Includes matchMedia polyfill; Copyright (c) 2010 Filament Group, Inc; http://opensource.org/licenses/MIT
 *
 * Includes material adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js; Copyright 2009-2012 by contributors; http://opensource.org/licenses/MIT
 *
 * Includes material from css-support; Copyright (c) 2005-2012 Diego Perini; https://github.com/dperini/css-support/blob/master/LICENSE
 *
 * NUGET: END LICENSE TEXT */
/*!
 * Modernizr v2.6.2
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */
/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */
window.Modernizr=(function(window,document,undefined){var version='2.6.2',Modernizr={},enableClasses=true,docElement=document.documentElement,mod='modernizr',modElem=document.createElement(mod),mStyle=modElem.style,inputElem =document.createElement('input'),smile=':)',toString={}.toString,prefixes=' -webkit- -moz- -o- -ms- '.split(' '),omPrefixes='Webkit Moz O ms',cssomPrefixes=omPrefixes.split(' '),domPrefixes=omPrefixes.toLowerCase().split(' '),ns={'svg':'http://www.w3.org/2000/svg'},tests={},inputs={},attrs={},classes=[],slice=classes.slice,featureName,injectElementWithStyles=function(rule,callback,nodes,testnames){var style,ret,node,docOverflow,div=document.createElement('div'),body=document.body,fakeBody=body||document.createElement('body');if(parseInt(nodes,10)){while(nodes--){node=document.createElement('div');node.id=testnames?testnames[nodes]:mod+(nodes+1);div.appendChild(node)}}style=['&#173;','<style id="s',mod,'">',rule,'</style>'].join('');div.id=mod;(body?div:fakeBody).innerHTML+=style;fakeBody.appendChild(div);if(!body){fakeBody.style.background='';fakeBody.style.overflow='hidden';docOverflow=docElement.style.overflow;docElement.style.overflow='hidden';docElement.appendChild(fakeBody)}ret=callback(div,rule);if(!body){fakeBody.parentNode.removeChild(fakeBody);docElement.style.overflow=docOverflow}else{div.parentNode.removeChild(div)}return!!ret},testMediaQuery=function(mq){var matchMedia=window.matchMedia||window.msMatchMedia;if(matchMedia){return matchMedia(mq).matches}var bool;injectElementWithStyles('@media '+mq+' { #'+mod+' { position: absolute; } }',function(node){bool=(window.getComputedStyle?getComputedStyle(node,null):node.currentStyle)['position']=='absolute'});return bool},isEventSupported=(function(){var TAGNAMES={'select':'input','change':'input','submit':'form','reset':'form','error':'img','load':'img','abort':'img'};function isEventSupported(eventName,element){element=element||document.createElement(TAGNAMES[eventName]||'div');eventName='on'+eventName;var isSupported=eventName in element;if(!isSupported){if(!element.setAttribute){element=document.createElement('div')}if(element.setAttribute&&element.removeAttribute){element.setAttribute(eventName,'');isSupported=is(element[eventName],'function');if(!is(element[eventName],'undefined')){element[eventName]=undefined}element.removeAttribute(eventName)}}element=null;return isSupported}return isEventSupported})(),_hasOwnProperty=({}).hasOwnProperty,hasOwnProp;if(!is(_hasOwnProperty,'undefined')&&!is(_hasOwnProperty.call,'undefined')){hasOwnProp=function(object,property){return _hasOwnProperty.call(object,property)}}else{hasOwnProp=function(object,property){return((property in object)&&is(object.constructor.prototype[property],'undefined'))}}if(!Function.prototype.bind){Function.prototype.bind=function bind(that){var target=this;if(typeof target!="function"){throw new TypeError()}var args=slice.call(arguments,1),bound=function(){if(this instanceof bound){var F=function(){};F.prototype=target.prototype;var self=new F();var result=target.apply(self,args.concat(slice.call(arguments)));if(Object(result)===result){return result}return self}else{return target.apply(that,args.concat(slice.call(arguments)))}};return bound}}function setCss(str){mStyle.cssText=str}function setCssAll(str1,str2){return setCss(prefixes.join(str1+';')+(str2||''))}function is(obj,type){return typeof obj===type}function contains(str,substr){return! !~(''+str).indexOf(substr)}function testProps(props,prefixed){for(var i in props){var prop=props[i];if(!contains(prop,"-")&&mStyle[prop]!==undefined){return prefixed=='pfx'?prop:true}}return false}function testDOMProps(props,obj,elem){for(var i in props){var item=obj[props[i]];if(item!==undefined){if(elem===false){return props[i]}if(is(item,'function')){return item.bind(elem||obj)}return item}}return false}function testPropsAll(prop,prefixed,elem){var ucProp=prop.charAt(0).toUpperCase()+prop.slice(1),props=(prop+' '+cssomPrefixes.join(ucProp+' ')+ucProp).split(' ');if(is(prefixed,"string")||is(prefixed,"undefined")){return testProps(props,prefixed);}else{props=(prop+' '+(domPrefixes).join(ucProp+' ')+ucProp).split(' ');return testDOMProps(props,prefixed,elem)}}tests['flexbox']=function(){return testPropsAll('flexWrap')};tests['flexboxlegacy']=function(){return testPropsAll('boxDirection')};tests['canvas']=function(){var elem=document.createElement('canvas');return!!(elem.getContext&&elem.getContext('2d'))};tests['canvastext']=function(){return!!(Modernizr['canvas']&&is(document.createElement('canvas').getContext('2d').fillText,'function'))};tests['webgl']=function(){return!!window.WebGLRenderingContext};tests['touch']=function(){var bool;if(('ontouchstart'in window)||window.DocumentTouch&&document instanceof DocumentTouch){bool=true}else{injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''),function(node){bool=node.offsetTop===9})}return bool};tests['geolocation']=function(){return 'geolocation'in navigator};tests['postmessage']=function(){return!!window.postMessage};tests['websqldatabase']=function(){return!!window.openDatabase};tests['indexedDB']=function(){return!!testPropsAll("indexedDB",window)};tests['hashchange']=function(){return isEventSupported('hashchange',window)&&(document.documentMode===undefined||document.documentMode>7)};tests['history']=function(){return!!(window.history&&history.pushState)};tests['draganddrop']=function(){var div=document.createElement('div');return('draggable'in div)||('ondragstart'in div&&'ondrop'in div)};tests['websockets']=function(){return 'WebSocket'in window||'MozWebSocket'in window};tests['rgba']=function(){setCss('background-color:rgba(150,255,150,.5)');return contains(mStyle.backgroundColor,'rgba')};tests['hsla']=function(){setCss('background-color:hsla(120,40%,100%,.5)');return contains(mStyle.backgroundColor,'rgba')||contains(mStyle.backgroundColor,'hsla')};tests['multiplebgs']=function(){setCss('background:url(https://),url(https://),red url(https://)');return(/(url\s*\(.*?){3}/).test(mStyle.background)};tests['backgroundsize']=function(){return testPropsAll('backgroundSize')};tests['borderimage']=function(){return testPropsAll('borderImage')};tests['borderradius']=function(){return testPropsAll('borderRadius')};tests['boxshadow']=function(){return testPropsAll('boxShadow')};tests['textshadow']=function(){return document.createElement('div').style.textShadow===''};tests['opacity']=function(){setCssAll('opacity:.55');return(/^0.55$/).test(mStyle.opacity)};tests['cssanimations']=function(){return testPropsAll('animationName')};tests['csscolumns']=function(){return testPropsAll('columnCount')};tests['cssgradients']=function(){var str1='background-image:',str2='gradient(linear,left top,right bottom,from(#9f9),to(white));',str3='linear-gradient(left top,#9f9, white);';setCss((str1+'-webkit- '.split(' ').join(str2+str1)+prefixes.join(str3+str1)).slice(0,-str1.length));return contains(mStyle.backgroundImage,'gradient')};tests['cssreflections']=function(){return testPropsAll('boxReflect')};tests['csstransforms']=function(){return!!testPropsAll('transform')};tests['csstransforms3d']=function(){var ret=!!testPropsAll('perspective');if(ret&&'webkitPerspective'in docElement.style){injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}',function(node,rule){ret=node.offsetLeft===9&&node.offsetHeight===3})}return ret};tests['csstransitions']=function(){return testPropsAll('transition')};tests['fontface']=function(){var bool;injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}',function(node,rule){var style=document.getElementById('smodernizr'),sheet=style.sheet||style.styleSheet,cssText=sheet?(sheet.cssRules&&sheet.cssRules[0]?sheet.cssRules[0].cssText:sheet.cssText||''):'';bool=/src/i.test(cssText)&&cssText.indexOf(rule.split(' ')[0])===0});return bool};tests['generatedcontent']=function(){var bool;injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''),function(node){bool=node.offsetHeight>=3});return bool};tests['video']=function(){var elem=document.createElement('video'),bool=false;try{if(bool=!!elem.canPlayType){bool=new Boolean(bool);bool.ogg=elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,'');bool.h264=elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,'');bool.webm=elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'')}}catch(e){}return bool};tests['audio']=function(){var elem=document.createElement('audio'),bool=false;try{if(bool=!!elem.canPlayType){bool=new Boolean(bool);bool.ogg=elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');bool.mp3=elem.canPlayType('audio/mpeg;').replace(/^no$/,'');bool.wav=elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/,'');bool.m4a=(elem.canPlayType('audio/x-m4a;')||elem.canPlayType('audio/aac;')).replace(/^no$/,'')}}catch(e){}return bool};tests['localstorage']=function(){try{localStorage.setItem(mod,mod);localStorage.removeItem(mod);return true}catch(e){return false}};tests['sessionstorage']=function(){try{sessionStorage.setItem(mod,mod);sessionStorage.removeItem(mod);return true}catch(e){return false}};tests['webworkers']=function(){return!!window.Worker};tests['applicationcache']=function(){return!!window.applicationCache};tests['svg']=function(){return!!document.createElementNS&&!!document.createElementNS(ns.svg,'svg').createSVGRect};tests['inlinesvg']=function(){var div=document.createElement('div');div.innerHTML='<svg/>';return(div.firstChild&&div.firstChild.namespaceURI)==ns.svg};tests['smil']=function(){return!!document.createElementNS&&/SVGAnimate/.test(toString.call(document.createElementNS(ns.svg,'animate')))};tests['svgclippaths']=function(){return!!document.createElementNS&&/SVGClipPath/.test(toString.call(document.createElementNS(ns.svg,'clipPath')))};function webforms(){Modernizr['input']=(function(props){for(var i=0,len=props.length;i<len;i+=1){attrs[props[i]]=!!(props[i]in inputElem)}if(attrs.list){attrs.list=!!(document.createElement('datalist')&&window.HTMLDataListElement)}return attrs})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));Modernizr['inputtypes']=(function(props){for(var i=0,bool,inputElemType,defaultView,len=props.length;i<len;i+=1){inputElem.setAttribute('type',inputElemType=props[i]);bool=inputElem.type!=='text';if(bool){inputElem.value=smile;inputElem.style.cssText='position:absolute;visibility:hidden;';if(/^range$/.test(inputElemType)&&inputElem.style.WebkitAppearance!==undefined){docElement.appendChild(inputElem);defaultView=document.defaultView;bool=defaultView.getComputedStyle&&defaultView.getComputedStyle(inputElem,null).WebkitAppearance!=='textfield'&&(inputElem.offsetHeight!==0);docElement.removeChild(inputElem)}else if(/^(search|tel)$/.test(inputElemType)){}else if(/^(url|email)$/.test(inputElemType)){bool=inputElem.checkValidity&&inputElem.checkValidity()===false}else{bool=inputElem.value!=smile}}inputs[props[i]]=!!bool}return inputs})('search tel url email datetime date month week time datetime-local number range color'.split(' '));}for(var feature in tests){if(hasOwnProp(tests,feature)){featureName=feature.toLowerCase();Modernizr[featureName]=tests[feature]();classes.push((Modernizr[featureName]?'':'no-')+featureName)}}Modernizr.input||webforms();Modernizr.addTest=function(feature,test){if(typeof feature=='object'){for(var key in feature){if(hasOwnProp(feature,key)){Modernizr.addTest(key,feature[key])}}}else{feature=feature.toLowerCase();if(Modernizr[feature]!==undefined){return Modernizr}test=typeof test=='function'?test():test;if(typeof enableClasses!=="undefined"&&enableClasses){docElement.className+=' '+(test?'':'no-')+feature}Modernizr[feature]=test}return Modernizr;};setCss('');modElem=inputElem=null;;(function(window,document){var options=window.html5||{};var reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var supportsHtml5Styles;var expando='_html5shiv';var expanID=0;var expandoData={};var supportsUnknownElements;(function(){try{var a=document.createElement('a');a.innerHTML='<xyz></xyz>';supportsHtml5Styles=('hidden'in a);supportsUnknownElements=a.childNodes.length==1||(function(){(document.createElement)('a');var frag=document.createDocumentFragment();return(typeof frag.cloneNode=='undefined'||typeof frag.createDocumentFragment=='undefined'||typeof frag.createElement=='undefined')}())}catch(e){supportsHtml5Styles=true;supportsUnknownElements=true}}());function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement('p'),parent=ownerDocument.getElementsByTagName('head')[0]||ownerDocument.documentElement;p.innerHTML='x<style>'+cssText+'</style>';return parent.insertBefore(p.lastChild,parent.firstChild)}function getElements(){var elements=html5.elements;return typeof elements=='string'?elements.split(' '):elements}function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];if(!data){data={};expanID+=1;ownerDocument[expando]=expanID;expandoData[expanID]=data}return data}function createElement(nodeName,ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createElement(nodeName)}if(!data){data=getExpandoData(ownerDocument)}var node;if(data.cache[nodeName]){node=data.cache[nodeName].cloneNode()}else if(saveClones.test(nodeName)){node=(data.cache[nodeName]=data.createElem(nodeName)).cloneNode()}else{node=data.createElem(nodeName)}return node.canHaveChildren&&!reSkip.test(nodeName)?data.frag.appendChild(node):node}function createDocumentFragment(ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createDocumentFragment()}data=data||getExpandoData(ownerDocument);var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;for(;i<l;i+=1){clone.createElement(elems[i])}return clone}function shivMethods(ownerDocument,data){if(!data.cache){data.cache={};data.createElem=ownerDocument.createElement;data.createFrag=ownerDocument.createDocumentFragment;data.frag=data.createFrag()}ownerDocument.createElement=function(nodeName){if(!html5.shivMethods){return data.createElem(nodeName)}return createElement(nodeName,ownerDocument,data)};ownerDocument.createDocumentFragment=Function('h,f','return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&('+getElements().join().replace(/\w+/g,function(nodeName){data.createElem(nodeName);data.frag.createElement(nodeName);return 'c("'+nodeName+'")'})+');return n}')(html5,data.frag)}function shivDocument(ownerDocument){if(!ownerDocument){ownerDocument=document}var data=getExpandoData(ownerDocument);if(html5.shivCSS&&!supportsHtml5Styles&&!data.hasCSS){data.hasCSS=!!addStyleSheet(ownerDocument,'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}'+'mark{background:#FF0;color:#000}')}if(!supportsUnknownElements){shivMethods(ownerDocument,data)}return ownerDocument}var html5={'elements':options.elements||'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video','shivCSS':(options.shivCSS!==false),'supportsUnknownElements':supportsUnknownElements,'shivMethods':(options.shivMethods!==false),'type':'default','shivDocument':shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment};window.html5=html5;shivDocument(document)}(this,document));Modernizr._version=version;Modernizr._prefixes=prefixes;Modernizr._domPrefixes=domPrefixes;Modernizr._cssomPrefixes=cssomPrefixes;Modernizr.mq=testMediaQuery;Modernizr.hasEvent=isEventSupported;Modernizr.testProp=function(prop){return testProps([prop])};Modernizr.testAllProps=testPropsAll;Modernizr.testStyles=injectElementWithStyles;Modernizr.prefixed=function(prop,obj,elem){if(!obj){return testPropsAll(prop,'pfx')}else{return testPropsAll(prop,obj,elem)}};docElement.className=docElement.className.replace(/(^|\s)no-js(\s|$)/,'$1$2')+(enableClasses?' js '+classes.join(' '):'');return Modernizr})(this,this.document);
/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(l.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||n.guid++,e):void 0},now:function(){return+new Date},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return y.find(a);this.length=1,this[0]=d}return this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};B.prototype=n.fn,y=n(z);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)}});var F=/\S+/g,G={};function H(a){var b=G[a]={};return n.each(a.match(F)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&n.each(arguments,function(a,c){var d;while((d=n.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){if(a===!0?!--n.readyWait:!n.isReady){if(!z.body)return setTimeout(n.ready);n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(z,[n]),n.fn.trigger&&n(z).trigger("ready").off("ready"))}}});function J(){z.addEventListener?(z.removeEventListener("DOMContentLoaded",K,!1),a.removeEventListener("load",K,!1)):(z.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(z.addEventListener||"load"===event.type||"complete"===z.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===z.readyState)setTimeout(n.ready);else if(z.addEventListener)z.addEventListener("DOMContentLoaded",K,!1),a.addEventListener("load",K,!1);else{z.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&z.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!n.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}J(),n.ready()}}()}return I.promise(b)};var L="undefined",M;for(M in n(l))break;l.ownLast="0"!==M,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==L&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)}),function(){var a=z.createElement("div");if(null==l.deleteExpando){l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}}a=null}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f
}}function S(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d]));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},W=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},X=/^(?:checkbox|radio)$/i;!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;try{delete b.test}catch(d){l.deleteExpando=!1}}a=b=c=null}(),function(){var b,c,d=z.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var Y=/^(?:input|select|textarea)$/i,Z=/^key/,$=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,ab=/^([^.]*)(?:\.(.+)|)$/;function bb(){return!0}function cb(){return!1}function db(){try{return z.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===L||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(F)||[""],h=b.length;while(h--)f=ab.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=ab.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!_.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,_.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)}m=0;while((h=o[m++])&&!b.isPropagationStopped())b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;try{d[p]()}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=$.test(e)?this.mouseHooks:Z.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==db()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===db()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===L&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?bb:cb):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:cb,isPropagationStopped:cb,isImmediatePropagationStopped:cb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=bb,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=bb,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),n._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.changeBubbles||(n.event.special.change={setup:function(){return Y.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;Y.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)}),n._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!Y.test(this.nodeName)}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=cb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=cb),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});function eb(a){var b=fb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var fb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gb=/ jQuery\d+="(?:null|\d+)"/g,hb=new RegExp("<(?:"+fb+")[\\s/>]","i"),ib=/^\s+/,jb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,kb=/<([\w:]+)/,lb=/<tbody/i,mb=/<|&#?\w+;/,nb=/<(?:script|style|link)/i,ob=/checked\s*(?:[^=]|=\s*.checked.)/i,pb=/^$|\/(?:java|ecma)script/i,qb=/^true\/(.*)/,rb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,sb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},tb=eb(z),ub=tb.appendChild(z.createElement("div"));sb.optgroup=sb.option,sb.tbody=sb.tfoot=sb.colgroup=sb.caption=sb.thead,sb.th=sb.td;function vb(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==L?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==L?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,vb(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function wb(a){X.test(a.type)&&(a.defaultChecked=a.checked)}function xb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function yb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function zb(a){var b=qb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ab(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}function Bb(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Cb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(yb(b).text=a.text,zb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&X.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!hb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ub.innerHTML=a.outerHTML,ub.removeChild(f=ub.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=vb(f),h=vb(a),g=0;null!=(e=h[g]);++g)d[g]&&Cb(e,d[g]);if(b)if(c)for(h=h||vb(a),d=d||vb(f),g=0;null!=(e=h[g]);g++)Bb(e,d[g]);else Bb(a,f);return d=vb(f,"script"),d.length>0&&Ab(d,!i&&vb(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=eb(b),p=[],q=0;m>q;q++)if(f=a[q],f||0===f)if("object"===n.type(f))n.merge(p,f.nodeType?[f]:f);else if(mb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(kb.exec(f)||["",""])[1].toLowerCase(),k=sb[i]||sb._default,h.innerHTML=k[1]+f.replace(jb,"<$1></$2>")+k[2],e=k[0];while(e--)h=h.lastChild;if(!l.leadingWhitespace&&ib.test(f)&&p.push(b.createTextNode(ib.exec(f)[0])),!l.tbody){f="table"!==i||lb.test(f)?"<table>"!==k[1]||lb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}n.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),l.appendChecked||n.grep(vb(p,"input"),wb),q=0;while(f=p[q++])if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=vb(o.appendChild(f),"script"),g&&Ab(h),c)){e=0;while(f=h[e++])pb.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;null!=(d=a[h]);h++)if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==L?d.removeAttribute(i):d[i]=null,c.push(f))}}}),n.fn.extend({text:function(a){return W(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(vb(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&Ab(vb(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(vb(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return W(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(gb,""):void 0;if(!("string"!=typeof a||nb.test(a)||!l.htmlSerialize&&hb.test(a)||!l.leadingWhitespace&&ib.test(a)||sb[(kb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(jb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(vb(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(vb(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&ob.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(vb(i,"script"),yb),f=g.length;k>j;j++)d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,vb(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,n.map(g,zb),j=0;f>j;j++)d=g[j],pb.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(rb,"")));i=c=null}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Db,Eb={};function Fb(b,c){var d=n(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:n.css(d[0],"display");return d.detach(),e}function Gb(a){var b=z,c=Eb[a];return c||(c=Fb(a,b),"none"!==c&&c||(Db=(Db||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Db[0].contentWindow||Db[0].contentDocument).document,b.write(),b.close(),c=Fb(a,b),Db.detach()),Eb[a]=c),c}!function(){var a,b,c=z.createElement("div"),d="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],a.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(a.style.opacity),l.cssFloat=!!a.style.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===c.style.backgroundClip,a=c=null,l.shrinkWrapBlocks=function(){var a,c,e,f;if(null==b){if(a=z.getElementsByTagName("body")[0],!a)return;f="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",c=z.createElement("div"),e=z.createElement("div"),a.appendChild(c).appendChild(e),b=!1,typeof e.style.zoom!==L&&(e.style.cssText=d+";width:1px;padding:1px;zoom:1",e.innerHTML="<div></div>",e.firstChild.style.width="5px",b=3!==e.offsetWidth),a.removeChild(c),a=c=e=null}return b}}();var Hb=/^margin/,Ib=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Jb,Kb,Lb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Jb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),Ib.test(g)&&Hb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):z.documentElement.currentStyle&&(Jb=function(a){return a.currentStyle},Kb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Jb(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ib.test(g)&&!Lb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Mb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h=z.createElement("div"),i="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",j="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";h.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",b=h.getElementsByTagName("a")[0],b.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(b.style.opacity),l.cssFloat=!!b.style.cssFloat,h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,b=h=null,n.extend(l,{reliableHiddenOffsets:function(){if(null!=c)return c;var a,b,d,e=z.createElement("div"),f=z.getElementsByTagName("body")[0];if(f)return e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=z.createElement("div"),a.style.cssText=i,f.appendChild(a).appendChild(e),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",b=e.getElementsByTagName("td"),b[0].style.cssText="padding:0;margin:0;border:0;display:none",d=0===b[0].offsetHeight,b[0].style.display="",b[1].style.display="none",c=d&&0===b[0].offsetHeight,f.removeChild(a),e=f=null,c},boxSizing:function(){return null==d&&k(),d},boxSizingReliable:function(){return null==e&&k(),e},pixelPosition:function(){return null==f&&k(),f},reliableMarginRight:function(){var b,c,d,e;if(null==g&&a.getComputedStyle){if(b=z.getElementsByTagName("body")[0],!b)return;c=z.createElement("div"),d=z.createElement("div"),c.style.cssText=i,b.appendChild(c).appendChild(d),e=d.appendChild(z.createElement("div")),e.style.cssText=d.style.cssText=j,e.style.marginRight=e.style.width="0",d.style.width="1px",g=!parseFloat((a.getComputedStyle(e,null)||{}).marginRight),b.removeChild(c)}return g}});function k(){var b,c,h=z.getElementsByTagName("body")[0];h&&(b=z.createElement("div"),c=z.createElement("div"),b.style.cssText=i,h.appendChild(b).appendChild(c),c.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%",n.swap(h,null!=h.style.zoom?{zoom:1}:{},function(){d=4===c.offsetWidth}),e=!0,f=!1,g=!0,a.getComputedStyle&&(f="1%"!==(a.getComputedStyle(c,null)||{}).top,e="4px"===(a.getComputedStyle(c,null)||{width:"4px"}).width),h.removeChild(b),c=h=null)}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Nb=/alpha\([^)]*\)/i,Ob=/opacity\s*=\s*([^)]*)/,Pb=/^(none|table(?!-c[ea]).+)/,Qb=new RegExp("^("+T+")(.*)$","i"),Rb=new RegExp("^([+-])=("+T+")","i"),Sb={position:"absolute",visibility:"hidden",display:"block"},Tb={letterSpacing:0,fontWeight:400},Ub=["Webkit","O","Moz","ms"];function Vb(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ub.length;while(e--)if(b=Ub[e]+c,b in a)return b;return d}function Wb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=n._data(d,"olddisplay",Gb(d.nodeName)))):f[g]||(e=V(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Xb(a,b,c){var d=Qb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Yb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Zb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Jb(a),g=l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Kb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ib.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Yb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Kb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=Vb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Rb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]="",i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Vb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Kb(a,b,d)),"normal"===f&&b in Tb&&(f=Tb[b]),""===c||c?(e=parseFloat(f),c===!0||n.isNumeric(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Pb.test(n.css(a,"display"))?n.swap(a,Sb,function(){return Zb(a,b,d)}):Zb(a,b,d):void 0},set:function(a,c,d){var e=d&&Jb(a);return Xb(a,c,d?Yb(a,b,d,l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Ob.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Nb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Nb.test(f)?f.replace(Nb,e):f+" "+e)}}),n.cssHooks.marginRight=Mb(l.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},Kb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Hb.test(a)||(n.cssHooks[a+b].set=Xb)}),n.fn.extend({css:function(a,b){return W(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Jb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)
},a,b,arguments.length>1)},show:function(){return Wb(this,!0)},hide:function(){return Wb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function $b(a,b,c,d,e){return new $b.prototype.init(a,b,c,d,e)}n.Tween=$b,$b.prototype={constructor:$b,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=$b.propHooks[this.prop];return a&&a.get?a.get(this):$b.propHooks._default.get(this)},run:function(a){var b,c=$b.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):$b.propHooks._default.set(this),this}},$b.prototype.init.prototype=$b.prototype,$b.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},$b.propHooks.scrollTop=$b.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=$b.prototype.init,n.fx.step={};var _b,ac,bc=/^(?:toggle|show|hide)$/,cc=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),dc=/queueHooks$/,ec=[jc],fc={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=cc.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&cc.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function gc(){return setTimeout(function(){_b=void 0}),_b=n.now()}function hc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=U[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function ic(a,b,c){for(var d,e=(fc[b]||[]).concat(fc["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function jc(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&V(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k=Gb(a.nodeName),"none"===j&&(j=k),"inline"===j&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==k?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],bc.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}if(!n.isEmptyObject(o)){r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=ic(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function kc(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function lc(a,b,c){var d,e,f=0,g=ec.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=_b||gc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:_b||gc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(kc(k,j.opts.specialEasing);g>f;f++)if(d=ec[f].call(j,a,k,j.opts))return d;return n.map(k,ic,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(lc,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],fc[c]=fc[c]||[],fc[c].unshift(b)},prefilter:function(a,b){b?ec.unshift(a):ec.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=lc(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&dc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(hc(b,!0),a,d,e)}}),n.each({slideDown:hc("show"),slideUp:hc("hide"),slideToggle:hc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(_b=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),_b=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ac||(ac=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(ac),ac=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e=z.createElement("div");e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null}();var mc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(mc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.text(a)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var nc,oc,pc=n.expr.attrHandle,qc=/^(?:checked|selected)$/i,rc=l.getSetAttribute,sc=l.input;n.fn.extend({attr:function(a,b){return W(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===L?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?oc:nc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?sc&&rc||!qc.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(rc?c:d)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),oc={set:function(a,b,c){return b===!1?n.removeAttr(a,c):sc&&rc||!qc.test(c)?a.setAttribute(!rc&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=pc[b]||n.find.attr;pc[b]=sc&&rc||!qc.test(b)?function(a,b,d){var e,f;return d||(f=pc[b],pc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,pc[b]=f),e}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),sc&&rc||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):nc&&nc.set(a,b,c)}}),rc||(nc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},pc.id=pc.name=pc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:nc.set},n.attrHooks.contenteditable={set:function(a,b,c){nc.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var tc=/^(?:input|select|textarea|button|object)$/i,uc=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return W(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):tc.test(a.nodeName)||uc.test(a.nodeName)&&a.href?0:-1}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var vc=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===L||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(vc," ").indexOf(b)>=0)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var wc=n.now(),xc=/\?/,yc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(yc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var zc,Ac,Bc=/#.*$/,Cc=/([?&])_=[^&]*/,Dc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ec=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Fc=/^(?:GET|HEAD)$/,Gc=/^\/\//,Hc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ic={},Jc={},Kc="*/".concat("*");try{Ac=location.href}catch(Lc){Ac=z.createElement("a"),Ac.href="",Ac=Ac.href}zc=Hc.exec(Ac.toLowerCase())||[];function Mc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(F)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nc(a,b,c,d){var e={},f=a===Jc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Oc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Pc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Qc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ac,type:"GET",isLocal:Ec.test(zc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Oc(Oc(a,n.ajaxSettings),b):Oc(n.ajaxSettings,a)},ajaxPrefilter:Mc(Ic),ajaxTransport:Mc(Jc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Dc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||Ac)+"").replace(Bc,"").replace(Gc,zc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(c=Hc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===zc[1]&&c[2]===zc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(zc[3]||("http:"===zc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),Nc(Ic,k,b,v),2===t)return v;h=k.global,h&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Fc.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(xc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Cc.test(e)?e.replace(Cc,"$1_="+wc++):e+(xc.test(e)?"&":"?")+"_="+wc++)),k.ifModified&&(n.lastModified[e]&&v.setRequestHeader("If-Modified-Since",n.lastModified[e]),n.etag[e]&&v.setRequestHeader("If-None-Match",n.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Kc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Nc(Jc,k,b,v)){v.readyState=1,h&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Pc(k,v,c)),u=Qc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(n.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!l.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||n.css(a,"display"))},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var Rc=/%20/g,Sc=/\[\]$/,Tc=/\r?\n/g,Uc=/^(?:submit|button|image|reset|file)$/i,Vc=/^(?:input|select|textarea|keygen)/i;function Wc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Sc.test(a)?d(a,e):Wc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Wc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Wc(c,a[c],b,e);return d.join("&").replace(Rc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Vc.test(this.nodeName)&&!Uc.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Tc,"\r\n")}}):{name:b.name,value:c.replace(Tc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&$c()||_c()}:$c;var Xc=0,Yc={},Zc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Yc)Yc[a](void 0,!0)}),l.cors=!!Zc&&"withCredentials"in Zc,Zc=l.ajax=!!Zc,Zc&&n.ajaxTransport(function(a){if(!a.crossDomain||l.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Xc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Yc[g],b=void 0,f.onreadystatechange=n.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Yc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function $c(){try{return new a.XMLHttpRequest}catch(b){}}function _c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=z.head||n("head")[0]||z.documentElement;return{send:function(d,e){b=z.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var ad=[],bd=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=ad.pop()||n.expando+"_"+wc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(bd.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&bd.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(bd,"$1"+e):b.jsonp!==!1&&(b.url+=(xc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,ad.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var cd=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&cd)return cd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h,a.length),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&n.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var dd=a.document.documentElement;function ed(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?(typeof e.getBoundingClientRect!==L&&(d=e.getBoundingClientRect()),c=ed(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||dd;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||dd})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return W(this,function(a,d,e){var f=ed(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Mb(l.pixelPosition,function(a,c){return c?(c=Kb(a,b),Ib.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return W(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var fd=a.jQuery,gd=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=gd),b&&a.jQuery===n&&(a.jQuery=fd),n},typeof b===L&&(a.jQuery=a.$=n),n});

/*! jQuery UI - v1.12.1 - 2017-07-05
* http://jqueryui.com
* Includes: effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){t.ui=t.ui||{},t.ui.version="1.12.1";var e="ui-effects-",i="ui-effects-style",s="ui-effects-animated",n=t;t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=h(),n=s._rgba=[];return i=i.toLowerCase(),f(l,function(t,o){var a,r=o.re.exec(i),l=r&&o.parse(r),h=o.space||"rgba";return l?(a=s[h](l),s[c[h].cache]=a[c[h].cache],n=s._rgba=a._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),s):o[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],h=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=h.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),h.fn=t.extend(h.prototype,{parse:function(n,a,r,l){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(a),a=e);var u=this,d=t.type(n),p=this._rgba=[];return a!==e&&(n=[n,a,r,l],d="array"),"string"===d?this.parse(s(n)||o._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof h?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var o=s.cache;f(s.props,function(t,e){if(!u[o]&&s.to){if("alpha"===t||null==n[t])return;u[o]=s.to(u._rgba)}u[o][e.idx]=i(n[t],e,!0)}),u[o]&&0>t.inArray(null,u[o].slice(0,3))&&(u[o][3]=1,s.from&&(u._rgba=s.from(u[o])))}),this):e},is:function(t){var i=h(t),s=!0,n=this;return f(c,function(t,o){var a,r=i[o.cache];return r&&(a=n[o.cache]||o.to&&o.to(n._rgba)||[],f(o.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===a[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=h(t),n=s._space(),o=c[n],a=0===this.alpha()?h("transparent"):this,r=a[o.cache]||o.to(a._rgba),l=r.slice();return s=s[o.cache],f(o.props,function(t,n){var o=n.idx,a=r[o],h=s[o],c=u[n.type]||{};null!==h&&(null===a?l[o]=h:(c.mod&&(h-a>c.mod/2?a+=c.mod:a-h>c.mod/2&&(a-=c.mod)),l[o]=i((h-a)*e+a,n)))}),this[n](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=h(e)._rgba;return h(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),h.fn.parse.prototype=h.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,o=t[2]/255,a=t[3],r=Math.max(s,n,o),l=Math.min(s,n,o),h=r-l,c=r+l,u=.5*c;return e=l===r?0:s===r?60*(n-o)/h+360:n===r?60*(o-s)/h+120:60*(s-n)/h+240,i=0===h?0:.5>=u?h/c:h/(2-c),[Math.round(e)%360,i,u,null==a?1:a]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],o=t[3],a=.5>=s?s*(1+i):s+i-s*i,r=2*s-a;return[Math.round(255*n(r,a,e+1/3)),Math.round(255*n(r,a,e)),Math.round(255*n(r,a,e-1/3)),o]},f(c,function(s,n){var o=n.props,a=n.cache,l=n.to,c=n.from;h.fn[s]=function(s){if(l&&!this[a]&&(this[a]=l(this._rgba)),s===e)return this[a].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[a].slice();return f(o,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=h(c(d)),n[a]=d,n):h(d)},f(o,function(e,i){h.fn[e]||(h.fn[e]=function(n){var o,a=t.type(n),l="alpha"===e?this._hsla?"hsla":"rgba":s,h=this[l](),c=h[i.idx];return"undefined"===a?c:("function"===a&&(n=n.call(this,c),a=t.type(n)),null==n&&i.empty?this:("string"===a&&(o=r.exec(n),o&&(n=c+parseFloat(o[2])*("+"===o[1]?1:-1))),h[i.idx]=n,this[l](h)))})})}),h.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var o,a,r="";if("transparent"!==n&&("string"!==t.type(n)||(o=s(n)))){if(n=h(o||n),!d.rgba&&1!==n._rgba[3]){for(a="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&a&&a.style;)try{r=t.css(a,"backgroundColor"),a=a.parentNode}catch(l){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=h(e.elem,i),e.end=h(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},h.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(n),function(){function e(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(o[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(o[i]=n[i]);return o}function i(e,i){var s,n,a={};for(s in i)n=i[s],e[s]!==n&&(o[s]||(t.fx.step[s]||!isNaN(parseFloat(n)))&&(a[s]=n));return a}var s=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(n.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(n,o,a,r){var l=t.speed(o,a,r);return this.queue(function(){var o,a=t(this),r=a.attr("class")||"",h=l.children?a.find("*").addBack():a;h=h.map(function(){var i=t(this);return{el:i,start:e(this)}}),o=function(){t.each(s,function(t,e){n[e]&&a[e+"Class"](n[e])})},o(),h=h.map(function(){return this.end=e(this.el[0]),this.diff=i(this.start,this.end),this}),a.attr("class",r),h=h.map(function(){var e=this,i=t.Deferred(),s=t.extend({},l,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,h.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),l.complete.call(a[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,o){return s?t.effects.animateClass.call(this,{add:i},s,n,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(i,s,n,o,a){return"boolean"==typeof s||void 0===s?n?t.effects.animateClass.call(this,s?{add:i}:{remove:i},n,o,a):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:i},s,n,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,o){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,o)}})}(),function(){function n(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function o(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}function a(t,e){var i=e.outerWidth(),s=e.outerHeight(),n=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,o=n.exec(t)||["",0,i,s,0];return{top:parseFloat(o[1])||0,right:"auto"===o[2]?i:parseFloat(o[2]),bottom:"auto"===o[3]?s:parseFloat(o[3]),left:parseFloat(o[4])||0}}t.expr&&t.expr.filters&&t.expr.filters.animated&&(t.expr.filters.animated=function(e){return function(i){return!!t(i).data(s)||e(i)}}(t.expr.filters.animated)),t.uiBackCompat!==!1&&t.extend(t.effects,{save:function(t,i){for(var s=0,n=i.length;n>s;s++)null!==i[s]&&t.data(e+i[s],t[0].style[i[s]])},restore:function(t,i){for(var s,n=0,o=i.length;o>n;n++)null!==i[n]&&(s=t.data(e+i[n]),t.css(i[n],s))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(a){o=document.body}return e.wrap(s),(e[0]===o||t.contains(e[0],o))&&t(o).trigger("focus"),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).trigger("focus")),e}}),t.extend(t.effects,{version:"1.12.1",define:function(e,i,s){return s||(s=i,i="effect"),t.effects.effect[e]=s,t.effects.effect[e].mode=i,s},scaledDimensions:function(t,e,i){if(0===e)return{height:0,width:0,outerHeight:0,outerWidth:0};var s="horizontal"!==i?(e||100)/100:1,n="vertical"!==i?(e||100)/100:1;return{height:t.height()*n,width:t.width()*s,outerHeight:t.outerHeight()*n,outerWidth:t.outerWidth()*s}},clipToBox:function(t){return{width:t.clip.right-t.clip.left,height:t.clip.bottom-t.clip.top,left:t.clip.left,top:t.clip.top}},unshift:function(t,e,i){var s=t.queue();e>1&&s.splice.apply(s,[1,0].concat(s.splice(e,i))),t.dequeue()},saveStyle:function(t){t.data(i,t[0].style.cssText)},restoreStyle:function(t){t[0].style.cssText=t.data(i)||"",t.removeData(i)},mode:function(t,e){var i=t.is(":hidden");return"toggle"===e&&(e=i?"show":"hide"),(i?"hide"===e:"show"===e)&&(e="none"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createPlaceholder:function(i){var s,n=i.css("position"),o=i.position();return i.css({marginTop:i.css("marginTop"),marginBottom:i.css("marginBottom"),marginLeft:i.css("marginLeft"),marginRight:i.css("marginRight")}).outerWidth(i.outerWidth()).outerHeight(i.outerHeight()),/^(static|relative)/.test(n)&&(n="absolute",s=t("<"+i[0].nodeName+">").insertAfter(i).css({display:/^(inline|ruby)/.test(i.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:i.css("marginTop"),marginBottom:i.css("marginBottom"),marginLeft:i.css("marginLeft"),marginRight:i.css("marginRight"),"float":i.css("float")}).outerWidth(i.outerWidth()).outerHeight(i.outerHeight()).addClass("ui-effects-placeholder"),i.data(e+"placeholder",s)),i.css({position:n,left:o.left,top:o.top}),s},removePlaceholder:function(t){var i=e+"placeholder",s=t.data(i);s&&(s.remove(),t.removeData(i))},cleanUp:function(e){t.effects.restoreStyle(e),t.effects.removePlaceholder(e)},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(n[i]=o[0]*s+o[1])}),n}}),t.fn.extend({effect:function(){function e(e){function n(){l.removeData(s),t.effects.cleanUp(l),"hide"===i.mode&&l.hide(),r()}function r(){t.isFunction(h)&&h.call(l[0]),t.isFunction(e)&&e()}var l=t(this);i.mode=u.shift(),t.uiBackCompat===!1||a?"none"===i.mode?(l[c](),r()):o.call(l[0],i,n):(l.is(":hidden")?"hide"===c:"show"===c)?(l[c](),r()):o.call(l[0],i,r)}var i=n.apply(this,arguments),o=t.effects.effect[i.effect],a=o.mode,r=i.queue,l=r||"fx",h=i.complete,c=i.mode,u=[],d=function(e){var i=t(this),n=t.effects.mode(i,c)||a;i.data(s,!0),u.push(n),a&&("show"===n||n===a&&"hide"===n)&&i.show(),a&&"none"===n||t.effects.saveStyle(i),t.isFunction(e)&&e()};return t.fx.off||!o?c?this[c](i.duration,h):this.each(function(){h&&h.call(this)}):r===!1?this.each(d).each(e):this.queue(l,d).queue(l,e)},show:function(t){return function(e){if(o(e))return t.apply(this,arguments);var i=n.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(t.fn.show),hide:function(t){return function(e){if(o(e))return t.apply(this,arguments);var i=n.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(t.fn.hide),toggle:function(t){return function(e){if(o(e)||"boolean"==typeof e)return t.apply(this,arguments);var i=n.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s},cssClip:function(t){return t?this.css("clip","rect("+t.top+"px "+t.right+"px "+t.bottom+"px "+t.left+"px)"):a(this.css("clip"),this)},transfer:function(e,i){var s=t(this),n=t(e.to),o="fixed"===n.css("position"),a=t("body"),r=o?a.scrollTop():0,l=o?a.scrollLeft():0,h=n.offset(),c={top:h.top-r,left:h.left-l,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({top:u.top-r,left:u.left-l,height:s.innerHeight(),width:s.innerWidth(),position:o?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),t.isFunction(i)&&i()})}}),t.fx.step.clip=function(e){e.clipInit||(e.start=t(e.elem).cssClip(),"string"==typeof e.end&&(e.end=a(e.end,e.elem)),e.clipInit=!0),t(e.elem).cssClip({top:e.pos*(e.end.top-e.start.top)+e.start.top,right:e.pos*(e.end.right-e.start.right)+e.start.right,bottom:e.pos*(e.end.bottom-e.start.bottom)+e.start.bottom,left:e.pos*(e.end.left-e.start.left)+e.start.left})}}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}();var o=t.effects;t.effects.define("blind","hide",function(e,i){var s={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},n=t(this),o=e.direction||"up",a=n.cssClip(),r={clip:t.extend({},a)},l=t.effects.createPlaceholder(n);r.clip[s[o][0]]=r.clip[s[o][1]],"show"===e.mode&&(n.cssClip(r.clip),l&&l.css(t.effects.clipToBox(r)),r.clip=a),l&&l.animate(t.effects.clipToBox(r),e.duration,e.easing),n.animate(r,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("bounce",function(e,i){var s,n,o,a=t(this),r=e.mode,l="hide"===r,h="show"===r,c=e.direction||"up",u=e.distance,d=e.times||5,p=2*d+(h||l?1:0),f=e.duration/p,g=e.easing,m="up"===c||"down"===c?"top":"left",_="up"===c||"left"===c,v=0,b=a.queue().length;for(t.effects.createPlaceholder(a),o=a.css(m),u||(u=a["top"===m?"outerHeight":"outerWidth"]()/3),h&&(n={opacity:1},n[m]=o,a.css("opacity",0).css(m,_?2*-u:2*u).animate(n,f,g)),l&&(u/=Math.pow(2,d-1)),n={},n[m]=o;d>v;v++)s={},s[m]=(_?"-=":"+=")+u,a.animate(s,f,g).animate(n,f,g),u=l?2*u:u/2;l&&(s={opacity:0},s[m]=(_?"-=":"+=")+u,a.animate(s,f,g)),a.queue(i),t.effects.unshift(a,b,p+1)}),t.effects.define("clip","hide",function(e,i){var s,n={},o=t(this),a=e.direction||"vertical",r="both"===a,l=r||"horizontal"===a,h=r||"vertical"===a;s=o.cssClip(),n.clip={top:h?(s.bottom-s.top)/2:s.top,right:l?(s.right-s.left)/2:s.right,bottom:h?(s.bottom-s.top)/2:s.bottom,left:l?(s.right-s.left)/2:s.left},t.effects.createPlaceholder(o),"show"===e.mode&&(o.cssClip(n.clip),n.clip=s),o.animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("drop","hide",function(e,i){var s,n=t(this),o=e.mode,a="show"===o,r=e.direction||"left",l="up"===r||"down"===r?"top":"left",h="up"===r||"left"===r?"-=":"+=",c="+="===h?"-=":"+=",u={opacity:0};t.effects.createPlaceholder(n),s=e.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,u[l]=h+s,a&&(n.css(u),u[l]=c+s,u.opacity=1),n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("explode","hide",function(e,i){function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),t(b).remove(),i()}var o,a,r,l,h,c,u=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=u,p=t(this),f=e.mode,g="show"===f,m=p.show().css("visibility","hidden").offset(),_=Math.ceil(p.outerWidth()/d),v=Math.ceil(p.outerHeight()/u),b=[];for(o=0;u>o;o++)for(l=m.top+o*v,c=o-(u-1)/2,a=0;d>a;a++)r=m.left+a*_,h=a-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-a*_,top:-o*v}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_,height:v,left:r+(g?h*_:0),top:l+(g?c*v:0),opacity:g?0:1}).animate({left:r+(g?0:h*_),top:l+(g?0:c*v),opacity:g?1:0},e.duration||500,e.easing,s)}),t.effects.define("fade","toggle",function(e,i){var s="show"===e.mode;t(this).css("opacity",s?0:1).animate({opacity:s?1:0},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("fold","hide",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=e.size||15,l=/([0-9]+)%/.exec(r),h=!!e.horizFirst,c=h?["right","bottom"]:["bottom","right"],u=e.duration/2,d=t.effects.createPlaceholder(s),p=s.cssClip(),f={clip:t.extend({},p)},g={clip:t.extend({},p)},m=[p[c[0]],p[c[1]]],_=s.queue().length;l&&(r=parseInt(l[1],10)/100*m[a?0:1]),f.clip[c[0]]=r,g.clip[c[0]]=r,g.clip[c[1]]=0,o&&(s.cssClip(g.clip),d&&d.css(t.effects.clipToBox(g)),g.clip=p),s.queue(function(i){d&&d.animate(t.effects.clipToBox(f),u,e.easing).animate(t.effects.clipToBox(g),u,e.easing),i()}).animate(f,u,e.easing).animate(g,u,e.easing).queue(i),t.effects.unshift(s,_,4)}),t.effects.define("highlight","show",function(e,i){var s=t(this),n={backgroundColor:s.css("backgroundColor")};"hide"===e.mode&&(n.opacity=0),t.effects.saveStyle(s),s.css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("size",function(e,i){var s,n,o,a=t(this),r=["fontSize"],l=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],c=e.mode,u="effect"!==c,d=e.scale||"both",p=e.origin||["middle","center"],f=a.css("position"),g=a.position(),m=t.effects.scaledDimensions(a),_=e.from||m,v=e.to||t.effects.scaledDimensions(a,0);t.effects.createPlaceholder(a),"show"===c&&(o=_,_=v,v=o),n={from:{y:_.height/m.height,x:_.width/m.width},to:{y:v.height/m.height,x:v.width/m.width}},("box"===d||"both"===d)&&(n.from.y!==n.to.y&&(_=t.effects.setTransition(a,l,n.from.y,_),v=t.effects.setTransition(a,l,n.to.y,v)),n.from.x!==n.to.x&&(_=t.effects.setTransition(a,h,n.from.x,_),v=t.effects.setTransition(a,h,n.to.x,v))),("content"===d||"both"===d)&&n.from.y!==n.to.y&&(_=t.effects.setTransition(a,r,n.from.y,_),v=t.effects.setTransition(a,r,n.to.y,v)),p&&(s=t.effects.getBaseline(p,m),_.top=(m.outerHeight-_.outerHeight)*s.y+g.top,_.left=(m.outerWidth-_.outerWidth)*s.x+g.left,v.top=(m.outerHeight-v.outerHeight)*s.y+g.top,v.left=(m.outerWidth-v.outerWidth)*s.x+g.left),a.css(_),("content"===d||"both"===d)&&(l=l.concat(["marginTop","marginBottom"]).concat(r),h=h.concat(["marginLeft","marginRight"]),a.find("*[width]").each(function(){var i=t(this),s=t.effects.scaledDimensions(i),o={height:s.height*n.from.y,width:s.width*n.from.x,outerHeight:s.outerHeight*n.from.y,outerWidth:s.outerWidth*n.from.x},a={height:s.height*n.to.y,width:s.width*n.to.x,outerHeight:s.height*n.to.y,outerWidth:s.width*n.to.x};n.from.y!==n.to.y&&(o=t.effects.setTransition(i,l,n.from.y,o),a=t.effects.setTransition(i,l,n.to.y,a)),n.from.x!==n.to.x&&(o=t.effects.setTransition(i,h,n.from.x,o),a=t.effects.setTransition(i,h,n.to.x,a)),u&&t.effects.saveStyle(i),i.css(o),i.animate(a,e.duration,e.easing,function(){u&&t.effects.restoreStyle(i)})})),a.animate(v,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){var e=a.offset();0===v.opacity&&a.css("opacity",_.opacity),u||(a.css("position","static"===f?"relative":f).offset(e),t.effects.saveStyle(a)),i()}})}),t.effects.define("scale",function(e,i){var s=t(this),n=e.mode,o=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"effect"!==n?0:100),a=t.extend(!0,{from:t.effects.scaledDimensions(s),to:t.effects.scaledDimensions(s,o,e.direction||"both"),origin:e.origin||["middle","center"]},e);e.fade&&(a.from.opacity=1,a.to.opacity=0),t.effects.effect.size.call(this,a,i)}),t.effects.define("puff","hide",function(e,i){var s=t.extend(!0,{},e,{fade:!0,percent:parseInt(e.percent,10)||150});t.effects.effect.scale.call(this,s,i)}),t.effects.define("pulsate","show",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=o||a,l=2*(e.times||5)+(r?1:0),h=e.duration/l,c=0,u=1,d=s.queue().length;for((o||!s.is(":visible"))&&(s.css("opacity",0).show(),c=1);l>u;u++)s.animate({opacity:c},h,e.easing),c=1-c;s.animate({opacity:c},h,e.easing),s.queue(i),t.effects.unshift(s,d,l+1)}),t.effects.define("shake",function(e,i){var s=1,n=t(this),o=e.direction||"left",a=e.distance||20,r=e.times||3,l=2*r+1,h=Math.round(e.duration/l),c="up"===o||"down"===o?"top":"left",u="up"===o||"left"===o,d={},p={},f={},g=n.queue().length;for(t.effects.createPlaceholder(n),d[c]=(u?"-=":"+=")+a,p[c]=(u?"+=":"-=")+2*a,f[c]=(u?"-=":"+=")+2*a,n.animate(d,h,e.easing);r>s;s++)n.animate(p,h,e.easing).animate(f,h,e.easing);n.animate(p,h,e.easing).animate(d,h/2,e.easing).queue(i),t.effects.unshift(n,g,l+1)}),t.effects.define("slide","show",function(e,i){var s,n,o=t(this),a={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},r=e.mode,l=e.direction||"left",h="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l,u=e.distance||o["top"===h?"outerHeight":"outerWidth"](!0),d={};t.effects.createPlaceholder(o),s=o.cssClip(),n=o.position()[h],d[h]=(c?-1:1)*u+n,d.clip=o.cssClip(),d.clip[a[l][1]]=d.clip[a[l][0]],"show"===r&&(o.cssClip(d.clip),o.css(h,d[h]),d.clip=s,d[h]=n),o.animate(d,{queue:!1,duration:e.duration,easing:e.easing,complete:i})});var o;t.uiBackCompat!==!1&&(o=t.effects.define("transfer",function(e,i){t(this).transfer(e,i)}))});
/* 	
   作者：724485868@qq.com
   时间：2017-10-08
   描述：表单验证    
 version:1.0.0
*/

var vd = (function($) {

	var Obj = function(formName) {

			this.formName = typeof formName==="undefined"?".form":formName,

			this.init = function() {

				this.addErrorStyle(false, true);
				this.checkObj(this.formName);
				this.addVidation();
			},

			this.disabled = function(obj) {

				$(obj).attr("disabled", "disabled");

			},

			this.enabled = function(obj) {

				$(obj).removeAttr("disabled");
			},

			this.arrs = [],

			this.compareEmit = function(pName, compareName, value) {
				var el = $("" + pName + " [name=" + compareName + "]");
				if(el.val().trim() === "") {
					return;
				}
				for(var i = 0; i < this.arrs.length; i++) {
					if(this.arrs[i].elName.trim() === compareName.trim()) {
						$(el).trigger("keyup");
						break;
					}

				}

			},

			this.oldRemoteValue = "",

			this.checkObj = function(formName) {
				if(typeof formName === "undefined") {
					formName = ".form";
				};

				this.arrs = [];
				$this = this;

				$("" + formName + " .vd-item").each(function() {
					var name = $(this).attr("name");
					var v = $(this).val();
					var req_msg = $(this).attr("vd-req-msg");
					var pattern = $(this).attr("vd-pattern");
					var pattern_msg = $(this).attr("vd-pattern-msg");

					// type=radio 单选框
					var _rd = $(this).attr("vd-rd");
					var _rd_ok = typeof $(this).attr("vd-rd-ok") !== "undefined" ? true : false;

					// type=checkbox 复选框
					var _ck = $(this).attr("vd-ck");
					var _ck_ok = typeof $(this).attr("vd-ck-ok") !== "undefined" ? true : false;

					var errorMsg = "";
					if(typeof req_msg !== "undefined" && v === "") {
						errorMsg = req_msg;
					} else if(typeof pattern_msg !== "undefined") {
						var reg = new RegExp(pattern, "i");
						if(!reg.test(v)) {
							errorMsg = pattern_msg;
						}

					} else {
						errorMsg = "";

					}

					if(name !== "" && name !== "vd-btn") {
						var obj = {};
						obj.pName = formName; //表单name
						obj.elName = name; // 元素name
						obj.errorMsg = errorMsg; // 验证错误提示信息
						obj.val = v;
						obj.el = this; // document.forms[formName][name];
						obj.bl = false;
						if(typeof _rd !== "undefined") {
							obj.rd = "rd"; // type=radio 单选框标记属性
							obj.bl = _rd_ok;
						}
						if(typeof _ck !== "undefined") {

							obj.bl = _ck_ok;
						}

						$this.arrs.push(obj);

					}
				});

			},

			this.addVidation = function() {

				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];
					var el = _obj.el; // document.forms[_obj.pName][_obj.elName];

					$(el).on("keyup", _obj, function(event) {
						this.checkElement(event.data, event.target, true, true);
						this.addVdBtnStyle(el);
					}.bind(this));

					var remote = el.getAttribute("vd-remote");
					if(remote === null) {
						$(el).on("change", _obj, function(event) {
							this.checkElement(event.data, event.target, true, true);
							this.addVdBtnStyle(el);
						}.bind(this));
					}

				}

			},

			this.checkElement = function(_obj2, el, isRemote, isRadio) {

				// req
				var _req = el.getAttribute("vd-req");
				var _req_msg = el.getAttribute("vd-req-msg");

				// pattern
				var _pattern = el.getAttribute("vd-pattern");
				var _pattern_msg = el.getAttribute("vd-pattern-msg");

				// remote
				var _remote = el.getAttribute("vd-remote");
				var _remote_msg = el.getAttribute("vd-remote-msg");
				var _remote_length = el.getAttribute("vd-remote-length");

				// compare 
				var _compare = el.getAttribute("vd-compare");
				var _compare_msg = el.getAttribute("vd-compare-msg");
				var _compare_emit = el.getAttribute("vd-compare-emit"); // 触发目标对象

				// type=checkbox 复选框
				var _ck = el.getAttribute("vd-ck");
				var _ck_true = el.getAttribute("vd-ck-true"); // 选中的值
				var _ck_false = el.getAttribute("vd-ck-false"); // 没选中的值
				var _ck_msg = el.getAttribute("vd-ck-msg");

				// type=radio 单选框
				var _rd = el.getAttribute("vd-rd");
				var _rd_ok = el.getAttribute("vd-ck-ok") ? true : false;
				var _rd_msg = el.getAttribute("vd-rd-msg");

				// 当前的值
				var v = el.value.trim();

				

				// 单选
				if(_rd !== null) {
					var _rd_name = $(el).attr("name");
					var _re_length = $("" + _obj2.pName + "  [name=" + _rd_name + "]:checked").length;

					// 没有选择
					if(_re_length <= 0) {

						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error vd-rd ");
						$(p).removeClass("vd-ok");
						$(el).addClass("vd-error");

						// 遍历选择项 设为false
						for(var i = 0; i < this.arrs.length; i++) {
							if(this.arrs[i].elName.trim() === _obj2.elName) {
								this.arrs[i].rd_req = false; // radio组是否为空  false为空
								_obj2.bl = false;
								_obj2.val = v;
								_obj2.errorMsg = _rd_msg;
							}
						}
						//  流程终止
						return;
					} else {

						_obj2.val = v;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error vd-rd ");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");

						// 选择了 流程以下走
					}

					// false 点击提交不触发
					if(isRadio) {

						// 遍历选择项 设为false
						for(var i = 0; i < this.arrs.length; i++) {
							if(this.arrs[i].elName.trim() === _obj2.elName) {
								this.arrs[i].bl = false;
								this.arrs[i].rd_req = true; // radio组是否为空 true不为空
							}
						}

						// 当前项设置为true
						_obj2.bl = true;
						//_obj2.val=v;
						_obj2.errorMsg = "";
					}

					return;
				}

				// 非空验证
				if(_req !== null) {
					if(v === "") {
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.errorMsg = _req_msg;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-pattern vd-remote vd-compare").addClass("vd-error  ");
						
						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-req").addClass("vd-error").text(_req_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok ");
						
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮

						return;
					} else {

						if(isRemote && (!_remote)) { //远程不去比较
							_obj2.errorMsg = "";
							_obj2.val = v;
							_obj2.bl = true;
							var p = $(el).parents(".vd-box");
							$(p).removeClass("vd-error ");
							
							$(p).find(".vd-req").removeClass("vd-error").text("");
							$(el).removeClass("vd-error");
							$(p).addClass("vd-ok");
							$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮
								
							
						}

					}
				}

				// 触发比较对象
				if(_compare_emit !== null) {
					this.compareEmit(_obj2.pName, _compare_emit, v);
				}

				// 正则验证
				if(_pattern !== null && v != "") {

					var reg = new RegExp(_pattern, "i");
					if(!reg.test(v)) {
						_obj2.errorMsg = _pattern_msg;
						_obj2.bl = false;
						_obj2.val = v;
						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error");
						
						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						
						$(p).find(".vd-pattern").addClass("vd-error").text( _pattern_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok");
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮

						return;
					} else {
						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error ");
						
						$(p).find(".vd-pattern").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

					}

				} else {

					if(!_remote) { //远程不去比较

						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error ");
						
						$(p).find(".vd-pattern").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮
					}
				}

				// 比较验证
				if(_compare !== null) {

					var _compare_obj = $("" + _obj2.pName + "  [name=" + _compare + "]");

					//var _compare_obj = document.forms[_obj2.pName][_compare];
					if(v !== $(_compare_obj).val()) {
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.errorMsg = _compare_msg;
						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error");
						
						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-compare").addClass("vd-error").text(_compare_msg);
						$(p).removeClass("vd-ok");
						$(el).addClass("vd-error");
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok");; //依赖按钮

						return;
					} else {

						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error vd-compare ");
						
						$(p).find(".vd-compare").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

					}

				}

				if(_remote != null) {

					var _index = _remote_length != null ? _remote_length : 0;
					if(v.length < _index) {
						_obj2.errorMsg = _remote_msg;
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.remote_bl=_obj2.bl;

						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error ");
						
						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-remote").addClass("vd-error").text(_remote_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-ok").addClass("vd-error"); //依赖按钮
						return;
					}

					var $remote = this;

					if(isRemote) {

						$.ajax({
							url: _remote + "?rand=" + Math.random() + "&" + el.name + "=" + v,
							type: "get",
							timeout: 10000,
							success: function(data) {

								if(!data) {

									$remote.remoteFunError(_obj2, el, _remote_msg);
									$remote.addVdBtnStyle(el);
									return;
								} else {

									$remote.remoteFunOk(_obj2, el);
									$remote.addVdBtnStyle(el);
									

								}
							},
							error: function(data) {
								$remote.remoteFunError(_obj2, el, _remote_msg);

								return;
							}

						});

					}else{
						
						if(_obj2.remote_bl){
							$remote.remoteFunOk(_obj2, el);
							$remote.addVdBtnStyle(el);
						}else{
							$remote.remoteFunError(_obj2, el, _remote_msg);
							$remote.addVdBtnStyle(el);	
						}
					}

				}

				// 复选框
				if(_ck !== null) {
					if(el.checked) {
						_obj2.errorMsg = "";
						_obj2.val = _ck_true !== null ? _ck_true : 0;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error  ");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮
					

					} else {
						_obj2.bl = false;
						_obj2.val = _ck_false !== null ? _ck_false : 0;
						_obj2.errorMsg = _ck_msg;
						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error vd-ck ");
						$(p).removeClass("vd-ok");
						$(el).addClass("vd-error");
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮
							

						return;

					}

				}

			},

			this.isSuccess = function(successFun, errorFun) {

				// 添加错误样式
				this.addErrorStyle(false, false);

				// 是否全部验证成功
				var baseBl = true;
				var arr_rd = {};
				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];

					// 单选按钮
					if(_obj.rd) {

						if(_obj.rd_req === false) {
							errorFun(_obj);
							return baseBl = false;
						}

					}
					// 非单选按钮
					else {

						if(_obj.bl === false) {

							errorFun(_obj);
							return baseBl = false;
						}
					}

				}

				if(baseBl) {
					var newObj = this.getNewObjs();
					successFun(newObj);
				}
				return true;
			},

			this.getNewObjs = function() {

				// 是否全部验证成功
				var newObj = {};
				for(var i = 0; i < this.arrs.length; i++) {
					var obj = this.arrs[i];
					if(obj.bl) {
						newObj[obj.elName] = obj.val;
					}

				}

				return newObj;

			},

			this.getObj = function(name) {

				// 是否全部验证成功
				var obj = {}
				for(var i = 0; i < this.arrs.length; i++) {

					if(name.trim() === this.arrs[i].elName.trim()) {

						obj = this.arrs[i];
						break;
					}

				}

				return obj;

			},

			this.addErrorStyle = function(isRemote, isRadio) {

				for(var i = 0; i < this.arrs.length; i++) {
					var obj = this.arrs[i];
					var el = obj.el;
					this.checkElement(obj, el, isRemote, isRadio); // false 不去remote验证    isRadio不做比较
					this.addVdBtnStyle(el);  // 添加vd-btn提交按钮样式
				}
			},

			this.remoteFunOk = function(_obj2, el) {
				_obj2.errorMsg = "";
				_obj2.bl = true;
				_obj2.val = $(el).val();
				_obj2.remote_bl=_obj2.bl;

				var p = $(el).parents(".vd-box");
				$(p).removeClass("vd-error ");
				
				$(p).find(".vd-remote").removeClass("vd-error").text("");
				$(el).removeClass("vd-error");
				$(p).addClass("vd-ok");
				$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

			},

			this.remoteFunError = function(_obj2, el, _remote_msg) {
				_obj2.errorMsg = _remote_msg;
				_obj2.bl = false;
				_obj2.val = $(el).val();
				_obj2.remote_bl=_obj2.bl;

				var p = $(el).parents(".vd-box");
				$(p).addClass("vd-error ");
				
				$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
				$(p).find(".vd-remote").addClass("vd-error").text(_remote_msg);
				$(el).addClass("vd-error");
				$(p).removeClass("vd-ok");
				$(".vd-dep-btn", p).removeClass("vd-ok").addClass("vd-error"); //依赖按钮

			},

			this.vdIsOk = function() {

				// 是否全部验证成功
				var baseBl = true;
				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];

					// 单选按钮
					if(_obj.rd) {

						if(_obj.rd_req === false) {
							return baseBl = false;
						}

					}

					// 非单选按钮
					else {

						if(_obj.bl === false) {
							return baseBl = false;
						}
					}

				}

				return baseBl;
			},
			
			this.addVdBtnStyle=function(el){
				
				// 提交按钮
				var p = $(el).parents(this.formName);
				var $vd_btn = $(".vd-btn", p);
				if($vd_btn.length > 0) {
					
					if(this.vdIsOk()) {
						$vd_btn.removeClass("vd-error").addClass("vd-ok");
					} else {

						$vd_btn.removeClass("vd-ok").addClass("vd-error");
					}
				}
			}
	
	
	}

	return {
		create: function(formName) {
			return new Obj(formName);
		}
	};

})(window.Zepto || window.jQuery);
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *	公共类库
 */

(function ($) {

	/**创建Common对象**/
	window.common = window.Common = function Common() {};

	// 添加扩展extend
	Common.extend = function (obj) {

		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {

			for (var i in obj) {
				this[i] = obj[i];
			}
		}

		return this;
	};

	/**url对象**/
	Common.extend({

		url: {
			//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
			GetQueryString: function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},

			//从WebAPI获取日期json数据 转换成日期时间戳
			jsonToDate: function jsonToDate(apidate) {
				var txts = apidate.replace("/Date(", "").replace(")/", "");
				return parseInt(txts.trim());
			},

			// 取当前页面名称(不带后缀名)
			getPageName: function getPageName() {
				var a = location.href;
				var b = a.split("/");
				var c = b.slice(b.length - 1, b.length).toString(String).split(".");
				return c.slice(0, 1);
			},

			//取当前页面名称(带后缀名)
			getPageNameExention: function getPageNameExention() {
				var strUrl = location.href;
				var arrUrl = strUrl.split("/");
				var strPage = arrUrl[arrUrl.length - 1];
				return strPage;
			}

		}
	});

	/**延迟加载**/
	Common.extend({
		/**
   * 延迟加载
   *  * <img class="load-lazy"
   * 	src="images/Home/lazy.jpg"
   * alt="新品上市图片"
   * data-src="images/Home/板块图片1.png"
   * > 
   * */
		lazy: function lazy() {

			var window_h = $(window).height();

			$(window).scroll(function () {

				setTimeout(function () {

					$(".load-lazy").each(function () {

						var img_h = parseInt($(this).offset().top) - parseInt(window_h);
						var img_h2 = parseInt($(this).offset().top) + $(this).height();
						if ($(document).scrollTop() >= img_h && $(document).scrollTop() < img_h2) {

							$(this).attr("src", $(this).attr("data-src"));

							/*ie8 不支持
        * .animate({
       "opacity":0.2
       }).animate({
       "opacity": 1
       }, 500);
       		
       * */
						}
					});
				}, 100);
			});
		}

	});

	/**绑定自定义事件**/
	Common.extend({
		events: {
			events: {},

			// bind events
			on: function on(eventName, fn) {
				this.events[eventName] = this.events[eventName] || [];
				this.events[eventName].push(fn);
			},
			off: function off(eventName, fn) {
				if (arguments.length === 1) {

					this.events[eventName] = [];
				} else if (arguments.length === 2) {
					var $events = this.events[eventName] || [];
					for (var i = 0; i < $events.length; i++) {
						if ($events[i] === fn) {
							$events.splice(i, 1);
							break;
						}
					}
				}
			},
			emit: function emit(eventName, data) {

				if (this.events[eventName]) {
					for (var i = 0; i < this.events[eventName].length; i++) {
						this.events[eventName][i](data);
					}
				}
			}
		}
	});

	/**array的扩展方法**/
	Common.extend({
		array: {

			// min value
			min: function min(list) {
				list = list || [];
				var _array_min = 0;
				var isOne = true;
				for (var i = 0; i < list.length; i++) {
					var _temp = 0;

					if (typeof list[i] !== "number") {

						//  is not a number
						var _num = Number(list[i]);
						_temp = isNaN(_num) ? 0 : _num;
					} else {

						//  is a number
						_temp = list[i];
					}

					if (isOne) {
						_array_min = _temp;
						isOne = false;
					} else {
						// set value number
						if (_temp < _array_min) {
							_array_min = _temp;
						}
					}
				}

				return _array_min;
			},

			// max value
			max: function max(list) {
				list = list || [];
				var _array_max = 0;

				var isOne = true;
				for (var i = 0; i < list.length; i++) {
					var _temp = 0;

					if (typeof list[i] !== "number") {

						//  is not a number
						var _num = Number(list[i]);
						_temp = isNaN(_num) ? 0 : _num;
					} else {

						//  is a number
						_temp = list[i];
					}

					if (isOne) {
						_array_max = _temp;
						isOne = false;
					} else {
						// set value number
						if (_temp > _array_max) {
							_array_max = _temp;
						}
					}
				}

				return _array_max;
			}

		}

	});
})(window.jQuery || window.Zepto);
/*
 * 默认js
 * 添加 class="bs-date " 
	<input type="text" class="form-control bs-date " value="" placeholder="订单开始时间" />
 * 
 */

var bsDate = function ($) {

	var _init = function _init() {
		// bs 日历插件
		$('.bs-date').datetimepicker({

			format: "yyyy-mm-dd  ", //'yyyy-mm-dd hh:ii'
			showMeridian: true,
			autoclose: true,
			todayBtn: true,
			minView: 3 //选择日期
			//forceParse :true  //转换格式

		});

		//日期不准输入
		$('.bs-date').focus(function () {

			$(this).blur();
		});
	};

	return {
		init: _init
	};
}(window.jQuery);
var cityData3 = [{
	value: '110000',
	text: '北京市',
	children: [{
		value: "110100",
		text: "北京市",
		children: [{
			value: "110101",
			text: "东城区"
		}, {
			value: "110102",
			text: "西城区"
		}, {
			value: "110103",
			text: "崇文区"
		}, {
			value: "110104",
			text: "宣武区"
		}, {
			value: "110105",
			text: "朝阳区"
		}, {
			value: "110106",
			text: "丰台区"
		}, {
			value: "110107",
			text: "石景山区"
		}, {
			value: "110108",
			text: "海淀区"
		}, {
			value: "110109",
			text: "门头沟区"
		}, {
			value: "110111",
			text: "房山区"
		}, {
			value: "110112",
			text: "通州区"
		}, {
			value: "110113",
			text: "顺义区"
		}, {
			value: "110114",
			text: "昌平区"
		}, {
			value: "110115",
			text: "大兴区"
		}, {
			value: "110116",
			text: "怀柔区"
		}, {
			value: "110117",
			text: "平谷区"
		}, {
			value: "110228",
			text: "密云县"
		}, {
			value: "110229",
			text: "延庆县"
		}, {
			value: "110230",
			text: "其它区"
		}]
	}]
}, {
	value: '120000',
	text: '天津市',
	children: [{
		value: "120100",
		text: "天津市",
		children: [{
			value: "120101",
			text: "和平区"
		}, {
			value: "120102",
			text: "河东区"
		}, {
			value: "120103",
			text: "河西区"
		}, {
			value: "120104",
			text: "南开区"
		}, {
			value: "120105",
			text: "河北区"
		}, {
			value: "120106",
			text: "红桥区"
		}, {
			value: "120107",
			text: "塘沽区"
		}, {
			value: "120108",
			text: "汉沽区"
		}, {
			value: "120109",
			text: "大港区"
		}, {
			value: "120110",
			text: "东丽区"
		}, {
			value: "120111",
			text: "西青区"
		}, {
			value: "120112",
			text: "津南区"
		}, {
			value: "120113",
			text: "北辰区"
		}, {
			value: "120114",
			text: "武清区"
		}, {
			value: "120115",
			text: "宝坻区"
		}, {
			value: "120116",
			text: "滨海新区"
		}, {
			value: "120221",
			text: "宁河县"
		}, {
			value: "120223",
			text: "静海县"
		}, {
			value: "120225",
			text: "蓟县"
		}, {
			value: "120226",
			text: "其它区"
		}]
	}]
}, {
	value: '130000',
	text: '河北省',
	children: [{
		value: "130100",
		text: "石家庄市",
		children: [{
			value: "130102",
			text: "长安区"
		}, {
			value: "130103",
			text: "桥东区"
		}, {
			value: "130104",
			text: "桥西区"
		}, {
			value: "130105",
			text: "新华区"
		}, {
			value: "130107",
			text: "井陉矿区"
		}, {
			value: "130108",
			text: "裕华区"
		}, {
			value: "130121",
			text: "井陉县"
		}, {
			value: "130123",
			text: "正定县"
		}, {
			value: "130124",
			text: "栾城县"
		}, {
			value: "130125",
			text: "行唐县"
		}, {
			value: "130126",
			text: "灵寿县"
		}, {
			value: "130127",
			text: "高邑县"
		}, {
			value: "130128",
			text: "深泽县"
		}, {
			value: "130129",
			text: "赞皇县"
		}, {
			value: "130130",
			text: "无极县"
		}, {
			value: "130131",
			text: "平山县"
		}, {
			value: "130132",
			text: "元氏县"
		}, {
			value: "130133",
			text: "赵县"
		}, {
			value: "130181",
			text: "辛集市"
		}, {
			value: "130182",
			text: "藁城市"
		}, {
			value: "130183",
			text: "晋州市"
		}, {
			value: "130184",
			text: "新乐市"
		}, {
			value: "130185",
			text: "鹿泉市"
		}, {
			value: "130186",
			text: "其它区"
		}]
	}, {
		value: "130200",
		text: "唐山市",
		children: [{
			value: "130202",
			text: "路南区"
		}, {
			value: "130203",
			text: "路北区"
		}, {
			value: "130204",
			text: "古冶区"
		}, {
			value: "130205",
			text: "开平区"
		}, {
			value: "130207",
			text: "丰南区"
		}, {
			value: "130208",
			text: "丰润区"
		}, {
			value: "130223",
			text: "滦县"
		}, {
			value: "130224",
			text: "滦南县"
		}, {
			value: "130225",
			text: "乐亭县"
		}, {
			value: "130227",
			text: "迁西县"
		}, {
			value: "130229",
			text: "玉田县"
		}, {
			value: "130230",
			text: "唐海县"
		}, {
			value: "130281",
			text: "遵化市"
		}, {
			value: "130283",
			text: "迁安市"
		}, {
			value: "130284",
			text: "其它区"
		}]
	}, {
		value: "130300",
		text: "秦皇岛市",
		children: [{
			value: "130302",
			text: "海港区"
		}, {
			value: "130303",
			text: "山海关区"
		}, {
			value: "130304",
			text: "北戴河区"
		}, {
			value: "130321",
			text: "青龙满族自治县"
		}, {
			value: "130322",
			text: "昌黎县"
		}, {
			value: "130323",
			text: "抚宁县"
		}, {
			value: "130324",
			text: "卢龙县"
		}, {
			value: "130398",
			text: "其它区"
		}, {
			value: "130399",
			text: "经济技术开发区"
		}]
	}, {
		value: "130400",
		text: "邯郸市",
		children: [{
			value: "130402",
			text: "邯山区"
		}, {
			value: "130403",
			text: "丛台区"
		}, {
			value: "130404",
			text: "复兴区"
		}, {
			value: "130406",
			text: "峰峰矿区"
		}, {
			value: "130421",
			text: "邯郸县"
		}, {
			value: "130423",
			text: "临漳县"
		}, {
			value: "130424",
			text: "成安县"
		}, {
			value: "130425",
			text: "大名县"
		}, {
			value: "130426",
			text: "涉县"
		}, {
			value: "130427",
			text: "磁县"
		}, {
			value: "130428",
			text: "肥乡县"
		}, {
			value: "130429",
			text: "永年县"
		}, {
			value: "130430",
			text: "邱县"
		}, {
			value: "130431",
			text: "鸡泽县"
		}, {
			value: "130432",
			text: "广平县"
		}, {
			value: "130433",
			text: "馆陶县"
		}, {
			value: "130434",
			text: "魏县"
		}, {
			value: "130435",
			text: "曲周县"
		}, {
			value: "130481",
			text: "武安市"
		}, {
			value: "130482",
			text: "其它区"
		}]
	}, {
		value: "130500",
		text: "邢台市",
		children: [{
			value: "130502",
			text: "桥东区"
		}, {
			value: "130503",
			text: "桥西区"
		}, {
			value: "130521",
			text: "邢台县"
		}, {
			value: "130522",
			text: "临城县"
		}, {
			value: "130523",
			text: "内丘县"
		}, {
			value: "130524",
			text: "柏乡县"
		}, {
			value: "130525",
			text: "隆尧县"
		}, {
			value: "130526",
			text: "任县"
		}, {
			value: "130527",
			text: "南和县"
		}, {
			value: "130528",
			text: "宁晋县"
		}, {
			value: "130529",
			text: "巨鹿县"
		}, {
			value: "130530",
			text: "新河县"
		}, {
			value: "130531",
			text: "广宗县"
		}, {
			value: "130532",
			text: "平乡县"
		}, {
			value: "130533",
			text: "威县"
		}, {
			value: "130534",
			text: "清河县"
		}, {
			value: "130535",
			text: "临西县"
		}, {
			value: "130581",
			text: "南宫市"
		}, {
			value: "130582",
			text: "沙河市"
		}, {
			value: "130583",
			text: "其它区"
		}]
	}, {
		value: "130600",
		text: "保定市",
		children: [{
			value: "130602",
			text: "新市区"
		}, {
			value: "130603",
			text: "北市区"
		}, {
			value: "130604",
			text: "南市区"
		}, {
			value: "130621",
			text: "满城县"
		}, {
			value: "130622",
			text: "清苑县"
		}, {
			value: "130623",
			text: "涞水县"
		}, {
			value: "130624",
			text: "阜平县"
		}, {
			value: "130625",
			text: "徐水县"
		}, {
			value: "130626",
			text: "定兴县"
		}, {
			value: "130627",
			text: "唐县"
		}, {
			value: "130628",
			text: "高阳县"
		}, {
			value: "130629",
			text: "容城县"
		}, {
			value: "130630",
			text: "涞源县"
		}, {
			value: "130631",
			text: "望都县"
		}, {
			value: "130632",
			text: "安新县"
		}, {
			value: "130633",
			text: "易县"
		}, {
			value: "130634",
			text: "曲阳县"
		}, {
			value: "130635",
			text: "蠡县"
		}, {
			value: "130636",
			text: "顺平县"
		}, {
			value: "130637",
			text: "博野县"
		}, {
			value: "130638",
			text: "雄县"
		}, {
			value: "130681",
			text: "涿州市"
		}, {
			value: "130682",
			text: "定州市"
		}, {
			value: "130683",
			text: "安国市"
		}, {
			value: "130684",
			text: "高碑店市"
		}, {
			value: "130698",
			text: "高开区"
		}, {
			value: "130699",
			text: "其它区"
		}]
	}, {
		value: "130700",
		text: "张家口市",
		children: [{
			value: "130702",
			text: "桥东区"
		}, {
			value: "130703",
			text: "桥西区"
		}, {
			value: "130705",
			text: "宣化区"
		}, {
			value: "130706",
			text: "下花园区"
		}, {
			value: "130721",
			text: "宣化县"
		}, {
			value: "130722",
			text: "张北县"
		}, {
			value: "130723",
			text: "康保县"
		}, {
			value: "130724",
			text: "沽源县"
		}, {
			value: "130725",
			text: "尚义县"
		}, {
			value: "130726",
			text: "蔚县"
		}, {
			value: "130727",
			text: "阳原县"
		}, {
			value: "130728",
			text: "怀安县"
		}, {
			value: "130729",
			text: "万全县"
		}, {
			value: "130730",
			text: "怀来县"
		}, {
			value: "130731",
			text: "涿鹿县"
		}, {
			value: "130732",
			text: "赤城县"
		}, {
			value: "130733",
			text: "崇礼县"
		}, {
			value: "130734",
			text: "其它区"
		}]
	}, {
		value: "130800",
		text: "承德市",
		children: [{
			value: "130802",
			text: "双桥区"
		}, {
			value: "130803",
			text: "双滦区"
		}, {
			value: "130804",
			text: "鹰手营子矿区"
		}, {
			value: "130821",
			text: "承德县"
		}, {
			value: "130822",
			text: "兴隆县"
		}, {
			value: "130823",
			text: "平泉县"
		}, {
			value: "130824",
			text: "滦平县"
		}, {
			value: "130825",
			text: "隆化县"
		}, {
			value: "130826",
			text: "丰宁满族自治县"
		}, {
			value: "130827",
			text: "宽城满族自治县"
		}, {
			value: "130828",
			text: "围场满族蒙古族自治县"
		}, {
			value: "130829",
			text: "其它区"
		}]
	}, {
		value: "130900",
		text: "沧州市",
		children: [{
			value: "130902",
			text: "新华区"
		}, {
			value: "130903",
			text: "运河区"
		}, {
			value: "130921",
			text: "沧县"
		}, {
			value: "130922",
			text: "青县"
		}, {
			value: "130923",
			text: "东光县"
		}, {
			value: "130924",
			text: "海兴县"
		}, {
			value: "130925",
			text: "盐山县"
		}, {
			value: "130926",
			text: "肃宁县"
		}, {
			value: "130927",
			text: "南皮县"
		}, {
			value: "130928",
			text: "吴桥县"
		}, {
			value: "130929",
			text: "献县"
		}, {
			value: "130930",
			text: "孟村回族自治县"
		}, {
			value: "130981",
			text: "泊头市"
		}, {
			value: "130982",
			text: "任丘市"
		}, {
			value: "130983",
			text: "黄骅市"
		}, {
			value: "130984",
			text: "河间市"
		}, {
			value: "130985",
			text: "其它区"
		}]
	}, {
		value: "131000",
		text: "廊坊市",
		children: [{
			value: "131002",
			text: "安次区"
		}, {
			value: "131003",
			text: "广阳区"
		}, {
			value: "131022",
			text: "固安县"
		}, {
			value: "131023",
			text: "永清县"
		}, {
			value: "131024",
			text: "香河县"
		}, {
			value: "131025",
			text: "大城县"
		}, {
			value: "131026",
			text: "文安县"
		}, {
			value: "131028",
			text: "大厂回族自治县"
		}, {
			value: "131051",
			text: "开发区"
		}, {
			value: "131052",
			text: "燕郊经济技术开发区"
		}, {
			value: "131081",
			text: "霸州市"
		}, {
			value: "131082",
			text: "三河市"
		}, {
			value: "131083",
			text: "其它区"
		}]
	}, {
		value: "131100",
		text: "衡水市",
		children: [{
			value: "131102",
			text: "桃城区"
		}, {
			value: "131121",
			text: "枣强县"
		}, {
			value: "131122",
			text: "武邑县"
		}, {
			value: "131123",
			text: "武强县"
		}, {
			value: "131124",
			text: "饶阳县"
		}, {
			value: "131125",
			text: "安平县"
		}, {
			value: "131126",
			text: "故城县"
		}, {
			value: "131127",
			text: "景县"
		}, {
			value: "131128",
			text: "阜城县"
		}, {
			value: "131181",
			text: "冀州市"
		}, {
			value: "131182",
			text: "深州市"
		}, {
			value: "131183",
			text: "其它区"
		}]
	}]
}, {
	value: '140000',
	text: '山西省',
	children: [{
		value: "140100",
		text: "太原市",
		children: [{
			value: "140105",
			text: "小店区"
		}, {
			value: "140106",
			text: "迎泽区"
		}, {
			value: "140107",
			text: "杏花岭区"
		}, {
			value: "140108",
			text: "尖草坪区"
		}, {
			value: "140109",
			text: "万柏林区"
		}, {
			value: "140110",
			text: "晋源区"
		}, {
			value: "140121",
			text: "清徐县"
		}, {
			value: "140122",
			text: "阳曲县"
		}, {
			value: "140123",
			text: "娄烦县"
		}, {
			value: "140181",
			text: "古交市"
		}, {
			value: "140182",
			text: "其它区"
		}]
	}, {
		value: "140200",
		text: "大同市",
		children: [{
			value: "140202",
			text: "城区"
		}, {
			value: "140203",
			text: "矿区"
		}, {
			value: "140211",
			text: "南郊区"
		}, {
			value: "140212",
			text: "新荣区"
		}, {
			value: "140221",
			text: "阳高县"
		}, {
			value: "140222",
			text: "天镇县"
		}, {
			value: "140223",
			text: "广灵县"
		}, {
			value: "140224",
			text: "灵丘县"
		}, {
			value: "140225",
			text: "浑源县"
		}, {
			value: "140226",
			text: "左云县"
		}, {
			value: "140227",
			text: "大同县"
		}, {
			value: "140228",
			text: "其它区"
		}]
	}, {
		value: "140300",
		text: "阳泉市",
		children: [{
			value: "140302",
			text: "城区"
		}, {
			value: "140303",
			text: "矿区"
		}, {
			value: "140311",
			text: "郊区"
		}, {
			value: "140321",
			text: "平定县"
		}, {
			value: "140322",
			text: "盂县"
		}, {
			value: "140323",
			text: "其它区"
		}]
	}, {
		value: "140400",
		text: "长治市",
		children: [{
			value: "140421",
			text: "长治县"
		}, {
			value: "140423",
			text: "襄垣县"
		}, {
			value: "140424",
			text: "屯留县"
		}, {
			value: "140425",
			text: "平顺县"
		}, {
			value: "140426",
			text: "黎城县"
		}, {
			value: "140427",
			text: "壶关县"
		}, {
			value: "140428",
			text: "长子县"
		}, {
			value: "140429",
			text: "武乡县"
		}, {
			value: "140430",
			text: "沁县"
		}, {
			value: "140431",
			text: "沁源县"
		}, {
			value: "140481",
			text: "潞城市"
		}, {
			value: "140482",
			text: "城区"
		}, {
			value: "140483",
			text: "郊区"
		}, {
			value: "140484",
			text: "高新区"
		}, {
			value: "140485",
			text: "其它区"
		}]
	}, {
		value: "140500",
		text: "晋城市",
		children: [{
			value: "140502",
			text: "城区"
		}, {
			value: "140521",
			text: "沁水县"
		}, {
			value: "140522",
			text: "阳城县"
		}, {
			value: "140524",
			text: "陵川县"
		}, {
			value: "140525",
			text: "泽州县"
		}, {
			value: "140581",
			text: "高平市"
		}, {
			value: "140582",
			text: "其它区"
		}]
	}, {
		value: "140600",
		text: "朔州市",
		children: [{
			value: "140602",
			text: "朔城区"
		}, {
			value: "140603",
			text: "平鲁区"
		}, {
			value: "140621",
			text: "山阴县"
		}, {
			value: "140622",
			text: "应县"
		}, {
			value: "140623",
			text: "右玉县"
		}, {
			value: "140624",
			text: "怀仁县"
		}, {
			value: "140625",
			text: "其它区"
		}]
	}, {
		value: "140700",
		text: "晋中市",
		children: [{
			value: "140702",
			text: "榆次区"
		}, {
			value: "140721",
			text: "榆社县"
		}, {
			value: "140722",
			text: "左权县"
		}, {
			value: "140723",
			text: "和顺县"
		}, {
			value: "140724",
			text: "昔阳县"
		}, {
			value: "140725",
			text: "寿阳县"
		}, {
			value: "140726",
			text: "太谷县"
		}, {
			value: "140727",
			text: "祁县"
		}, {
			value: "140728",
			text: "平遥县"
		}, {
			value: "140729",
			text: "灵石县"
		}, {
			value: "140781",
			text: "介休市"
		}, {
			value: "140782",
			text: "其它区"
		}]
	}, {
		value: "140800",
		text: "运城市",
		children: [{
			value: "140802",
			text: "盐湖区"
		}, {
			value: "140821",
			text: "临猗县"
		}, {
			value: "140822",
			text: "万荣县"
		}, {
			value: "140823",
			text: "闻喜县"
		}, {
			value: "140824",
			text: "稷山县"
		}, {
			value: "140825",
			text: "新绛县"
		}, {
			value: "140826",
			text: "绛县"
		}, {
			value: "140827",
			text: "垣曲县"
		}, {
			value: "140828",
			text: "夏县"
		}, {
			value: "140829",
			text: "平陆县"
		}, {
			value: "140830",
			text: "芮城县"
		}, {
			value: "140881",
			text: "永济市"
		}, {
			value: "140882",
			text: "河津市"
		}, {
			value: "140883",
			text: "其它区"
		}]
	}, {
		value: "140900",
		text: "忻州市",
		children: [{
			value: "140902",
			text: "忻府区"
		}, {
			value: "140921",
			text: "定襄县"
		}, {
			value: "140922",
			text: "五台县"
		}, {
			value: "140923",
			text: "代县"
		}, {
			value: "140924",
			text: "繁峙县"
		}, {
			value: "140925",
			text: "宁武县"
		}, {
			value: "140926",
			text: "静乐县"
		}, {
			value: "140927",
			text: "神池县"
		}, {
			value: "140928",
			text: "五寨县"
		}, {
			value: "140929",
			text: "岢岚县"
		}, {
			value: "140930",
			text: "河曲县"
		}, {
			value: "140931",
			text: "保德县"
		}, {
			value: "140932",
			text: "偏关县"
		}, {
			value: "140981",
			text: "原平市"
		}, {
			value: "140982",
			text: "其它区"
		}]
	}, {
		value: "141000",
		text: "临汾市",
		children: [{
			value: "141002",
			text: "尧都区"
		}, {
			value: "141021",
			text: "曲沃县"
		}, {
			value: "141022",
			text: "翼城县"
		}, {
			value: "141023",
			text: "襄汾县"
		}, {
			value: "141024",
			text: "洪洞县"
		}, {
			value: "141025",
			text: "古县"
		}, {
			value: "141026",
			text: "安泽县"
		}, {
			value: "141027",
			text: "浮山县"
		}, {
			value: "141028",
			text: "吉县"
		}, {
			value: "141029",
			text: "乡宁县"
		}, {
			value: "141030",
			text: "大宁县"
		}, {
			value: "141031",
			text: "隰县"
		}, {
			value: "141032",
			text: "永和县"
		}, {
			value: "141033",
			text: "蒲县"
		}, {
			value: "141034",
			text: "汾西县"
		}, {
			value: "141081",
			text: "侯马市"
		}, {
			value: "141082",
			text: "霍州市"
		}, {
			value: "141083",
			text: "其它区"
		}]
	}, {
		value: "141100",
		text: "吕梁市",
		children: [{
			value: "141102",
			text: "离石区"
		}, {
			value: "141121",
			text: "文水县"
		}, {
			value: "141122",
			text: "交城县"
		}, {
			value: "141123",
			text: "兴县"
		}, {
			value: "141124",
			text: "临县"
		}, {
			value: "141125",
			text: "柳林县"
		}, {
			value: "141126",
			text: "石楼县"
		}, {
			value: "141127",
			text: "岚县"
		}, {
			value: "141128",
			text: "方山县"
		}, {
			value: "141129",
			text: "中阳县"
		}, {
			value: "141130",
			text: "交口县"
		}, {
			value: "141181",
			text: "孝义市"
		}, {
			value: "141182",
			text: "汾阳市"
		}, {
			value: "141183",
			text: "其它区"
		}]
	}]
}, {
	value: '150000',
	text: '内蒙古',
	children: [{
		value: "150100",
		text: "呼和浩特市",
		children: [{
			value: "150102",
			text: "新城区"
		}, {
			value: "150103",
			text: "回民区"
		}, {
			value: "150104",
			text: "玉泉区"
		}, {
			value: "150105",
			text: "赛罕区"
		}, {
			value: "150121",
			text: "土默特左旗"
		}, {
			value: "150122",
			text: "托克托县"
		}, {
			value: "150123",
			text: "和林格尔县"
		}, {
			value: "150124",
			text: "清水河县"
		}, {
			value: "150125",
			text: "武川县"
		}, {
			value: "150126",
			text: "其它区"
		}]
	}, {
		value: "150200",
		text: "包头市",
		children: [{
			value: "150202",
			text: "东河区"
		}, {
			value: "150203",
			text: "昆都仑区"
		}, {
			value: "150204",
			text: "青山区"
		}, {
			value: "150205",
			text: "石拐区"
		}, {
			value: "150206",
			text: "白云矿区"
		}, {
			value: "150207",
			text: "九原区"
		}, {
			value: "150221",
			text: "土默特右旗"
		}, {
			value: "150222",
			text: "固阳县"
		}, {
			value: "150223",
			text: "达尔罕茂明安联合旗"
		}, {
			value: "150224",
			text: "其它区"
		}]
	}, {
		value: "150300",
		text: "乌海市",
		children: [{
			value: "150302",
			text: "海勃湾区"
		}, {
			value: "150303",
			text: "海南区"
		}, {
			value: "150304",
			text: "乌达区"
		}, {
			value: "150305",
			text: "其它区"
		}]
	}, {
		value: "150400",
		text: "赤峰市",
		children: [{
			value: "150402",
			text: "红山区"
		}, {
			value: "150403",
			text: "元宝山区"
		}, {
			value: "150404",
			text: "松山区"
		}, {
			value: "150421",
			text: "阿鲁科尔沁旗"
		}, {
			value: "150422",
			text: "巴林左旗"
		}, {
			value: "150423",
			text: "巴林右旗"
		}, {
			value: "150424",
			text: "林西县"
		}, {
			value: "150425",
			text: "克什克腾旗"
		}, {
			value: "150426",
			text: "翁牛特旗"
		}, {
			value: "150428",
			text: "喀喇沁旗"
		}, {
			value: "150429",
			text: "宁城县"
		}, {
			value: "150430",
			text: "敖汉旗"
		}, {
			value: "150431",
			text: "其它区"
		}]
	}, {
		value: "150500",
		text: "通辽市",
		children: [{
			value: "150502",
			text: "科尔沁区"
		}, {
			value: "150521",
			text: "科尔沁左翼中旗"
		}, {
			value: "150522",
			text: "科尔沁左翼后旗"
		}, {
			value: "150523",
			text: "开鲁县"
		}, {
			value: "150524",
			text: "库伦旗"
		}, {
			value: "150525",
			text: "奈曼旗"
		}, {
			value: "150526",
			text: "扎鲁特旗"
		}, {
			value: "150581",
			text: "霍林郭勒市"
		}, {
			value: "150582",
			text: "其它区"
		}]
	}, {
		value: "150600",
		text: "鄂尔多斯市",
		children: [{
			value: "150602",
			text: "东胜区"
		}, {
			value: "150621",
			text: "达拉特旗"
		}, {
			value: "150622",
			text: "准格尔旗"
		}, {
			value: "150623",
			text: "鄂托克前旗"
		}, {
			value: "150624",
			text: "鄂托克旗"
		}, {
			value: "150625",
			text: "杭锦旗"
		}, {
			value: "150626",
			text: "乌审旗"
		}, {
			value: "150627",
			text: "伊金霍洛旗"
		}, {
			value: "150628",
			text: "其它区"
		}]
	}, {
		value: "150700",
		text: "呼伦贝尔市",
		children: [{
			value: "150702",
			text: "海拉尔区"
		}, {
			value: "150721",
			text: "阿荣旗"
		}, {
			value: "150722",
			text: "莫力达瓦达斡尔族自治旗"
		}, {
			value: "150723",
			text: "鄂伦春自治旗"
		}, {
			value: "150724",
			text: "鄂温克族自治旗"
		}, {
			value: "150725",
			text: "陈巴尔虎旗"
		}, {
			value: "150726",
			text: "新巴尔虎左旗"
		}, {
			value: "150727",
			text: "新巴尔虎右旗"
		}, {
			value: "150781",
			text: "满洲里市"
		}, {
			value: "150782",
			text: "牙克石市"
		}, {
			value: "150783",
			text: "扎兰屯市"
		}, {
			value: "150784",
			text: "额尔古纳市"
		}, {
			value: "150785",
			text: "根河市"
		}, {
			value: "150786",
			text: "其它区"
		}]
	}, {
		value: "150800",
		text: "巴彦淖尔市",
		children: [{
			value: "150802",
			text: "临河区"
		}, {
			value: "150821",
			text: "五原县"
		}, {
			value: "150822",
			text: "磴口县"
		}, {
			value: "150823",
			text: "乌拉特前旗"
		}, {
			value: "150824",
			text: "乌拉特中旗"
		}, {
			value: "150825",
			text: "乌拉特后旗"
		}, {
			value: "150826",
			text: "杭锦后旗"
		}, {
			value: "150827",
			text: "其它区"
		}]
	}, {
		value: "150900",
		text: "乌兰察布市",
		children: [{
			value: "150902",
			text: "集宁区"
		}, {
			value: "150921",
			text: "卓资县"
		}, {
			value: "150922",
			text: "化德县"
		}, {
			value: "150923",
			text: "商都县"
		}, {
			value: "150924",
			text: "兴和县"
		}, {
			value: "150925",
			text: "凉城县"
		}, {
			value: "150926",
			text: "察哈尔右翼前旗"
		}, {
			value: "150927",
			text: "察哈尔右翼中旗"
		}, {
			value: "150928",
			text: "察哈尔右翼后旗"
		}, {
			value: "150929",
			text: "四子王旗"
		}, {
			value: "150981",
			text: "丰镇市"
		}, {
			value: "150982",
			text: "其它区"
		}]
	}, {
		value: "152200",
		text: "兴安盟",
		children: [{
			value: "152201",
			text: "乌兰浩特市"
		}, {
			value: "152202",
			text: "阿尔山市"
		}, {
			value: "152221",
			text: "科尔沁右翼前旗"
		}, {
			value: "152222",
			text: "科尔沁右翼中旗"
		}, {
			value: "152223",
			text: "扎赉特旗"
		}, {
			value: "152224",
			text: "突泉县"
		}, {
			value: "152225",
			text: "其它区"
		}]
	}, {
		value: "152500",
		text: "锡林郭勒盟",
		children: [{
			value: "152501",
			text: "二连浩特市"
		}, {
			value: "152502",
			text: "锡林浩特市"
		}, {
			value: "152522",
			text: "阿巴嘎旗"
		}, {
			value: "152523",
			text: "苏尼特左旗"
		}, {
			value: "152524",
			text: "苏尼特右旗"
		}, {
			value: "152525",
			text: "东乌珠穆沁旗"
		}, {
			value: "152526",
			text: "西乌珠穆沁旗"
		}, {
			value: "152527",
			text: "太仆寺旗"
		}, {
			value: "152528",
			text: "镶黄旗"
		}, {
			value: "152529",
			text: "正镶白旗"
		}, {
			value: "152530",
			text: "正蓝旗"
		}, {
			value: "152531",
			text: "多伦县"
		}, {
			value: "152532",
			text: "其它区"
		}]
	}, {
		value: "152900",
		text: "阿拉善盟",
		children: [{
			value: "152921",
			text: "阿拉善左旗"
		}, {
			value: "152922",
			text: "阿拉善右旗"
		}, {
			value: "152923",
			text: "额济纳旗"
		}, {
			value: "152924",
			text: "其它区"
		}]
	}]
}, {
	value: '210000',
	text: '辽宁省',
	children: [{
		value: "210100",
		text: "沈阳市",
		children: [{
			value: "210102",
			text: "和平区"
		}, {
			value: "210103",
			text: "沈河区"
		}, {
			value: "210104",
			text: "大东区"
		}, {
			value: "210105",
			text: "皇姑区"
		}, {
			value: "210106",
			text: "铁西区"
		}, {
			value: "210111",
			text: "苏家屯区"
		}, {
			value: "210112",
			text: "东陵区"
		}, {
			value: "210113",
			text: "新城子区"
		}, {
			value: "210114",
			text: "于洪区"
		}, {
			value: "210122",
			text: "辽中县"
		}, {
			value: "210123",
			text: "康平县"
		}, {
			value: "210124",
			text: "法库县"
		}, {
			value: "210181",
			text: "新民市"
		}, {
			value: "210182",
			text: "浑南新区"
		}, {
			value: "210183",
			text: "张士开发区"
		}, {
			value: "210184",
			text: "沈北新区"
		}, {
			value: "210185",
			text: "其它区"
		}]
	}, {
		value: "210200",
		text: "大连市",
		children: [{
			value: "210202",
			text: "中山区"
		}, {
			value: "210203",
			text: "西岗区"
		}, {
			value: "210204",
			text: "沙河口区"
		}, {
			value: "210211",
			text: "甘井子区"
		}, {
			value: "210212",
			text: "旅顺口区"
		}, {
			value: "210213",
			text: "金州区"
		}, {
			value: "210224",
			text: "长海县"
		}, {
			value: "210251",
			text: "开发区"
		}, {
			value: "210281",
			text: "瓦房店市"
		}, {
			value: "210282",
			text: "普兰店市"
		}, {
			value: "210283",
			text: "庄河市"
		}, {
			value: "210297",
			text: "岭前区"
		}, {
			value: "210298",
			text: "其它区"
		}]
	}, {
		value: "210300",
		text: "鞍山市",
		children: [{
			value: "210302",
			text: "铁东区"
		}, {
			value: "210303",
			text: "铁西区"
		}, {
			value: "210304",
			text: "立山区"
		}, {
			value: "210311",
			text: "千山区"
		}, {
			value: "210321",
			text: "台安县"
		}, {
			value: "210323",
			text: "岫岩满族自治县"
		}, {
			value: "210351",
			text: "高新区"
		}, {
			value: "210381",
			text: "海城市"
		}, {
			value: "210382",
			text: "其它区"
		}]
	}, {
		value: "210400",
		text: "抚顺市",
		children: [{
			value: "210402",
			text: "新抚区"
		}, {
			value: "210403",
			text: "东洲区"
		}, {
			value: "210404",
			text: "望花区"
		}, {
			value: "210411",
			text: "顺城区"
		}, {
			value: "210421",
			text: "抚顺县"
		}, {
			value: "210422",
			text: "新宾满族自治县"
		}, {
			value: "210423",
			text: "清原满族自治县"
		}, {
			value: "210424",
			text: "其它区"
		}]
	}, {
		value: "210500",
		text: "本溪市",
		children: [{
			value: "210502",
			text: "平山区"
		}, {
			value: "210503",
			text: "溪湖区"
		}, {
			value: "210504",
			text: "明山区"
		}, {
			value: "210505",
			text: "南芬区"
		}, {
			value: "210521",
			text: "本溪满族自治县"
		}, {
			value: "210522",
			text: "桓仁满族自治县"
		}, {
			value: "210523",
			text: "其它区"
		}]
	}, {
		value: "210600",
		text: "丹东市",
		children: [{
			value: "210602",
			text: "元宝区"
		}, {
			value: "210603",
			text: "振兴区"
		}, {
			value: "210604",
			text: "振安区"
		}, {
			value: "210624",
			text: "宽甸满族自治县"
		}, {
			value: "210681",
			text: "东港市"
		}, {
			value: "210682",
			text: "凤城市"
		}, {
			value: "210683",
			text: "其它区"
		}]
	}, {
		value: "210700",
		text: "锦州市",
		children: [{
			value: "210702",
			text: "古塔区"
		}, {
			value: "210703",
			text: "凌河区"
		}, {
			value: "210711",
			text: "太和区"
		}, {
			value: "210726",
			text: "黑山县"
		}, {
			value: "210727",
			text: "义县"
		}, {
			value: "210781",
			text: "凌海市"
		}, {
			value: "210782",
			text: "北镇市"
		}, {
			value: "210783",
			text: "其它区"
		}]
	}, {
		value: "210800",
		text: "营口市",
		children: [{
			value: "210802",
			text: "站前区"
		}, {
			value: "210803",
			text: "西市区"
		}, {
			value: "210804",
			text: "鲅鱼圈区"
		}, {
			value: "210811",
			text: "老边区"
		}, {
			value: "210881",
			text: "盖州市"
		}, {
			value: "210882",
			text: "大石桥市"
		}, {
			value: "210883",
			text: "其它区"
		}]
	}, {
		value: "210900",
		text: "阜新市",
		children: [{
			value: "210902",
			text: "海州区"
		}, {
			value: "210903",
			text: "新邱区"
		}, {
			value: "210904",
			text: "太平区"
		}, {
			value: "210905",
			text: "清河门区"
		}, {
			value: "210911",
			text: "细河区"
		}, {
			value: "210921",
			text: "阜新蒙古族自治县"
		}, {
			value: "210922",
			text: "彰武县"
		}, {
			value: "210923",
			text: "其它区"
		}]
	}, {
		value: "211000",
		text: "辽阳市",
		children: [{
			value: "211002",
			text: "白塔区"
		}, {
			value: "211003",
			text: "文圣区"
		}, {
			value: "211004",
			text: "宏伟区"
		}, {
			value: "211005",
			text: "弓长岭区"
		}, {
			value: "211011",
			text: "太子河区"
		}, {
			value: "211021",
			text: "辽阳县"
		}, {
			value: "211081",
			text: "灯塔市"
		}, {
			value: "211082",
			text: "其它区"
		}]
	}, {
		value: "211100",
		text: "盘锦市",
		children: [{
			value: "211102",
			text: "双台子区"
		}, {
			value: "211103",
			text: "兴隆台区"
		}, {
			value: "211121",
			text: "大洼县"
		}, {
			value: "211122",
			text: "盘山县"
		}, {
			value: "211123",
			text: "其它区"
		}]
	}, {
		value: "211200",
		text: "铁岭市",
		children: [{
			value: "211202",
			text: "银州区"
		}, {
			value: "211204",
			text: "清河区"
		}, {
			value: "211221",
			text: "铁岭县"
		}, {
			value: "211223",
			text: "西丰县"
		}, {
			value: "211224",
			text: "昌图县"
		}, {
			value: "211281",
			text: "调兵山市"
		}, {
			value: "211282",
			text: "开原市"
		}, {
			value: "211283",
			text: "其它区"
		}]
	}, {
		value: "211300",
		text: "朝阳市",
		children: [{
			value: "211302",
			text: "双塔区"
		}, {
			value: "211303",
			text: "龙城区"
		}, {
			value: "211321",
			text: "朝阳县"
		}, {
			value: "211322",
			text: "建平县"
		}, {
			value: "211324",
			text: "喀喇沁左翼蒙古族自治县"
		}, {
			value: "211381",
			text: "北票市"
		}, {
			value: "211382",
			text: "凌源市"
		}, {
			value: "211383",
			text: "其它区"
		}]
	}, {
		value: "211400",
		text: "葫芦岛市",
		children: [{
			value: "211402",
			text: "连山区"
		}, {
			value: "211403",
			text: "龙港区"
		}, {
			value: "211404",
			text: "南票区"
		}, {
			value: "211421",
			text: "绥中县"
		}, {
			value: "211422",
			text: "建昌县"
		}, {
			value: "211481",
			text: "兴城市"
		}, {
			value: "211482",
			text: "其它区"
		}]
	}]
}, {
	value: '220000',
	text: '吉林省',
	children: [{
		value: "220100",
		text: "长春市",
		children: [{
			value: "220102",
			text: "南关区"
		}, {
			value: "220103",
			text: "宽城区"
		}, {
			value: "220104",
			text: "朝阳区"
		}, {
			value: "220105",
			text: "二道区"
		}, {
			value: "220106",
			text: "绿园区"
		}, {
			value: "220112",
			text: "双阳区"
		}, {
			value: "220122",
			text: "农安县"
		}, {
			value: "220181",
			text: "九台市"
		}, {
			value: "220182",
			text: "榆树市"
		}, {
			value: "220183",
			text: "德惠市"
		}, {
			value: "220184",
			text: "高新技术产业开发区"
		}, {
			value: "220185",
			text: "汽车产业开发区"
		}, {
			value: "220186",
			text: "经济技术开发区"
		}, {
			value: "220187",
			text: "净月旅游开发区"
		}, {
			value: "220188",
			text: "其它区"
		}]
	}, {
		value: "220200",
		text: "吉林市",
		children: [{
			value: "220202",
			text: "昌邑区"
		}, {
			value: "220203",
			text: "龙潭区"
		}, {
			value: "220204",
			text: "船营区"
		}, {
			value: "220211",
			text: "丰满区"
		}, {
			value: "220221",
			text: "永吉县"
		}, {
			value: "220281",
			text: "蛟河市"
		}, {
			value: "220282",
			text: "桦甸市"
		}, {
			value: "220283",
			text: "舒兰市"
		}, {
			value: "220284",
			text: "磐石市"
		}, {
			value: "220285",
			text: "其它区"
		}]
	}, {
		value: "220300",
		text: "四平市",
		children: [{
			value: "220302",
			text: "铁西区"
		}, {
			value: "220303",
			text: "铁东区"
		}, {
			value: "220322",
			text: "梨树县"
		}, {
			value: "220323",
			text: "伊通满族自治县"
		}, {
			value: "220381",
			text: "公主岭市"
		}, {
			value: "220382",
			text: "双辽市"
		}, {
			value: "220383",
			text: "其它区"
		}]
	}, {
		value: "220400",
		text: "辽源市",
		children: [{
			value: "220402",
			text: "龙山区"
		}, {
			value: "220403",
			text: "西安区"
		}, {
			value: "220421",
			text: "东丰县"
		}, {
			value: "220422",
			text: "东辽县"
		}, {
			value: "220423",
			text: "其它区"
		}]
	}, {
		value: "220500",
		text: "通化市",
		children: [{
			value: "220502",
			text: "东昌区"
		}, {
			value: "220503",
			text: "二道江区"
		}, {
			value: "220521",
			text: "通化县"
		}, {
			value: "220523",
			text: "辉南县"
		}, {
			value: "220524",
			text: "柳河县"
		}, {
			value: "220581",
			text: "梅河口市"
		}, {
			value: "220582",
			text: "集安市"
		}, {
			value: "220583",
			text: "其它区"
		}]
	}, {
		value: "220600",
		text: "白山市",
		children: [{
			value: "220602",
			text: "八道江区"
		}, {
			value: "220621",
			text: "抚松县"
		}, {
			value: "220622",
			text: "靖宇县"
		}, {
			value: "220623",
			text: "长白朝鲜族自治县"
		}, {
			value: "220625",
			text: "江源市"
		}, {
			value: "220681",
			text: "临江市"
		}, {
			value: "220682",
			text: "其它区"
		}]
	}, {
		value: "220700",
		text: "松原市",
		children: [{
			value: "220702",
			text: "宁江区"
		}, {
			value: "220721",
			text: "前郭尔罗斯蒙古族自治县"
		}, {
			value: "220722",
			text: "长岭县"
		}, {
			value: "220723",
			text: "乾安县"
		}, {
			value: "220724",
			text: "扶余县"
		}, {
			value: "220725",
			text: "其它区"
		}]
	}, {
		value: "220800",
		text: "白城市",
		children: [{
			value: "220802",
			text: "洮北区"
		}, {
			value: "220821",
			text: "镇赉县"
		}, {
			value: "220822",
			text: "通榆县"
		}, {
			value: "220881",
			text: "洮南市"
		}, {
			value: "220882",
			text: "大安市"
		}, {
			value: "220883",
			text: "其它区"
		}]
	}, {
		value: "222400",
		text: "延边朝鲜族自治州",
		children: [{
			value: "222401",
			text: "延吉市"
		}, {
			value: "222402",
			text: "图们市"
		}, {
			value: "222403",
			text: "敦化市"
		}, {
			value: "222404",
			text: "珲春市"
		}, {
			value: "222405",
			text: "龙井市"
		}, {
			value: "222406",
			text: "和龙市"
		}, {
			value: "222424",
			text: "汪清县"
		}, {
			value: "222426",
			text: "安图县"
		}, {
			value: "222427",
			text: "其它区"
		}]
	}]
}, {
	value: '230000',
	text: '黑龙江省',
	children: [{
		value: "230100",
		text: "哈尔滨市",
		children: [{
			value: "230102",
			text: "道里区"
		}, {
			value: "230103",
			text: "南岗区"
		}, {
			value: "230104",
			text: "道外区"
		}, {
			value: "230106",
			text: "香坊区"
		}, {
			value: "230107",
			text: "动力区"
		}, {
			value: "230108",
			text: "平房区"
		}, {
			value: "230109",
			text: "松北区"
		}, {
			value: "230111",
			text: "呼兰区"
		}, {
			value: "230123",
			text: "依兰县"
		}, {
			value: "230124",
			text: "方正县"
		}, {
			value: "230125",
			text: "宾县"
		}, {
			value: "230126",
			text: "巴彦县"
		}, {
			value: "230127",
			text: "木兰县"
		}, {
			value: "230128",
			text: "通河县"
		}, {
			value: "230129",
			text: "延寿县"
		}, {
			value: "230181",
			text: "阿城市"
		}, {
			value: "230182",
			text: "双城市"
		}, {
			value: "230183",
			text: "尚志市"
		}, {
			value: "230184",
			text: "五常市"
		}, {
			value: "230185",
			text: "阿城市"
		}, {
			value: "230186",
			text: "其它区"
		}]
	}, {
		value: "230200",
		text: "齐齐哈尔市",
		children: [{
			value: "230202",
			text: "龙沙区"
		}, {
			value: "230203",
			text: "建华区"
		}, {
			value: "230204",
			text: "铁锋区"
		}, {
			value: "230205",
			text: "昂昂溪区"
		}, {
			value: "230206",
			text: "富拉尔基区"
		}, {
			value: "230207",
			text: "碾子山区"
		}, {
			value: "230208",
			text: "梅里斯达斡尔族区"
		}, {
			value: "230221",
			text: "龙江县"
		}, {
			value: "230223",
			text: "依安县"
		}, {
			value: "230224",
			text: "泰来县"
		}, {
			value: "230225",
			text: "甘南县"
		}, {
			value: "230227",
			text: "富裕县"
		}, {
			value: "230229",
			text: "克山县"
		}, {
			value: "230230",
			text: "克东县"
		}, {
			value: "230231",
			text: "拜泉县"
		}, {
			value: "230281",
			text: "讷河市"
		}, {
			value: "230282",
			text: "其它区"
		}]
	}, {
		value: "230300",
		text: "鸡西市",
		children: [{
			value: "230302",
			text: "鸡冠区"
		}, {
			value: "230303",
			text: "恒山区"
		}, {
			value: "230304",
			text: "滴道区"
		}, {
			value: "230305",
			text: "梨树区"
		}, {
			value: "230306",
			text: "城子河区"
		}, {
			value: "230307",
			text: "麻山区"
		}, {
			value: "230321",
			text: "鸡东县"
		}, {
			value: "230381",
			text: "虎林市"
		}, {
			value: "230382",
			text: "密山市"
		}, {
			value: "230383",
			text: "其它区"
		}]
	}, {
		value: "230400",
		text: "鹤岗市",
		children: [{
			value: "230402",
			text: "向阳区"
		}, {
			value: "230403",
			text: "工农区"
		}, {
			value: "230404",
			text: "南山区"
		}, {
			value: "230405",
			text: "兴安区"
		}, {
			value: "230406",
			text: "东山区"
		}, {
			value: "230407",
			text: "兴山区"
		}, {
			value: "230421",
			text: "萝北县"
		}, {
			value: "230422",
			text: "绥滨县"
		}, {
			value: "230423",
			text: "其它区"
		}]
	}, {
		value: "230500",
		text: "双鸭山市",
		children: [{
			value: "230502",
			text: "尖山区"
		}, {
			value: "230503",
			text: "岭东区"
		}, {
			value: "230505",
			text: "四方台区"
		}, {
			value: "230506",
			text: "宝山区"
		}, {
			value: "230521",
			text: "集贤县"
		}, {
			value: "230522",
			text: "友谊县"
		}, {
			value: "230523",
			text: "宝清县"
		}, {
			value: "230524",
			text: "饶河县"
		}, {
			value: "230525",
			text: "其它区"
		}]
	}, {
		value: "230600",
		text: "大庆市",
		children: [{
			value: "230602",
			text: "萨尔图区"
		}, {
			value: "230603",
			text: "龙凤区"
		}, {
			value: "230604",
			text: "让胡路区"
		}, {
			value: "230605",
			text: "红岗区"
		}, {
			value: "230606",
			text: "大同区"
		}, {
			value: "230621",
			text: "肇州县"
		}, {
			value: "230622",
			text: "肇源县"
		}, {
			value: "230623",
			text: "林甸县"
		}, {
			value: "230624",
			text: "杜尔伯特蒙古族自治县"
		}, {
			value: "230625",
			text: "其它区"
		}]
	}, {
		value: "230700",
		text: "伊春市",
		children: [{
			value: "230702",
			text: "伊春区"
		}, {
			value: "230703",
			text: "南岔区"
		}, {
			value: "230704",
			text: "友好区"
		}, {
			value: "230705",
			text: "西林区"
		}, {
			value: "230706",
			text: "翠峦区"
		}, {
			value: "230707",
			text: "新青区"
		}, {
			value: "230708",
			text: "美溪区"
		}, {
			value: "230709",
			text: "金山屯区"
		}, {
			value: "230710",
			text: "五营区"
		}, {
			value: "230711",
			text: "乌马河区"
		}, {
			value: "230712",
			text: "汤旺河区"
		}, {
			value: "230713",
			text: "带岭区"
		}, {
			value: "230714",
			text: "乌伊岭区"
		}, {
			value: "230715",
			text: "红星区"
		}, {
			value: "230716",
			text: "上甘岭区"
		}, {
			value: "230722",
			text: "嘉荫县"
		}, {
			value: "230781",
			text: "铁力市"
		}, {
			value: "230782",
			text: "其它区"
		}]
	}, {
		value: "230800",
		text: "佳木斯市",
		children: [{
			value: "230802",
			text: "永红区"
		}, {
			value: "230803",
			text: "向阳区"
		}, {
			value: "230804",
			text: "前进区"
		}, {
			value: "230805",
			text: "东风区"
		}, {
			value: "230811",
			text: "郊区"
		}, {
			value: "230822",
			text: "桦南县"
		}, {
			value: "230826",
			text: "桦川县"
		}, {
			value: "230828",
			text: "汤原县"
		}, {
			value: "230833",
			text: "抚远县"
		}, {
			value: "230881",
			text: "同江市"
		}, {
			value: "230882",
			text: "富锦市"
		}, {
			value: "230883",
			text: "其它区"
		}]
	}, {
		value: "230900",
		text: "七台河市",
		children: [{
			value: "230902",
			text: "新兴区"
		}, {
			value: "230903",
			text: "桃山区"
		}, {
			value: "230904",
			text: "茄子河区"
		}, {
			value: "230921",
			text: "勃利县"
		}, {
			value: "230922",
			text: "其它区"
		}]
	}, {
		value: "231000",
		text: "牡丹江市",
		children: [{
			value: "231002",
			text: "东安区"
		}, {
			value: "231003",
			text: "阳明区"
		}, {
			value: "231004",
			text: "爱民区"
		}, {
			value: "231005",
			text: "西安区"
		}, {
			value: "231024",
			text: "东宁县"
		}, {
			value: "231025",
			text: "林口县"
		}, {
			value: "231081",
			text: "绥芬河市"
		}, {
			value: "231083",
			text: "海林市"
		}, {
			value: "231084",
			text: "宁安市"
		}, {
			value: "231085",
			text: "穆棱市"
		}, {
			value: "231086",
			text: "其它区"
		}]
	}, {
		value: "231100",
		text: "黑河市",
		children: [{
			value: "231102",
			text: "爱辉区"
		}, {
			value: "231121",
			text: "嫩江县"
		}, {
			value: "231123",
			text: "逊克县"
		}, {
			value: "231124",
			text: "孙吴县"
		}, {
			value: "231181",
			text: "北安市"
		}, {
			value: "231182",
			text: "五大连池市"
		}, {
			value: "231183",
			text: "其它区"
		}]
	}, {
		value: "231200",
		text: "绥化市",
		children: [{
			value: "231202",
			text: "北林区"
		}, {
			value: "231221",
			text: "望奎县"
		}, {
			value: "231222",
			text: "兰西县"
		}, {
			value: "231223",
			text: "青冈县"
		}, {
			value: "231224",
			text: "庆安县"
		}, {
			value: "231225",
			text: "明水县"
		}, {
			value: "231226",
			text: "绥棱县"
		}, {
			value: "231281",
			text: "安达市"
		}, {
			value: "231282",
			text: "肇东市"
		}, {
			value: "231283",
			text: "海伦市"
		}, {
			value: "231284",
			text: "其它区"
		}]
	}, {
		value: "232700",
		text: "大兴安岭地区",
		children: [{
			value: "232721",
			text: "呼玛县"
		}, {
			value: "232722",
			text: "塔河县"
		}, {
			value: "232723",
			text: "漠河县"
		}, {
			value: "232724",
			text: "加格达奇区"
		}, {
			value: "232725",
			text: "其它区"
		}]
	}]
}, {
	value: '310000',
	text: '上海市',
	children: [{
		value: '310100',
		text: '上海市',
		children: [{
			value: "310101",
			text: "黄浦区"
		}, {
			value: "310103",
			text: "卢湾区"
		}, {
			value: "310104",
			text: "徐汇区"
		}, {
			value: "310105",
			text: "长宁区"
		}, {
			value: "310106",
			text: "静安区"
		}, {
			value: "310107",
			text: "普陀区"
		}, {
			value: "310108",
			text: "闸北区"
		}, {
			value: "310109",
			text: "虹口区"
		}, {
			value: "310110",
			text: "杨浦区"
		}, {
			value: "310112",
			text: "闵行区"
		}, {
			value: "310113",
			text: "宝山区"
		}, {
			value: "310114",
			text: "嘉定区"
		}, {
			value: "310115",
			text: "浦东新区"
		}, {
			value: "310116",
			text: "金山区"
		}, {
			value: "310117",
			text: "松江区"
		}, {
			value: "310118",
			text: "青浦区"
		}, {
			value: "310119",
			text: "南汇区"
		}, {
			value: "310120",
			text: "奉贤区"
		}, {
			value: "310152",
			text: "川沙区"
		}, {
			value: "310230",
			text: "崇明县"
		}, {
			value: "310231",
			text: "其它区"
		}]
	}]
}, {
	value: '320000',
	text: '江苏省',
	children: [{
		value: "320100",
		text: "南京市",
		children: [{
			value: "320102",
			text: "玄武区"
		}, {
			value: "320103",
			text: "白下区"
		}, {
			value: "320104",
			text: "秦淮区"
		}, {
			value: "320105",
			text: "建邺区"
		}, {
			value: "320106",
			text: "鼓楼区"
		}, {
			value: "320107",
			text: "下关区"
		}, {
			value: "320111",
			text: "浦口区"
		}, {
			value: "320113",
			text: "栖霞区"
		}, {
			value: "320114",
			text: "雨花台区"
		}, {
			value: "320115",
			text: "江宁区"
		}, {
			value: "320116",
			text: "六合区"
		}, {
			value: "320124",
			text: "溧水县"
		}, {
			value: "320125",
			text: "高淳县"
		}, {
			value: "320126",
			text: "其它区"
		}]
	}, {
		value: "320200",
		text: "无锡市",
		children: [{
			value: "320202",
			text: "崇安区"
		}, {
			value: "320203",
			text: "南长区"
		}, {
			value: "320204",
			text: "北塘区"
		}, {
			value: "320205",
			text: "锡山区"
		}, {
			value: "320206",
			text: "惠山区"
		}, {
			value: "320211",
			text: "滨湖区"
		}, {
			value: "320281",
			text: "江阴市"
		}, {
			value: "320282",
			text: "宜兴市"
		}, {
			value: "320296",
			text: "新区"
		}, {
			value: "320297",
			text: "其它区"
		}]
	}, {
		value: "320300",
		text: "徐州市",
		children: [{
			value: "320302",
			text: "鼓楼区"
		}, {
			value: "320303",
			text: "云龙区"
		}, {
			value: "320304",
			text: "九里区"
		}, {
			value: "320305",
			text: "贾汪区"
		}, {
			value: "320311",
			text: "泉山区"
		}, {
			value: "320321",
			text: "丰县"
		}, {
			value: "320322",
			text: "沛县"
		}, {
			value: "320323",
			text: "铜山县"
		}, {
			value: "320324",
			text: "睢宁县"
		}, {
			value: "320381",
			text: "新沂市"
		}, {
			value: "320382",
			text: "邳州市"
		}, {
			value: "320383",
			text: "其它区"
		}]
	}, {
		value: "320400",
		text: "常州市",
		children: [{
			value: "320402",
			text: "天宁区"
		}, {
			value: "320404",
			text: "钟楼区"
		}, {
			value: "320405",
			text: "戚墅堰区"
		}, {
			value: "320411",
			text: "新北区"
		}, {
			value: "320412",
			text: "武进区"
		}, {
			value: "320481",
			text: "溧阳市"
		}, {
			value: "320482",
			text: "金坛市"
		}, {
			value: "320483",
			text: "其它区"
		}]
	}, {
		value: "320500",
		text: "苏州市",
		children: [{
			value: "320502",
			text: "沧浪区"
		}, {
			value: "320503",
			text: "平江区"
		}, {
			value: "320504",
			text: "金阊区"
		}, {
			value: "320505",
			text: "虎丘区"
		}, {
			value: "320506",
			text: "吴中区"
		}, {
			value: "320507",
			text: "相城区"
		}, {
			value: "320581",
			text: "常熟市"
		}, {
			value: "320582",
			text: "张家港市"
		}, {
			value: "320583",
			text: "昆山市"
		}, {
			value: "320584",
			text: "吴江市"
		}, {
			value: "320585",
			text: "太仓市"
		}, {
			value: "320594",
			text: "新区"
		}, {
			value: "320595",
			text: "园区"
		}, {
			value: "320596",
			text: "其它区"
		}]
	}, {
		value: "320600",
		text: "南通市",
		children: [{
			value: "320602",
			text: "崇川区"
		}, {
			value: "320611",
			text: "港闸区"
		}, {
			value: "320612",
			text: "通州区"
		}, {
			value: "320621",
			text: "海安县"
		}, {
			value: "320623",
			text: "如东县"
		}, {
			value: "320681",
			text: "启东市"
		}, {
			value: "320682",
			text: "如皋市"
		}, {
			value: "320683",
			text: "通州市"
		}, {
			value: "320684",
			text: "海门市"
		}, {
			value: "320693",
			text: "开发区"
		}, {
			value: "320694",
			text: "其它区"
		}]
	}, {
		value: "320700",
		text: "连云港市",
		children: [{
			value: "320703",
			text: "连云区"
		}, {
			value: "320705",
			text: "新浦区"
		}, {
			value: "320706",
			text: "海州区"
		}, {
			value: "320721",
			text: "赣榆县"
		}, {
			value: "320722",
			text: "东海县"
		}, {
			value: "320723",
			text: "灌云县"
		}, {
			value: "320724",
			text: "灌南县"
		}, {
			value: "320725",
			text: "其它区"
		}]
	}, {
		value: "320800",
		text: "淮安市",
		children: [{
			value: "320802",
			text: "清河区"
		}, {
			value: "320803",
			text: "楚州区"
		}, {
			value: "320804",
			text: "淮阴区"
		}, {
			value: "320811",
			text: "清浦区"
		}, {
			value: "320826",
			text: "涟水县"
		}, {
			value: "320829",
			text: "洪泽县"
		}, {
			value: "320830",
			text: "盱眙县"
		}, {
			value: "320831",
			text: "金湖县"
		}, {
			value: "320832",
			text: "其它区"
		}]
	}, {
		value: "320900",
		text: "盐城市",
		children: [{
			value: "320902",
			text: "亭湖区"
		}, {
			value: "320903",
			text: "盐都区"
		}, {
			value: "320921",
			text: "响水县"
		}, {
			value: "320922",
			text: "滨海县"
		}, {
			value: "320923",
			text: "阜宁县"
		}, {
			value: "320924",
			text: "射阳县"
		}, {
			value: "320925",
			text: "建湖县"
		}, {
			value: "320981",
			text: "东台市"
		}, {
			value: "320982",
			text: "大丰市"
		}, {
			value: "320983",
			text: "其它区"
		}]
	}, {
		value: "321000",
		text: "扬州市",
		children: [{
			value: "321002",
			text: "广陵区"
		}, {
			value: "321003",
			text: "邗江区"
		}, {
			value: "321011",
			text: "维扬区"
		}, {
			value: "321023",
			text: "宝应县"
		}, {
			value: "321081",
			text: "仪征市"
		}, {
			value: "321084",
			text: "高邮市"
		}, {
			value: "321088",
			text: "江都市"
		}, {
			value: "321092",
			text: "经济开发区"
		}, {
			value: "321093",
			text: "其它区"
		}]
	}, {
		value: "321100",
		text: "镇江市",
		children: [{
			value: "321102",
			text: "京口区"
		}, {
			value: "321111",
			text: "润州区"
		}, {
			value: "321112",
			text: "丹徒区"
		}, {
			value: "321181",
			text: "丹阳市"
		}, {
			value: "321182",
			text: "扬中市"
		}, {
			value: "321183",
			text: "句容市"
		}, {
			value: "321184",
			text: "其它区"
		}]
	}, {
		value: "321200",
		text: "泰州市",
		children: [{
			value: "321202",
			text: "海陵区"
		}, {
			value: "321203",
			text: "高港区"
		}, {
			value: "321281",
			text: "兴化市"
		}, {
			value: "321282",
			text: "靖江市"
		}, {
			value: "321283",
			text: "泰兴市"
		}, {
			value: "321284",
			text: "姜堰市"
		}, {
			value: "321285",
			text: "其它区"
		}]
	}, {
		value: "321300",
		text: "宿迁市",
		children: [{
			value: "321302",
			text: "宿城区"
		}, {
			value: "321311",
			text: "宿豫区"
		}, {
			value: "321322",
			text: "沭阳县"
		}, {
			value: "321323",
			text: "泗阳县"
		}, {
			value: "321324",
			text: "泗洪县"
		}, {
			value: "321325",
			text: "其它区"
		}]
	}]
}, {
	value: '330000',
	text: '浙江省',
	children: [{
		value: "330100",
		text: "杭州市",
		children: [{
			value: "330102",
			text: "上城区"
		}, {
			value: "330103",
			text: "下城区"
		}, {
			value: "330104",
			text: "江干区"
		}, {
			value: "330105",
			text: "拱墅区"
		}, {
			value: "330106",
			text: "西湖区"
		}, {
			value: "330108",
			text: "滨江区"
		}, {
			value: "330109",
			text: "萧山区"
		}, {
			value: "330110",
			text: "余杭区"
		}, {
			value: "330122",
			text: "桐庐县"
		}, {
			value: "330127",
			text: "淳安县"
		}, {
			value: "330182",
			text: "建德市"
		}, {
			value: "330183",
			text: "富阳市"
		}, {
			value: "330185",
			text: "临安市"
		}, {
			value: "330186",
			text: "其它区"
		}]
	}, {
		value: "330200",
		text: "宁波市",
		children: [{
			value: "330203",
			text: "海曙区"
		}, {
			value: "330204",
			text: "江东区"
		}, {
			value: "330205",
			text: "江北区"
		}, {
			value: "330206",
			text: "北仑区"
		}, {
			value: "330211",
			text: "镇海区"
		}, {
			value: "330212",
			text: "鄞州区"
		}, {
			value: "330225",
			text: "象山县"
		}, {
			value: "330226",
			text: "宁海县"
		}, {
			value: "330281",
			text: "余姚市"
		}, {
			value: "330282",
			text: "慈溪市"
		}, {
			value: "330283",
			text: "奉化市"
		}, {
			value: "330284",
			text: "其它区"
		}]
	}, {
		value: "330300",
		text: "温州市",
		children: [{
			value: "330302",
			text: "鹿城区"
		}, {
			value: "330303",
			text: "龙湾区"
		}, {
			value: "330304",
			text: "瓯海区"
		}, {
			value: "330322",
			text: "洞头县"
		}, {
			value: "330324",
			text: "永嘉县"
		}, {
			value: "330326",
			text: "平阳县"
		}, {
			value: "330327",
			text: "苍南县"
		}, {
			value: "330328",
			text: "文成县"
		}, {
			value: "330329",
			text: "泰顺县"
		}, {
			value: "330381",
			text: "瑞安市"
		}, {
			value: "330382",
			text: "乐清市"
		}, {
			value: "330383",
			text: "其它区"
		}]
	}, {
		value: "330400",
		text: "嘉兴市",
		children: [{
			value: "330402",
			text: "南湖区"
		}, {
			value: "330411",
			text: "秀洲区"
		}, {
			value: "330421",
			text: "嘉善县"
		}, {
			value: "330424",
			text: "海盐县"
		}, {
			value: "330481",
			text: "海宁市"
		}, {
			value: "330482",
			text: "平湖市"
		}, {
			value: "330483",
			text: "桐乡市"
		}, {
			value: "330484",
			text: "其它区"
		}]
	}, {
		value: "330500",
		text: "湖州市",
		children: [{
			value: "330502",
			text: "吴兴区"
		}, {
			value: "330503",
			text: "南浔区"
		}, {
			value: "330521",
			text: "德清县"
		}, {
			value: "330522",
			text: "长兴县"
		}, {
			value: "330523",
			text: "安吉县"
		}, {
			value: "330524",
			text: "其它区"
		}]
	}, {
		value: "330600",
		text: "绍兴市",
		children: [{
			value: "330602",
			text: "越城区"
		}, {
			value: "330621",
			text: "柯桥区"
		}, {
			value: "330624",
			text: "新昌县"
		}, {
			value: "330681",
			text: "诸暨市"
		}, {
			value: "330682",
			text: "上虞区"
		}, {
			value: "330683",
			text: "嵊州市"
		}, {
			value: "330684",
			text: "其它区"
		}]
	}, {
		value: "330700",
		text: "金华市",
		children: [{
			value: "330702",
			text: "婺城区"
		}, {
			value: "330703",
			text: "金东区"
		}, {
			value: "330723",
			text: "武义县"
		}, {
			value: "330726",
			text: "浦江县"
		}, {
			value: "330727",
			text: "磐安县"
		}, {
			value: "330781",
			text: "兰溪市"
		}, {
			value: "330782",
			text: "义乌市"
		}, {
			value: "330783",
			text: "东阳市"
		}, {
			value: "330784",
			text: "永康市"
		}, {
			value: "330785",
			text: "其它区"
		}]
	}, {
		value: "330800",
		text: "衢州市",
		children: [{
			value: "330802",
			text: "柯城区"
		}, {
			value: "330803",
			text: "衢江区"
		}, {
			value: "330822",
			text: "常山县"
		}, {
			value: "330824",
			text: "开化县"
		}, {
			value: "330825",
			text: "龙游县"
		}, {
			value: "330881",
			text: "江山市"
		}, {
			value: "330882",
			text: "其它区"
		}]
	}, {
		value: "330900",
		text: "舟山市",
		children: [{
			value: "330902",
			text: "定海区"
		}, {
			value: "330903",
			text: "普陀区"
		}, {
			value: "330921",
			text: "岱山县"
		}, {
			value: "330922",
			text: "嵊泗县"
		}, {
			value: "330923",
			text: "其它区"
		}]
	}, {
		value: "331000",
		text: "台州市",
		children: [{
			value: "331002",
			text: "椒江区"
		}, {
			value: "331003",
			text: "黄岩区"
		}, {
			value: "331004",
			text: "路桥区"
		}, {
			value: "331021",
			text: "玉环县"
		}, {
			value: "331022",
			text: "三门县"
		}, {
			value: "331023",
			text: "天台县"
		}, {
			value: "331024",
			text: "仙居县"
		}, {
			value: "331081",
			text: "温岭市"
		}, {
			value: "331082",
			text: "临海市"
		}, {
			value: "331083",
			text: "其它区"
		}]
	}, {
		value: "331100",
		text: "丽水市",
		children: [{
			value: "331102",
			text: "莲都区"
		}, {
			value: "331121",
			text: "青田县"
		}, {
			value: "331122",
			text: "缙云县"
		}, {
			value: "331123",
			text: "遂昌县"
		}, {
			value: "331124",
			text: "松阳县"
		}, {
			value: "331125",
			text: "云和县"
		}, {
			value: "331126",
			text: "庆元县"
		}, {
			value: "331127",
			text: "景宁畲族自治县"
		}, {
			value: "331181",
			text: "龙泉市"
		}, {
			value: "331182",
			text: "其它区"
		}]
	}]
}, {
	value: '340000',
	text: '安徽省',
	children: [{
		value: "340100",
		text: "合肥市",
		children: [{
			value: "340102",
			text: "瑶海区"
		}, {
			value: "340103",
			text: "庐阳区"
		}, {
			value: "340104",
			text: "蜀山区"
		}, {
			value: "340111",
			text: "包河区"
		}, {
			value: "340121",
			text: "长丰县"
		}, {
			value: "340122",
			text: "肥东县"
		}, {
			value: "340123",
			text: "肥西县"
		}, {
			value: "340151",
			text: "高新区"
		}, {
			value: "340191",
			text: "中区"
		}, {
			value: "340192",
			text: "其它区"
		}, {
			value: "341400",
			text: "巢湖市"
		}, {
			value: "341402",
			text: "居巢区"
		}, {
			value: "341421",
			text: "庐江县"
		}]
	}, {
		value: "340200",
		text: "芜湖市",
		children: [{
			value: "340202",
			text: "镜湖区"
		}, {
			value: "340203",
			text: "弋江区"
		}, {
			value: "340207",
			text: "鸠江区"
		}, {
			value: "340208",
			text: "三山区"
		}, {
			value: "340221",
			text: "芜湖县"
		}, {
			value: "340222",
			text: "繁昌县"
		}, {
			value: "340223",
			text: "南陵县"
		}, {
			value: "340224",
			text: "其它区"
		}, {
			value: "341422",
			text: "无为县"
		}]
	}, {
		value: "340300",
		text: "蚌埠市",
		children: [{
			value: "340302",
			text: "龙子湖区"
		}, {
			value: "340303",
			text: "蚌山区"
		}, {
			value: "340304",
			text: "禹会区"
		}, {
			value: "340311",
			text: "淮上区"
		}, {
			value: "340321",
			text: "怀远县"
		}, {
			value: "340322",
			text: "五河县"
		}, {
			value: "340323",
			text: "固镇县"
		}, {
			value: "340324",
			text: "其它区"
		}]
	}, {
		value: "340400",
		text: "淮南市",
		children: [{
			value: "340402",
			text: "大通区"
		}, {
			value: "340403",
			text: "田家庵区"
		}, {
			value: "340404",
			text: "谢家集区"
		}, {
			value: "340405",
			text: "八公山区"
		}, {
			value: "340406",
			text: "潘集区"
		}, {
			value: "340421",
			text: "凤台县"
		}, {
			value: "340422",
			text: "其它区"
		}]
	}, {
		value: "340500",
		text: "马鞍山市",
		children: [{
			value: "340502",
			text: "金家庄区"
		}, {
			value: "340503",
			text: "花山区"
		}, {
			value: "340504",
			text: "雨山区"
		}, {
			value: "340521",
			text: "当涂县"
		}, {
			value: "340522",
			text: "其它区"
		}, {
			value: "341423",
			text: "含山县"
		}, {
			value: "341424",
			text: "和县"
		}]
	}, {
		value: "340600",
		text: "淮北市",
		children: [{
			value: "340602",
			text: "杜集区"
		}, {
			value: "340603",
			text: "相山区"
		}, {
			value: "340604",
			text: "烈山区"
		}, {
			value: "340621",
			text: "濉溪县"
		}, {
			value: "340622",
			text: "其它区"
		}]
	}, {
		value: "340700",
		text: "铜陵市",
		children: [{
			value: "340702",
			text: "铜官山区"
		}, {
			value: "340703",
			text: "狮子山区"
		}, {
			value: "340711",
			text: "郊区"
		}, {
			value: "340721",
			text: "铜陵县"
		}, {
			value: "340722",
			text: "其它区"
		}]
	}, {
		value: "340800",
		text: "安庆市",
		children: [{
			value: "340802",
			text: "迎江区"
		}, {
			value: "340803",
			text: "大观区"
		}, {
			value: "340811",
			text: "宜秀区"
		}, {
			value: "340822",
			text: "怀宁县"
		}, {
			value: "340823",
			text: "枞阳县"
		}, {
			value: "340824",
			text: "潜山县"
		}, {
			value: "340825",
			text: "太湖县"
		}, {
			value: "340826",
			text: "宿松县"
		}, {
			value: "340827",
			text: "望江县"
		}, {
			value: "340828",
			text: "岳西县"
		}, {
			value: "340881",
			text: "桐城市"
		}, {
			value: "340882",
			text: "其它区"
		}]
	}, {
		value: "341000",
		text: "黄山市",
		children: [{
			value: "341002",
			text: "屯溪区"
		}, {
			value: "341003",
			text: "黄山区"
		}, {
			value: "341004",
			text: "徽州区"
		}, {
			value: "341021",
			text: "歙县"
		}, {
			value: "341022",
			text: "休宁县"
		}, {
			value: "341023",
			text: "黟县"
		}, {
			value: "341024",
			text: "祁门县"
		}, {
			value: "341025",
			text: "其它区"
		}]
	}, {
		value: "341100",
		text: "滁州市",
		children: [{
			value: "341102",
			text: "琅琊区"
		}, {
			value: "341103",
			text: "南谯区"
		}, {
			value: "341122",
			text: "来安县"
		}, {
			value: "341124",
			text: "全椒县"
		}, {
			value: "341125",
			text: "定远县"
		}, {
			value: "341126",
			text: "凤阳县"
		}, {
			value: "341181",
			text: "天长市"
		}, {
			value: "341182",
			text: "明光市"
		}, {
			value: "341183",
			text: "其它区"
		}]
	}, {
		value: "341200",
		text: "阜阳市",
		children: [{
			value: "341202",
			text: "颍州区"
		}, {
			value: "341203",
			text: "颍东区"
		}, {
			value: "341204",
			text: "颍泉区"
		}, {
			value: "341221",
			text: "临泉县"
		}, {
			value: "341222",
			text: "太和县"
		}, {
			value: "341225",
			text: "阜南县"
		}, {
			value: "341226",
			text: "颍上县"
		}, {
			value: "341282",
			text: "界首市"
		}, {
			value: "341283",
			text: "其它区"
		}]
	}, {
		value: "341300",
		text: "宿州市",
		children: [{
			value: "341302",
			text: "埇桥区"
		}, {
			value: "341321",
			text: "砀山县"
		}, {
			value: "341322",
			text: "萧县"
		}, {
			value: "341323",
			text: "灵璧县"
		}, {
			value: "341324",
			text: "泗县"
		}, {
			value: "341325",
			text: "其它区"
		}]
	}, {
		value: "341500",
		text: "六安市",
		children: [{
			value: "341502",
			text: "金安区"
		}, {
			value: "341503",
			text: "裕安区"
		}, {
			value: "341521",
			text: "寿县"
		}, {
			value: "341522",
			text: "霍邱县"
		}, {
			value: "341523",
			text: "舒城县"
		}, {
			value: "341524",
			text: "金寨县"
		}, {
			value: "341525",
			text: "霍山县"
		}, {
			value: "341526",
			text: "其它区"
		}]
	}, {
		value: "341600",
		text: "亳州市",
		children: [{
			value: "341602",
			text: "谯城区"
		}, {
			value: "341621",
			text: "涡阳县"
		}, {
			value: "341622",
			text: "蒙城县"
		}, {
			value: "341623",
			text: "利辛县"
		}, {
			value: "341624",
			text: "其它区"
		}]
	}, {
		value: "341700",
		text: "池州市",
		children: [{
			value: "341702",
			text: "贵池区"
		}, {
			value: "341721",
			text: "东至县"
		}, {
			value: "341722",
			text: "石台县"
		}, {
			value: "341723",
			text: "青阳县"
		}, {
			value: "341724",
			text: "其它区"
		}]
	}, {
		value: "341800",
		text: "宣城市",
		children: [{
			value: "341802",
			text: "宣州区"
		}, {
			value: "341821",
			text: "郎溪县"
		}, {
			value: "341822",
			text: "广德县"
		}, {
			value: "341823",
			text: "泾县"
		}, {
			value: "341824",
			text: "绩溪县"
		}, {
			value: "341825",
			text: "旌德县"
		}, {
			value: "341881",
			text: "宁国市"
		}, {
			value: "341882",
			text: "其它区"
		}]
	}]
}, {
	value: '350000',
	text: '福建省',
	children: [{
		value: "350100",
		text: "福州市",
		children: [{
			value: "350102",
			text: "鼓楼区"
		}, {
			value: "350103",
			text: "台江区"
		}, {
			value: "350104",
			text: "仓山区"
		}, {
			value: "350105",
			text: "马尾区"
		}, {
			value: "350111",
			text: "晋安区"
		}, {
			value: "350121",
			text: "闽侯县"
		}, {
			value: "350122",
			text: "连江县"
		}, {
			value: "350123",
			text: "罗源县"
		}, {
			value: "350124",
			text: "闽清县"
		}, {
			value: "350125",
			text: "永泰县"
		}, {
			value: "350128",
			text: "平潭县"
		}, {
			value: "350181",
			text: "福清市"
		}, {
			value: "350182",
			text: "长乐市"
		}, {
			value: "350183",
			text: "其它区"
		}]
	}, {
		value: "350200",
		text: "厦门市",
		children: [{
			value: "350203",
			text: "思明区"
		}, {
			value: "350205",
			text: "海沧区"
		}, {
			value: "350206",
			text: "湖里区"
		}, {
			value: "350211",
			text: "集美区"
		}, {
			value: "350212",
			text: "同安区"
		}, {
			value: "350213",
			text: "翔安区"
		}, {
			value: "350214",
			text: "其它区"
		}]
	}, {
		value: "350300",
		text: "莆田市",
		children: [{
			value: "350302",
			text: "城厢区"
		}, {
			value: "350303",
			text: "涵江区"
		}, {
			value: "350304",
			text: "荔城区"
		}, {
			value: "350305",
			text: "秀屿区"
		}, {
			value: "350322",
			text: "仙游县"
		}, {
			value: "350323",
			text: "其它区"
		}]
	}, {
		value: "350400",
		text: "三明市",
		children: [{
			value: "350402",
			text: "梅列区"
		}, {
			value: "350403",
			text: "三元区"
		}, {
			value: "350421",
			text: "明溪县"
		}, {
			value: "350423",
			text: "清流县"
		}, {
			value: "350424",
			text: "宁化县"
		}, {
			value: "350425",
			text: "大田县"
		}, {
			value: "350426",
			text: "尤溪县"
		}, {
			value: "350427",
			text: "沙县"
		}, {
			value: "350428",
			text: "将乐县"
		}, {
			value: "350429",
			text: "泰宁县"
		}, {
			value: "350430",
			text: "建宁县"
		}, {
			value: "350481",
			text: "永安市"
		}, {
			value: "350482",
			text: "其它区"
		}]
	}, {
		value: "350500",
		text: "泉州市",
		children: [{
			value: "350502",
			text: "鲤城区"
		}, {
			value: "350503",
			text: "丰泽区"
		}, {
			value: "350504",
			text: "洛江区"
		}, {
			value: "350505",
			text: "泉港区"
		}, {
			value: "350521",
			text: "惠安县"
		}, {
			value: "350524",
			text: "安溪县"
		}, {
			value: "350525",
			text: "永春县"
		}, {
			value: "350526",
			text: "德化县"
		}, {
			value: "350527",
			text: "金门县"
		}, {
			value: "350581",
			text: "石狮市"
		}, {
			value: "350582",
			text: "晋江市"
		}, {
			value: "350583",
			text: "南安市"
		}, {
			value: "350584",
			text: "其它区"
		}]
	}, {
		value: "350600",
		text: "漳州市",
		children: [{
			value: "350602",
			text: "芗城区"
		}, {
			value: "350603",
			text: "龙文区"
		}, {
			value: "350622",
			text: "云霄县"
		}, {
			value: "350623",
			text: "漳浦县"
		}, {
			value: "350624",
			text: "诏安县"
		}, {
			value: "350625",
			text: "长泰县"
		}, {
			value: "350626",
			text: "东山县"
		}, {
			value: "350627",
			text: "南靖县"
		}, {
			value: "350628",
			text: "平和县"
		}, {
			value: "350629",
			text: "华安县"
		}, {
			value: "350681",
			text: "龙海市"
		}, {
			value: "350682",
			text: "其它区"
		}]
	}, {
		value: "350700",
		text: "南平市",
		children: [{
			value: "350702",
			text: "延平区"
		}, {
			value: "350721",
			text: "顺昌县"
		}, {
			value: "350722",
			text: "浦城县"
		}, {
			value: "350723",
			text: "光泽县"
		}, {
			value: "350724",
			text: "松溪县"
		}, {
			value: "350725",
			text: "政和县"
		}, {
			value: "350781",
			text: "邵武市"
		}, {
			value: "350782",
			text: "武夷山市"
		}, {
			value: "350783",
			text: "建瓯市"
		}, {
			value: "350784",
			text: "建阳市"
		}, {
			value: "350785",
			text: "其它区"
		}]
	}, {
		value: "350800",
		text: "龙岩市",
		children: [{
			value: "350802",
			text: "新罗区"
		}, {
			value: "350821",
			text: "长汀县"
		}, {
			value: "350822",
			text: "永定县"
		}, {
			value: "350823",
			text: "上杭县"
		}, {
			value: "350824",
			text: "武平县"
		}, {
			value: "350825",
			text: "连城县"
		}, {
			value: "350881",
			text: "漳平市"
		}, {
			value: "350882",
			text: "其它区"
		}]
	}, {
		value: "350900",
		text: "宁德市",
		children: [{
			value: "350902",
			text: "蕉城区"
		}, {
			value: "350921",
			text: "霞浦县"
		}, {
			value: "350922",
			text: "古田县"
		}, {
			value: "350923",
			text: "屏南县"
		}, {
			value: "350924",
			text: "寿宁县"
		}, {
			value: "350925",
			text: "周宁县"
		}, {
			value: "350926",
			text: "柘荣县"
		}, {
			value: "350981",
			text: "福安市"
		}, {
			value: "350982",
			text: "福鼎市"
		}, {
			value: "350983",
			text: "其它区"
		}]
	}]
}, {
	value: '360000',
	text: '江西省',
	children: [{
		value: "360100",
		text: "南昌市",
		children: [{
			value: "360102",
			text: "东湖区"
		}, {
			value: "360103",
			text: "西湖区"
		}, {
			value: "360104",
			text: "青云谱区"
		}, {
			value: "360105",
			text: "湾里区"
		}, {
			value: "360111",
			text: "青山湖区"
		}, {
			value: "360121",
			text: "南昌县"
		}, {
			value: "360122",
			text: "新建县"
		}, {
			value: "360123",
			text: "安义县"
		}, {
			value: "360124",
			text: "进贤县"
		}, {
			value: "360125",
			text: "红谷滩新区"
		}, {
			value: "360126",
			text: "经济技术开发区"
		}, {
			value: "360127",
			text: "昌北区"
		}, {
			value: "360128",
			text: "其它区"
		}]
	}, {
		value: "360200",
		text: "景德镇市",
		children: [{
			value: "360202",
			text: "昌江区"
		}, {
			value: "360203",
			text: "珠山区"
		}, {
			value: "360222",
			text: "浮梁县"
		}, {
			value: "360281",
			text: "乐平市"
		}, {
			value: "360282",
			text: "其它区"
		}]
	}, {
		value: "360300",
		text: "萍乡市",
		children: [{
			value: "360302",
			text: "安源区"
		}, {
			value: "360313",
			text: "湘东区"
		}, {
			value: "360321",
			text: "莲花县"
		}, {
			value: "360322",
			text: "上栗县"
		}, {
			value: "360323",
			text: "芦溪县"
		}, {
			value: "360324",
			text: "其它区"
		}]
	}, {
		value: "360400",
		text: "九江市",
		children: [{
			value: "360402",
			text: "庐山区"
		}, {
			value: "360403",
			text: "浔阳区"
		}, {
			value: "360421",
			text: "九江县"
		}, {
			value: "360423",
			text: "武宁县"
		}, {
			value: "360424",
			text: "修水县"
		}, {
			value: "360425",
			text: "永修县"
		}, {
			value: "360426",
			text: "德安县"
		}, {
			value: "360427",
			text: "星子县"
		}, {
			value: "360428",
			text: "都昌县"
		}, {
			value: "360429",
			text: "湖口县"
		}, {
			value: "360430",
			text: "彭泽县"
		}, {
			value: "360481",
			text: "瑞昌市"
		}, {
			value: "360482",
			text: "其它区"
		}]
	}, {
		value: "360500",
		text: "新余市",
		children: [{
			value: "360502",
			text: "渝水区"
		}, {
			value: "360521",
			text: "分宜县"
		}, {
			value: "360522",
			text: "其它区"
		}]
	}, {
		value: "360600",
		text: "鹰潭市",
		children: [{
			value: "360602",
			text: "月湖区"
		}, {
			value: "360622",
			text: "余江县"
		}, {
			value: "360681",
			text: "贵溪市"
		}, {
			value: "360682",
			text: "其它区"
		}]
	}, {
		value: "360700",
		text: "赣州市",
		children: [{
			value: "360702",
			text: "章贡区"
		}, {
			value: "360721",
			text: "赣县"
		}, {
			value: "360722",
			text: "信丰县"
		}, {
			value: "360723",
			text: "大余县"
		}, {
			value: "360724",
			text: "上犹县"
		}, {
			value: "360725",
			text: "崇义县"
		}, {
			value: "360726",
			text: "安远县"
		}, {
			value: "360727",
			text: "龙南县"
		}, {
			value: "360728",
			text: "定南县"
		}, {
			value: "360729",
			text: "全南县"
		}, {
			value: "360730",
			text: "宁都县"
		}, {
			value: "360731",
			text: "于都县"
		}, {
			value: "360732",
			text: "兴国县"
		}, {
			value: "360733",
			text: "会昌县"
		}, {
			value: "360734",
			text: "寻乌县"
		}, {
			value: "360735",
			text: "石城县"
		}, {
			value: "360751",
			text: "黄金区"
		}, {
			value: "360781",
			text: "瑞金市"
		}, {
			value: "360782",
			text: "南康市"
		}, {
			value: "360783",
			text: "其它区"
		}]
	}, {
		value: "360800",
		text: "吉安市",
		children: [{
			value: "360802",
			text: "吉州区"
		}, {
			value: "360803",
			text: "青原区"
		}, {
			value: "360821",
			text: "吉安县"
		}, {
			value: "360822",
			text: "吉水县"
		}, {
			value: "360823",
			text: "峡江县"
		}, {
			value: "360824",
			text: "新干县"
		}, {
			value: "360825",
			text: "永丰县"
		}, {
			value: "360826",
			text: "泰和县"
		}, {
			value: "360827",
			text: "遂川县"
		}, {
			value: "360828",
			text: "万安县"
		}, {
			value: "360829",
			text: "安福县"
		}, {
			value: "360830",
			text: "永新县"
		}, {
			value: "360881",
			text: "井冈山市"
		}, {
			value: "360882",
			text: "其它区"
		}]
	}, {
		value: "360900",
		text: "宜春市",
		children: [{
			value: "360902",
			text: "袁州区"
		}, {
			value: "360921",
			text: "奉新县"
		}, {
			value: "360922",
			text: "万载县"
		}, {
			value: "360923",
			text: "上高县"
		}, {
			value: "360924",
			text: "宜丰县"
		}, {
			value: "360925",
			text: "靖安县"
		}, {
			value: "360926",
			text: "铜鼓县"
		}, {
			value: "360981",
			text: "丰城市"
		}, {
			value: "360982",
			text: "樟树市"
		}, {
			value: "360983",
			text: "高安市"
		}, {
			value: "360984",
			text: "其它区"
		}]
	}, {
		value: "361000",
		text: "抚州市",
		children: [{
			value: "361002",
			text: "临川区"
		}, {
			value: "361021",
			text: "南城县"
		}, {
			value: "361022",
			text: "黎川县"
		}, {
			value: "361023",
			text: "南丰县"
		}, {
			value: "361024",
			text: "崇仁县"
		}, {
			value: "361025",
			text: "乐安县"
		}, {
			value: "361026",
			text: "宜黄县"
		}, {
			value: "361027",
			text: "金溪县"
		}, {
			value: "361028",
			text: "资溪县"
		}, {
			value: "361029",
			text: "东乡县"
		}, {
			value: "361030",
			text: "广昌县"
		}, {
			value: "361031",
			text: "其它区"
		}]
	}, {
		value: "361100",
		text: "上饶市",
		children: [{
			value: "361102",
			text: "信州区"
		}, {
			value: "361121",
			text: "上饶县"
		}, {
			value: "361122",
			text: "广丰县"
		}, {
			value: "361123",
			text: "玉山县"
		}, {
			value: "361124",
			text: "铅山县"
		}, {
			value: "361125",
			text: "横峰县"
		}, {
			value: "361126",
			text: "弋阳县"
		}, {
			value: "361127",
			text: "余干县"
		}, {
			value: "361128",
			text: "鄱阳县"
		}, {
			value: "361129",
			text: "万年县"
		}, {
			value: "361130",
			text: "婺源县"
		}, {
			value: "361181",
			text: "德兴市"
		}, {
			value: "361182",
			text: "其它区"
		}]
	}]
}, {
	value: '370000',
	text: '山东省',
	children: [{
		value: "370100",
		text: "济南市",
		children: [{
			value: "370102",
			text: "历下区"
		}, {
			value: "370103",
			text: "市中区"
		}, {
			value: "370104",
			text: "槐荫区"
		}, {
			value: "370105",
			text: "天桥区"
		}, {
			value: "370112",
			text: "历城区"
		}, {
			value: "370113",
			text: "长清区"
		}, {
			value: "370124",
			text: "平阴县"
		}, {
			value: "370125",
			text: "济阳县"
		}, {
			value: "370126",
			text: "商河县"
		}, {
			value: "370181",
			text: "章丘市"
		}, {
			value: "370182",
			text: "其它区"
		}]
	}, {
		value: "370200",
		text: "青岛市",
		children: [{
			value: "370202",
			text: "市南区"
		}, {
			value: "370203",
			text: "市北区"
		}, {
			value: "370205",
			text: "四方区"
		}, {
			value: "370211",
			text: "黄岛区"
		}, {
			value: "370212",
			text: "崂山区"
		}, {
			value: "370213",
			text: "李沧区"
		}, {
			value: "370214",
			text: "城阳区"
		}, {
			value: "370251",
			text: "开发区"
		}, {
			value: "370281",
			text: "胶州市"
		}, {
			value: "370282",
			text: "即墨市"
		}, {
			value: "370283",
			text: "平度市"
		}, {
			value: "370284",
			text: "胶南市"
		}, {
			value: "370285",
			text: "莱西市"
		}, {
			value: "370286",
			text: "其它区"
		}]
	}, {
		value: "370300",
		text: "淄博市",
		children: [{
			value: "370302",
			text: "淄川区"
		}, {
			value: "370303",
			text: "张店区"
		}, {
			value: "370304",
			text: "博山区"
		}, {
			value: "370305",
			text: "临淄区"
		}, {
			value: "370306",
			text: "周村区"
		}, {
			value: "370321",
			text: "桓台县"
		}, {
			value: "370322",
			text: "高青县"
		}, {
			value: "370323",
			text: "沂源县"
		}, {
			value: "370324",
			text: "其它区"
		}]
	}, {
		value: "370400",
		text: "枣庄市",
		children: [{
			value: "370402",
			text: "市中区"
		}, {
			value: "370403",
			text: "薛城区"
		}, {
			value: "370404",
			text: "峄城区"
		}, {
			value: "370405",
			text: "台儿庄区"
		}, {
			value: "370406",
			text: "山亭区"
		}, {
			value: "370481",
			text: "滕州市"
		}, {
			value: "370482",
			text: "其它区"
		}]
	}, {
		value: "370500",
		text: "东营市",
		children: [{
			value: "370502",
			text: "东营区"
		}, {
			value: "370503",
			text: "河口区"
		}, {
			value: "370521",
			text: "垦利县"
		}, {
			value: "370522",
			text: "利津县"
		}, {
			value: "370523",
			text: "广饶县"
		}, {
			value: "370589",
			text: "西城区"
		}, {
			value: "370590",
			text: "东城区"
		}, {
			value: "370591",
			text: "其它区"
		}]
	}, {
		value: "370600",
		text: "烟台市",
		children: [{
			value: "370602",
			text: "芝罘区"
		}, {
			value: "370611",
			text: "福山区"
		}, {
			value: "370612",
			text: "牟平区"
		}, {
			value: "370613",
			text: "莱山区"
		}, {
			value: "370634",
			text: "长岛县"
		}, {
			value: "370681",
			text: "龙口市"
		}, {
			value: "370682",
			text: "莱阳市"
		}, {
			value: "370683",
			text: "莱州市"
		}, {
			value: "370684",
			text: "蓬莱市"
		}, {
			value: "370685",
			text: "招远市"
		}, {
			value: "370686",
			text: "栖霞市"
		}, {
			value: "370687",
			text: "海阳市"
		}, {
			value: "370688",
			text: "其它区"
		}]
	}, {
		value: "370700",
		text: "潍坊市",
		children: [{
			value: "370702",
			text: "潍城区"
		}, {
			value: "370703",
			text: "寒亭区"
		}, {
			value: "370704",
			text: "坊子区"
		}, {
			value: "370705",
			text: "奎文区"
		}, {
			value: "370724",
			text: "临朐县"
		}, {
			value: "370725",
			text: "昌乐县"
		}, {
			value: "370751",
			text: "开发区"
		}, {
			value: "370781",
			text: "青州市"
		}, {
			value: "370782",
			text: "诸城市"
		}, {
			value: "370783",
			text: "寿光市"
		}, {
			value: "370784",
			text: "安丘市"
		}, {
			value: "370785",
			text: "高密市"
		}, {
			value: "370786",
			text: "昌邑市"
		}, {
			value: "370787",
			text: "其它区"
		}]
	}, {
		value: "370800",
		text: "济宁市",
		children: [{
			value: "370802",
			text: "市中区"
		}, {
			value: "370811",
			text: "任城区"
		}, {
			value: "370826",
			text: "微山县"
		}, {
			value: "370827",
			text: "鱼台县"
		}, {
			value: "370828",
			text: "金乡县"
		}, {
			value: "370829",
			text: "嘉祥县"
		}, {
			value: "370830",
			text: "汶上县"
		}, {
			value: "370831",
			text: "泗水县"
		}, {
			value: "370832",
			text: "梁山县"
		}, {
			value: "370881",
			text: "曲阜市"
		}, {
			value: "370882",
			text: "兖州市"
		}, {
			value: "370883",
			text: "邹城市"
		}, {
			value: "370884",
			text: "其它区"
		}]
	}, {
		value: "370900",
		text: "泰安市",
		children: [{
			value: "370902",
			text: "泰山区"
		}, {
			value: "370903",
			text: "岱岳区"
		}, {
			value: "370921",
			text: "宁阳县"
		}, {
			value: "370923",
			text: "东平县"
		}, {
			value: "370982",
			text: "新泰市"
		}, {
			value: "370983",
			text: "肥城市"
		}, {
			value: "370984",
			text: "其它区"
		}]
	}, {
		value: "371000",
		text: "威海市",
		children: [{
			value: "371002",
			text: "环翠区"
		}, {
			value: "371081",
			text: "文登市"
		}, {
			value: "371082",
			text: "荣成市"
		}, {
			value: "371083",
			text: "乳山市"
		}, {
			value: "371084",
			text: "其它区"
		}]
	}, {
		value: "371100",
		text: "日照市",
		children: [{
			value: "371102",
			text: "东港区"
		}, {
			value: "371103",
			text: "岚山区"
		}, {
			value: "371121",
			text: "五莲县"
		}, {
			value: "371122",
			text: "莒县"
		}, {
			value: "371123",
			text: "其它区"
		}]
	}, {
		value: "371200",
		text: "莱芜市",
		children: [{
			value: "371202",
			text: "莱城区"
		}, {
			value: "371203",
			text: "钢城区"
		}, {
			value: "371204",
			text: "其它区"
		}]
	}, {
		value: "371300",
		text: "临沂市",
		children: [{
			value: "371302",
			text: "兰山区"
		}, {
			value: "371311",
			text: "罗庄区"
		}, {
			value: "371312",
			text: "河东区"
		}, {
			value: "371321",
			text: "沂南县"
		}, {
			value: "371322",
			text: "郯城县"
		}, {
			value: "371323",
			text: "沂水县"
		}, {
			value: "371324",
			text: "苍山县"
		}, {
			value: "371325",
			text: "费县"
		}, {
			value: "371326",
			text: "平邑县"
		}, {
			value: "371327",
			text: "莒南县"
		}, {
			value: "371328",
			text: "蒙阴县"
		}, {
			value: "371329",
			text: "临沭县"
		}, {
			value: "371330",
			text: "其它区"
		}]
	}, {
		value: "371400",
		text: "德州市",
		children: [{
			value: "371402",
			text: "德城区"
		}, {
			value: "371421",
			text: "陵县"
		}, {
			value: "371422",
			text: "宁津县"
		}, {
			value: "371423",
			text: "庆云县"
		}, {
			value: "371424",
			text: "临邑县"
		}, {
			value: "371425",
			text: "齐河县"
		}, {
			value: "371426",
			text: "平原县"
		}, {
			value: "371427",
			text: "夏津县"
		}, {
			value: "371428",
			text: "武城县"
		}, {
			value: "371451",
			text: "开发区"
		}, {
			value: "371481",
			text: "乐陵市"
		}, {
			value: "371482",
			text: "禹城市"
		}, {
			value: "371483",
			text: "其它区"
		}]
	}, {
		value: "371500",
		text: "聊城市",
		children: [{
			value: "371502",
			text: "东昌府区"
		}, {
			value: "371521",
			text: "阳谷县"
		}, {
			value: "371522",
			text: "莘县"
		}, {
			value: "371523",
			text: "茌平县"
		}, {
			value: "371524",
			text: "东阿县"
		}, {
			value: "371525",
			text: "冠县"
		}, {
			value: "371526",
			text: "高唐县"
		}, {
			value: "371581",
			text: "临清市"
		}, {
			value: "371582",
			text: "其它区"
		}]
	}, {
		value: "371600",
		text: "滨州市",
		children: [{
			value: "371602",
			text: "滨城区"
		}, {
			value: "371621",
			text: "惠民县"
		}, {
			value: "371622",
			text: "阳信县"
		}, {
			value: "371623",
			text: "无棣县"
		}, {
			value: "371624",
			text: "沾化县"
		}, {
			value: "371625",
			text: "博兴县"
		}, {
			value: "371626",
			text: "邹平县"
		}, {
			value: "371627",
			text: "其它区"
		}]
	}, {
		value: "371700",
		text: "菏泽市",
		children: [{
			value: "371702",
			text: "牡丹区"
		}, {
			value: "371721",
			text: "曹县"
		}, {
			value: "371722",
			text: "单县"
		}, {
			value: "371723",
			text: "成武县"
		}, {
			value: "371724",
			text: "巨野县"
		}, {
			value: "371725",
			text: "郓城县"
		}, {
			value: "371726",
			text: "鄄城县"
		}, {
			value: "371727",
			text: "定陶县"
		}, {
			value: "371728",
			text: "东明县"
		}, {
			value: "371729",
			text: "其它区"
		}]
	}]
}, {
	value: '410000',
	text: '河南省',
	children: [{
		value: "410100",
		text: "郑州市",
		children: [{
			value: "410102",
			text: "中原区"
		}, {
			value: "410103",
			text: "二七区"
		}, {
			value: "410104",
			text: "管城回族区"
		}, {
			value: "410105",
			text: "金水区"
		}, {
			value: "410106",
			text: "上街区"
		}, {
			value: "410108",
			text: "惠济区"
		}, {
			value: "410122",
			text: "中牟县"
		}, {
			value: "410181",
			text: "巩义市"
		}, {
			value: "410182",
			text: "荥阳市"
		}, {
			value: "410183",
			text: "新密市"
		}, {
			value: "410184",
			text: "新郑市"
		}, {
			value: "410185",
			text: "登封市"
		}, {
			value: "410186",
			text: "郑东新区"
		}, {
			value: "410187",
			text: "高新区"
		}, {
			value: "410188",
			text: "其它区"
		}]
	}, {
		value: "410200",
		text: "开封市",
		children: [{
			value: "410202",
			text: "龙亭区"
		}, {
			value: "410203",
			text: "顺河回族区"
		}, {
			value: "410204",
			text: "鼓楼区"
		}, {
			value: "410205",
			text: "禹王台区"
		}, {
			value: "410211",
			text: "金明区"
		}, {
			value: "410221",
			text: "杞县"
		}, {
			value: "410222",
			text: "通许县"
		}, {
			value: "410223",
			text: "尉氏县"
		}, {
			value: "410224",
			text: "开封县"
		}, {
			value: "410225",
			text: "兰考县"
		}, {
			value: "410226",
			text: "其它区"
		}]
	}, {
		value: "410300",
		text: "洛阳市",
		children: [{
			value: "410302",
			text: "老城区"
		}, {
			value: "410303",
			text: "西工区"
		}, {
			value: "410304",
			text: "廛河回族区"
		}, {
			value: "410305",
			text: "涧西区"
		}, {
			value: "410306",
			text: "吉利区"
		}, {
			value: "410307",
			text: "洛龙区"
		}, {
			value: "410322",
			text: "孟津县"
		}, {
			value: "410323",
			text: "新安县"
		}, {
			value: "410324",
			text: "栾川县"
		}, {
			value: "410325",
			text: "嵩县"
		}, {
			value: "410326",
			text: "汝阳县"
		}, {
			value: "410327",
			text: "宜阳县"
		}, {
			value: "410328",
			text: "洛宁县"
		}, {
			value: "410329",
			text: "伊川县"
		}, {
			value: "410381",
			text: "偃师市"
		}, {
			value: "471004",
			text: "高新区"
		}, {
			value: "471005",
			text: "其它区"
		}]
	}, {
		value: "410400",
		text: "平顶山市",
		children: [{
			value: "410402",
			text: "新华区"
		}, {
			value: "410403",
			text: "卫东区"
		}, {
			value: "410404",
			text: "石龙区"
		}, {
			value: "410411",
			text: "湛河区"
		}, {
			value: "410421",
			text: "宝丰县"
		}, {
			value: "410422",
			text: "叶县"
		}, {
			value: "410423",
			text: "鲁山县"
		}, {
			value: "410425",
			text: "郏县"
		}, {
			value: "410481",
			text: "舞钢市"
		}, {
			value: "410482",
			text: "汝州市"
		}, {
			value: "410483",
			text: "其它区"
		}]
	}, {
		value: "410500",
		text: "安阳市",
		children: [{
			value: "410502",
			text: "文峰区"
		}, {
			value: "410503",
			text: "北关区"
		}, {
			value: "410505",
			text: "殷都区"
		}, {
			value: "410506",
			text: "龙安区"
		}, {
			value: "410522",
			text: "安阳县"
		}, {
			value: "410523",
			text: "汤阴县"
		}, {
			value: "410526",
			text: "滑县"
		}, {
			value: "410527",
			text: "内黄县"
		}, {
			value: "410581",
			text: "林州市"
		}, {
			value: "410582",
			text: "其它区"
		}]
	}, {
		value: "410600",
		text: "鹤壁市",
		children: [{
			value: "410602",
			text: "鹤山区"
		}, {
			value: "410603",
			text: "山城区"
		}, {
			value: "410611",
			text: "淇滨区"
		}, {
			value: "410621",
			text: "浚县"
		}, {
			value: "410622",
			text: "淇县"
		}, {
			value: "410623",
			text: "其它区"
		}]
	}, {
		value: "410700",
		text: "新乡市",
		children: [{
			value: "410702",
			text: "红旗区"
		}, {
			value: "410703",
			text: "卫滨区"
		}, {
			value: "410704",
			text: "凤泉区"
		}, {
			value: "410711",
			text: "牧野区"
		}, {
			value: "410721",
			text: "新乡县"
		}, {
			value: "410724",
			text: "获嘉县"
		}, {
			value: "410725",
			text: "原阳县"
		}, {
			value: "410726",
			text: "延津县"
		}, {
			value: "410727",
			text: "封丘县"
		}, {
			value: "410728",
			text: "长垣县"
		}, {
			value: "410781",
			text: "卫辉市"
		}, {
			value: "410782",
			text: "辉县市"
		}, {
			value: "410783",
			text: "其它区"
		}]
	}, {
		value: "410800",
		text: "焦作市",
		children: [{
			value: "410802",
			text: "解放区"
		}, {
			value: "410803",
			text: "中站区"
		}, {
			value: "410804",
			text: "马村区"
		}, {
			value: "410811",
			text: "山阳区"
		}, {
			value: "410821",
			text: "修武县"
		}, {
			value: "410822",
			text: "博爱县"
		}, {
			value: "410823",
			text: "武陟县"
		}, {
			value: "410825",
			text: "温县"
		}, {
			value: "410882",
			text: "沁阳市"
		}, {
			value: "410883",
			text: "孟州市"
		}, {
			value: "410884",
			text: "其它区"
		}]
	}, {
		value: "410900",
		text: "濮阳市",
		children: [{
			value: "410902",
			text: "华龙区"
		}, {
			value: "410922",
			text: "清丰县"
		}, {
			value: "410923",
			text: "南乐县"
		}, {
			value: "410926",
			text: "范县"
		}, {
			value: "410927",
			text: "台前县"
		}, {
			value: "410928",
			text: "濮阳县"
		}, {
			value: "410929",
			text: "其它区"
		}]
	}, {
		value: "411000",
		text: "许昌市",
		children: [{
			value: "411002",
			text: "魏都区"
		}, {
			value: "411023",
			text: "许昌县"
		}, {
			value: "411024",
			text: "鄢陵县"
		}, {
			value: "411025",
			text: "襄城县"
		}, {
			value: "411081",
			text: "禹州市"
		}, {
			value: "411082",
			text: "长葛市"
		}, {
			value: "411083",
			text: "其它区"
		}]
	}, {
		value: "411100",
		text: "漯河市",
		children: [{
			value: "411102",
			text: "源汇区"
		}, {
			value: "411103",
			text: "郾城区"
		}, {
			value: "411104",
			text: "召陵区"
		}, {
			value: "411121",
			text: "舞阳县"
		}, {
			value: "411122",
			text: "临颍县"
		}, {
			value: "411123",
			text: "其它区"
		}]
	}, {
		value: "411200",
		text: "三门峡市",
		children: [{
			value: "411202",
			text: "湖滨区"
		}, {
			value: "411221",
			text: "渑池县"
		}, {
			value: "411222",
			text: "陕县"
		}, {
			value: "411224",
			text: "卢氏县"
		}, {
			value: "411281",
			text: "义马市"
		}, {
			value: "411282",
			text: "灵宝市"
		}, {
			value: "411283",
			text: "其它区"
		}]
	}, {
		value: "411300",
		text: "南阳市",
		children: [{
			value: "411302",
			text: "宛城区"
		}, {
			value: "411303",
			text: "卧龙区"
		}, {
			value: "411321",
			text: "南召县"
		}, {
			value: "411322",
			text: "方城县"
		}, {
			value: "411323",
			text: "西峡县"
		}, {
			value: "411324",
			text: "镇平县"
		}, {
			value: "411325",
			text: "内乡县"
		}, {
			value: "411326",
			text: "淅川县"
		}, {
			value: "411327",
			text: "社旗县"
		}, {
			value: "411328",
			text: "唐河县"
		}, {
			value: "411329",
			text: "新野县"
		}, {
			value: "411330",
			text: "桐柏县"
		}, {
			value: "411381",
			text: "邓州市"
		}, {
			value: "411382",
			text: "其它区"
		}]
	}, {
		value: "411400",
		text: "商丘市",
		children: [{
			value: "411402",
			text: "梁园区"
		}, {
			value: "411403",
			text: "睢阳区"
		}, {
			value: "411421",
			text: "民权县"
		}, {
			value: "411422",
			text: "睢县"
		}, {
			value: "411423",
			text: "宁陵县"
		}, {
			value: "411424",
			text: "柘城县"
		}, {
			value: "411425",
			text: "虞城县"
		}, {
			value: "411426",
			text: "夏邑县"
		}, {
			value: "411481",
			text: "永城市"
		}, {
			value: "411482",
			text: "其它区"
		}]
	}, {
		value: "411500",
		text: "信阳市",
		children: [{
			value: "411502",
			text: "浉河区"
		}, {
			value: "411503",
			text: "平桥区"
		}, {
			value: "411521",
			text: "罗山县"
		}, {
			value: "411522",
			text: "光山县"
		}, {
			value: "411523",
			text: "新县"
		}, {
			value: "411524",
			text: "商城县"
		}, {
			value: "411525",
			text: "固始县"
		}, {
			value: "411526",
			text: "潢川县"
		}, {
			value: "411527",
			text: "淮滨县"
		}, {
			value: "411528",
			text: "息县"
		}, {
			value: "411529",
			text: "其它区"
		}]
	}, {
		value: "411600",
		text: "周口市",
		children: [{
			value: "411602",
			text: "川汇区"
		}, {
			value: "411621",
			text: "扶沟县"
		}, {
			value: "411622",
			text: "西华县"
		}, {
			value: "411623",
			text: "商水县"
		}, {
			value: "411624",
			text: "沈丘县"
		}, {
			value: "411625",
			text: "郸城县"
		}, {
			value: "411626",
			text: "淮阳县"
		}, {
			value: "411627",
			text: "太康县"
		}, {
			value: "411628",
			text: "鹿邑县"
		}, {
			value: "411681",
			text: "项城市"
		}, {
			value: "411682",
			text: "其它区"
		}]
	}, {
		value: "411700",
		text: "驻马店市",
		children: [{
			value: "411702",
			text: "驿城区"
		}, {
			value: "411721",
			text: "西平县"
		}, {
			value: "411722",
			text: "上蔡县"
		}, {
			value: "411723",
			text: "平舆县"
		}, {
			value: "411724",
			text: "正阳县"
		}, {
			value: "411725",
			text: "确山县"
		}, {
			value: "411726",
			text: "泌阳县"
		}, {
			value: "411727",
			text: "汝南县"
		}, {
			value: "411628",
			text: "遂平县"
		}, {
			value: "411729",
			text: "新蔡县"
		}]
	}]
}, {
	value: '420000',
	text: '湖北省',
	children: [{
		value: "420100",
		text: "武汉市",
		children: [{
			value: "420102",
			text: "江岸区"
		}, {
			value: "420103",
			text: "江汉区"
		}, {
			value: "420104",
			text: "硚口区"
		}, {
			value: "420105",
			text: "汉阳区"
		}, {
			value: "420106",
			text: "武昌区"
		}, {
			value: "420107",
			text: "青山区"
		}, {
			value: "420111",
			text: "洪山区"
		}, {
			value: "420112",
			text: "东西湖区"
		}, {
			value: "420113",
			text: "汉南区"
		}, {
			value: "420114",
			text: "蔡甸区"
		}, {
			value: "420115",
			text: "江夏区"
		}, {
			value: "420116",
			text: "黄陂区"
		}, {
			value: "420117",
			text: "新洲区"
		}, {
			value: "420118",
			text: "其它区"
		}]
	}, {
		value: "420200",
		text: "黄石市",
		children: [{
			value: "420202",
			text: "黄石港区"
		}, {
			value: "420203",
			text: "西塞山区"
		}, {
			value: "420204",
			text: "下陆区"
		}, {
			value: "420205",
			text: "铁山区"
		}, {
			value: "420222",
			text: "阳新县"
		}, {
			value: "420281",
			text: "大冶市"
		}, {
			value: "420282",
			text: "其它区"
		}]
	}, {
		value: "420300",
		text: "十堰市",
		children: [{
			value: "420302",
			text: "茅箭区"
		}, {
			value: "420303",
			text: "张湾区"
		}, {
			value: "420321",
			text: "郧县"
		}, {
			value: "420322",
			text: "郧西县"
		}, {
			value: "420323",
			text: "竹山县"
		}, {
			value: "420324",
			text: "竹溪县"
		}, {
			value: "420325",
			text: "房县"
		}, {
			value: "420381",
			text: "丹江口市"
		}, {
			value: "420382",
			text: "城区"
		}, {
			value: "420383",
			text: "其它区"
		}]
	}, {
		value: "420500",
		text: "宜昌市",
		children: [{
			value: "420502",
			text: "西陵区"
		}, {
			value: "420503",
			text: "伍家岗区"
		}, {
			value: "420504",
			text: "点军区"
		}, {
			value: "420505",
			text: "猇亭区"
		}, {
			value: "420506",
			text: "夷陵区"
		}, {
			value: "420525",
			text: "远安县"
		}, {
			value: "420526",
			text: "兴山县"
		}, {
			value: "420527",
			text: "秭归县"
		}, {
			value: "420528",
			text: "长阳土家族自治县"
		}, {
			value: "420529",
			text: "五峰土家族自治县"
		}, {
			value: "420551",
			text: "葛洲坝区"
		}, {
			value: "420552",
			text: "开发区"
		}, {
			value: "420581",
			text: "宜都市"
		}, {
			value: "420582",
			text: "当阳市"
		}, {
			value: "420583",
			text: "枝江市"
		}, {
			value: "420584",
			text: "其它区"
		}]
	}, {
		value: "420600",
		text: "襄阳市",
		children: [{
			value: "420602",
			text: "襄城区"
		}, {
			value: "420606",
			text: "樊城区"
		}, {
			value: "420607",
			text: "襄州区"
		}, {
			value: "420624",
			text: "南漳县"
		}, {
			value: "420625",
			text: "谷城县"
		}, {
			value: "420626",
			text: "保康县"
		}, {
			value: "420682",
			text: "老河口市"
		}, {
			value: "420683",
			text: "枣阳市"
		}, {
			value: "420684",
			text: "宜城市"
		}, {
			value: "420685",
			text: "其它区"
		}]
	}, {
		value: "420700",
		text: "鄂州市",
		children: [{
			value: "420702",
			text: "梁子湖区"
		}, {
			value: "420703",
			text: "华容区"
		}, {
			value: "420704",
			text: "鄂城区"
		}, {
			value: "420705",
			text: "其它区"
		}]
	}, {
		value: "420800",
		text: "荆门市",
		children: [{
			value: "420802",
			text: "东宝区"
		}, {
			value: "420804",
			text: "掇刀区"
		}, {
			value: "420821",
			text: "京山县"
		}, {
			value: "420822",
			text: "沙洋县"
		}, {
			value: "420881",
			text: "钟祥市"
		}, {
			value: "420882",
			text: "其它区"
		}]
	}, {
		value: "420900",
		text: "孝感市",
		children: [{
			value: "420902",
			text: "孝南区"
		}, {
			value: "420921",
			text: "孝昌县"
		}, {
			value: "420922",
			text: "大悟县"
		}, {
			value: "420923",
			text: "云梦县"
		}, {
			value: "420981",
			text: "应城市"
		}, {
			value: "420982",
			text: "安陆市"
		}, {
			value: "420984",
			text: "汉川市"
		}, {
			value: "420985",
			text: "其它区"
		}]
	}, {
		value: "421000",
		text: "荆州市",
		children: [{
			value: "421002",
			text: "沙市区"
		}, {
			value: "421003",
			text: "荆州区"
		}, {
			value: "421022",
			text: "公安县"
		}, {
			value: "421023",
			text: "监利县"
		}, {
			value: "421024",
			text: "江陵县"
		}, {
			value: "421081",
			text: "石首市"
		}, {
			value: "421083",
			text: "洪湖市"
		}, {
			value: "421087",
			text: "松滋市"
		}, {
			value: "421088",
			text: "其它区"
		}]
	}, {
		value: "421100",
		text: "黄冈市",
		children: [{
			value: "421102",
			text: "黄州区"
		}, {
			value: "421121",
			text: "团风县"
		}, {
			value: "421122",
			text: "红安县"
		}, {
			value: "421123",
			text: "罗田县"
		}, {
			value: "421124",
			text: "英山县"
		}, {
			value: "421125",
			text: "浠水县"
		}, {
			value: "421126",
			text: "蕲春县"
		}, {
			value: "421127",
			text: "黄梅县"
		}, {
			value: "421181",
			text: "麻城市"
		}, {
			value: "421182",
			text: "武穴市"
		}, {
			value: "421183",
			text: "其它区"
		}]
	}, {
		value: "421200",
		text: "咸宁市",
		children: [{
			value: "421202",
			text: "咸安区"
		}, {
			value: "421221",
			text: "嘉鱼县"
		}, {
			value: "421222",
			text: "通城县"
		}, {
			value: "421223",
			text: "崇阳县"
		}, {
			value: "421224",
			text: "通山县"
		}, {
			value: "421281",
			text: "赤壁市"
		}, {
			value: "421282",
			text: "温泉城区"
		}, {
			value: "421283",
			text: "其它区"
		}]
	}, {
		value: "421300",
		text: "随州市",
		children: [{
			value: "421302",
			text: "曾都区"
		}, {
			value: "421321",
			text: "随县"
		}, {
			value: "421381",
			text: "广水市"
		}, {
			value: "421382",
			text: "其它区"
		}]
	}, {
		value: "422800",
		text: "恩施土家族苗族自治州",
		children: [{
			value: "422801",
			text: "恩施市"
		}, {
			value: "422802",
			text: "利川市"
		}, {
			value: "422822",
			text: "建始县"
		}, {
			value: "422823",
			text: "巴东县"
		}, {
			value: "422825",
			text: "宣恩县"
		}, {
			value: "422826",
			text: "咸丰县"
		}, {
			value: "422827",
			text: "来凤县"
		}, {
			value: "422828",
			text: "鹤峰县"
		}, {
			value: "422829",
			text: "其它区"
		}]
	}, {
		value: "429004",
		text: "仙桃市"
	}, {
		value: "429005",
		text: "潜江市"
	}, {
		value: "429006",
		text: "天门市"
	}, {
		value: "429021",
		text: "神农架林区"
	}]
}, {
	value: '430000',
	text: '湖南省',
	children: [{
		value: "430100",
		text: "长沙市",
		children: [{
			value: "430102",
			text: "芙蓉区"
		}, {
			value: "430103",
			text: "天心区"
		}, {
			value: "430104",
			text: "岳麓区"
		}, {
			value: "430105",
			text: "开福区"
		}, {
			value: "430111",
			text: "雨花区"
		}, {
			value: "430121",
			text: "长沙县"
		}, {
			value: "430122",
			text: "望城县"
		}, {
			value: "430124",
			text: "宁乡县"
		}, {
			value: "430181",
			text: "浏阳市"
		}, {
			value: "430182",
			text: "其它区"
		}]
	}, {
		value: "430200",
		text: "株洲市",
		children: [{
			value: "430202",
			text: "荷塘区"
		}, {
			value: "430203",
			text: "芦淞区"
		}, {
			value: "430204",
			text: "石峰区"
		}, {
			value: "430211",
			text: "天元区"
		}, {
			value: "430221",
			text: "株洲县"
		}, {
			value: "430223",
			text: "攸县"
		}, {
			value: "430224",
			text: "茶陵县"
		}, {
			value: "430225",
			text: "炎陵县"
		}, {
			value: "430281",
			text: "醴陵市"
		}, {
			value: "430282",
			text: "其它区"
		}]
	}, {
		value: "430300",
		text: "湘潭市",
		children: [{
			value: "430302",
			text: "雨湖区"
		}, {
			value: "430304",
			text: "岳塘区"
		}, {
			value: "430321",
			text: "湘潭县"
		}, {
			value: "430381",
			text: "湘乡市"
		}, {
			value: "430382",
			text: "韶山市"
		}, {
			value: "430383",
			text: "其它区"
		}]
	}, {
		value: "430400",
		text: "衡阳市",
		children: [{
			value: "430405",
			text: "珠晖区"
		}, {
			value: "430406",
			text: "雁峰区"
		}, {
			value: "430407",
			text: "石鼓区"
		}, {
			value: "430408",
			text: "蒸湘区"
		}, {
			value: "430412",
			text: "南岳区"
		}, {
			value: "430421",
			text: "衡阳县"
		}, {
			value: "430422",
			text: "衡南县"
		}, {
			value: "430423",
			text: "衡山县"
		}, {
			value: "430424",
			text: "衡东县"
		}, {
			value: "430426",
			text: "祁东县"
		}, {
			value: "430481",
			text: "耒阳市"
		}, {
			value: "430482",
			text: "常宁市"
		}, {
			value: "430483",
			text: "其它区"
		}]
	}, {
		value: "430500",
		text: "邵阳市",
		children: [{
			value: "430502",
			text: "双清区"
		}, {
			value: "430503",
			text: "大祥区"
		}, {
			value: "430511",
			text: "北塔区"
		}, {
			value: "430521",
			text: "邵东县"
		}, {
			value: "430522",
			text: "新邵县"
		}, {
			value: "430523",
			text: "邵阳县"
		}, {
			value: "430524",
			text: "隆回县"
		}, {
			value: "430525",
			text: "洞口县"
		}, {
			value: "430527",
			text: "绥宁县"
		}, {
			value: "430528",
			text: "新宁县"
		}, {
			value: "430529",
			text: "城步苗族自治县"
		}, {
			value: "430581",
			text: "武冈市"
		}, {
			value: "430582",
			text: "其它区"
		}]
	}, {
		value: "430600",
		text: "岳阳市",
		children: [{
			value: "430602",
			text: "岳阳楼区"
		}, {
			value: "430603",
			text: "云溪区"
		}, {
			value: "430611",
			text: "君山区"
		}, {
			value: "430621",
			text: "岳阳县"
		}, {
			value: "430623",
			text: "华容县"
		}, {
			value: "430624",
			text: "湘阴县"
		}, {
			value: "430626",
			text: "平江县"
		}, {
			value: "430681",
			text: "汨罗市"
		}, {
			value: "430682",
			text: "临湘市"
		}, {
			value: "430683",
			text: "其它区"
		}]
	}, {
		value: "430700",
		text: "常德市",
		children: [{
			value: "430702",
			text: "武陵区"
		}, {
			value: "430703",
			text: "鼎城区"
		}, {
			value: "430721",
			text: "安乡县"
		}, {
			value: "430722",
			text: "汉寿县"
		}, {
			value: "430723",
			text: "澧县"
		}, {
			value: "430724",
			text: "临澧县"
		}, {
			value: "430725",
			text: "桃源县"
		}, {
			value: "430726",
			text: "石门县"
		}, {
			value: "430781",
			text: "津市市"
		}, {
			value: "430782",
			text: "其它区"
		}]
	}, {
		value: "430800",
		text: "张家界市",
		children: [{
			value: "430802",
			text: "永定区"
		}, {
			value: "430811",
			text: "武陵源区"
		}, {
			value: "430821",
			text: "慈利县"
		}, {
			value: "430822",
			text: "桑植县"
		}, {
			value: "430823",
			text: "其它区"
		}]
	}, {
		value: "430900",
		text: "益阳市",
		children: [{
			value: "430902",
			text: "资阳区"
		}, {
			value: "430903",
			text: "赫山区"
		}, {
			value: "430921",
			text: "南县"
		}, {
			value: "430922",
			text: "桃江县"
		}, {
			value: "430923",
			text: "安化县"
		}, {
			value: "430981",
			text: "沅江市"
		}, {
			value: "430982",
			text: "其它区"
		}]
	}, {
		value: "431000",
		text: "郴州市",
		children: [{
			value: "431002",
			text: "北湖区"
		}, {
			value: "431003",
			text: "苏仙区"
		}, {
			value: "431021",
			text: "桂阳县"
		}, {
			value: "431022",
			text: "宜章县"
		}, {
			value: "431023",
			text: "永兴县"
		}, {
			value: "431024",
			text: "嘉禾县"
		}, {
			value: "431025",
			text: "临武县"
		}, {
			value: "431026",
			text: "汝城县"
		}, {
			value: "431027",
			text: "桂东县"
		}, {
			value: "431028",
			text: "安仁县"
		}, {
			value: "431081",
			text: "资兴市"
		}, {
			value: "431082",
			text: "其它区"
		}]
	}, {
		value: "431100",
		text: "永州市",
		children: [{
			value: "431102",
			text: "零陵区"
		}, {
			value: "431103",
			text: "冷水滩区"
		}, {
			value: "431121",
			text: "祁阳县"
		}, {
			value: "431122",
			text: "东安县"
		}, {
			value: "431123",
			text: "双牌县"
		}, {
			value: "431124",
			text: "道县"
		}, {
			value: "431125",
			text: "江永县"
		}, {
			value: "431126",
			text: "宁远县"
		}, {
			value: "431127",
			text: "蓝山县"
		}, {
			value: "431128",
			text: "新田县"
		}, {
			value: "431129",
			text: "江华瑶族自治县"
		}, {
			value: "431130",
			text: "其它区"
		}]
	}, {
		value: "431200",
		text: "怀化市",
		children: [{
			value: "431202",
			text: "鹤城区"
		}, {
			value: "431221",
			text: "中方县"
		}, {
			value: "431222",
			text: "沅陵县"
		}, {
			value: "431223",
			text: "辰溪县"
		}, {
			value: "431224",
			text: "溆浦县"
		}, {
			value: "431225",
			text: "会同县"
		}, {
			value: "431226",
			text: "麻阳苗族自治县"
		}, {
			value: "431227",
			text: "新晃侗族自治县"
		}, {
			value: "431228",
			text: "芷江侗族自治县"
		}, {
			value: "431229",
			text: "靖州苗族侗族自治县"
		}, {
			value: "431230",
			text: "通道侗族自治县"
		}, {
			value: "431281",
			text: "洪江市"
		}, {
			value: "431282",
			text: "其它区"
		}]
	}, {
		value: "431300",
		text: "娄底市",
		children: [{
			value: "431302",
			text: "娄星区"
		}, {
			value: "431321",
			text: "双峰县"
		}, {
			value: "431322",
			text: "新化县"
		}, {
			value: "431381",
			text: "冷水江市"
		}, {
			value: "431382",
			text: "涟源市"
		}, {
			value: "431383",
			text: "其它区"
		}]
	}, {
		value: "433100",
		text: "湘西土家族苗族自治州",
		children: [{
			value: "433101",
			text: "吉首市"
		}, {
			value: "433122",
			text: "泸溪县"
		}, {
			value: "433123",
			text: "凤凰县"
		}, {
			value: "433124",
			text: "花垣县"
		}, {
			value: "433125",
			text: "保靖县"
		}, {
			value: "433126",
			text: "古丈县"
		}, {
			value: "433127",
			text: "永顺县"
		}, {
			value: "433130",
			text: "龙山县"
		}, {
			value: "433131",
			text: "其它区"
		}]
	}]
}, {
	value: '440000',
	text: '广东省',
	children: [{
		value: "440100",
		text: "广州市",
		children: [{
			value: "440103",
			text: "荔湾区"
		}, {
			value: "440104",
			text: "越秀区"
		}, {
			value: "440105",
			text: "海珠区"
		}, {
			value: "440106",
			text: "天河区"
		}, {
			value: "440111",
			text: "白云区"
		}, {
			value: "440112",
			text: "黄埔区"
		}, {
			value: "440113",
			text: "番禺区"
		}, {
			value: "440114",
			text: "花都区"
		}, {
			value: "440115",
			text: "南沙区"
		}, {
			value: "440116",
			text: "萝岗区"
		}, {
			value: "440183",
			text: "增城市"
		}, {
			value: "440184",
			text: "从化市"
		}, {
			value: "440188",
			text: "东山区"
		}, {
			value: "440189",
			text: "其它区"
		}]
	}, {
		value: "440200",
		text: "韶关市",
		children: [{
			value: "440203",
			text: "武江区"
		}, {
			value: "440204",
			text: "浈江区"
		}, {
			value: "440205",
			text: "曲江区"
		}, {
			value: "440222",
			text: "始兴县"
		}, {
			value: "440224",
			text: "仁化县"
		}, {
			value: "440229",
			text: "翁源县"
		}, {
			value: "440232",
			text: "乳源瑶族自治县"
		}, {
			value: "440233",
			text: "新丰县"
		}, {
			value: "440281",
			text: "乐昌市"
		}, {
			value: "440282",
			text: "南雄市"
		}, {
			value: "440283",
			text: "其它区"
		}]
	}, {
		value: "440300",
		text: "深圳市",
		children: [{
			value: "440303",
			text: "罗湖区"
		}, {
			value: "440304",
			text: "福田区"
		}, {
			value: "440305",
			text: "南山区"
		}, {
			value: "440306",
			text: "宝安区"
		}, {
			value: "440307",
			text: "龙岗区"
		}, {
			value: "440308",
			text: "盐田区"
		}, {
			value: "440309",
			text: "其它区"
		}]
	}, {
		value: "440400",
		text: "珠海市",
		children: [{
			value: "440402",
			text: "香洲区"
		}, {
			value: "440403",
			text: "斗门区"
		}, {
			value: "440404",
			text: "金湾区"
		}, {
			value: "440486",
			text: "金唐区"
		}, {
			value: "440487",
			text: "南湾区"
		}, {
			value: "440488",
			text: "其它区"
		}]
	}, {
		value: "440500",
		text: "汕头市",
		children: [{
			value: "440507",
			text: "龙湖区"
		}, {
			value: "440511",
			text: "金平区"
		}, {
			value: "440512",
			text: "濠江区"
		}, {
			value: "440513",
			text: "潮阳区"
		}, {
			value: "440514",
			text: "潮南区"
		}, {
			value: "440515",
			text: "澄海区"
		}, {
			value: "440523",
			text: "南澳县"
		}, {
			value: "440524",
			text: "其它区"
		}]
	}, {
		value: "440600",
		text: "佛山市",
		children: [{
			value: "440604",
			text: "禅城区"
		}, {
			value: "440605",
			text: "南海区"
		}, {
			value: "440606",
			text: "顺德区"
		}, {
			value: "440607",
			text: "三水区"
		}, {
			value: "440608",
			text: "高明区"
		}, {
			value: "440609",
			text: "其它区"
		}]
	}, {
		value: "440700",
		text: "江门市",
		children: [{
			value: "440703",
			text: "蓬江区"
		}, {
			value: "440704",
			text: "江海区"
		}, {
			value: "440705",
			text: "新会区"
		}, {
			value: "440781",
			text: "台山市"
		}, {
			value: "440783",
			text: "开平市"
		}, {
			value: "440784",
			text: "鹤山市"
		}, {
			value: "440785",
			text: "恩平市"
		}, {
			value: "440786",
			text: "其它区"
		}]
	}, {
		value: "440800",
		text: "湛江市",
		children: [{
			value: "440802",
			text: "赤坎区"
		}, {
			value: "440803",
			text: "霞山区"
		}, {
			value: "440804",
			text: "坡头区"
		}, {
			value: "440811",
			text: "麻章区"
		}, {
			value: "440823",
			text: "遂溪县"
		}, {
			value: "440825",
			text: "徐闻县"
		}, {
			value: "440881",
			text: "廉江市"
		}, {
			value: "440882",
			text: "雷州市"
		}, {
			value: "440883",
			text: "吴川市"
		}, {
			value: "440884",
			text: "其它区"
		}]
	}, {
		value: "440900",
		text: "茂名市",
		children: [{
			value: "440902",
			text: "茂南区"
		}, {
			value: "440903",
			text: "茂港区"
		}, {
			value: "440923",
			text: "电白县"
		}, {
			value: "440981",
			text: "高州市"
		}, {
			value: "440982",
			text: "化州市"
		}, {
			value: "440983",
			text: "信宜市"
		}, {
			value: "440984",
			text: "其它区"
		}]
	}, {
		value: "441200",
		text: "肇庆市",
		children: [{
			value: "441202",
			text: "端州区"
		}, {
			value: "441203",
			text: "鼎湖区"
		}, {
			value: "441223",
			text: "广宁县"
		}, {
			value: "441224",
			text: "怀集县"
		}, {
			value: "441225",
			text: "封开县"
		}, {
			value: "441226",
			text: "德庆县"
		}, {
			value: "441283",
			text: "高要市"
		}, {
			value: "441284",
			text: "四会市"
		}, {
			value: "441285",
			text: "其它区"
		}]
	}, {
		value: "441300",
		text: "惠州市",
		children: [{
			value: "441302",
			text: "惠城区"
		}, {
			value: "441303",
			text: "惠阳区"
		}, {
			value: "441322",
			text: "博罗县"
		}, {
			value: "441323",
			text: "惠东县"
		}, {
			value: "441324",
			text: "龙门县"
		}, {
			value: "441325",
			text: "其它区"
		}]
	}, {
		value: "441400",
		text: "梅州市",
		children: [{
			value: "441402",
			text: "梅江区"
		}, {
			value: "441421",
			text: "梅县"
		}, {
			value: "441422",
			text: "大埔县"
		}, {
			value: "441423",
			text: "丰顺县"
		}, {
			value: "441424",
			text: "五华县"
		}, {
			value: "441426",
			text: "平远县"
		}, {
			value: "441427",
			text: "蕉岭县"
		}, {
			value: "441481",
			text: "兴宁市"
		}, {
			value: "441482",
			text: "其它区"
		}]
	}, {
		value: "441500",
		text: "汕尾市",
		children: [{
			value: "441502",
			text: "城区"
		}, {
			value: "441521",
			text: "海丰县"
		}, {
			value: "441523",
			text: "陆河县"
		}, {
			value: "441581",
			text: "陆丰市"
		}, {
			value: "441582",
			text: "其它区"
		}]
	}, {
		value: "441600",
		text: "河源市",
		children: [{
			value: "441602",
			text: "源城区"
		}, {
			value: "441621",
			text: "紫金县"
		}, {
			value: "441622",
			text: "龙川县"
		}, {
			value: "441623",
			text: "连平县"
		}, {
			value: "441624",
			text: "和平县"
		}, {
			value: "441625",
			text: "东源县"
		}, {
			value: "441626",
			text: "其它区"
		}]
	}, {
		value: "441700",
		text: "阳江市",
		children: [{
			value: "441702",
			text: "江城区"
		}, {
			value: "441721",
			text: "阳西县"
		}, {
			value: "441723",
			text: "阳东县"
		}, {
			value: "441781",
			text: "阳春市"
		}, {
			value: "441782",
			text: "其它区"
		}]
	}, {
		value: "441800",
		text: "清远市",
		children: [{
			value: "441802",
			text: "清城区"
		}, {
			value: "441821",
			text: "佛冈县"
		}, {
			value: "441823",
			text: "阳山县"
		}, {
			value: "441825",
			text: "连山壮族瑶族自治县"
		}, {
			value: "441826",
			text: "连南瑶族自治县"
		}, {
			value: "441827",
			text: "清新县"
		}, {
			value: "441881",
			text: "英德市"
		}, {
			value: "441882",
			text: "连州市"
		}, {
			value: "441883",
			text: "其它区"
		}]
	}, {
		value: "441900",
		text: "东莞市",
		children: [{
			value: "445102",
			text: "莞城区"
		}, {
			value: "445121",
			text: "东城区"
		}, {
			value: "445122",
			text: "南城区"
		}, {
			value: "445121",
			text: "万江区"
		}, {
			value: "445122",
			text: "长安镇"
		}, {
			value: "445121",
			text: "虎门镇"
		}, {
			value: "445122",
			text: "厚街镇"
		}, {
			value: "445121",
			text: "大朗镇"
		}, {
			value: "445122",
			text: "黄江镇"
		}, {
			value: "445122",
			text: "中堂镇"
		}, {
			value: "445122",
			text: "麻涌镇"
		}, {
			value: "445122",
			text: "高埗镇"
		}, {
			value: "445122",
			text: "石碣镇"
		}, {
			value: "445122",
			text: "石龙镇"
		}, {
			value: "445122",
			text: "企石镇"
		}, {
			value: "445122",
			text: "石排镇"
		}, {
			value: "445122",
			text: "常平镇"
		}, {
			value: "445122",
			text: "洪梅镇"
		}, {
			value: "445122",
			text: "道滘镇"
		}, {
			value: "445122",
			text: "沙田镇"
		}, {
			value: "445122",
			text: "凤岗镇"
		}, {
			value: "445122",
			text: "谢岗镇"
		}, {
			value: "445122",
			text: "横沥镇"
		}, {
			value: "445122",
			text: "寮步镇"
		}, {
			value: "445122",
			text: "桥头镇"
		}, {
			value: "445122",
			text: "东坑镇"
		}, {
			value: "445122",
			text: "清溪镇"
		}, {
			value: "445122",
			text: "塘厦镇"
		}, {
			value: "445122",
			text: "大岭山镇"
		}, {
			value: "445122",
			text: "望牛墩镇"
		}, {
			value: "445122",
			text: "樟木头镇"

		}]

	}, {
		value: "442000",
		text: "中山市",
		children: [{
			value: "445102",
			text: "东区"
		}, {
			value: "445121",
			text: "南区"
		}, {
			value: "445122",
			text: "石岐区"
		}, {
			value: "445185",
			text: "西区"
		}, {
			value: "445186",
			text: "五桂山区"
		}, {
			value: "445121",
			text: "板芙镇"
		}, {
			value: "445122",
			text: "大涌镇"
		}, {
			value: "445185",
			text: "东凤镇"
		}, {
			value: "445121",
			text: "东升镇"
		}, {
			value: "445122",
			text: "阜沙镇"
		}, {
			value: "445185",
			text: "港口镇"
		}, {
			value: "445186",
			text: "古镇镇"
		}, {
			value: "445121",
			text: "横栏镇"
		}, {
			value: "445122",
			text: "黄圃镇"
		}, {
			value: "445185",
			text: "民众镇"
		}, {
			value: "445185",
			text: "南朗镇"
		}, {
			value: "445121",
			text: "南头镇"
		}, {
			value: "445122",
			text: "三角镇"
		}, {
			value: "445185",
			text: "三乡镇"
		}, {
			value: "445186",
			text: "沙溪镇"
		}, {
			value: "445121",
			text: "神湾镇"
		}, {
			value: "445122",
			text: "坦洲镇"
		}, {
			value: "445185",
			text: "小榄镇"
		}]
	}, {
		value: "445100",
		text: "潮州市",
		children: [{
			value: "445102",
			text: "湘桥区"
		}, {
			value: "445121",
			text: "潮安县"
		}, {
			value: "445122",
			text: "饶平县"
		}, {
			value: "445185",
			text: "枫溪区"
		}, {
			value: "445186",
			text: "其它区"
		}]
	}, {
		value: "445200",
		text: "揭阳市",
		children: [{
			value: "445202",
			text: "榕城区"
		}, {
			value: "445221",
			text: "揭东县"
		}, {
			value: "445222",
			text: "揭西县"
		}, {
			value: "445224",
			text: "惠来县"
		}, {
			value: "445281",
			text: "普宁市"
		}, {
			value: "445284",
			text: "东山区"
		}, {
			value: "445285",
			text: "其它区"
		}]
	}, {
		value: "445300",
		text: "云浮市",
		children: [{
			value: "445302",
			text: "云城区"
		}, {
			value: "445321",
			text: "新兴县"
		}, {
			value: "445322",
			text: "郁南县"
		}, {
			value: "445323",
			text: "云安县"
		}, {
			value: "445381",
			text: "罗定市"
		}, {
			value: "445382",
			text: "其它区"
		}]
	}]
}, {
	value: '450000',
	text: '广西壮族',
	children: [{
		value: "450100",
		text: "南宁市",
		children: [{
			value: "450102",
			text: "兴宁区"
		}, {
			value: "450103",
			text: "青秀区"
		}, {
			value: "450105",
			text: "江南区"
		}, {
			value: "450107",
			text: "西乡塘区"
		}, {
			value: "450108",
			text: "良庆区"
		}, {
			value: "450109",
			text: "邕宁区"
		}, {
			value: "450122",
			text: "武鸣县"
		}, {
			value: "450123",
			text: "隆安县"
		}, {
			value: "450124",
			text: "马山县"
		}, {
			value: "450125",
			text: "上林县"
		}, {
			value: "450126",
			text: "宾阳县"
		}, {
			value: "450127",
			text: "横县"
		}, {
			value: "450128",
			text: "其它区"
		}]
	}, {
		value: "450200",
		text: "柳州市",
		children: [{
			value: "450202",
			text: "城中区"
		}, {
			value: "450203",
			text: "鱼峰区"
		}, {
			value: "450204",
			text: "柳南区"
		}, {
			value: "450205",
			text: "柳北区"
		}, {
			value: "450221",
			text: "柳江县"
		}, {
			value: "450222",
			text: "柳城县"
		}, {
			value: "450223",
			text: "鹿寨县"
		}, {
			value: "450224",
			text: "融安县"
		}, {
			value: "450225",
			text: "融水苗族自治县"
		}, {
			value: "450226",
			text: "三江侗族自治县"
		}, {
			value: "450227",
			text: "其它区"
		}]
	}, {
		value: "450300",
		text: "桂林市",
		children: [{
			value: "450302",
			text: "秀峰区"
		}, {
			value: "450303",
			text: "叠彩区"
		}, {
			value: "450304",
			text: "象山区"
		}, {
			value: "450305",
			text: "七星区"
		}, {
			value: "450311",
			text: "雁山区"
		}, {
			value: "450321",
			text: "阳朔县"
		}, {
			value: "450322",
			text: "临桂县"
		}, {
			value: "450323",
			text: "灵川县"
		}, {
			value: "450324",
			text: "全州县"
		}, {
			value: "450325",
			text: "兴安县"
		}, {
			value: "450326",
			text: "永福县"
		}, {
			value: "450327",
			text: "灌阳县"
		}, {
			value: "450328",
			text: "龙胜各族自治县"
		}, {
			value: "450329",
			text: "资源县"
		}, {
			value: "450330",
			text: "平乐县"
		}, {
			value: "450331",
			text: "荔浦县"
		}, {
			value: "450332",
			text: "恭城瑶族自治县"
		}, {
			value: "450333",
			text: "其它区"
		}]
	}, {
		value: "450400",
		text: "梧州市",
		children: [{
			value: "450403",
			text: "万秀区"
		}, {
			value: "450404",
			text: "蝶山区"
		}, {
			value: "450405",
			text: "长洲区"
		}, {
			value: "450421",
			text: "苍梧县"
		}, {
			value: "450422",
			text: "藤县"
		}, {
			value: "450423",
			text: "蒙山县"
		}, {
			value: "450481",
			text: "岑溪市"
		}, {
			value: "450482",
			text: "其它区"
		}]
	}, {
		value: "450500",
		text: "北海市",
		children: [{
			value: "450502",
			text: "海城区"
		}, {
			value: "450503",
			text: "银海区"
		}, {
			value: "450512",
			text: "铁山港区"
		}, {
			value: "450521",
			text: "合浦县"
		}, {
			value: "450522",
			text: "其它区"
		}]
	}, {
		value: "450600",
		text: "防城港市",
		children: [{
			value: "450602",
			text: "港口区"
		}, {
			value: "450603",
			text: "防城区"
		}, {
			value: "450621",
			text: "上思县"
		}, {
			value: "450681",
			text: "东兴市"
		}, {
			value: "450682",
			text: "其它区"
		}]
	}, {
		value: "450700",
		text: "钦州市",
		children: [{
			value: "450702",
			text: "钦南区"
		}, {
			value: "450703",
			text: "钦北区"
		}, {
			value: "450721",
			text: "灵山县"
		}, {
			value: "450722",
			text: "浦北县"
		}, {
			value: "450723",
			text: "其它区"
		}]
	}, {
		value: "450800",
		text: "贵港市",
		children: [{
			value: "450802",
			text: "港北区"
		}, {
			value: "450803",
			text: "港南区"
		}, {
			value: "450804",
			text: "覃塘区"
		}, {
			value: "450821",
			text: "平南县"
		}, {
			value: "450881",
			text: "桂平市"
		}, {
			value: "450882",
			text: "其它区"
		}]
	}, {
		value: "450900",
		text: "玉林市",
		children: [{
			value: "450902",
			text: "玉州区"
		}, {
			value: "450921",
			text: "容县"
		}, {
			value: "450922",
			text: "陆川县"
		}, {
			value: "450923",
			text: "博白县"
		}, {
			value: "450924",
			text: "兴业县"
		}, {
			value: "450981",
			text: "北流市"
		}, {
			value: "450982",
			text: "其它区"
		}]
	}, {
		value: "451000",
		text: "百色市",
		children: [{
			value: "451002",
			text: "右江区"
		}, {
			value: "451021",
			text: "田阳县"
		}, {
			value: "451022",
			text: "田东县"
		}, {
			value: "451023",
			text: "平果县"
		}, {
			value: "451024",
			text: "德保县"
		}, {
			value: "451025",
			text: "靖西县"
		}, {
			value: "451026",
			text: "那坡县"
		}, {
			value: "451027",
			text: "凌云县"
		}, {
			value: "451028",
			text: "乐业县"
		}, {
			value: "451029",
			text: "田林县"
		}, {
			value: "451030",
			text: "西林县"
		}, {
			value: "451031",
			text: "隆林各族自治县"
		}, {
			value: "451032",
			text: "其它区"
		}]
	}, {
		value: "451100",
		text: "贺州市",
		children: [{
			value: "451102",
			text: "八步区"
		}, {
			value: "451121",
			text: "昭平县"
		}, {
			value: "451122",
			text: "钟山县"
		}, {
			value: "451123",
			text: "富川瑶族自治县"
		}, {
			value: "451124",
			text: "其它区"
		}]
	}, {
		value: "451200",
		text: "河池市",
		children: [{
			value: "451202",
			text: "金城江区"
		}, {
			value: "451221",
			text: "南丹县"
		}, {
			value: "451222",
			text: "天峨县"
		}, {
			value: "451223",
			text: "凤山县"
		}, {
			value: "451224",
			text: "东兰县"
		}, {
			value: "451225",
			text: "罗城仫佬族自治县"
		}, {
			value: "451226",
			text: "环江毛南族自治县"
		}, {
			value: "451227",
			text: "巴马瑶族自治县"
		}, {
			value: "451228",
			text: "都安瑶族自治县"
		}, {
			value: "451229",
			text: "大化瑶族自治县"
		}, {
			value: "451281",
			text: "宜州市"
		}, {
			value: "451282",
			text: "其它区"
		}]
	}, {
		value: "451300",
		text: "来宾市",
		children: [{
			value: "451302",
			text: "兴宾区"
		}, {
			value: "451321",
			text: "忻城县"
		}, {
			value: "451322",
			text: "象州县"
		}, {
			value: "451323",
			text: "武宣县"
		}, {
			value: "451324",
			text: "金秀瑶族自治县"
		}, {
			value: "451381",
			text: "合山市"
		}, {
			value: "451382",
			text: "其它区"
		}]
	}, {
		value: "451400",
		text: "崇左市",
		children: [{
			value: "451402",
			text: "江洲区"
		}, {
			value: "451421",
			text: "扶绥县"
		}, {
			value: "451422",
			text: "宁明县"
		}, {
			value: "451423",
			text: "龙州县"
		}, {
			value: "451424",
			text: "大新县"
		}, {
			value: "451425",
			text: "天等县"
		}, {
			value: "451481",
			text: "凭祥市"
		}, {
			value: "451482",
			text: "其它区"
		}]
	}]
}, {
	value: '460000',
	text: '海南省',
	children: [{
		value: "460100",
		text: "海口市",
		children: [{
			value: "460105",
			text: "秀英区"
		}, {
			value: "460106",
			text: "龙华区"
		}, {
			value: "460107",
			text: "琼山区"
		}, {
			value: "460108",
			text: "美兰区"
		}, {
			value: "460109",
			text: "其它区"
		}]
	}, {
		value: "460200",
		text: "三亚市"
	}, {
		value: "469001",
		text: "五指山市"
	}, {
		value: "469002",
		text: "琼海市"
	}, {
		value: "469003",
		text: "儋州市"
	}, {
		value: "469005",
		text: "文昌市"
	}, {
		value: "469006",
		text: "万宁市"
	}, {
		value: "469007",
		text: "东方市"
	}, {
		value: "469025",
		text: "定安县"
	}, {
		value: "469026",
		text: "屯昌县"
	}, {
		value: "469027",
		text: "澄迈县"
	}, {
		value: "469028",
		text: "临高县"
	}, {
		value: "469030",
		text: "白沙黎族自治县"
	}, {
		value: "469031",
		text: "昌江黎族自治县"
	}, {
		value: "469033",
		text: "乐东黎族自治县"
	}, {
		value: "469034",
		text: "陵水黎族自治县"
	}, {
		value: "469035",
		text: "保亭黎族苗族自治县"
	}, {
		value: "469036",
		text: "琼中黎族苗族自治县"
	}, {
		value: "469037",
		text: "西沙群岛"
	}, {
		value: "469038",
		text: "南沙群岛"
	}, {
		value: "469039",
		text: "中沙群岛的岛礁及其海域"
	}]
}, {
	value: '500000',
	text: '重庆',
	children: [{
		value: '500000',
		text: '重庆',
		children: [{
			value: "500101",
			text: "万州区"
		}, {
			value: "500102",
			text: "涪陵区"
		}, {
			value: "500103",
			text: "渝中区"
		}, {
			value: "500104",
			text: "大渡口区"
		}, {
			value: "500105",
			text: "江北区"
		}, {
			value: "500106",
			text: "沙坪坝区"
		}, {
			value: "500107",
			text: "九龙坡区"
		}, {
			value: "500108",
			text: "南岸区"
		}, {
			value: "500109",
			text: "北碚区"
		}, {
			value: "500110",
			text: "万盛区"
		}, {
			value: "500111",
			text: "双桥区"
		}, {
			value: "500112",
			text: "渝北区"
		}, {
			value: "500113",
			text: "巴南区"
		}, {
			value: "500114",
			text: "黔江区"
		}, {
			value: "500115",
			text: "长寿区"
		}, {
			value: "500222",
			text: "綦江县"
		}, {
			value: "500223",
			text: "潼南县"
		}, {
			value: "500224",
			text: "铜梁县"
		}, {
			value: "500225",
			text: "大足县"
		}, {
			value: "500226",
			text: "荣昌县"
		}, {
			value: "500227",
			text: "璧山县"
		}, {
			value: "500228",
			text: "梁平县"
		}, {
			value: "500229",
			text: "城口县"
		}, {
			value: "500230",
			text: "丰都县"
		}, {
			value: "500231",
			text: "垫江县"
		}, {
			value: "500232",
			text: "武隆县"
		}, {
			value: "500233",
			text: "忠县"
		}, {
			value: "500234",
			text: "开县"
		}, {
			value: "500235",
			text: "云阳县"
		}, {
			value: "500236",
			text: "奉节县"
		}, {
			value: "500237",
			text: "巫山县"
		}, {
			value: "500238",
			text: "巫溪县"
		}, {
			value: "500240",
			text: "石柱土家族自治县"
		}, {
			value: "500241",
			text: "秀山土家族苗族自治县"
		}, {
			value: "500242",
			text: "酉阳土家族苗族自治县"
		}, {
			value: "500243",
			text: "彭水苗族土家族自治县"
		}, {
			value: "500381",
			text: "江津区"
		}, {
			value: "500382",
			text: "合川区"
		}, {
			value: "500383",
			text: "永川区"
		}, {
			value: "500384",
			text: "南川区"
		}, {
			value: "500385",
			text: "其它区"
		}]
	}]
}, {
	value: '510000',
	text: '四川省',
	children: [{
		value: "510100",
		text: "成都市",
		children: [{
			value: "510104",
			text: "锦江区"
		}, {
			value: "510105",
			text: "青羊区"
		}, {
			value: "510106",
			text: "金牛区"
		}, {
			value: "510107",
			text: "武侯区"
		}, {
			value: "510108",
			text: "成华区"
		}, {
			value: "510112",
			text: "龙泉驿区"
		}, {
			value: "510113",
			text: "青白江区"
		}, {
			value: "510114",
			text: "新都区"
		}, {
			value: "510115",
			text: "温江区"
		}, {
			value: "510121",
			text: "金堂县"
		}, {
			value: "510122",
			text: "双流县"
		}, {
			value: "510124",
			text: "郫县"
		}, {
			value: "510129",
			text: "大邑县"
		}, {
			value: "510131",
			text: "蒲江县"
		}, {
			value: "510132",
			text: "新津县"
		}, {
			value: "510181",
			text: "都江堰市"
		}, {
			value: "510182",
			text: "彭州市"
		}, {
			value: "510183",
			text: "邛崃市"
		}, {
			value: "510184",
			text: "崇州市"
		}, {
			value: "510185",
			text: "其它区"
		}]
	}, {
		value: "510300",
		text: "自贡市",
		children: [{
			value: "510302",
			text: "自流井区"
		}, {
			value: "510303",
			text: "贡井区"
		}, {
			value: "510304",
			text: "大安区"
		}, {
			value: "510311",
			text: "沿滩区"
		}, {
			value: "510321",
			text: "荣县"
		}, {
			value: "510322",
			text: "富顺县"
		}, {
			value: "510323",
			text: "其它区"
		}]
	}, {
		value: "510400",
		text: "攀枝花市",
		children: [{
			value: "510402",
			text: "东区"
		}, {
			value: "510403",
			text: "西区"
		}, {
			value: "510411",
			text: "仁和区"
		}, {
			value: "510421",
			text: "米易县"
		}, {
			value: "510422",
			text: "盐边县"
		}, {
			value: "510423",
			text: "其它区"
		}]
	}, {
		value: "510500",
		text: "泸州市",
		children: [{
			value: "510502",
			text: "江阳区"
		}, {
			value: "510503",
			text: "纳溪区"
		}, {
			value: "510504",
			text: "龙马潭区"
		}, {
			value: "510521",
			text: "泸县"
		}, {
			value: "510522",
			text: "合江县"
		}, {
			value: "510524",
			text: "叙永县"
		}, {
			value: "510525",
			text: "古蔺县"
		}, {
			value: "510526",
			text: "其它区"
		}]
	}, {
		value: "510600",
		text: "德阳市",
		children: [{
			value: "510603",
			text: "旌阳区"
		}, {
			value: "510623",
			text: "中江县"
		}, {
			value: "510626",
			text: "罗江县"
		}, {
			value: "510681",
			text: "广汉市"
		}, {
			value: "510682",
			text: "什邡市"
		}, {
			value: "510683",
			text: "绵竹市"
		}, {
			value: "510684",
			text: "其它区"
		}]
	}, {
		value: "510700",
		text: "绵阳市",
		children: [{
			value: "510703",
			text: "涪城区"
		}, {
			value: "510704",
			text: "游仙区"
		}, {
			value: "510722",
			text: "三台县"
		}, {
			value: "510723",
			text: "盐亭县"
		}, {
			value: "510724",
			text: "安县"
		}, {
			value: "510725",
			text: "梓潼县"
		}, {
			value: "510726",
			text: "北川羌族自治县"
		}, {
			value: "510727",
			text: "平武县"
		}, {
			value: "510751",
			text: "高新区"
		}, {
			value: "510781",
			text: "江油市"
		}, {
			value: "510782",
			text: "其它区"
		}]
	}, {
		value: "510800",
		text: "广元市",
		children: [{
			value: "510802",
			text: "利州区"
		}, {
			value: "510811",
			text: "元坝区"
		}, {
			value: "510812",
			text: "朝天区"
		}, {
			value: "510821",
			text: "旺苍县"
		}, {
			value: "510822",
			text: "青川县"
		}, {
			value: "510823",
			text: "剑阁县"
		}, {
			value: "510824",
			text: "苍溪县"
		}, {
			value: "510825",
			text: "其它区"
		}]
	}, {
		value: "510900",
		text: "遂宁市",
		children: [{
			value: "510903",
			text: "船山区"
		}, {
			value: "510904",
			text: "安居区"
		}, {
			value: "510921",
			text: "蓬溪县"
		}, {
			value: "510922",
			text: "射洪县"
		}, {
			value: "510923",
			text: "大英县"
		}, {
			value: "510924",
			text: "其它区"
		}]
	}, {
		value: "511000",
		text: "内江市",
		children: [{
			value: "511002",
			text: "市中区"
		}, {
			value: "511011",
			text: "东兴区"
		}, {
			value: "511024",
			text: "威远县"
		}, {
			value: "511025",
			text: "资中县"
		}, {
			value: "511028",
			text: "隆昌县"
		}, {
			value: "511029",
			text: "其它区"
		}]
	}, {
		value: "511100",
		text: "乐山市",
		children: [{
			value: "511102",
			text: "市中区"
		}, {
			value: "511111",
			text: "沙湾区"
		}, {
			value: "511112",
			text: "五通桥区"
		}, {
			value: "511113",
			text: "金口河区"
		}, {
			value: "511123",
			text: "犍为县"
		}, {
			value: "511124",
			text: "井研县"
		}, {
			value: "511126",
			text: "夹江县"
		}, {
			value: "511129",
			text: "沐川县"
		}, {
			value: "511132",
			text: "峨边彝族自治县"
		}, {
			value: "511133",
			text: "马边彝族自治县"
		}, {
			value: "511181",
			text: "峨眉山市"
		}, {
			value: "511182",
			text: "其它区"
		}]
	}, {
		value: "511300",
		text: "南充市",
		children: [{
			value: "511302",
			text: "顺庆区"
		}, {
			value: "511303",
			text: "高坪区"
		}, {
			value: "511304",
			text: "嘉陵区"
		}, {
			value: "511321",
			text: "南部县"
		}, {
			value: "511322",
			text: "营山县"
		}, {
			value: "511323",
			text: "蓬安县"
		}, {
			value: "511324",
			text: "仪陇县"
		}, {
			value: "511325",
			text: "西充县"
		}, {
			value: "511381",
			text: "阆中市"
		}, {
			value: "511382",
			text: "其它区"
		}]
	}, {
		value: "511400",
		text: "眉山市",
		children: [{
			value: "511402",
			text: "东坡区"
		}, {
			value: "511421",
			text: "仁寿县"
		}, {
			value: "511422",
			text: "彭山县"
		}, {
			value: "511423",
			text: "洪雅县"
		}, {
			value: "511424",
			text: "丹棱县"
		}, {
			value: "511425",
			text: "青神县"
		}, {
			value: "511426",
			text: "其它区"
		}]
	}, {
		value: "511500",
		text: "宜宾市",
		children: [{
			value: "511502",
			text: "翠屏区"
		}, {
			value: "511521",
			text: "宜宾县"
		}, {
			value: "511522",
			text: "南溪县"
		}, {
			value: "511523",
			text: "江安县"
		}, {
			value: "511524",
			text: "长宁县"
		}, {
			value: "511525",
			text: "高县"
		}, {
			value: "511526",
			text: "珙县"
		}, {
			value: "511527",
			text: "筠连县"
		}, {
			value: "511528",
			text: "兴文县"
		}, {
			value: "511529",
			text: "屏山县"
		}, {
			value: "511530",
			text: "其它区"
		}]
	}, {
		value: "511600",
		text: "广安市",
		children: [{
			value: "511602",
			text: "广安区"
		}, {
			value: "511621",
			text: "岳池县"
		}, {
			value: "511622",
			text: "武胜县"
		}, {
			value: "511623",
			text: "邻水县"
		}, {
			value: "511681",
			text: "华蓥市"
		}, {
			value: "511682",
			text: "市辖区"
		}, {
			value: "511683",
			text: "其它区"
		}]
	}, {
		value: "511700",
		text: "达州市",
		children: [{
			value: "511702",
			text: "通川区"
		}, {
			value: "511721",
			text: "达县"
		}, {
			value: "511722",
			text: "宣汉县"
		}, {
			value: "511723",
			text: "开江县"
		}, {
			value: "511724",
			text: "大竹县"
		}, {
			value: "511725",
			text: "渠县"
		}, {
			value: "511781",
			text: "万源市"
		}, {
			value: "511782",
			text: "其它区"
		}]
	}, {
		value: "511800",
		text: "雅安市",
		children: [{
			value: "511802",
			text: "雨城区"
		}, {
			value: "511821",
			text: "名山县"
		}, {
			value: "511822",
			text: "荥经县"
		}, {
			value: "511823",
			text: "汉源县"
		}, {
			value: "511824",
			text: "石棉县"
		}, {
			value: "511825",
			text: "天全县"
		}, {
			value: "511826",
			text: "芦山县"
		}, {
			value: "511827",
			text: "宝兴县"
		}, {
			value: "511828",
			text: "其它区"
		}]
	}, {
		value: "511900",
		text: "巴中市",
		children: [{
			value: "511902",
			text: "巴州区"
		}, {
			value: "511921",
			text: "通江县"
		}, {
			value: "511922",
			text: "南江县"
		}, {
			value: "511923",
			text: "平昌县"
		}, {
			value: "511924",
			text: "其它区"
		}]
	}, {
		value: "512000",
		text: "资阳市",
		children: [{
			value: "512002",
			text: "雁江区"
		}, {
			value: "512021",
			text: "安岳县"
		}, {
			value: "512022",
			text: "乐至县"
		}, {
			value: "512081",
			text: "简阳市"
		}, {
			value: "512082",
			text: "其它区"
		}]
	}, {
		value: "513200",
		text: "阿坝藏族羌族自治州",
		children: [{
			value: "513221",
			text: "汶川县"
		}, {
			value: "513222",
			text: "理县"
		}, {
			value: "513223",
			text: "茂县"
		}, {
			value: "513224",
			text: "松潘县"
		}, {
			value: "513225",
			text: "九寨沟县"
		}, {
			value: "513226",
			text: "金川县"
		}, {
			value: "513227",
			text: "小金县"
		}, {
			value: "513228",
			text: "黑水县"
		}, {
			value: "513229",
			text: "马尔康县"
		}, {
			value: "513230",
			text: "壤塘县"
		}, {
			value: "513231",
			text: "阿坝县"
		}, {
			value: "513232",
			text: "若尔盖县"
		}, {
			value: "513233",
			text: "红原县"
		}, {
			value: "513234",
			text: "其它区"
		}]
	}, {
		value: "513300",
		text: "甘孜藏族自治州",
		children: [{
			value: "513321",
			text: "康定县"
		}, {
			value: "513322",
			text: "泸定县"
		}, {
			value: "513323",
			text: "丹巴县"
		}, {
			value: "513324",
			text: "九龙县"
		}, {
			value: "513325",
			text: "雅江县"
		}, {
			value: "513326",
			text: "道孚县"
		}, {
			value: "513327",
			text: "炉霍县"
		}, {
			value: "513328",
			text: "甘孜县"
		}, {
			value: "513329",
			text: "新龙县"
		}, {
			value: "513330",
			text: "德格县"
		}, {
			value: "513331",
			text: "白玉县"
		}, {
			value: "513332",
			text: "石渠县"
		}, {
			value: "513333",
			text: "色达县"
		}, {
			value: "513334",
			text: "理塘县"
		}, {
			value: "513335",
			text: "巴塘县"
		}, {
			value: "513336",
			text: "乡城县"
		}, {
			value: "513337",
			text: "稻城县"
		}, {
			value: "513338",
			text: "得荣县"
		}, {
			value: "513339",
			text: "其它区"
		}]
	}, {
		value: "513400",
		text: "凉山彝族自治州",
		children: [{
			value: "513401",
			text: "西昌市"
		}, {
			value: "513422",
			text: "木里藏族自治县"
		}, {
			value: "513423",
			text: "盐源县"
		}, {
			value: "513424",
			text: "德昌县"
		}, {
			value: "513425",
			text: "会理县"
		}, {
			value: "513426",
			text: "会东县"
		}, {
			value: "513427",
			text: "宁南县"
		}, {
			value: "513428",
			text: "普格县"
		}, {
			value: "513429",
			text: "布拖县"
		}, {
			value: "513430",
			text: "金阳县"
		}, {
			value: "513431",
			text: "昭觉县"
		}, {
			value: "513432",
			text: "喜德县"
		}, {
			value: "513433",
			text: "冕宁县"
		}, {
			value: "513434",
			text: "越西县"
		}, {
			value: "513435",
			text: "甘洛县"
		}, {
			value: "513436",
			text: "美姑县"
		}, {
			value: "513437",
			text: "雷波县"
		}, {
			value: "513438",
			text: "其它区"
		}]
	}]
}, {
	value: '520000',
	text: '贵州省',
	children: [{
		value: "520100",
		text: "贵阳市",
		children: [{
			value: "520102",
			text: "南明区"
		}, {
			value: "520103",
			text: "云岩区"
		}, {
			value: "520111",
			text: "花溪区"
		}, {
			value: "520112",
			text: "乌当区"
		}, {
			value: "520113",
			text: "白云区"
		}, {
			value: "520114",
			text: "小河区"
		}, {
			value: "520121",
			text: "开阳县"
		}, {
			value: "520122",
			text: "息烽县"
		}, {
			value: "520123",
			text: "修文县"
		}, {
			value: "520151",
			text: "金阳开发区"
		}, {
			value: "520181",
			text: "清镇市"
		}, {
			value: "520182",
			text: "其它区"
		}]
	}, {
		value: "520200",
		text: "六盘水市",
		children: [{
			value: "520201",
			text: "钟山区"
		}, {
			value: "520203",
			text: "六枝特区"
		}, {
			value: "520221",
			text: "水城县"
		}, {
			value: "520222",
			text: "盘县"
		}, {
			value: "520223",
			text: "其它区"
		}]
	}, {
		value: "520300",
		text: "遵义市",
		children: [{
			value: "520302",
			text: "红花岗区"
		}, {
			value: "520303",
			text: "汇川区"
		}, {
			value: "520321",
			text: "遵义县"
		}, {
			value: "520322",
			text: "桐梓县"
		}, {
			value: "520323",
			text: "绥阳县"
		}, {
			value: "520324",
			text: "正安县"
		}, {
			value: "520325",
			text: "道真仡佬族苗族自治县"
		}, {
			value: "520326",
			text: "务川仡佬族苗族自治县"
		}, {
			value: "520327",
			text: "凤冈县"
		}, {
			value: "520328",
			text: "湄潭县"
		}, {
			value: "520329",
			text: "余庆县"
		}, {
			value: "520330",
			text: "习水县"
		}, {
			value: "520381",
			text: "赤水市"
		}, {
			value: "520382",
			text: "仁怀市"
		}, {
			value: "520383",
			text: "其它区"
		}]
	}, {
		value: "520400",
		text: "安顺市",
		children: [{
			value: "520402",
			text: "西秀区"
		}, {
			value: "520421",
			text: "平坝县"
		}, {
			value: "520422",
			text: "普定县"
		}, {
			value: "520423",
			text: "镇宁布依族苗族自治县"
		}, {
			value: "520424",
			text: "关岭布依族苗族自治县"
		}, {
			value: "520425",
			text: "紫云苗族布依族自治县"
		}, {
			value: "520426",
			text: "其它区"
		}]
	}, {
		value: "522200",
		text: "铜仁地区",
		children: [{
			value: "522201",
			text: "铜仁市"
		}, {
			value: "522222",
			text: "江口县"
		}, {
			value: "522223",
			text: "玉屏侗族自治县"
		}, {
			value: "522224",
			text: "石阡县"
		}, {
			value: "522225",
			text: "思南县"
		}, {
			value: "522226",
			text: "印江土家族苗族自治县"
		}, {
			value: "522227",
			text: "德江县"
		}, {
			value: "522228",
			text: "沿河土家族自治县"
		}, {
			value: "522229",
			text: "松桃苗族自治县"
		}, {
			value: "522230",
			text: "万山特区"
		}, {
			value: "522231",
			text: "其它区"
		}]
	}, {
		value: "522300",
		text: "黔西南布依族苗族自治州",
		children: [{
			value: "522301",
			text: "兴义市"
		}, {
			value: "522322",
			text: "兴仁县"
		}, {
			value: "522323",
			text: "普安县"
		}, {
			value: "522324",
			text: "晴隆县"
		}, {
			value: "522325",
			text: "贞丰县"
		}, {
			value: "522326",
			text: "望谟县"
		}, {
			value: "522327",
			text: "册亨县"
		}, {
			value: "522328",
			text: "安龙县"
		}, {
			value: "522329",
			text: "其它区"
		}]
	}, {
		value: "522400",
		text: "毕节地区",
		children: [{
			value: "522401",
			text: "毕节市"
		}, {
			value: "522422",
			text: "大方县"
		}, {
			value: "522423",
			text: "黔西县"
		}, {
			value: "522424",
			text: "金沙县"
		}, {
			value: "522425",
			text: "织金县"
		}, {
			value: "522426",
			text: "纳雍县"
		}, {
			value: "522427",
			text: "威宁彝族回族苗族自治县"
		}, {
			value: "522428",
			text: "赫章县"
		}, {
			value: "522429",
			text: "其它区"
		}]
	}, {
		value: "522600",
		text: "黔东南苗族侗族自治州",
		children: [{
			value: "522601",
			text: "凯里市"
		}, {
			value: "522622",
			text: "黄平县"
		}, {
			value: "522623",
			text: "施秉县"
		}, {
			value: "522624",
			text: "三穗县"
		}, {
			value: "522625",
			text: "镇远县"
		}, {
			value: "522626",
			text: "岑巩县"
		}, {
			value: "522627",
			text: "天柱县"
		}, {
			value: "522628",
			text: "锦屏县"
		}, {
			value: "522629",
			text: "剑河县"
		}, {
			value: "522630",
			text: "台江县"
		}, {
			value: "522631",
			text: "黎平县"
		}, {
			value: "522632",
			text: "榕江县"
		}, {
			value: "522633",
			text: "从江县"
		}, {
			value: "522634",
			text: "雷山县"
		}, {
			value: "522635",
			text: "麻江县"
		}, {
			value: "522636",
			text: "丹寨县"
		}, {
			value: "522637",
			text: "其它区"
		}]
	}, {
		value: "522700",
		text: "黔南布依族苗族自治州",
		children: [{
			value: "522701",
			text: "都匀市"
		}, {
			value: "522702",
			text: "福泉市"
		}, {
			value: "522722",
			text: "荔波县"
		}, {
			value: "522723",
			text: "贵定县"
		}, {
			value: "522725",
			text: "瓮安县"
		}, {
			value: "522726",
			text: "独山县"
		}, {
			value: "522727",
			text: "平塘县"
		}, {
			value: "522728",
			text: "罗甸县"
		}, {
			value: "522729",
			text: "长顺县"
		}, {
			value: "522730",
			text: "龙里县"
		}, {
			value: "522731",
			text: "惠水县"
		}, {
			value: "522732",
			text: "三都水族自治县"
		}, {
			value: "522733",
			text: "其它区"
		}]
	}]
}, {
	value: '530000',
	text: '云南省',
	children: [{
		value: "530100",
		text: "昆明市",
		children: [{
			value: "530102",
			text: "五华区"
		}, {
			value: "530103",
			text: "盘龙区"
		}, {
			value: "530111",
			text: "官渡区"
		}, {
			value: "530112",
			text: "西山区"
		}, {
			value: "530113",
			text: "东川区"
		}, {
			value: "530121",
			text: "呈贡县"
		}, {
			value: "530122",
			text: "晋宁县"
		}, {
			value: "530124",
			text: "富民县"
		}, {
			value: "530125",
			text: "宜良县"
		}, {
			value: "530126",
			text: "石林彝族自治县"
		}, {
			value: "530127",
			text: "嵩明县"
		}, {
			value: "530128",
			text: "禄劝彝族苗族自治县"
		}, {
			value: "530129",
			text: "寻甸回族彝族自治县"
		}, {
			value: "530181",
			text: "安宁市"
		}, {
			value: "530182",
			text: "其它区"
		}]
	}, {
		value: "530300",
		text: "曲靖市",
		children: [{
			value: "530302",
			text: "麒麟区"
		}, {
			value: "530321",
			text: "马龙县"
		}, {
			value: "530322",
			text: "陆良县"
		}, {
			value: "530323",
			text: "师宗县"
		}, {
			value: "530324",
			text: "罗平县"
		}, {
			value: "530325",
			text: "富源县"
		}, {
			value: "530326",
			text: "会泽县"
		}, {
			value: "530328",
			text: "沾益县"
		}, {
			value: "530381",
			text: "宣威市"
		}, {
			value: "530382",
			text: "其它区"
		}]
	}, {
		value: "530400",
		text: "玉溪市",
		children: [{
			value: "530402",
			text: "红塔区"
		}, {
			value: "530421",
			text: "江川县"
		}, {
			value: "530422",
			text: "澄江县"
		}, {
			value: "530423",
			text: "通海县"
		}, {
			value: "530424",
			text: "华宁县"
		}, {
			value: "530425",
			text: "易门县"
		}, {
			value: "530426",
			text: "峨山彝族自治县"
		}, {
			value: "530427",
			text: "新平彝族傣族自治县"
		}, {
			value: "530428",
			text: "元江哈尼族彝族傣族自治县"
		}, {
			value: "530429",
			text: "其它区"
		}]
	}, {
		value: "530500",
		text: "保山市",
		children: [{
			value: "530502",
			text: "隆阳区"
		}, {
			value: "530521",
			text: "施甸县"
		}, {
			value: "530522",
			text: "腾冲县"
		}, {
			value: "530523",
			text: "龙陵县"
		}, {
			value: "530524",
			text: "昌宁县"
		}, {
			value: "530525",
			text: "其它区"
		}]
	}, {
		value: "530600",
		text: "昭通市",
		children: [{
			value: "530602",
			text: "昭阳区"
		}, {
			value: "530621",
			text: "鲁甸县"
		}, {
			value: "530622",
			text: "巧家县"
		}, {
			value: "530623",
			text: "盐津县"
		}, {
			value: "530624",
			text: "大关县"
		}, {
			value: "530625",
			text: "永善县"
		}, {
			value: "530626",
			text: "绥江县"
		}, {
			value: "530627",
			text: "镇雄县"
		}, {
			value: "530628",
			text: "彝良县"
		}, {
			value: "530629",
			text: "威信县"
		}, {
			value: "530630",
			text: "水富县"
		}, {
			value: "530631",
			text: "其它区"
		}]
	}, {
		value: "530700",
		text: "丽江市",
		children: [{
			value: "530702",
			text: "古城区"
		}, {
			value: "530721",
			text: "玉龙纳西族自治县"
		}, {
			value: "530722",
			text: "永胜县"
		}, {
			value: "530723",
			text: "华坪县"
		}, {
			value: "530724",
			text: "宁蒗彝族自治县"
		}, {
			value: "530725",
			text: "其它区"
		}]
	}, {
		value: "530800",
		text: "普洱市",
		children: [{
			value: "530802",
			text: "思茅区"
		}, {
			value: "530821",
			text: "宁洱哈尼族彝族自治县"
		}, {
			value: "530822",
			text: "墨江哈尼族自治县"
		}, {
			value: "530823",
			text: "景东彝族自治县"
		}, {
			value: "530824",
			text: "景谷傣族彝族自治县"
		}, {
			value: "530825",
			text: "镇沅彝族哈尼族拉祜族自治县"
		}, {
			value: "530826",
			text: "江城哈尼族彝族自治县"
		}, {
			value: "530827",
			text: "孟连傣族拉祜族佤族自治县"
		}, {
			value: "530828",
			text: "澜沧拉祜族自治县"
		}, {
			value: "530829",
			text: "西盟佤族自治县"
		}, {
			value: "530830",
			text: "其它区"
		}]
	}, {
		value: "530900",
		text: "临沧市",
		children: [{
			value: "530902",
			text: "临翔区"
		}, {
			value: "530921",
			text: "凤庆县"
		}, {
			value: "530922",
			text: "云县"
		}, {
			value: "530923",
			text: "永德县"
		}, {
			value: "530924",
			text: "镇康县"
		}, {
			value: "530925",
			text: "双江拉祜族佤族布朗族傣族自治县"
		}, {
			value: "530926",
			text: "耿马傣族佤族自治县"
		}, {
			value: "530927",
			text: "沧源佤族自治县"
		}, {
			value: "530928",
			text: "其它区"
		}]
	}, {
		value: "532300",
		text: "楚雄彝族自治州",
		children: [{
			value: "532301",
			text: "楚雄市"
		}, {
			value: "532322",
			text: "双柏县"
		}, {
			value: "532323",
			text: "牟定县"
		}, {
			value: "532324",
			text: "南华县"
		}, {
			value: "532325",
			text: "姚安县"
		}, {
			value: "532326",
			text: "大姚县"
		}, {
			value: "532327",
			text: "永仁县"
		}, {
			value: "532328",
			text: "元谋县"
		}, {
			value: "532329",
			text: "武定县"
		}, {
			value: "532331",
			text: "禄丰县"
		}, {
			value: "532332",
			text: "其它区"
		}]
	}, {
		value: "532500",
		text: "红河哈尼族彝族自治州",
		children: [{
			value: "532501",
			text: "个旧市"
		}, {
			value: "532502",
			text: "开远市"
		}, {
			value: "532522",
			text: "蒙自县"
		}, {
			value: "532523",
			text: "屏边苗族自治县"
		}, {
			value: "532524",
			text: "建水县"
		}, {
			value: "532525",
			text: "石屏县"
		}, {
			value: "532526",
			text: "弥勒县"
		}, {
			value: "532527",
			text: "泸西县"
		}, {
			value: "532528",
			text: "元阳县"
		}, {
			value: "532529",
			text: "红河县"
		}, {
			value: "532530",
			text: "金平苗族瑶族傣族自治县"
		}, {
			value: "532531",
			text: "绿春县"
		}, {
			value: "532532",
			text: "河口瑶族自治县"
		}, {
			value: "532533",
			text: "其它区"
		}]
	}, {
		value: "532600",
		text: "文山壮族苗族自治州",
		children: [{
			value: "532621",
			text: "文山县"
		}, {
			value: "532622",
			text: "砚山县"
		}, {
			value: "532623",
			text: "西畴县"
		}, {
			value: "532624",
			text: "麻栗坡县"
		}, {
			value: "532625",
			text: "马关县"
		}, {
			value: "532626",
			text: "丘北县"
		}, {
			value: "532627",
			text: "广南县"
		}, {
			value: "532628",
			text: "富宁县"
		}, {
			value: "532629",
			text: "其它区"
		}]
	}, {
		value: "532800",
		text: "西双版纳傣族自治州",
		children: [{
			value: "532801",
			text: "景洪市"
		}, {
			value: "532822",
			text: "勐海县"
		}, {
			value: "532823",
			text: "勐腊县"
		}, {
			value: "532824",
			text: "其它区"
		}]
	}, {
		value: "532900",
		text: "大理白族自治州",
		children: [{
			value: "532901",
			text: "大理市"
		}, {
			value: "532922",
			text: "漾濞彝族自治县"
		}, {
			value: "532923",
			text: "祥云县"
		}, {
			value: "532924",
			text: "宾川县"
		}, {
			value: "532925",
			text: "弥渡县"
		}, {
			value: "532926",
			text: "南涧彝族自治县"
		}, {
			value: "532927",
			text: "巍山彝族回族自治县"
		}, {
			value: "532928",
			text: "永平县"
		}, {
			value: "532929",
			text: "云龙县"
		}, {
			value: "532930",
			text: "洱源县"
		}, {
			value: "532931",
			text: "剑川县"
		}, {
			value: "532932",
			text: "鹤庆县"
		}, {
			value: "532933",
			text: "其它区"
		}]
	}, {
		value: "533100",
		text: "德宏傣族景颇族自治州",
		children: [{
			value: "533102",
			text: "瑞丽市"
		}, {
			value: "533103",
			text: "潞西市"
		}, {
			value: "533122",
			text: "梁河县"
		}, {
			value: "533123",
			text: "盈江县"
		}, {
			value: "533124",
			text: "陇川县"
		}, {
			value: "533125",
			text: "其它区"
		}]
	}, {
		value: "533300",
		text: "怒江傈僳族自治州",
		children: [{
			value: "533321",
			text: "泸水县"
		}, {
			value: "533323",
			text: "福贡县"
		}, {
			value: "533324",
			text: "贡山独龙族怒族自治县"
		}, {
			value: "533325",
			text: "兰坪白族普米族自治县"
		}, {
			value: "533326",
			text: "其它区"
		}]
	}, {
		value: "533400",
		text: "迪庆藏族自治州",
		children: [{
			value: "533421",
			text: "香格里拉县"
		}, {
			value: "533422",
			text: "德钦县"
		}, {
			value: "533423",
			text: "维西傈僳族自治县"
		}, {
			value: "533424",
			text: "其它区"
		}]
	}]
}, {
	value: '540000',
	text: '西藏',
	children: [{
		value: "540100",
		text: "拉萨市",
		children: [{
			value: "540102",
			text: "城关区"
		}, {
			value: "540121",
			text: "林周县"
		}, {
			value: "540122",
			text: "当雄县"
		}, {
			value: "540123",
			text: "尼木县"
		}, {
			value: "540124",
			text: "曲水县"
		}, {
			value: "540125",
			text: "堆龙德庆县"
		}, {
			value: "540126",
			text: "达孜县"
		}, {
			value: "540127",
			text: "墨竹工卡县"
		}, {
			value: "540128",
			text: "其它区"
		}]
	}, {
		value: "542100",
		text: "昌都地区",
		children: [{
			value: "542121",
			text: "昌都县"
		}, {
			value: "542122",
			text: "江达县"
		}, {
			value: "542123",
			text: "贡觉县"
		}, {
			value: "542124",
			text: "类乌齐县"
		}, {
			value: "542125",
			text: "丁青县"
		}, {
			value: "542126",
			text: "察雅县"
		}, {
			value: "542127",
			text: "八宿县"
		}, {
			value: "542128",
			text: "左贡县"
		}, {
			value: "542129",
			text: "芒康县"
		}, {
			value: "542132",
			text: "洛隆县"
		}, {
			value: "542133",
			text: "边坝县"
		}, {
			value: "542134",
			text: "其它区"
		}]
	}, {
		value: "542200",
		text: "山南地区",
		children: [{
			value: "542221",
			text: "乃东县"
		}, {
			value: "542222",
			text: "扎囊县"
		}, {
			value: "542223",
			text: "贡嘎县"
		}, {
			value: "542224",
			text: "桑日县"
		}, {
			value: "542225",
			text: "琼结县"
		}, {
			value: "542226",
			text: "曲松县"
		}, {
			value: "542227",
			text: "措美县"
		}, {
			value: "542228",
			text: "洛扎县"
		}, {
			value: "542229",
			text: "加查县"
		}, {
			value: "542231",
			text: "隆子县"
		}, {
			value: "542232",
			text: "错那县"
		}, {
			value: "542233",
			text: "浪卡子县"
		}, {
			value: "542234",
			text: "其它区"
		}]
	}, {
		value: "542300",
		text: "日喀则地区",
		children: [{
			value: "542301",
			text: "日喀则市"
		}, {
			value: "542322",
			text: "南木林县"
		}, {
			value: "542323",
			text: "江孜县"
		}, {
			value: "542324",
			text: "定日县"
		}, {
			value: "542325",
			text: "萨迦县"
		}, {
			value: "542326",
			text: "拉孜县"
		}, {
			value: "542327",
			text: "昂仁县"
		}, {
			value: "542328",
			text: "谢通门县"
		}, {
			value: "542329",
			text: "白朗县"
		}, {
			value: "542330",
			text: "仁布县"
		}, {
			value: "542331",
			text: "康马县"
		}, {
			value: "542332",
			text: "定结县"
		}, {
			value: "542333",
			text: "仲巴县"
		}, {
			value: "542334",
			text: "亚东县"
		}, {
			value: "542335",
			text: "吉隆县"
		}, {
			value: "542336",
			text: "聂拉木县"
		}, {
			value: "542337",
			text: "萨嘎县"
		}, {
			value: "542338",
			text: "岗巴县"
		}, {
			value: "542339",
			text: "其它区"
		}]
	}, {
		value: "542400",
		text: "那曲地区",
		children: [{
			value: "542421",
			text: "那曲县"
		}, {
			value: "542422",
			text: "嘉黎县"
		}, {
			value: "542423",
			text: "比如县"
		}, {
			value: "542424",
			text: "聂荣县"
		}, {
			value: "542425",
			text: "安多县"
		}, {
			value: "542426",
			text: "申扎县"
		}, {
			value: "542427",
			text: "索县"
		}, {
			value: "542428",
			text: "班戈县"
		}, {
			value: "542429",
			text: "巴青县"
		}, {
			value: "542430",
			text: "尼玛县"
		}, {
			value: "542431",
			text: "其它区"
		}]
	}, {
		value: "542500",
		text: "阿里地区",
		children: [{
			value: "542521",
			text: "普兰县"
		}, {
			value: "542522",
			text: "札达县"
		}, {
			value: "542523",
			text: "噶尔县"
		}, {
			value: "542524",
			text: "日土县"
		}, {
			value: "542525",
			text: "革吉县"
		}, {
			value: "542526",
			text: "改则县"
		}, {
			value: "542527",
			text: "措勤县"
		}, {
			value: "542528",
			text: "其它区"
		}]
	}, {
		value: "542600",
		text: "林芝地区",
		children: [{
			value: "542621",
			text: "林芝县"
		}, {
			value: "542622",
			text: "工布江达县"
		}, {
			value: "542623",
			text: "米林县"
		}, {
			value: "542624",
			text: "墨脱县"
		}, {
			value: "542625",
			text: "波密县"
		}, {
			value: "542626",
			text: "察隅县"
		}, {
			value: "542627",
			text: "朗县"
		}, {
			value: "542628",
			text: "其它区"
		}]
	}]
}, {
	value: '610000',
	text: '陕西省',
	children: [{
		value: "610100",
		text: "西安市",
		children: [{
			value: "610102",
			text: "新城区"
		}, {
			value: "610103",
			text: "碑林区"
		}, {
			value: "610104",
			text: "莲湖区"
		}, {
			value: "610111",
			text: "灞桥区"
		}, {
			value: "610112",
			text: "未央区"
		}, {
			value: "610113",
			text: "雁塔区"
		}, {
			value: "610114",
			text: "阎良区"
		}, {
			value: "610115",
			text: "临潼区"
		}, {
			value: "610116",
			text: "长安区"
		}, {
			value: "610122",
			text: "蓝田县"
		}, {
			value: "610124",
			text: "周至县"
		}, {
			value: "610125",
			text: "户县"
		}, {
			value: "610126",
			text: "高陵县"
		}, {
			value: "610127",
			text: "其它区"
		}]
	}, {
		value: "610200",
		text: "铜川市",
		children: [{
			value: "610202",
			text: "王益区"
		}, {
			value: "610203",
			text: "印台区"
		}, {
			value: "610204",
			text: "耀州区"
		}, {
			value: "610222",
			text: "宜君县"
		}, {
			value: "610223",
			text: "其它区"
		}]
	}, {
		value: "610300",
		text: "宝鸡市",
		children: [{
			value: "610302",
			text: "渭滨区"
		}, {
			value: "610303",
			text: "金台区"
		}, {
			value: "610304",
			text: "陈仓区"
		}, {
			value: "610322",
			text: "凤翔县"
		}, {
			value: "610323",
			text: "岐山县"
		}, {
			value: "610324",
			text: "扶风县"
		}, {
			value: "610326",
			text: "眉县"
		}, {
			value: "610327",
			text: "陇县"
		}, {
			value: "610328",
			text: "千阳县"
		}, {
			value: "610329",
			text: "麟游县"
		}, {
			value: "610330",
			text: "凤县"
		}, {
			value: "610331",
			text: "太白县"
		}, {
			value: "610332",
			text: "其它区"
		}]
	}, {
		value: "610400",
		text: "咸阳市",
		children: [{
			value: "610402",
			text: "秦都区"
		}, {
			value: "610403",
			text: "杨陵区"
		}, {
			value: "610404",
			text: "渭城区"
		}, {
			value: "610422",
			text: "三原县"
		}, {
			value: "610423",
			text: "泾阳县"
		}, {
			value: "610424",
			text: "乾县"
		}, {
			value: "610425",
			text: "礼泉县"
		}, {
			value: "610426",
			text: "永寿县"
		}, {
			value: "610427",
			text: "彬县"
		}, {
			value: "610428",
			text: "长武县"
		}, {
			value: "610429",
			text: "旬邑县"
		}, {
			value: "610430",
			text: "淳化县"
		}, {
			value: "610431",
			text: "武功县"
		}, {
			value: "610481",
			text: "兴平市"
		}, {
			value: "610482",
			text: "其它区"
		}]
	}, {
		value: "610500",
		text: "渭南市",
		children: [{
			value: "610502",
			text: "临渭区"
		}, {
			value: "610521",
			text: "华县"
		}, {
			value: "610522",
			text: "潼关县"
		}, {
			value: "610523",
			text: "大荔县"
		}, {
			value: "610524",
			text: "合阳县"
		}, {
			value: "610525",
			text: "澄城县"
		}, {
			value: "610526",
			text: "蒲城县"
		}, {
			value: "610527",
			text: "白水县"
		}, {
			value: "610528",
			text: "富平县"
		}, {
			value: "610581",
			text: "韩城市"
		}, {
			value: "610582",
			text: "华阴市"
		}, {
			value: "610583",
			text: "其它区"
		}]
	}, {
		value: "610600",
		text: "延安市",
		children: [{
			value: "610602",
			text: "宝塔区"
		}, {
			value: "610621",
			text: "延长县"
		}, {
			value: "610622",
			text: "延川县"
		}, {
			value: "610623",
			text: "子长县"
		}, {
			value: "610624",
			text: "安塞县"
		}, {
			value: "610625",
			text: "志丹县"
		}, {
			value: "610626",
			text: "吴起县"
		}, {
			value: "610627",
			text: "甘泉县"
		}, {
			value: "610628",
			text: "富县"
		}, {
			value: "610629",
			text: "洛川县"
		}, {
			value: "610630",
			text: "宜川县"
		}, {
			value: "610631",
			text: "黄龙县"
		}, {
			value: "610632",
			text: "黄陵县"
		}, {
			value: "610633",
			text: "其它区"
		}]
	}, {
		value: "610700",
		text: "汉中市",
		children: [{
			value: "610702",
			text: "汉台区"
		}, {
			value: "610721",
			text: "南郑县"
		}, {
			value: "610722",
			text: "城固县"
		}, {
			value: "610723",
			text: "洋县"
		}, {
			value: "610724",
			text: "西乡县"
		}, {
			value: "610725",
			text: "勉县"
		}, {
			value: "610726",
			text: "宁强县"
		}, {
			value: "610727",
			text: "略阳县"
		}, {
			value: "610728",
			text: "镇巴县"
		}, {
			value: "610729",
			text: "留坝县"
		}, {
			value: "610730",
			text: "佛坪县"
		}, {
			value: "610731",
			text: "其它区"
		}]
	}, {
		value: "610800",
		text: "榆林市",
		children: [{
			value: "610802",
			text: "榆阳区"
		}, {
			value: "610821",
			text: "神木县"
		}, {
			value: "610822",
			text: "府谷县"
		}, {
			value: "610823",
			text: "横山县"
		}, {
			value: "610824",
			text: "靖边县"
		}, {
			value: "610825",
			text: "定边县"
		}, {
			value: "610826",
			text: "绥德县"
		}, {
			value: "610827",
			text: "米脂县"
		}, {
			value: "610828",
			text: "佳县"
		}, {
			value: "610829",
			text: "吴堡县"
		}, {
			value: "610830",
			text: "清涧县"
		}, {
			value: "610831",
			text: "子洲县"
		}, {
			value: "610832",
			text: "其它区"
		}]
	}, {
		value: "610900",
		text: "安康市",
		children: [{
			value: "610902",
			text: "汉滨区"
		}, {
			value: "610921",
			text: "汉阴县"
		}, {
			value: "610922",
			text: "石泉县"
		}, {
			value: "610923",
			text: "宁陕县"
		}, {
			value: "610924",
			text: "紫阳县"
		}, {
			value: "610925",
			text: "岚皋县"
		}, {
			value: "610926",
			text: "平利县"
		}, {
			value: "610927",
			text: "镇坪县"
		}, {
			value: "610928",
			text: "旬阳县"
		}, {
			value: "610929",
			text: "白河县"
		}, {
			value: "610930",
			text: "其它区"
		}]
	}, {
		value: "611000",
		text: "商洛市",
		children: [{
			value: "611002",
			text: "商州区"
		}, {
			value: "611021",
			text: "洛南县"
		}, {
			value: "611022",
			text: "丹凤县"
		}, {
			value: "611023",
			text: "商南县"
		}, {
			value: "611024",
			text: "山阳县"
		}, {
			value: "611025",
			text: "镇安县"
		}, {
			value: "611026",
			text: "柞水县"
		}, {
			value: "611027",
			text: "其它区"
		}]
	}]
}, {
	value: '620000',
	text: '甘肃省',
	children: [{
		value: "620100",
		text: "兰州市",
		children: [{
			value: "620102",
			text: "城关区"
		}, {
			value: "620103",
			text: "七里河区"
		}, {
			value: "620104",
			text: "西固区"
		}, {
			value: "620105",
			text: "安宁区"
		}, {
			value: "620111",
			text: "红古区"
		}, {
			value: "620121",
			text: "永登县"
		}, {
			value: "620122",
			text: "皋兰县"
		}, {
			value: "620123",
			text: "榆中县"
		}, {
			value: "620124",
			text: "其它区"
		}]
	}, {
		value: "620200",
		text: "嘉峪关市",
		children: []
	}, {
		value: "620300",
		text: "金昌市",
		children: [{
			value: "620302",
			text: "金川区"
		}, {
			value: "620321",
			text: "永昌县"
		}, {
			value: "620322",
			text: "其它区"
		}]
	}, {
		value: "620400",
		text: "白银市",
		children: [{
			value: "620402",
			text: "白银区"
		}, {
			value: "620403",
			text: "平川区"
		}, {
			value: "620421",
			text: "靖远县"
		}, {
			value: "620422",
			text: "会宁县"
		}, {
			value: "620423",
			text: "景泰县"
		}, {
			value: "620424",
			text: "其它区"
		}]
	}, {
		value: "620500",
		text: "天水市",
		children: [{
			value: "620502",
			text: "秦州区"
		}, {
			value: "620503",
			text: "麦积区"
		}, {
			value: "620521",
			text: "清水县"
		}, {
			value: "620522",
			text: "秦安县"
		}, {
			value: "620523",
			text: "甘谷县"
		}, {
			value: "620524",
			text: "武山县"
		}, {
			value: "620525",
			text: "张家川回族自治县"
		}, {
			value: "620526",
			text: "其它区"
		}]
	}, {
		value: "620600",
		text: "武威市",
		children: [{
			value: "620602",
			text: "凉州区"
		}, {
			value: "620621",
			text: "民勤县"
		}, {
			value: "620622",
			text: "古浪县"
		}, {
			value: "620623",
			text: "天祝藏族自治县"
		}, {
			value: "620624",
			text: "其它区"
		}]
	}, {
		value: "620700",
		text: "张掖市",
		children: [{
			value: "620702",
			text: "甘州区"
		}, {
			value: "620721",
			text: "肃南裕固族自治县"
		}, {
			value: "620722",
			text: "民乐县"
		}, {
			value: "620723",
			text: "临泽县"
		}, {
			value: "620724",
			text: "高台县"
		}, {
			value: "620725",
			text: "山丹县"
		}, {
			value: "620726",
			text: "其它区"
		}]
	}, {
		value: "620800",
		text: "平凉市",
		children: [{
			value: "620802",
			text: "崆峒区"
		}, {
			value: "620821",
			text: "泾川县"
		}, {
			value: "620822",
			text: "灵台县"
		}, {
			value: "620823",
			text: "崇信县"
		}, {
			value: "620824",
			text: "华亭县"
		}, {
			value: "620825",
			text: "庄浪县"
		}, {
			value: "620826",
			text: "静宁县"
		}, {
			value: "620827",
			text: "其它区"
		}]
	}, {
		value: "620900",
		text: "酒泉市",
		children: [{
			value: "620902",
			text: "肃州区"
		}, {
			value: "620921",
			text: "金塔县"
		}, {
			value: "620922",
			text: "安西县"
		}, {
			value: "620923",
			text: "肃北蒙古族自治县"
		}, {
			value: "620924",
			text: "阿克塞哈萨克族自治县"
		}, {
			value: "620981",
			text: "玉门市"
		}, {
			value: "620982",
			text: "敦煌市"
		}, {
			value: "620983",
			text: "其它区"
		}]
	}, {
		value: "621000",
		text: "庆阳市",
		children: [{
			value: "621002",
			text: "西峰区"
		}, {
			value: "621021",
			text: "庆城县"
		}, {
			value: "621022",
			text: "环县"
		}, {
			value: "621023",
			text: "华池县"
		}, {
			value: "621024",
			text: "合水县"
		}, {
			value: "621025",
			text: "正宁县"
		}, {
			value: "621026",
			text: "宁县"
		}, {
			value: "621027",
			text: "镇原县"
		}, {
			value: "621028",
			text: "其它区"
		}]
	}, {
		value: "621100",
		text: "定西市",
		children: [{
			value: "621102",
			text: "安定区"
		}, {
			value: "621121",
			text: "通渭县"
		}, {
			value: "621122",
			text: "陇西县"
		}, {
			value: "621123",
			text: "渭源县"
		}, {
			value: "621124",
			text: "临洮县"
		}, {
			value: "621125",
			text: "漳县"
		}, {
			value: "621126",
			text: "岷县"
		}, {
			value: "621127",
			text: "其它区"
		}]
	}, {
		value: "621200",
		text: "陇南市",
		children: [{
			value: "621202",
			text: "武都区"
		}, {
			value: "621221",
			text: "成县"
		}, {
			value: "621222",
			text: "文县"
		}, {
			value: "621223",
			text: "宕昌县"
		}, {
			value: "621224",
			text: "康县"
		}, {
			value: "621225",
			text: "西和县"
		}, {
			value: "621226",
			text: "礼县"
		}, {
			value: "621227",
			text: "徽县"
		}, {
			value: "621228",
			text: "两当县"
		}, {
			value: "621229",
			text: "其它区"
		}]
	}, {
		value: "622900",
		text: "临夏回族自治州",
		children: [{
			value: "622901",
			text: "临夏市"
		}, {
			value: "622921",
			text: "临夏县"
		}, {
			value: "622922",
			text: "康乐县"
		}, {
			value: "622923",
			text: "永靖县"
		}, {
			value: "622924",
			text: "广河县"
		}, {
			value: "622925",
			text: "和政县"
		}, {
			value: "622926",
			text: "东乡族自治县"
		}, {
			value: "622927",
			text: "积石山保安族东乡族撒拉族自治县"
		}, {
			value: "622928",
			text: "其它区"
		}]
	}, {
		value: "623000",
		text: "甘南藏族自治州",
		children: [{
			value: "623001",
			text: "合作市"
		}, {
			value: "623021",
			text: "临潭县"
		}, {
			value: "623022",
			text: "卓尼县"
		}, {
			value: "623023",
			text: "舟曲县"
		}, {
			value: "623024",
			text: "迭部县"
		}, {
			value: "623025",
			text: "玛曲县"
		}, {
			value: "623026",
			text: "碌曲县"
		}, {
			value: "623027",
			text: "夏河县"
		}, {
			value: "623028",
			text: "其它区"
		}]
	}]
}, {
	value: '630000',
	text: '青海省',
	children: [{
		value: "630100",
		text: "西宁市",
		children: [{
			value: "630102",
			text: "城东区"
		}, {
			value: "630103",
			text: "城中区"
		}, {
			value: "630104",
			text: "城西区"
		}, {
			value: "630105",
			text: "城北区"
		}, {
			value: "630121",
			text: "大通回族土族自治县"
		}, {
			value: "630122",
			text: "湟中县"
		}, {
			value: "630123",
			text: "湟源县"
		}, {
			value: "630124",
			text: "其它区"
		}]
	}, {
		value: "632100",
		text: "海东地区",
		children: [{
			value: "632121",
			text: "平安县"
		}, {
			value: "632122",
			text: "民和回族土族自治县"
		}, {
			value: "632123",
			text: "乐都县"
		}, {
			value: "632126",
			text: "互助土族自治县"
		}, {
			value: "632127",
			text: "化隆回族自治县"
		}, {
			value: "632128",
			text: "循化撒拉族自治县"
		}, {
			value: "632129",
			text: "其它区"
		}]
	}, {
		value: "632200",
		text: "海北藏族自治州",
		children: [{
			value: "632221",
			text: "门源回族自治县"
		}, {
			value: "632222",
			text: "祁连县"
		}, {
			value: "632223",
			text: "海晏县"
		}, {
			value: "632224",
			text: "刚察县"
		}, {
			value: "632225",
			text: "其它区"
		}]
	}, {
		value: "632300",
		text: "黄南藏族自治州",
		children: [{
			value: "632321",
			text: "同仁县"
		}, {
			value: "632322",
			text: "尖扎县"
		}, {
			value: "632323",
			text: "泽库县"
		}, {
			value: "632324",
			text: "河南蒙古族自治县"
		}, {
			value: "632325",
			text: "其它区"
		}]
	}, {
		value: "632500",
		text: "海南藏族自治州",
		children: [{
			value: "632521",
			text: "共和县"
		}, {
			value: "632522",
			text: "同德县"
		}, {
			value: "632523",
			text: "贵德县"
		}, {
			value: "632524",
			text: "兴海县"
		}, {
			value: "632525",
			text: "贵南县"
		}, {
			value: "632526",
			text: "其它区"
		}]
	}, {
		value: "632600",
		text: "果洛藏族自治州",
		children: [{
			value: "632621",
			text: "玛沁县"
		}, {
			value: "632622",
			text: "班玛县"
		}, {
			value: "632623",
			text: "甘德县"
		}, {
			value: "632624",
			text: "达日县"
		}, {
			value: "632625",
			text: "久治县"
		}, {
			value: "632626",
			text: "玛多县"
		}, {
			value: "632627",
			text: "其它区"
		}]
	}, {
		value: "632700",
		text: "玉树藏族自治州",
		children: [{
			value: "632721",
			text: "玉树县"
		}, {
			value: "632722",
			text: "杂多县"
		}, {
			value: "632723",
			text: "称多县"
		}, {
			value: "632724",
			text: "治多县"
		}, {
			value: "632725",
			text: "囊谦县"
		}, {
			value: "632726",
			text: "曲麻莱县"
		}, {
			value: "632727",
			text: "其它区"
		}]
	}, {
		value: "632800",
		text: "海西蒙古族藏族自治州",
		children: [{
			value: "632801",
			text: "格尔木市"
		}, {
			value: "632802",
			text: "德令哈市"
		}, {
			value: "632821",
			text: "乌兰县"
		}, {
			value: "632822",
			text: "都兰县"
		}, {
			value: "632823",
			text: "天峻县"
		}, {
			value: "632824",
			text: "其它区"
		}]
	}]
}, {
	value: '640000',
	text: '宁夏',
	children: [{
		value: "640100",
		text: "银川市",
		children: [{
			value: "640104",
			text: "兴庆区"
		}, {
			value: "640105",
			text: "西夏区"
		}, {
			value: "640106",
			text: "金凤区"
		}, {
			value: "640121",
			text: "永宁县"
		}, {
			value: "640122",
			text: "贺兰县"
		}, {
			value: "640181",
			text: "灵武市"
		}, {
			value: "640182",
			text: "其它区"
		}]
	}, {
		value: "640200",
		text: "石嘴山市",
		children: [{
			value: "640202",
			text: "大武口区"
		}, {
			value: "640205",
			text: "惠农区"
		}, {
			value: "640221",
			text: "平罗县"
		}, {
			value: "640222",
			text: "其它区"
		}]
	}, {
		value: "640300",
		text: "吴忠市",
		children: [{
			value: "640302",
			text: "利通区"
		}, {
			value: "640303",
			text: "红寺堡区"
		}, {
			value: "640323",
			text: "盐池县"
		}, {
			value: "640324",
			text: "同心县"
		}, {
			value: "640381",
			text: "青铜峡市"
		}, {
			value: "640382",
			text: "其它区"
		}]
	}, {
		value: "640400",
		text: "固原市",
		children: [{
			value: "640402",
			text: "原州区"
		}, {
			value: "640422",
			text: "西吉县"
		}, {
			value: "640423",
			text: "隆德县"
		}, {
			value: "640424",
			text: "泾源县"
		}, {
			value: "640425",
			text: "彭阳县"
		}, {
			value: "640426",
			text: "其它区"
		}]
	}, {
		value: "640500",
		text: "中卫市",
		children: [{
			value: "640502",
			text: "沙坡头区"
		}, {
			value: "640521",
			text: "中宁县"
		}, {
			value: "640522",
			text: "海原县"
		}, {
			value: "640523",
			text: "其它区"
		}]
	}]
}, {
	value: '650000',
	text: '新疆',
	children: [{
		value: "650100",
		text: "乌鲁木齐市",
		children: [{
			value: "650102",
			text: "天山区"
		}, {
			value: "650103",
			text: "沙依巴克区"
		}, {
			value: "650104",
			text: "新市区"
		}, {
			value: "650105",
			text: "水磨沟区"
		}, {
			value: "650106",
			text: "头屯河区"
		}, {
			value: "650107",
			text: "达坂城区"
		}, {
			value: "650108",
			text: "东山区"
		}, {
			value: "650109",
			text: "米东区"
		}, {
			value: "650121",
			text: "乌鲁木齐县"
		}, {
			value: "650122",
			text: "其它区"
		}]
	}, {
		value: "650200",
		text: "克拉玛依市",
		children: [{
			value: "650202",
			text: "独山子区"
		}, {
			value: "650203",
			text: "克拉玛依区"
		}, {
			value: "650204",
			text: "白碱滩区"
		}, {
			value: "650205",
			text: "乌尔禾区"
		}, {
			value: "650206",
			text: "其它区"
		}]
	}, {
		value: "652100",
		text: "吐鲁番地区",
		children: [{
			value: "652101",
			text: "吐鲁番市"
		}, {
			value: "652122",
			text: "鄯善县"
		}, {
			value: "652123",
			text: "托克逊县"
		}, {
			value: "652124",
			text: "其它区"
		}]
	}, {
		value: "652200",
		text: "哈密地区",
		children: [{
			value: "652201",
			text: "哈密市"
		}, {
			value: "652222",
			text: "巴里坤哈萨克自治县"
		}, {
			value: "652223",
			text: "伊吾县"
		}, {
			value: "652224",
			text: "其它区"
		}]
	}, {
		value: "652300",
		text: "昌吉回族自治州",
		children: [{
			value: "652301",
			text: "昌吉市"
		}, {
			value: "652302",
			text: "阜康市"
		}, {
			value: "652303",
			text: "米泉市"
		}, {
			value: "652323",
			text: "呼图壁县"
		}, {
			value: "652324",
			text: "玛纳斯县"
		}, {
			value: "652325",
			text: "奇台县"
		}, {
			value: "652327",
			text: "吉木萨尔县"
		}, {
			value: "652328",
			text: "木垒哈萨克自治县"
		}, {
			value: "652329",
			text: "其它区"
		}]
	}, {
		value: "652700",
		text: "博尔塔拉蒙古自治州",
		children: [{
			value: "652701",
			text: "博乐市"
		}, {
			value: "652722",
			text: "精河县"
		}, {
			value: "652723",
			text: "温泉县"
		}, {
			value: "652724",
			text: "其它区"
		}]
	}, {
		value: "652800",
		text: "巴音郭楞蒙古自治州",
		children: [{
			value: "652801",
			text: "库尔勒市"
		}, {
			value: "652822",
			text: "轮台县"
		}, {
			value: "652823",
			text: "尉犁县"
		}, {
			value: "652824",
			text: "若羌县"
		}, {
			value: "652825",
			text: "且末县"
		}, {
			value: "652826",
			text: "焉耆回族自治县"
		}, {
			value: "652827",
			text: "和静县"
		}, {
			value: "652828",
			text: "和硕县"
		}, {
			value: "652829",
			text: "博湖县"
		}, {
			value: "652830",
			text: "其它区"
		}]
	}, {
		value: "652900",
		text: "阿克苏地区",
		children: [{
			value: "652901",
			text: "阿克苏市"
		}, {
			value: "652922",
			text: "温宿县"
		}, {
			value: "652923",
			text: "库车县"
		}, {
			value: "652924",
			text: "沙雅县"
		}, {
			value: "652925",
			text: "新和县"
		}, {
			value: "652926",
			text: "拜城县"
		}, {
			value: "652927",
			text: "乌什县"
		}, {
			value: "652928",
			text: "阿瓦提县"
		}, {
			value: "652929",
			text: "柯坪县"
		}, {
			value: "652930",
			text: "其它区"
		}]
	}, {
		value: "653000",
		text: "克孜勒苏柯尔克孜自治州",
		children: [{
			value: "653001",
			text: "阿图什市"
		}, {
			value: "653022",
			text: "阿克陶县"
		}, {
			value: "653023",
			text: "阿合奇县"
		}, {
			value: "653024",
			text: "乌恰县"
		}, {
			value: "653025",
			text: "其它区"
		}]
	}, {
		value: "653100",
		text: "喀什地区",
		children: [{
			value: "653101",
			text: "喀什市"
		}, {
			value: "653121",
			text: "疏附县"
		}, {
			value: "653122",
			text: "疏勒县"
		}, {
			value: "653123",
			text: "英吉沙县"
		}, {
			value: "653124",
			text: "泽普县"
		}, {
			value: "653125",
			text: "莎车县"
		}, {
			value: "653126",
			text: "叶城县"
		}, {
			value: "653127",
			text: "麦盖提县"
		}, {
			value: "653128",
			text: "岳普湖县"
		}, {
			value: "653129",
			text: "伽师县"
		}, {
			value: "653130",
			text: "巴楚县"
		}, {
			value: "653131",
			text: "塔什库尔干塔吉克自治县"
		}, {
			value: "653132",
			text: "其它区"
		}]
	}, {
		value: "653200",
		text: "和田地区",
		children: [{
			value: "653201",
			text: "和田市"
		}, {
			value: "653221",
			text: "和田县"
		}, {
			value: "653222",
			text: "墨玉县"
		}, {
			value: "653223",
			text: "皮山县"
		}, {
			value: "653224",
			text: "洛浦县"
		}, {
			value: "653225",
			text: "策勒县"
		}, {
			value: "653226",
			text: "于田县"
		}, {
			value: "653227",
			text: "民丰县"
		}, {
			value: "653228",
			text: "其它区"
		}]
	}, {
		value: "654000",
		text: "伊犁哈萨克自治州",
		children: [{
			value: "654002",
			text: "伊宁市"
		}, {
			value: "654003",
			text: "奎屯市"
		}, {
			value: "654021",
			text: "伊宁县"
		}, {
			value: "654022",
			text: "察布查尔锡伯自治县"
		}, {
			value: "654023",
			text: "霍城县"
		}, {
			value: "654024",
			text: "巩留县"
		}, {
			value: "654025",
			text: "新源县"
		}, {
			value: "654026",
			text: "昭苏县"
		}, {
			value: "654027",
			text: "特克斯县"
		}, {
			value: "654028",
			text: "尼勒克县"
		}, {
			value: "654029",
			text: "其它区"
		}]
	}, {
		value: "654200",
		text: "塔城地区",
		children: [{
			value: "654201",
			text: "塔城市"
		}, {
			value: "654202",
			text: "乌苏市"
		}, {
			value: "654221",
			text: "额敏县"
		}, {
			value: "654223",
			text: "沙湾县"
		}, {
			value: "654224",
			text: "托里县"
		}, {
			value: "654225",
			text: "裕民县"
		}, {
			value: "654226",
			text: "和布克赛尔蒙古自治县"
		}, {
			value: "654227",
			text: "其它区"
		}]
	}, {
		value: "654300",
		text: "阿勒泰地区",
		children: [{
			value: "654301",
			text: "阿勒泰市"
		}, {
			value: "654321",
			text: "布尔津县"
		}, {
			value: "654322",
			text: "富蕴县"
		}, {
			value: "654323",
			text: "福海县"
		}, {
			value: "654324",
			text: "哈巴河县"
		}, {
			value: "654325",
			text: "青河县"
		}, {
			value: "654326",
			text: "吉木乃县"
		}, {
			value: "654327",
			text: "其它区"
		}]
	}, {
		value: "659001",
		text: "石河子市"
	}, {
		value: "659002",
		text: "阿拉尔市"
	}, {
		value: "659003",
		text: "图木舒克市"
	}, {
		value: "659004",
		text: "五家渠市"
	}]
}, {
	value: '710000',
	text: '台湾省',
	children: [{
		value: "710100",
		text: "台北市",
		children: [{
			value: "710101",
			text: "中正区"
		}, {
			value: "710102",
			text: "大同区"
		}, {
			value: "710103",
			text: "中山区"
		}, {
			value: "710104",
			text: "松山区"
		}, {
			value: "710105",
			text: "大安区"
		}, {
			value: "710106",
			text: "万华区"
		}, {
			value: "710107",
			text: "信义区"
		}, {
			value: "710108",
			text: "士林区"
		}, {
			value: "710109",
			text: "北投区"
		}, {
			value: "710110",
			text: "内湖区"
		}, {
			value: "710111",
			text: "南港区"
		}, {
			value: "710112",
			text: "文山区"
		}, {
			value: "710113",
			text: "其它区"
		}]
	}, {
		value: "710200",
		text: "高雄市",
		children: [{
			value: "710201",
			text: "新兴区"
		}, {
			value: "710202",
			text: "前金区"
		}, {
			value: "710203",
			text: "芩雅区"
		}, {
			value: "710204",
			text: "盐埕区"
		}, {
			value: "710205",
			text: "鼓山区"
		}, {
			value: "710206",
			text: "旗津区"
		}, {
			value: "710207",
			text: "前镇区"
		}, {
			value: "710208",
			text: "三民区"
		}, {
			value: "710209",
			text: "左营区"
		}, {
			value: "710210",
			text: "楠梓区"
		}, {
			value: "710211",
			text: "小港区"
		}, {
			value: "710212",
			text: "其它区"
		}]
	}, {
		value: "710300",
		text: "台南市",
		children: [{
			value: "710301",
			text: "中西区"
		}, {
			value: "710302",
			text: "东区"
		}, {
			value: "710303",
			text: "南区"
		}, {
			value: "710304",
			text: "北区"
		}, {
			value: "710305",
			text: "安平区"
		}, {
			value: "710306",
			text: "安南区"
		}, {
			value: "710307",
			text: "其它区"
		}]
	}, {
		value: "710400",
		text: "台中市",
		children: [{
			value: "710401",
			text: "中区"
		}, {
			value: "710402",
			text: "东区"
		}, {
			value: "710403",
			text: "南区"
		}, {
			value: "710404",
			text: "西区"
		}, {
			value: "710405",
			text: "北区"
		}, {
			value: "710406",
			text: "北屯区"
		}, {
			value: "710407",
			text: "西屯区"
		}, {
			value: "710408",
			text: "南屯区"
		}, {
			value: "710409",
			text: "其它区"
		}]
	}, {
		value: "710500",
		text: "金门县"
	}, {
		value: "710600",
		text: "南投县"
	}, {
		value: "710700",
		text: "基隆市",
		children: [{
			value: "710701",
			text: "仁爱区"
		}, {
			value: "710702",
			text: "信义区"
		}, {
			value: "710703",
			text: "中正区"
		}, {
			value: "710704",
			text: "中山区"
		}, {
			value: "710705",
			text: "安乐区"
		}, {
			value: "710706",
			text: "暖暖区"
		}, {
			value: "710707",
			text: "七堵区"
		}, {
			value: "710708",
			text: "其它区"
		}]
	}, {
		value: "710800",
		text: "新竹市",
		children: [{
			value: "710801",
			text: "东区"
		}, {
			value: "710802",
			text: "北区"
		}, {
			value: "710803",
			text: "香山区"
		}, {
			value: "710804",
			text: "其它区"
		}]
	}, {
		value: "710900",
		text: "嘉义市",
		children: [{
			value: "710901",
			text: "东区"
		}, {
			value: "710902",
			text: "西区"
		}, {
			value: "710903",
			text: "其它区"
		}]
	}, {
		value: "711100",
		text: "新北市"
	}, {
		value: "711200",
		text: "宜兰县"
	}, {
		value: "711300",
		text: "新竹县"
	}, {
		value: "711400",
		text: "桃园县"
	}, {
		value: "711500",
		text: "苗栗县"
	}, {
		value: "711700",
		text: "彰化县"
	}, {
		value: "711900",
		text: "嘉义县"
	}, {
		value: "712100",
		text: "云林县"
	}, {
		value: "712400",
		text: "屏东县"
	}, {
		value: "712500",
		text: "台东县"
	}, {
		value: "712600",
		text: "花莲县"
	}, {
		value: "712700",
		text: "澎湖县"
	}]
}, {
	value: '810000',
	text: '香港',
	children: [{
		value: "810100",
		text: "香港岛",
		children: [{
			value: "810101",
			text: "中西区"
		}, {
			value: "810102",
			text: "湾仔"
		}, {
			value: "810103",
			text: "东区"
		}, {
			value: "810104",
			text: "南区"
		}]
	}, {
		value: "810200",
		text: "九龙",
		children: [{
			value: "810201",
			text: "九龙城区"
		}, {
			value: "810202",
			text: "油尖旺区"
		}, {
			value: "810203",
			text: "深水埗区"
		}, {
			value: "810204",
			text: "黄大仙区"
		}, {
			value: "810205",
			text: "观塘区"
		}]
	}, {
		value: "810300",
		text: "新界",
		children: [{
			value: "810301",
			text: "北区"
		}, {
			value: "810302",
			text: "大埔区"
		}, {
			value: "810303",
			text: "沙田区"
		}, {
			value: "810304",
			text: "西贡区"
		}, {
			value: "810305",
			text: "元朗区"
		}, {
			value: "810306",
			text: "屯门区"
		}, {
			value: "810307",
			text: "荃湾区"
		}, {
			value: "810308",
			text: "葵青区"
		}, {
			value: "810309",
			text: "离岛区"
		}]
	}]
}, {
	value: '820000',
	text: '澳门',
	children: [{
		value: "820100",
		text: "澳门半岛"
	}, {
		value: "820200",
		text: "离岛"
	}]
}, {
	value: '990000',
	text: '海外',
	children: [{
		value: "990100",
		text: "海外"
	}]
}];
/**
 * iframe
 * **/

var iframe = function ($) {

	// 设置iframe 高度
	var _setHeight = function _setHeight() {
		var windows_h = $(document).height() + 50;
		$(window.parent.document).find(".parent-window").css("height", windows_h);
	};

	return {
		setHeight: _setHeight
	};
}(window.jQuery);
//
//
//var pickerSelect=(function(mui){
//	
//	
//			// 	一级选择
//		var _oneSelect=	function oneSelect(selector, data) {
//
//				var userPicker = new mui.PopPicker();
//				userPicker.setData(data);
//
//				var showUserPickerButton = document.querySelector(selector);
//
//				showUserPickerButton.addEventListener('tap', function(event) {
//					userPicker.show(function(items) {
//						event.target.blur();
//						showUserPickerButton.value = items[0].text;
//						showUserPickerButton.setAttribute("data-value", items[0].value);
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 省份-级联示例
//			var _getParam = function(obj, prop) {
//				return obj[prop] || '';
//			};
//
//			// 	二级选择
//	var _twoSelect=		function twoSelect(selector) {
//
//				//级联示例
//				var cityPicker = new mui.PopPicker({
//					layer: 2
//				});
//				cityPicker.setData(cityData);
//				var showCityPickerButton = document.querySelector(selector);
//
//				showCityPickerButton.addEventListener('tap', function(event) {
//					cityPicker.show(function(items) {
//						event.target.blur();
//						showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text');
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 三级选择
//			var _threeSelect=function threeSelect(selector) {
//
//				//级联示例
//				var cityPicker = new mui.PopPicker({
//					layer: 3
//				});
//				cityPicker.setData(cityData3);
//				var showCityPickerButton = document.querySelector(selector);
//
//				showCityPickerButton.addEventListener('tap', function(event) {
//					cityPicker.show(function(items) {
//						event.target.blur();
//						showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text')+ "-" + _getParam(items[2], 'text');
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 日期选择  class="mui-date" type="datetime,date ,time,month"
//		var _dateSelect=	function dateSelect(dateSelect) {
//
//				dateSelect = dateSelect || ".dateSelect";
//				var btns = $(dateSelect);
//
//				btns.each(function(i, btn) {
//
//					btn.addEventListener('tap', function(event) {
//						var _self = this;
//						this.blur();
//						if(_self.picker) {
//							_self.picker.show(function(rs) {
//								_self.value = rs.text;
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						} else {
//							var optionsJson = this.getAttribute('data-options') || '{}';
//							var options = JSON.parse(optionsJson);
//							var id = this.getAttribute('id');
//
//							_self.picker = new mui.DtPicker(options);
//							_self.picker.show(function(rs) {
//								_self.value = rs.text;
//
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						}
//
//					}, false);
//
//				});
//			}
//		
//		
//		return{
//			oneSelect:_oneSelect,
//			twoSelect:_twoSelect,
//			threeSelect:_threeSelect,
//			dateSelect:_dateSelect
//				
//		}
//	
//	
//})(mui);
/*
				 滚动监听
				 <body data-spy="spy" data-target="#scroll_ttl">
					 
					 <aside id="scroll_ttl">

						<ul>
							<li class="active">
								<a href="#banner_1">1</a>
							</li>
							<li>
								<a href="#banner_2">2</a>
							</li>
							<li>
								<a href="#banner_3">3</a>
							</li>
						</ul>

					</aside>
				 </body>
			 */

var scroll = function ($) {

	var obj = {

		init: function init(top) {

			var _top = Number(top);
			_top = isNaN(_top) ? 0 : _top;

			this.offsetTop = _top;
			this.bindEvent(this.offsetTop);
			this.onLoad();
			this.onReset();
		},

		offsetTop: 0,

		setOffsetTop: function setOffsetTop(top) {
			this.offsetTop = typeof top === "number" ? top : 0;
		},

		onReset: function onReset() {

			$(window).resize(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},
		onLoad: function onLoad() {

			$(window).load(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},

		selector: function selector() {
			var _tagget = $("[data-spy=spy]").attr("data-target");
			return $(_tagget);
		},

		bindEvent: function bindEvent(top) {

			var p = this.selector();
			this.selector().find(" ul li  a").click(function () {

				// animation
				var $this = $(this);
				var _top = Math.floor($($this.attr("href")).offset().top) - parseInt(top);
				$("body,html").stop().animate({
					scrollTop: _top
				}, 500);
			});
		},

		scroll: function scroll(top) {

			var ff = this.getScrollList;
			var p = this.selector();
			$(window).on("scroll", function () {

				var arrs = ff || [];

				arrs.forEach(function (item) {

					var m1 = parseInt(item.top); //- parseInt(top);
					var m2 = parseInt(item.maxTop); //- parseInt(top);
					if ($(window).scrollTop() >= m1 && $(window).scrollTop() < m2) {
						//alert(item.selector)
						p.find("ul li").removeClass("active");
						$("[href=" + item.selector + "]").parent().addClass("active");
						return false;
					}
				});
			});
		},

		scrollList: function scrollList() {

			var objs = [];

			var _offsetTop = this.offsetTop;
			var els = this.selector().find("li");
			for (var i = 0; i < els.length; i++) {

				var _el = $(els[i]).find("a").attr("href");

				if (_el) {

					var obj = {};
					var _top = Math.floor($(_el).offset().top) - _offsetTop;

					var maxTop = 0;
					if (i < els.length - 1) {
						var _el2 = $(els[i + 1]).find("a").attr("href");
						maxTop = Math.floor($(_el2).offset().top) - _offsetTop;
					} else {
						maxTop = Math.floor($(document).height());
					}

					obj.selector = _el;
					obj.top = _top;
					obj.maxTop = maxTop;
					objs.push(obj);
				}
			}

			return this.getScrollList = objs;
		},

		getScrollList: []

	};

	return {
		init: function init(top) {
			obj.init(top);
		},
		setOffsetTop: function setOffsetTop(top) {
			obj.setOffsetTop(top);
		}
	};
}(window.jQuery || window.Zepto);
/*

三级联动地址

<select id="address_1"  >
	<option value="">==省份==</option>
</select>
<select id="address_2"  >
	<option value="">==省份==</option>
</select>
<select id="address_3"  >
	<option value="">==省份==</option>
</select>
var el_select1 = document.getElementById("address_1");
var el_select2 = document.getElementById("address_2");
var el_select3 = document.getElementById("address_3");

 * */

var threeAddress = function () {

	var _init = function _init(v1, v2, v3) {
		var el_select1 = document.getElementById("address_1");
		var el_select2 = document.getElementById("address_2");
		var el_select3 = document.getElementById("address_3");
		var select_data2 = [];

		v1 = v1 || "省区";
		v2 = v2 || "市区";
		v3 = v3 || "县城";

		//  一级地址
		for (var i in cityData3) {

			var el_option = document.createElement("option");
			el_option.value = cityData3[i].text.toString();
			el_option.innerText = cityData3[i].text.toString();
			el_select1.insertBefore(el_option, null);
		}

		// 二级地址 change event
		el_select1.addEventListener("change", function (e) {
			e = e || event;

			select_data2 = getBYcityValue(cityData3, e.target.value);
			el_select2.innerHTML = "";
			var el_empty = document.createElement("option");
			el_empty.innerText = v2;
			el_select2.insertBefore(el_empty, null);
			for (var i2 in select_data2) {
				var el_option = document.createElement("option");
				el_option.value = select_data2[i2].text.toString();
				el_option.innerText = select_data2[i2].text.toString();

				el_select2.insertBefore(el_option, null);
			}

			// 恢复三级
			el_select3.innerHTML = "";
			var el_empty3 = document.createElement("option");
			el_empty3.innerText = v3;
			el_select3.insertBefore(el_empty3, null);
		});

		// 三级地址 change event
		el_select2.addEventListener("change", function (e) {
			e = e || event;

			var l3 = getBYcityValue(select_data2, e.target.value);
			el_select3.innerHTML = "";
			var el_empty3 = document.createElement("option");
			el_empty3.innerText = v3;
			el_select3.insertBefore(el_empty3, null);
			for (var i3 in l3) {
				var el_option = document.createElement("option");
				el_option.value = l3[i3].text.toString();
				el_option.innerText = l3[i3].text.toString();
				el_select3.insertBefore(el_option, null);
			}
		});

		function getBYcityValue(objs, val) {

			for (var name in objs) {
				if (objs[name].text.trim() === val.trim()) {
					return objs[name].children || [];
				}
			}
		}
	};

	return {
		init: _init
	};
}();


/*单个按钮组件
 * 
 * 
 * <ul>
 * 	<li class="comp-btn"> 
 * 		<a class="comp-btn-item">技术牛逼</a>
 * 	</li>
 * 	<li class="comp-btn"> 
 * 		<a class="comp-btn-item">信息大师</a>
 * 	</li>
 * </ul>
 * 
 * 		
 * 选中点击事件
		$(".comp-btn").on("comp_btn_select",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
		
		// 取消点击事件
		$(".comp-btn").on("comp_btn_unselect",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
 * 
 * */

+function ($) {

	$(".comp-btn-item").on("click", function () {

		if (typeof $(this).attr("data-bl") === "undefined") {
			$(this).addClass("active");
			$(this).attr("data-bl", "true");

			//点击触发自定义事件
			$(this).trigger("comp_btn_select", [this]);
		} else {
			//点击触发自定义事件
			$(this).trigger("comp_btn_unselect", [this]);
			$(this).removeClass("active");
			$(this).removeAttr("data-bl");
		}
	});
}(window.jQuery || window.Zepto);
/*****单选按钮组件**
 * 
 * 
 * <div class="comp-radio">             
   <div class="comp-radio-item active">盆</div>
   <div class="comp-radio-item">箱</div>
   <div class="comp-radio-item">斤</div>
   <div class="comp-radio-item">米</div>
   </div>
 * 
 * 
 * ****/

+function ($) {

	$(".comp-radio-item").on("tap", function () {
		var p = $(this).parents(".comp-radio");
		$(".comp-radio-item", p).removeClass("active");
		$(this).addClass("active");

		//点击触发自定义事件
		$(this).trigger("radio_click", [this]);
	});
}(window.jQuery || window.Zepto);

/*
  
<div class="number" >
    <button class="plus btn" type="button">+</button>
  <input class="num" type="number" value="1"data-min="0" data-max="9999" data-step="1" />
   <button class="minus btn" type="button">-</button>
  
 </div>

 * 数字框组件start
 * 事件：number_click
 *
 * 点击事件
	$(".number").on("number_click",function(event,element){			
		//element 当前点击的元素	
		var p=$(element).parents(".number");
		alert($(p).find(".num").val());
							
	});
 * */

+function ($) {

	//minus
	$(".minus").on("click", function (e) {
		e.stopPropagation();
		e.preventDefault();

		var p = $(this).parents(".number");

		//步长
		var step = Number($(".num", p).attr("data-step"));
		step = window.isNaN(step) ? 1 : step;

		//最大值
		//			var max=Number($(".num",p).attr("data-max"));
		//				max=window.isNaN(max)?9999:max;
		//最小值
		var min = Number($(".num", p).attr("data-min"));
		min = window.isNaN(min) ? 0 : min;

		var v = Number($(".num", p).val());
		v = window.isNaN(v) ? min : v;

		//计算
		v = v > min ? v - step : min;

		if (v <= min) {
			v = min;
		}

		$(".num", p).val(v);

		//点击触发自定义事件
		$(this).trigger("number_click", [this]);
	});

	//plus
	$(".plus").on("click", function (e) {
		e.stopPropagation();
		e.preventDefault();
		var p = $(this).parents(".number");

		//步长
		var step = Number($(".num", p).attr("data-step"));
		step = window.isNaN(step) ? 1 : step;

		//最大值
		var max = Number($(".num", p).attr("data-max"));
		max = window.isNaN(max) ? 9999 : max;
		//最小值
		var min = Number($(".num", p).attr("data-min"));
		min = window.isNaN(min) ? 0 : min;

		var v = Number($(".num", p).val());
		v = window.isNaN(v) ? min : v;

		//计算
		v = v < max ? v + step : max;

		if (v >= max) {
			v = max;
		}

		$(".num", p).val(v);
		//点击触发自定义事件
		$(this).trigger("number_click", [this]);
	});
}(window.jQuery || window.Zepto);

/*****数字框组件end******/
/*
 * 标签选项卡
 * 
 * <div class="tab-big">
 * 
	 <div class="tab-ttl">
         <a class="tab-item active" data-target="#form_a">
                            塑胶原料
             </a>
           <a class="tab-item"  data-target="#form_b">
                            改性塑料
            </a>
          <a class=" tab-item"  data-target="#form_c">
                            环保再生
            </a>
            <a class="tab-item"  data-target="#form_d">
                            塑料助剂
         </a>

    </div>
      
     <div class="fabu-form tab-content ">
                
           <!--塑胶原料-->
           <div class="form tab-content-item active" id="form_a">-塑胶原料</div>
              <!--塑胶原料2-->
           <div class="form tab-content-item " id="form_b">-塑胶原料2</div>
              <!--塑胶原料3-->
           <div class="form tab-content-item " id="form_c">-塑胶原料3</div>
              <!--塑胶原料4-->
           <div class="form tab-content-item " id="form_d">-塑胶原料4</div>
 *          
 *    </div>
 * 
 * </div>
 * 
 * 
 * 		//点击事件
		$(".tab-item").on("tab_select",function(event,element){			
			//element 当前点击的元素	
			
		});
 * 
 * */

+function ($) {

  // 选项卡tag-box tap 新的
  $(".tab-big .tab-ttl .tab-item").on("tap", function (e) {

    e.preventDefault();
    var p = $(this).parents(".tab-big");
    p.find(".tab-ttl .tab-item").removeClass("active");
    $(this).addClass("active");

    var target = $(this).attr("data-target");
    $(".tab-content", p).find(".tab-content-item").removeClass("active");
    $(".tab-content", p).find(target).addClass("active");

    // 点击触发自定义事件 
    $(this).trigger("tab_select");
  });
}(window.jQuery || window.Zepto);
/**
 * 
 * 缩略图
 * 
 * <div class=" clearfix  thumbnail-slider">
		<!--btn-->
		<div class="pull-left   ">
			<span class="glyphicon glyphicon-menu-left  thumbnail-btn-l"></span>
		</div>
		<div class=" pull-left thumbnail-content ">

			<div class="thumbnail-allitems">

				<ul class=" thumbnail-item">
					<li class="clearfix">
						<a href="javascript:">
							<img src="images/youhui-1.png" alt="优选好货 图片 160*160" />
							<div class="caption">
								<p>
									Nutrilon诺优能 幼儿配方奶粉 3段 12-36月个月800克/罐
								</p>

								<div class="price">
									<span class=" iconfont  renminbi "></span>
									<span>150</span>
								</div>
							</div>
						</a>
					</li>

				</ul>
	
			</div>
			
			<div class="thumbnail-num">
				<span class="l">1</span>
				<span>/</span>
				<span class="r">4</span>
				
			</div>

		</div>
		<div class="pull-left">
			<span class="glyphicon glyphicon-menu-right thumbnail-btn-r"></span>
		</div>
	</div>

 * **/

+function ($) {

	//
	//	$.fn.thumbnail=function(){
	//			
	//			var $content= $(this).find(".thumbnail-content");
	//			var $allitems= $(this).find(".thumbnail-allitems");
	//			var $btn_l= $(this).find(".thumbnail-btn-l");
	//			var $btn_r= $(this).find(".thumbnail-btn-r");
	//			var $item= $(this).find(".thumbnail-item");
	//			var $num= $(this).find(".thumbnail-num");
	//			var $num_r=$num.find(".r");
	//			var $num_l=$num.find(".l");
	//			
	//		
	//			var size= parseInt($item.length);
	//			var width= parseInt($item.outerWidth(true));
	//			var index=0;
	//			$num_r.text(size);
	//			$num_l.text(1);
	//			
	//			// 设置width
	//			$allitems.width(size*width);
	//				
	//			 $btn_r.click(function(){
	//			 	index=index>=0&&index<size-1?++index:size-1;
	//			 	
	//			 	$allitems.animate({left:-index*width},400)
	//			 	$num_l.text(index+1);
	//			 })
	//			 
	//			  $btn_l.click(function(){
	//			 	index=index>0&&index<size?--index:0;
	//			 	$num_l.text(index+1);
	//			 	$allitems.animate({left:-index*width},400)
	//			 	
	//			 })
	//				
	//			return this;
	//			
	//			
	//		}
	//		
	//	
	//	


	$(".thumbnail-slider").each(function () {

		var $content = $(this).find(".thumbnail-content");
		var $allitems = $(this).find(".thumbnail-allitems");
		var $btn_l = $(this).find(".thumbnail-btn-l");
		var $btn_r = $(this).find(".thumbnail-btn-r");
		var $item = $(this).find(".thumbnail-item");
		var $num = $(this).find(".thumbnail-num");
		var $num_r = $num.find(".r");
		var $num_l = $num.find(".l");

		var size = parseInt($item.length);
		var width = parseInt($item.outerWidth(true));
		var index = 0;
		$num_r.text(size);
		var curIndex = size <= 0 ? 0 : 1;
		$num_l.text(curIndex);
		if (size <= 0) {
			$num.hide();
			$btn_l.hide();
			$btn_r.hide();
		}
		// 设置width
		$allitems.width(size * width);

		$btn_r.click(function () {
			index = index >= 0 && index < size - 1 ? ++index : size - 1;

			$allitems.animate({ left: -index * width }, 400);
			$num_l.text(index + 1);
		});

		$btn_l.click(function () {
			index = index > 0 && index < size ? --index : 0;
			$num_l.text(index + 1);
			$allitems.animate({ left: -index * width }, 400);
		});
	});
}(window.jQuery || window.Zepto);
/*es6*/