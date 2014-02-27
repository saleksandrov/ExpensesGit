/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Switch");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Switch",{metadata:{library:"sap.m",properties:{"state":{type:"boolean",group:"Misc",defaultValue:false},"customTextOn":{type:"string",group:"Misc",defaultValue:null},"customTextOff":{type:"string",group:"Misc",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"enabled":{type:"boolean",group:"Data",defaultValue:true},"name":{type:"string",group:"Misc",defaultValue:null},"type":{type:"sap.m.SwitchType",group:"Appearance",defaultValue:sap.m.SwitchType.Default}},events:{"change":{}}}});sap.m.Switch.M_EVENTS={'change':'change'};jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.ui.core.theming.Parameters");jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();sap.ui.core.EnabledPropagator.apply(sap.m.Switch.prototype,[true]);
sap.m.Switch.prototype._updateUI=function(p){p=p>sap.m.Switch._OFFPOSITION?sap.m.Switch._OFFPOSITION:p<sap.m.Switch._ONPOSITION?sap.m.Switch._ONPOSITION:p;if(this._iCurrentPositionLeft===p){return}this._iCurrentPositionLeft=p;this._$SwitchInner[0].style[sap.m.Switch._bRtl?"right":"left"]=p+"px";this._setTempState(Math.abs(p)<sap.m.Switch._SWAPPOINT)};
sap.m.Switch.prototype._setTempState=function(b){if(this._bTempState===b){return}this._bTempState=b;this._$Handle[0].setAttribute("data-sap-ui-swt",b?this._sOn:this._sOff)};
sap.m.Switch._getCssParameter=function(p){var g=sap.ui.core.theming.Parameters.get;return g(p)||g(p+"-"+sap.ui.Device.os.name.toLowerCase())};
sap.m.Switch.prototype.handleFocus=function(){this._$Handle[0].focus()};
(function(){var p="sapMSwitch-TRANSITIONTIME",t=sap.m.Switch._getCssParameter(p);sap.m.Switch._bUseTransition=!!(Number(t));sap.m.Switch._TRANSITIONTIME=Number(t)||0})();sap.m.Switch._bRtl=sap.ui.getCore().getConfiguration().getRTL();sap.m.Switch._ONPOSITION=Number(sap.m.Switch._getCssParameter("sapMSwitch-ONPOSITION"));sap.m.Switch._OFFPOSITION=Number(sap.m.Switch._getCssParameter("sapMSwitch-OFFPOSITION"));sap.m.Switch._SWAPPOINT=Math.abs((sap.m.Switch._ONPOSITION-sap.m.Switch._OFFPOSITION)/2);sap.m.Switch._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");
sap.m.Switch.prototype.onBeforeRendering=function(){var S=sap.m.Switch;this._sOn=this.getCustomTextOn()||S._oRb.getText("SWITCH_ON");this._sOff=this.getCustomTextOff()||S._oRb.getText("SWITCH_OFF");this._bDisabled=!this.getEnabled();this._bCheckboxRendered=this.getName()};
sap.m.Switch.prototype.onAfterRendering=function(){var s;s=this.$();this._$Switch=s.find(".sapMSwt");this._$SwitchInner=this._$Switch.children(".sapMSwtInner");this._$Handle=this._$SwitchInner.children(".sapMSwtHandle");this._$Checkbox=s.children("input");this._iSwitchWidth=this._$Switch.outerWidth()};
sap.m.Switch.prototype.ontouchstart=function(e){var t=e.targetTouches[0];e.originalEvent._sapui_handledByControl=true;if(sap.m.touch.countContained(e.touches,this.getId())>1||this._bDisabled){return}if(jQuery.device.is.desktop){jQuery.sap.delayedCall(0,this,"handleFocus")}this._iActiveTouch=t.identifier;this._$Switch.addClass("sapMSwtPressed").removeClass("sapMSwtTrans");this._bTempState=this.getState();this._iTouchStartPageX=t.pageX;this._iSwitchPositionLeft=this._$SwitchInner.position().left;this._bDragged=false};
sap.m.Switch.prototype.ontouchmove=function(e){e.originalEvent._sapui_handledByControl=true;var t,p,T=sap.m.touch;if(this._bDisabled){return}t=T.find(e.changedTouches,this._iActiveTouch);if(!t||t.pageX===this._iTouchStartPageX){return}this._bDragged=true;p=((this._iTouchStartPageX-t.pageX)*-1)+this._iSwitchPositionLeft;if(sap.m.Switch._bRtl){p=-p}this._updateUI(p)};
if(sap.ui.Device.os.ios&&sap.ui.Device.os.version<=5&&sap.ui.core.theming.Parameters.get("sapMPlatformDependent")=="true"){sap.m.Switch.prototype.ontouchmove=null}
sap.m.Switch.prototype.ontouchend=function(e){e.originalEvent._sapui_handledByControl=true;var t=sap.m.touch,a=jQuery.sap.assert;if(this._bDisabled){return}a(this._iActiveTouch!==undefined,'sap.m.Switch.prototype.ontouchend(): expect to already be touching');if(!t.find(e.changedTouches,this._iActiveTouch)){return}a(!t.find(e.touches,this._iActiveTouch),'sap.m.Switch.prototype.ontouchend(): touch ended also still active');this._$Switch.removeClass("sapMSwtPressed");this.setState(this._bDragged?this._bTempState:!this._bTempState,true)};
sap.m.Switch.prototype.ontouchcancel=sap.m.Switch.prototype.ontouchend;
sap.m.Switch.prototype.onsapselect=function(e){e.originalEvent._sapui_handledByControl=true;e.preventDefault();this.setState(!this.getState())};
sap.m.Switch.prototype.getFocusDomRef=function(){return this.getDomRef()?this._$Handle[0]:null};
sap.m.Switch.prototype.setState=function(s,t){var S,n,a=sap.m.Switch;if(this._bDisabled&&t){return this}n=!(this.getState()===s);if(n){this.setProperty("state",s,true)}if(!this._$Switch){return this}s=this.getState();S=s?this._sOn:this._sOff;if(n){this._$Handle[0].setAttribute("data-sap-ui-swt",S);if(this._bCheckboxRendered){this._$Checkbox[0].setAttribute("checked",s);this._$Checkbox[0].setAttribute("value",S)}s?this._$Switch.removeClass("sapMSwtOff").addClass("sapMSwtOn"):this._$Switch.removeClass("sapMSwtOn").addClass("sapMSwtOff");if(t){if(a._bUseTransition){jQuery.sap.delayedCall(a._TRANSITIONTIME,this,function _sapSwtFireChangeDelayed(){this.fireChange({state:s})},[s])}else{this.fireChange({state:s})}}}this._$Switch.addClass("sapMSwtTrans");this._$SwitchInner.removeAttr("style");return this};
