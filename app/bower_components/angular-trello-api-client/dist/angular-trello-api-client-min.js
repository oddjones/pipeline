angular.module("trello-api-client",["satellizer"]),angular.module("trello-api-client").constant("TrelloClientConfig",{key:null,appName:null,authEndpoint:"https://trello.com",apiEndpoint:"https://api.trello.com",intentEndpoint:"https://trello.com",version:1,tokenExpiration:"never",scope:["read","write","account"],localStorageTokenName:"trello_token",returnUrl:window.location.origin}),angular.module("trello-api-client").factory("TrelloInterceptor",["$q","SatellizerShared","TrelloClientConfig",function(e,t,n){return{request:function(e){var t;return e.trelloRequest?(t=localStorage.getItem(n.localStorageTokenName),null!=t&&(null==e.params&&(e.params={}),e.params.key=n.key,e.params.token=t),e):e},responseError:function(t){return e.reject(t)}}}]).config(["$httpProvider",function(e){return e.interceptors.push("TrelloInterceptor")}]),angular.module("trello-api-client").provider("TrelloClient",function(e,t){this.init=function(n){return null!=n?(angular.extend(t,n),e.httpInterceptor=function(e){return!1},e.oauth2({name:t.appName,key:t.key,returnUrl:t.returnUrl,authorizationEndpoint:t.authEndpoint+"/"+t.version+"/authorize",defaultUrlParams:["response_type","key","return_url","expiration","scope","name"],requiredUrlParams:null,optionalUrlParams:null,scope:t.scope,scopeDelimiter:",",type:"redirect",popupOptions:t.popupOptions,responseType:"token",expiration:t.tokenExpiration})):void 0},this.$get=function(e,n,r,o,l){var a,i,u,p,c,s,m;for(i=t.apiEndpoint+"/"+t.version,a={},a.authenticate=function(){return o.authenticate(t.appName).then(function(e){return localStorage.setItem(t.localStorageTokenName,e.token),e})},m=["get","post","put","delete"],u=function(e){return a[e]=function(r,o){var a;return null==o&&(o={}),o.trelloRequest=!0,a=l.defer(),null==localStorage.getItem(t.localStorageTokenName)?a.reject("Not authenticated"):n[e](i+r,o).then(function(e){return a.resolve(e)})["catch"](a.reject),a.promise}},p=0,c=m.length;c>p;p++)s=m[p],u(s);return a}});