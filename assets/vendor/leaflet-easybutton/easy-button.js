(function(){L.Control.EasyBar=L.Control.extend({options:{position:"topleft",id:null,leafletClasses:true},initialize:function(e,c){if(c){L.Util.setOptions(this,c)}this._buildContainer();this._buttons=[];for(var d=0;d<e.length;d++){e[d]._bar=this;e[d]._container=e[d].button;this._buttons.push(e[d]);this.container.appendChild(e[d].button)}},_buildContainer:function(){this._container=this.container=L.DomUtil.create("div","");this.options.leafletClasses&&L.DomUtil.addClass(this.container,"leaflet-bar easy-button-container leaflet-control");this.options.id&&(this.container.id=this.options.id)},enable:function(){L.DomUtil.addClass(this.container,"enabled");L.DomUtil.removeClass(this.container,"disabled");this.container.setAttribute("aria-hidden","false");return this},disable:function(){L.DomUtil.addClass(this.container,"disabled");L.DomUtil.removeClass(this.container,"enabled");this.container.setAttribute("aria-hidden","true");return this},onAdd:function(){return this.container},addTo:function(f){this._map=f;for(var d=0;d<this._buttons.length;d++){this._buttons[d]._map=f}var c=this._container=this.onAdd(f),g=this.getPosition(),e=f._controlCorners[g];L.DomUtil.addClass(c,"leaflet-control");if(g.indexOf("bottom")!==-1){e.insertBefore(c,e.firstChild)}else{e.appendChild(c)}return this}});L.easyBar=function(){var c=[L.Control.EasyBar];for(var d=0;d<arguments.length;d++){c.push(arguments[d])}return new (Function.prototype.bind.apply(L.Control.EasyBar,c))};L.Control.EasyButton=L.Control.extend({options:{position:"topleft",id:null,type:"replace",states:[],leafletClasses:true,tagName:"button",},initialize:function(d,f,e,g){this.options.states=[];if(g!=null){this.options.id=g}this.storage={};if(typeof arguments[arguments.length-1]==="object"){L.Util.setOptions(this,arguments[arguments.length-1])}if(this.options.states.length===0&&typeof d==="string"&&typeof f==="function"){this.options.states.push({icon:d,onClick:f,title:typeof e==="string"?e:""})}this._states=[];for(var c=0;c<this.options.states.length;c++){this._states.push(new b(this.options.states[c],this))}this._buildButton();this._activateState(this._states[0])},_buildButton:function(){this.button=L.DomUtil.create(this.options.tagName,"");if(this.options.tagName==="button"){this.button.setAttribute("type","button")}if(this.options.id){this.button.id=this.options.id}if(this.options.leafletClasses){L.DomUtil.addClass(this.button,"easy-button-button leaflet-bar-part leaflet-interactive")}L.DomEvent.addListener(this.button,"dblclick",L.DomEvent.stop);L.DomEvent.addListener(this.button,"mousedown",L.DomEvent.stop);L.DomEvent.addListener(this.button,"click",function(d){L.DomEvent.stop(d);this._currentState.onClick(this,this._map?this._map:null);this._map&&this._map.getContainer().focus()},this);if(this.options.type=="replace"){this.button.appendChild(this._currentState.icon)}else{for(var c=0;c<this._states.length;c++){this.button.appendChild(this._states[c].icon)}}},_currentState:{stateName:"unnamed",icon:(function(){return document.createElement("span")})()},_states:null,state:function(c){if(typeof c=="string"){this._activateStateNamed(c)}else{if(typeof c=="number"){this._activateState(this._states[c])}}return this},_activateStateNamed:function(d){for(var c=0;c<this._states.length;c++){if(this._states[c].stateName==d){this._activateState(this._states[c])}}},_activateState:function(d){if(d===this._currentState){return}else{if(this.options.type=="replace"){this.button.appendChild(d.icon);this.button.removeChild(this._currentState.icon)}if(d.title){this.button.title=d.title}else{this.button.removeAttribute("title")}for(var c=0;c<this._states.length;c++){L.DomUtil.removeClass(this._states[c].icon,this._currentState.stateName+"-active");L.DomUtil.addClass(this._states[c].icon,d.stateName+"-active")}L.DomUtil.removeClass(this.button,this._currentState.stateName+"-active");L.DomUtil.addClass(this.button,d.stateName+"-active");this._currentState=d}},enable:function(){L.DomUtil.addClass(this.button,"enabled");L.DomUtil.removeClass(this.button,"disabled");this.button.setAttribute("aria-hidden","false");return this},disable:function(){L.DomUtil.addClass(this.button,"disabled");L.DomUtil.removeClass(this.button,"enabled");this.button.setAttribute("aria-hidden","true");return this},onAdd:function(d){var c=L.easyBar([this],{position:this.options.position,leafletClasses:this.options.leafletClasses});this._anonymousBar=c;this._container=c.container;return this._anonymousBar.container},removeFrom:function(c){if(this._map===c){this.remove()}return this},});L.easyButton=function(){var c=Array.prototype.concat.apply([L.Control.EasyButton],arguments);return new (Function.prototype.bind.apply(L.Control.EasyButton,c))};function b(c,d){this.title=c.title;this.stateName=c.stateName?c.stateName:"unnamed-state";this.icon=L.DomUtil.create("span","");L.DomUtil.addClass(this.icon,"button-state state-"+this.stateName.replace(/(^\s*|\s*$)/g,""));this.icon.innerHTML=a(c.icon);this.onClick=L.Util.bind(c.onClick?c.onClick:function(){},d)}function a(d){var c;if(d.match(/[&;=<>"']/)){c=d}else{d=d.replace(/(^\s*|\s*$)/g,"");c=L.DomUtil.create("span","");if(d.indexOf("fa-")===0){L.DomUtil.addClass(c,"fa "+d)}else{if(d.indexOf("glyphicon-")===0){L.DomUtil.addClass(c,"glyphicon "+d)}else{L.DomUtil.addClass(c,d)}}c=c.outerHTML}return c}})();
