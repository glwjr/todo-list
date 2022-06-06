(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){return e(1,arguments),t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function n(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(r){if(e(1,arguments),!t(r)&&"number"!=typeof r)return!1;var a=n(r);return!isNaN(Number(a))}var a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function i(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth,r=e.formats[n]||e.formats[e.defaultWidth];return r}}var o,u={date:i({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:i({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:i({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function d(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=a.width?String(a.width):i;r=e.formattingValues[o]||e.formattingValues[i]}else{var u=e.defaultWidth,s=a.width?String(a.width):e.defaultWidth;r=e.values[s]||e.values[u]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function c(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],i=t.match(a);if(!i)return null;var o,u=i[0],s=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(s)?m(s,(function(e){return e.test(u)})):l(s,(function(e){return e.test(u)}));o=e.valueCallback?e.valueCallback(d):d,o=n.valueCallback?n.valueCallback(o):o;var c=t.slice(u.length);return{value:o,rest:c}}}function l(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}function m(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}const f={code:"en-US",formatDistance:function(e,t,n){var r,i=a[e];return r="string"==typeof i?i:1===t?i.one:i.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:u,formatRelative:function(e,t,n,r){return s[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:d({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:d({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:d({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:d({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:d({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(o={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(o.matchPattern);if(!n)return null;var r=n[0],a=e.match(o.parsePattern);if(!a)return null;var i=o.valueCallback?o.valueCallback(a[0]):a[0];i=t.valueCallback?t.valueCallback(i):i;var u=e.slice(r.length);return{value:i,rest:u}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function h(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function g(t,r){e(2,arguments);var a=n(t).getTime(),i=h(r);return new Date(a+i)}function w(t,n){e(2,arguments);var r=h(n);return g(t,-r)}var v=864e5;function y(t){e(1,arguments);var r=1,a=n(t),i=a.getUTCDay(),o=(i<r?7:0)+i-r;return a.setUTCDate(a.getUTCDate()-o),a.setUTCHours(0,0,0,0),a}function p(t){e(1,arguments);var r=n(t),a=r.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var o=y(i),u=new Date(0);u.setUTCFullYear(a,0,4),u.setUTCHours(0,0,0,0);var s=y(u);return r.getTime()>=o.getTime()?a+1:r.getTime()>=s.getTime()?a:a-1}function b(t){e(1,arguments);var n=p(t),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=y(r);return a}var T=6048e5;function C(t,r){e(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,u=null==o?0:h(o),s=null==a.weekStartsOn?u:h(a.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=n(t),c=d.getUTCDay(),l=(c<s?7:0)+c-s;return d.setUTCDate(d.getUTCDate()-l),d.setUTCHours(0,0,0,0),d}function D(t,r){e(1,arguments);var a=n(t),i=a.getUTCFullYear(),o=r||{},u=o.locale,s=u&&u.options&&u.options.firstWeekContainsDate,d=null==s?1:h(s),c=null==o.firstWeekContainsDate?d:h(o.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(i+1,0,c),l.setUTCHours(0,0,0,0);var m=C(l,r),f=new Date(0);f.setUTCFullYear(i,0,c),f.setUTCHours(0,0,0,0);var g=C(f,r);return a.getTime()>=m.getTime()?i+1:a.getTime()>=g.getTime()?i:i-1}function M(t,n){e(1,arguments);var r=n||{},a=r.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:h(i),u=null==r.firstWeekContainsDate?o:h(r.firstWeekContainsDate),s=D(t,n),d=new Date(0);d.setUTCFullYear(s,0,u),d.setUTCHours(0,0,0,0);var c=C(d,n);return c}var E=6048e5;function k(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const x=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return k("yy"===t?r%100:r,t.length)},S=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):k(n+1,2)},P=function(e,t){return k(e.getUTCDate(),t.length)},U=function(e,t){return k(e.getUTCHours()%12||12,t.length)},N=function(e,t){return k(e.getUTCHours(),t.length)},L=function(e,t){return k(e.getUTCMinutes(),t.length)},j=function(e,t){return k(e.getUTCSeconds(),t.length)},W=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return k(Math.floor(r*Math.pow(10,n-3)),t.length)};function I(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=t||"";return n+String(a)+o+k(i,2)}function Y(e,t){return e%60==0?(e>0?"-":"+")+k(Math.abs(e)/60,2):H(e,t)}function H(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+k(Math.floor(a/60),2)+n+k(a%60,2)}const O={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return x(e,t)},Y:function(e,t,n,r){var a=D(e,r),i=a>0?a:1-a;return"YY"===t?k(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):k(i,t.length)},R:function(e,t){return k(p(e),t.length)},u:function(e,t){return k(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return k(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return k(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return S(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return k(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,r,a,i){var o=function(t,r){e(1,arguments);var a=n(t),i=C(a,r).getTime()-M(a,r).getTime();return Math.round(i/E)+1}(t,i);return"wo"===r?a.ordinalNumber(o,{unit:"week"}):k(o,r.length)},I:function(t,r,a){var i=function(t){e(1,arguments);var r=n(t),a=y(r).getTime()-b(r).getTime();return Math.round(a/T)+1}(t);return"Io"===r?a.ordinalNumber(i,{unit:"week"}):k(i,r.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):P(e,t)},D:function(t,r,a){var i=function(t){e(1,arguments);var r=n(t),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var i=r.getTime(),o=a-i;return Math.floor(o/v)+1}(t);return"Do"===r?a.ordinalNumber(i,{unit:"dayOfYear"}):k(i,r.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return k(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return k(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return k(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return U(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):N(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):k(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):k(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):L(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):j(e,t)},S:function(e,t){return W(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return Y(a);case"XXXX":case"XX":return H(a);default:return H(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return Y(a);case"xxxx":case"xx":return H(a);default:return H(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+I(a,":");default:return"GMT"+H(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+I(a,":");default:return"GMT"+H(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return k(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return k((r._originalDate||e).getTime(),t.length)}};function B(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}}function q(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}}var F={p:q,P:function(e,t){var n,r=e.match(/(P+)(p+)?/)||[],a=r[1],i=r[2];if(!i)return B(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",B(a,t)).replace("{{time}}",q(i,t))}};const z=F;function A(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var Q=["D","DD"],R=["YY","YYYY"];function G(e){return-1!==Q.indexOf(e)}function X(e){return-1!==R.indexOf(e)}function $(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var J=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Z=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,_=/^'([^]*?)'?$/,V=/''/g,K=/[a-zA-Z]/;function ee(t,a,i){e(2,arguments);var o=String(a),u=i||{},s=u.locale||f,d=s.options&&s.options.firstWeekContainsDate,c=null==d?1:h(d),l=null==u.firstWeekContainsDate?c:h(u.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=s.options&&s.options.weekStartsOn,g=null==m?0:h(m),v=null==u.weekStartsOn?g:h(u.weekStartsOn);if(!(v>=0&&v<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!s.localize)throw new RangeError("locale must contain localize property");if(!s.formatLong)throw new RangeError("locale must contain formatLong property");var y=n(t);if(!r(y))throw new RangeError("Invalid time value");var p=A(y),b=w(y,p),T={firstWeekContainsDate:l,weekStartsOn:v,locale:s,_originalDate:y},C=o.match(Z).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,z[t])(e,s.formatLong,T):e})).join("").match(J).map((function(e){if("''"===e)return"'";var n=e[0];if("'"===n)return te(e);var r=O[n];if(r)return!u.useAdditionalWeekYearTokens&&X(e)&&$(e,a,t),!u.useAdditionalDayOfYearTokens&&G(e)&&$(e,a,t),r(b,e,s.localize,T);if(n.match(K))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return e})).join("");return C}function te(e){return e.match(_)[1].replace(V,"'")}Math.pow(10,8);var ne=36e5,re={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},ae=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,ie=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,oe=/^([+-])(\d{2})(?::?(\d{2}))?$/;function ue(e){var t,n={},r=e.split(re.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?t=r[0]:(n.date=r[0],t=r[1],re.timeZoneDelimiter.test(n.date)&&(n.date=e.split(re.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var a=re.timezone.exec(t);a?(n.time=t.replace(a[1],""),n.timezone=a[1]):n.time=t}return n}function se(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),r=e.match(n);if(!r)return{year:NaN,restDateString:""};var a=r[1]?parseInt(r[1]):null,i=r[2]?parseInt(r[2]):null;return{year:null===i?a:100*i,restDateString:e.slice((r[1]||r[2]).length)}}function de(e,t){if(null===t)return new Date(NaN);var n=e.match(ae);if(!n)return new Date(NaN);var r=!!n[4],a=ce(n[1]),i=ce(n[2])-1,o=ce(n[3]),u=ce(n[4]),s=ce(n[5])-1;if(r)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,u,s)?function(e,t,n){var r=new Date(0);r.setUTCFullYear(e,0,4);var a=7*(t-1)+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+a),r}(t,u,s):new Date(NaN);var d=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(he[t]||(ge(e)?29:28))}(t,i,o)&&function(e,t){return t>=1&&t<=(ge(e)?366:365)}(t,a)?(d.setUTCFullYear(t,i,Math.max(a,o)),d):new Date(NaN)}function ce(e){return e?parseInt(e):1}function le(e){var t=e.match(ie);if(!t)return NaN;var n=me(t[1]),r=me(t[2]),a=me(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,r,a)?n*ne+6e4*r+1e3*a:NaN}function me(e){return e&&parseFloat(e.replace(",","."))||0}function fe(e){if("Z"===e)return 0;var t=e.match(oe);if(!t)return 0;var n="+"===t[1]?-1:1,r=parseInt(t[2]),a=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,a)?n*(r*ne+6e4*a):NaN}var he=[31,null,31,30,31,30,31,31,30,31,30,31];function ge(e){return e%400==0||e%4==0&&e%100!=0}function we(t,r){e(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,u=null==o?0:h(o),s=null==a.weekStartsOn?u:h(a.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=n(t),c=d.getDay(),l=(c<s?7:0)+c-s;return d.setDate(d.getDate()-l),d.setHours(0,0,0,0),d}function ve(t,n,r){e(2,arguments);var a=we(t,r),i=we(n,r);return a.getTime()===i.getTime()}class ye{constructor(e,t,n){this.name=e,this.dueDate=t,this.priority=n}}class pe{constructor(e,t){this.name=e,this.todos=t}}const be=(()=>{let e=[{name:"Inbox",todos:[]}];const t=()=>{localStorage.setItem("projects",JSON.stringify(e))};return localStorage.getItem("projects")&&(e=JSON.parse(localStorage.getItem("projects"))),{projects:e,addTodo:n=>{const r=e.findIndex((e=>e==Te.getCurrentProject()));e[r].todos.push(n),t()},removeTodo:n=>{const r=e.findIndex((e=>e.todos.find((e=>e===n)))),a=e[r],i=a.todos.indexOf(n);i>-1&&(a.todos.splice(i,1),t())},addProject:n=>{e.push(n),t()},removeProject:n=>{const r=e.findIndex((e=>e.name==n.name));r>-1&&(e.splice(r,1),t())}}})(),Te=(()=>{const t=document.getElementById("menu"),n=document.getElementById("menu-button"),r=document.getElementById("inbox"),a=document.getElementById("today"),i=document.getElementById("this-week");n.addEventListener("click",(()=>o())),r.addEventListener("click",(()=>j(be.projects[0]))),a.addEventListener("click",(()=>W())),i.addEventListener("click",(()=>I()));const o=()=>{"menu"===t.className?t.className+=" responsive":t.className="menu"},u=document.getElementById("add-project-form"),s=document.getElementById("add-project-input"),d=document.getElementById("add-project"),c=document.getElementById("submit-project"),l=document.getElementById("cancel-project");d.addEventListener("click",(()=>m())),c.addEventListener("click",(e=>g(e))),l.addEventListener("click",(()=>f()));const m=()=>{u.style.display="block",d.style.display="none"},f=()=>{s.value="",u.style.display="none",d.style.display="block"},g=e=>{if(""!=s.value)return be.projects.findIndex((e=>e.name==s.value))>-1?(alert("A project with this name already exists. Please enter a different name."),void e.preventDefault()):(be.addProject(w()),v(w()),j(w()),void f())},w=()=>{const e=s.value;return new pe(e,[])},v=e=>{const t=be.projects.findIndex((t=>t.name==e.name)),n=document.getElementById("stored-projects"),r=document.createElement("button"),a=document.createElement("i");r.classList.add("project-title"),a.classList.add("fas"),a.classList.add("fa-times"),r.innerHTML=`<i class="fas fa-circle"></i>${e.name}`,n.appendChild(r),r.appendChild(a),r.addEventListener("click",(()=>j(be.projects[t]))),r.addEventListener("mouseenter",(()=>i())),r.addEventListener("mouseleave",(()=>o())),a.addEventListener("click",(t=>{e.name==y().name?(be.removeProject(e),H()):(be.removeProject(e),Y()),t.stopPropagation()}));const i=()=>{a.style.display="block"},o=()=>{a.style.display="none"}},y=()=>{const e=document.querySelector(".main-title").innerHTML,t=be.projects.findIndex((t=>t.name==e));return be.projects[t]},p=document.getElementById("add-todo-form"),b=document.getElementById("todo-name-input"),T=document.getElementById("todo-priority-input"),C=document.getElementById("todo-date-input"),D=document.getElementById("add-todo-button"),M=document.getElementById("submit-todo"),E=document.getElementById("cancel-todo");D.addEventListener("click",(()=>S())),M.addEventListener("click",(e=>k(e))),E.addEventListener("click",(()=>P()));const k=e=>{if(y().todos.findIndex((e=>e.name==b.value))>-1)return alert("This todo already exists within this project."),void e.preventDefault();""!=b.value&&""!=C.value&&""!=T.value&&(be.addTodo(x()),j(y()),P())},x=()=>{const e=b.value,t=C.value,n=T.value;return new ye(e,t,n)},S=()=>{p.style.display="block",U()},P=()=>{b.value="",C.value="",T.value="",p.style.display="none",N()},U=()=>{D.style.display="none"},N=()=>{D.style.display="block"},L=t=>{const n=document.getElementById("todos-container"),r=document.createElement("div"),a=document.createElement("i"),i=document.createElement("div"),o=document.createElement("div"),u=document.createElement("div"),s=document.createElement("div");r.classList.add("todo"),a.classList.add("far"),a.classList.add("fa-circle"),a.classList.add("todo-circle"),i.classList.add("todo-content"),o.classList.add("todo-data"),u.classList.add("todo-date"),s.classList.add("todo-priority"),i.innerHTML=`${t.name}`,u.innerHTML=`Due ${ee(function(t,n){e(1,arguments);var r=n||{},a=null==r.additionalDigits?2:h(r.additionalDigits);if(2!==a&&1!==a&&0!==a)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var i,o=ue(t);if(o.date){var u=se(o.date,a);i=de(u.restDateString,u.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);var s,d=i.getTime(),c=0;if(o.time&&(c=le(o.time),isNaN(c)))return new Date(NaN);if(!o.timezone){var l=new Date(d+c),m=new Date(0);return m.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),m.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),m}return s=fe(o.timezone),isNaN(s)?new Date(NaN):new Date(d+c+s)}(t.dueDate),"PPPP")}`,s.innerHTML=`${t.priority} Priority`,n.appendChild(r),r.appendChild(a),r.appendChild(i),r.appendChild(o),o.appendChild(u),o.appendChild(s),a.addEventListener("click",(()=>{be.removeTodo(t),"Today"==document.querySelector(".main-title").innerHTML?W():"This Week"==document.querySelector(".main-title").innerHTML?I():j(y())}))},j=e=>{const t=document.querySelector(".main-title"),n=document.getElementById("todos-container"),r=e.todos;t.innerHTML=e.name,n.innerHTML="",""!==r&&(r.forEach((e=>L(e))),N())},W=()=>{const e=document.querySelector(".main-title"),t=document.getElementById("todos-container");let n=ee(new Date,"yyyy-MM-dd");e.innerHTML="Today",t.innerHTML="",be.projects.forEach((e=>{e.todos.forEach((e=>{e.dueDate==n&&L(e)}))})),U()},I=()=>{const t=document.querySelector(".main-title"),n=document.getElementById("todos-container");t.innerHTML="This Week",n.innerHTML="",be.projects.forEach((t=>{t.todos.forEach((t=>{1==function(t,n){return e(1,arguments),ve(t,Date.now(),n)}(new Date(t.dueDate))&&L(t)}))})),U()},Y=()=>{document.getElementById("stored-projects").innerHTML="",be.projects.forEach((e=>{"Inbox"!==e.name&&v(e)}))},H=()=>{const e=document.getElementById("main-title"),t=document.getElementById("todos-container"),n=document.getElementById("stored-projects"),r=be.projects[0].todos;e.innerHTML=be.projects[0].name,t.innerHTML="",n.innerHTML="",r.forEach((e=>L(e))),be.projects.forEach((e=>{"Inbox"!==e.name&&v(e)}))};return H(),{getCurrentProject:y}})()})();