var inlinePlayer=null;soundManager.useFlashBlock=true;soundManager.preferFlash=false;soundManager.flashVersion=9;soundManager.onready(function(){inlinePlayer=new InlinePlayer();});function InlinePlayer(){var self=this;var pl=this;var sm=soundManager;var isIE=(navigator.userAgent.match(/msie/i));var isTouchDevice=(navigator.userAgent.match(/ipad|ipod|iphone/i));this.playableClass='inline-playable';this.excludeClass='inline-exclude';this.dragActive=false;this.dragExec=new Date();this.dragTimer=null;this.links=[];this.sounds=[];this.soundsByURL=[];this.strings=[];this.indexByURL=[];this.lastSound=null;this.lastWPExec=new Date();this.soundCount=0;this.oControls=null;this.oTiming=null;this.config={useMovieStar:true,useThrottling:true,playNext:false,autoPlay:false,emptyTime:'-:--'};this.css={sDefault:'sm2_link',sLoading:'sm2_loading',sPlaying:'sm2_playing',sPaused:'sm2_paused'};this.addEventHandler=(typeof window.addEventListener!=='undefined'?function(o,evtName,evtHandler){return o.addEventListener(evtName,evtHandler,false);}:function(o,evtName,evtHandler){o.attachEvent('on'+evtName,evtHandler);});this.removeEventHandler=(typeof window.removeEventListener!=='undefined'?function(o,evtName,evtHandler){return o.removeEventListener(evtName,evtHandler,false);}:function(o,evtName,evtHandler){return o.detachEvent('on'+evtName,evtHandler);});this.classContains=function(o,cStr){return(typeof(o.className)!=='undefined'?o.className.match(new RegExp('(\\s|^)'+cStr+'(\\s|$)')):false);};this.addClass=function(o,cStr){if(!o||!cStr||self.classContains(o,cStr)){return false;}
o.className=(o.className?o.className+' ':'')+cStr;};this.removeClass=function(o,cStr){if(!o||!cStr||!self.classContains(o,cStr)){return false;}
o.className=o.className.replace(new RegExp('( '+cStr+')|('+cStr+')','g'),'');};this.select=function(className,oParent){var result=self.getByClassName(className,'div',oParent||null);return(result?result[0]:null);};this.getByClassName=(document.querySelectorAll?function(className,tagNames,oParent){var pattern=('.'+className),qs;if(tagNames){tagNames=tagNames.split(' ');}
qs=(tagNames.length>1?tagNames.join(pattern+', '):tagNames[0]+pattern);return(oParent?oParent:document).querySelectorAll(qs);}:function(className,tagNames,oParent){var node=(oParent?oParent:document),matches=[],i,j,nodes=[];if(tagNames){tagNames=tagNames.split(' ');}
if(tagNames instanceof Array){for(i=tagNames.length;i--;){if(!nodes||!nodes[tagNames[i]]){nodes[tagNames[i]]=node.getElementsByTagName(tagNames[i]);}}
for(i=tagNames.length;i--;){for(j=nodes[tagNames[i]].length;j--;){if(self.classContains(nodes[tagNames[i]][j],className)){matches.push(nodes[tagNames[i]][j]);}}}}else{nodes=node.all||node.getElementsByTagName('*');for(i=0,j=nodes.length;i<j;i++){if(self.classContains(nodes[i],className)){matches.push(nodes[i]);}}}
return matches;});this.getSoundByURL=function(sURL){return(typeof self.soundsByURL[sURL]!=='undefined'?self.soundsByURL[sURL]:null);};this.isChildOfNode=function(o,sNodeName){if(!o||!o.parentNode){return false;}
sNodeName=sNodeName.toLowerCase();do{o=o.parentNode;}while(o&&o.parentNode&&o.nodeName.toLowerCase()!==sNodeName);return(o.nodeName.toLowerCase()===sNodeName?o:null);};this.isChildOfClass=function(oChild,oClass){if(!oChild||!oClass){return false;}
while(oChild.parentNode&&!self.classContains(oChild,oClass)){oChild=oChild.parentNode;}
return(self.classContains(oChild,oClass));};this.getOffX=function(o){var curleft=0;if(o.offsetParent){while(o.offsetParent){curleft+=o.offsetLeft;o=o.offsetParent;}}else if(o.x){curleft+=o.x;}
return curleft;};this.getTime=function(nMSec,bAsString){var nSec=Math.floor(nMSec/1000),min=Math.floor(nSec/60),sec=nSec-(min*60);return(bAsString?(min+':'+(sec<10?'0'+sec:sec)):{'min':min,'sec':sec});};this.events={play:function(){pl.removeClass(this._data.oLI,this._data.className);this._data.className=pl.css.sPlaying;pl.addClass(this._data.oLI,this._data.className);},stop:function(){pl.removeClass(this._data.oLI,this._data.className);this._data.className='';this._data.oPosition.style.width='0px';},pause:function(){if(pl.dragActive){return false;}
pl.removeClass(this._data.oLI,this._data.className);this._data.className=pl.css.sPaused;pl.addClass(this._data.oLI,this._data.className);},resume:function(){if(pl.dragActive){return false;}
pl.removeClass(this._data.oLI,this._data.className);this._data.className=pl.css.sPlaying;pl.addClass(this._data.oLI,this._data.className);},whileloading:function(){function doWork(){this._data.oLoading.style.width=(((this.bytesLoaded/this.bytesTotal)*100)+'%');if(!this._data.didRefresh&&this._data.metadata){this._data.didRefresh=true;this._data.metadata.refresh();}}
if(!pl.config.useThrottling){doWork.apply(this);}else{var d=new Date();if(d&&d-self.lastWLExec>30||this.bytesLoaded===this.bytesTotal){doWork.apply(this);self.lastWLExec=d;}}},finish:function(){pl.removeClass(this._data.oLI,this._data.className);this._data.className='';this._data.oPosition.style.width='0px';if(pl.config.playNext){var nextLink=(pl.indexByURL[this._data.oLink.href]+1);if(nextLink<pl.links.length){pl.handleClick({'target':pl.links[nextLink]});}}},whileplaying:function(){var d=null;if(pl.dragActive||!pl.config.useThrottling){self.updateTime.apply(this);if(this._data.metadata){d=new Date();if(d&&d-self.lastWPExec>500){this._data.metadata.refreshMetadata(this);self.lastWPExec=d;}}
this._data.oPosition.style.width=(((this.position/self.getDurationEstimate(this))*100)+'%');}else{d=new Date();if(d-self.lastWPExec>30){self.updateTime.apply(this);if(this._data.metadata){this._data.metadata.refreshMetadata(this);}
this._data.oPosition.style.width=(((this.position/self.getDurationEstimate(this))*100)+'%');self.lastWPExec=d;}}}};this.handleStatusClick=function(e){self.setPosition(e);return self.stopEvent(e);};this.stopEvent=function(e){if(typeof e!=='undefined'&&typeof e.preventDefault!=='undefined'){e.preventDefault();}else if(typeof event!=='undefined'&&typeof event.returnValue!=='undefined'){event.returnValue=false;}
return false;};this.getTheDamnLink=(isIE)?function(e){return(e&&e.target?e.target:window.event.srcElement);}:function(e){return e.target;};this.withinStatusBar=function(o){return(self.isChildOfClass(o,'controls'));};this.handleClick=function(e){if(typeof e.button!=='undefined'&&e.button>1){return true;}
var o=self.getTheDamnLink(e);if(!o){return true;}
if(self.dragActive){self.stopDrag();}
if(self.withinStatusBar(o)){self.handleStatusClick(e);}
if(o.nodeName.toLowerCase()!=='a'){o=self.isChildOfNode(o,'a');if(!o){return true;}}
if(!o.href||(!sm.canPlayLink(o)&&!self.classContains(o,self.playableClass))||self.classContains(o,self.excludeClass)){return true;}
var soundURL=(o.href);var thisSound=self.getSoundByURL(soundURL);if(thisSound){if(thisSound===self.lastSound){thisSound.togglePause();}else{thisSound.togglePause();sm._writeDebug('sound different than last sound: '+self.lastSound.sID);if(self.lastSound){self.stopSound(self.lastSound);}}}else{thisSound=sm.createSound({id:'inlineMP3Sound'+(self.soundCount++),url:soundURL,onplay:self.events.play,onstop:self.events.stop,onpause:self.events.pause,onresume:self.events.resume,onfinish:self.events.finish,whileloading:self.events.whileloading,whileplaying:self.events.whileplaying});oControls=self.oControls.cloneNode(true);oTiming=self.oTiming.cloneNode(true);oLink=o;oLI=o.parentNode;oLink.appendChild(oTiming);oLI.appendChild(oControls);thisSound._data={oLink:o,oLI:oLI,className:self.css.sPlaying,oControls:self.select('controls',oLI),oStatus:self.select('statusbar',oLI),oLoading:self.select('loading',oLI),oPosition:self.select('position',oLI),oTimingBox:self.select('timing',oLink),oTiming:self.select('timing',oLink).getElementsByTagName('div')[0]};self.soundsByURL[soundURL]=thisSound;str=self.strings.timing.replace('%s1',self.config.emptyTime);str=str.replace('%s2',self.config.emptyTime);thisSound._data.oTiming.innerHTML=str;self.sounds.push(thisSound);if(self.lastSound){self.stopSound(self.lastSound);}
thisSound.play();}
self.lastSound=thisSound;if(typeof e!=='undefined'&&typeof e.preventDefault!=='undefined'){e.preventDefault();}else{event.returnValue=false;}
return false;};this.handleMouseDown=function(e){if(isTouchDevice&&e.touches){e=e.touches[0];}
var o=self.getTheDamnLink(e);if(!o){return true;}
if(!self.withinStatusBar(o)){return true;}
self.dragActive=true;self.lastSound.pause();self.setPosition(e);if(!isTouchDevice){_event.add(document,'mousemove',self.handleMouseMove);}else{_event.add(document,'touchmove',self.handleMouseMove);}
self.addClass(self.lastSound._data.oControls,'dragging');return self.stopEvent(e);};this.handleMouseMove=function(e){if(isTouchDevice&&e.touches){e=e.touches[0];}
if(self.dragActive){if(self.config.useThrottling){var d=new Date();if(d-self.dragExec>20){self.setPosition(e);}else{window.clearTimeout(self.dragTimer);self.dragTimer=window.setTimeout(function(){self.setPosition(e);},20);}
self.dragExec=d;}else{self.setPosition(e);}}else{self.stopDrag();}
e.stopPropagation=true;return false;};this.stopDrag=function(e){if(self.dragActive){self.removeClass(self.lastSound._data.oControls,'dragging');if(!isTouchDevice){_event.remove(document,'mousemove',self.handleMouseMove);}else{_event.remove(document,'touchmove',self.handleMouseMove);}
if(!pl.classContains(self.lastSound._data.oLI,self.css.sPaused)){self.lastSound.resume();}
self.dragActive=false;return self.stopEvent(e);}};this.stopSound=function(oSound){soundManager.stop(oSound.sID);soundManager.unload(oSound.sID);};this.setPosition=function(e){var oThis=self.getTheDamnLink(e),x,oControl,oSound,nMsecOffset;if(!oThis){return true;}
oControl=oThis;while(!self.classContains(oControl,'controls')&&oControl.parentNode){oControl=oControl.parentNode;}
oSound=self.lastSound;x=parseInt(e.clientX,10);nMsecOffset=Math.floor((x-self.getOffX(oControl)-4)/(oControl.offsetWidth)*self.getDurationEstimate(oSound));if(!isNaN(nMsecOffset)){nMsecOffset=Math.min(nMsecOffset,oSound.duration);}
if(!isNaN(nMsecOffset)){oSound.setPosition(nMsecOffset);}};this.updateTime=function(){var str=self.strings.timing.replace('%s1',self.getTime(this.position,true));str=str.replace('%s2',self.getTime(self.getDurationEstimate(this),true));this._data.oTiming.innerHTML=str;};this.getDurationEstimate=function(oSound){if(self.config.useMovieStar){return(oSound.duration);}else{return(!oSound._data.metadata||!oSound._data.metadata.data.givenDuration?(oSound.durationEstimate||0):oSound._data.metadata.data.givenDuration);}};this.init=function(){sm._writeDebug('inlinePlayer.init()');var oLinks=document.getElementsByTagName('a');var oTiming;var foundItems=0;for(i=0,j=oLinks.length;i<j;i++){if((sm.canPlayLink(oLinks[i])||self.classContains(oLinks[i],self.playableClass))&&!self.classContains(oLinks[i],self.excludeClass)){self.addClass(oLinks[i],self.css.sDefault);self.links[foundItems]=(oLinks[i]);self.indexByURL[oLinks[i].href]=foundItems;foundItems++;}}
if(foundItems>0){self.addEventHandler(document,'click',self.handleClick);if(self.config.autoPlay){self.handleClick({target:self.links[0],preventDefault:function(){}});}}
timingTemplate=document.createElement('div');timingTemplate.setAttribute('class','timing');timingTemplate.innerHTML=['   <div id="sm2_timing" class="timing-data">','    <span class="sm2_position">%s1</span> / <span class="sm2_total">%s2</span>','   </div>'].join('\n');self.oTiming=timingTemplate.cloneNode(true);controlTemplate=document.createElement('div');controlTemplate.setAttribute('class','sm2_elements');controlTemplate.innerHTML=['  <div class="controls">','   <div class="statusbar">','    <div class="loading"></div>','    <div class="position"></div>','   </div>','  </div>'].join('\n');self.oControls=controlTemplate.cloneNode(true);oTiming=self.select('timing-data',timingTemplate);self.strings.timing=oTiming.innerHTML;oTiming.innerHTML='';oTiming.id='';sm._writeDebug('inlinePlayer.init(): Found '+foundItems+' relevant items.');};this.init();}