/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.Component");jQuery.sap.require("sap.ui.base.ManagedObject");jQuery.sap.require("sap.ui.core.ComponentMetadata");jQuery.sap.require("sap.ui.core.Core");sap.ui.base.ManagedObject.extend("sap.ui.core.Component",{constructor:function(i,s){sap.ui.base.ManagedObject.apply(this,arguments)},metadata:{stereotype:"component","abstract":true,version:"0.0",includes:[],dependencies:{libs:[],components:[],ui5version:""},config:{},customizing:{},library:"sap.ui.core"}},sap.ui.core.ComponentMetadata);
sap.ui.core.Component.activateCustomizing=function(c){};
sap.ui.core.Component.deactivateCustomizing=function(c){};
sap.ui.core.Component.getOwnerIdFor=function(o){if(o&&(o instanceof sap.ui.core.Component||o instanceof sap.ui.core.mvc.View)){return sap.ui.base.ManagedObject.getOwnerIdFor(o)}};
sap.ui.core.Component.prototype.getInterface=function(){return this};
sap.ui.core.Component.prototype._initCompositeSupport=function(s){this.getMetadata().onInitComponent();this.oComponentData=s&&s.componentData;this.getMetadata().init();this.initComponentModels();if(this.onWindowError){this._fnWindowErrorHandler=jQuery.proxy(function(e){var E=e.originalEvent;this.onWindowError(E.message,E.filename,E.lineno)},this);jQuery(window).bind("error",this._fnWindowErrorHandler)}if(this.onWindowBeforeUnload){this._fnWindowBeforeUnloadHandler=jQuery.proxy(this.onWindowBeforeUnload,this);jQuery(window).bind("beforeunload",this._fnWindowBeforeUnloadHandler)}if(this.onWindowUnload){this._fnWindowUnloadHandler=jQuery.proxy(this.onWindowUnload,this);jQuery(window).bind("unload",this._fnWindowUnloadHandler)}};
sap.ui.core.Component.prototype.destroy=function(){if(this._mMockServers){jQuery.each(this._mMockServers,function(n,m){m.stop()});delete this._mMockServers}if(this._fnWindowErrorHandler){jQuery(window).unbind("error",this._fnWindowErrorHandler);delete this._fnWindowErrorHandler}if(this._fnWindowBeforeUnloadHandler){jQuery(window).unbind("beforeunload",this._fnWindowBeforeUnloadHandler);delete this._fnWindowBeforeUnloadHandler}if(this._fnWindowUnloadHandler){jQuery(window).unbind("unload",this._fnWindowUnloadHandler);delete this._fnWindowUnloadHandler}sap.ui.base.ManagedObject.prototype.destroy.apply(this,arguments);this.getMetadata().onExitComponent()};
sap.ui.core.Component.prototype.getComponentData=function(){return this.oComponentData};
sap.ui.core.Component.prototype.initComponentModels=function(){var m=this.getMetadata();var M=m.getModels(),s=m.getServices();if(M){this._mMockServers=[];var c=function(n,u,a,b){if(this._mMockServers[n]){this._mMockServers[n].stop()}jQuery.sap.require("sap.ui.core.util.MockServer");this._mMockServers[n]=new sap.ui.core.util.MockServer({rootUri:u});this._mMockServers[n].simulate(a,b);this._mMockServers[n].start()};var C=function(n,o){var u=o.uri,T=o.type;jQuery.sap.require(T);var a=jQuery.sap.getObject(T);var b;if(T==="sap.ui.model.resource.ResourceModel"){b=new a({bundleUrl:u})}else if(T==="sap.ui.model.odata.ODataModel"){if(o.mockserver){c.call(this,n,u,o.mockserver.model,o.mockserver.data)}b=new a(u,o.settings)}else if(T==="sap.ui.model.json.JSONModel"||T==="sap.ui.model.xml.XMLModel"){b=new a();if(u){b.loadData(u)}}return b};var t=this;jQuery.each(M,function(k,o){var S=o.service,a;if(S){var b=s[S];a=C.call(t,k,b)}else if(o.type){a=C.call(t,k,o)}if(a){t.setModel(a,k||undefined)}})}};
sap.ui.component=function(c){if(!c){throw new Error("sap.ui.component cannot be called without parameter!")}if(typeof c==="string"){return sap.ui.getCore().getComponent(c)}else{var n=c.name,i=c.id,C=c.componentData,s=n+".Component",S=c.settings;var o=sap.ui.component.load(c);var I=new o(jQuery.extend({},S,{id:i,componentData:C}));jQuery.sap.log.info("Component instance Id = "+I.getId());return I}};
sap.ui.component.load=function(c){var n=c.name,u=c.url,C=n+".Component",p=C+"-preload",P=sap.ui.getCore().getConfiguration().getComponentPreload();if(!n){throw new Error("The name of the component is undefined.")}if(u){jQuery.sap.registerModulePath(n,u)}if(P==="sync"||P==="async"){try{if(!jQuery.sap.isDeclared(C,true)){jQuery.sap.require(p)}}catch(e){jQuery.sap.log.warning("couldn't preload component from "+p+": "+((e&&e.message)||e))}}jQuery.sap.require(C);var o=jQuery.sap.getObject(C);return o}
