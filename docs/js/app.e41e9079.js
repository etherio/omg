(function(e){function t(t){for(var n,i,s=t[0],l=t[1],c=t[2],d=0,p=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,s=1;s<r.length;s++){var l=r[s];0!==o[l]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={app:0},a=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"0980":function(e,t,r){"use strict";r("16ed")},"16ed":function(e,t,r){},1985:function(e,t,r){},"3bbb":function(e,t,r){},"49ef":function(e,t,r){"use strict";r("66f0")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-overlay",{attrs:{value:e.overlay}}),r("v-navigation-drawer",{attrs:{fixed:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[r("v-list",{attrs:{nav:"",dense:""}},[r("v-list-item-group",{attrs:{"active-class":"deep-purple--text text--accent-4"},model:{value:e.group,callback:function(t){e.group=t},expression:"group"}},e._l(e.items,(function(t,n){return!t.visibility||t.visibility.includes(e.$root.role)?r("v-list-item",{key:n,attrs:{to:t.path}},[r("v-list-item-icon",[r("v-icon",[e._v(e._s(t.icon))])],1),r("v-list-item-title",[e._v(e._s(t.title))])],1):e._e()})),1)],1)],1),r("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[r("nav-bar",[r("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!0}}})],1)],1),e.$root.loaded?r("v-main",[e.$root.user?r("v-container",[e.$root.denied?r("access-denied"):r("router-view")],1):r("login-page")],1):r("v-container",[r("div",{attrs:{id:"preload"}},[r("v-progress-circular",{attrs:{size:"70",indeterminate:"",color:"primary"}})],1)])],1)},a=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-alert",{attrs:{text:"",prominent:"",type:"error",icon:"mdi-bell-ring-outline"}},[r("b",[e._v(" You do not have permission to access this page.")]),r("br"),e._v(" Please contact site admin for further more information. ")])],1)},s=[],l={name:"AccessDenied"},c=l,u=r("2877"),d=r("6544"),p=r.n(d),m=r("0798"),v=r("a523"),f=Object(u["a"])(c,i,s,!1,null,null,null),h=f.exports;p()(f,{VAlert:m["a"],VContainer:v["a"]});var g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",{attrs:{align:"center",justify:"space-around"}},[e._t("default"),r("v-toolbar-title",[r("v-img",{staticClass:"shrink mr-2",attrs:{alt:"OMG",contain:"",src:"https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",transition:"scale-transition",width:"40"}})],1),r("v-spacer"),e.$root.user?r("div",[r("v-btn",{attrs:{text:""},on:{click:function(t){e.showAccount=!e.showAccount}}},[r("v-avatar",{attrs:{color:"primary",size:"30"}},[e.$root.user.photoURL?r("img",{attrs:{src:e.$root.user.photoURL,alt:"profile"}}):r("v-icon",[e._v("mdi-account-circle")])],1),r("span",{staticClass:"text-regular",domProps:{innerHTML:e._s(e.$root.user.displayName||"My Account")}})],1),e.showAccount?r("div",{staticClass:"account"},[r("v-card",{attrs:{elevation:"12"}},[r("v-navigation-drawer",{attrs:{floating:"",permanent:""}},[r("v-list",{attrs:{dense:"",rounded:""}},[r("v-list-item",{on:{click:function(t){return e.viewProfile()}}},[r("v-list-item-icon",[r("v-icon",[e._v("mdi-account")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("Profile")])],1)],1),r("v-list-item",{on:{click:function(t){return e.signOut()}}},[r("v-list-item-icon",[r("v-icon",[e._v("mdi-login-variant")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("Log Out")])],1)],1)],1)],1)],1)],1):e._e()],1):e._e()],2)},b=[],y=(r("b0c0"),r("ac1f"),r("5319"),r("260b")),_=(r("000b"),r("ea7b"),r("66ce"),r("e71f"),r("ca8a"),r("588e"),"Y3RrZXNxbVBIR0pIVzk1Z012bkw="),k=y["a"].initializeApp({appId:atob("MTo5NjYwNDA3NDU0NDI6d2ViOjJhODNjMDgyMTM3MjFjZGFhY2I1YmI="),apiKey:atob("QUl6YVN5QmlTa3hYX2dmbnF5aFBhdGgydkZ3bjJnakxjbHJGQ3RJ"),projectId:atob("ZXRoZXJpby12dWU="),authDomain:"etherio-vue.firebaseapp.com",storageBucket:"etherio-vue.appspot.com",databaseURL:"https://etherio-vue.firebaseio.com"}),w=y["a"].database().ref(atob(_)),x=y["a"].storage().ref("databases/".concat(atob(_))),V=y["a"].firestore().collection("public").doc(atob(_)),A=y["a"].auth,C={name:"NavBar",data:function(){return{showAccount:!1}},methods:{viewProfile:function(){this.showAccount=!1,"/profile"!==this.$route.path&&this.$router.replace("/profile")},signOut:function(){var e=this,t=this.$route.name;this.showAccount=!1,A().signOut().then((function(){return"Home"===t?null:e.$router.replace("/")}))}},watch:{showAccount:function(e){this.$root.overlay(e)}}},P=C,O=(r("a3b7"),r("8212")),j=r("8336"),$=r("b0af"),R=r("132d"),I=r("adda"),T=r("8860"),L=r("da13"),S=r("5d23"),N=r("34c3"),E=r("f774"),D=r("0fd9"),U=r("2fa4"),M=r("2a7f"),F=Object(u["a"])(P,g,b,!1,null,"7701132c",null),q=F.exports;p()(F,{VAvatar:O["a"],VBtn:j["a"],VCard:$["a"],VIcon:R["a"],VImg:I["a"],VList:T["a"],VListItem:L["a"],VListItemContent:S["a"],VListItemIcon:N["a"],VListItemTitle:S["b"],VNavigationDrawer:E["a"],VRow:D["a"],VSpacer:U["a"],VToolbarTitle:M["a"]});var G=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{justify:"center"}},[r("v-overlay",{attrs:{value:e.loading}},[r("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1),r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("h2",{staticClass:"mb-4"},[e._v("Log In with Email")]),r("v-text-field",{attrs:{label:"Email",type:"email",rules:e.rules.email,outlined:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signInWithEmailAndPassword()}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("v-text-field",{attrs:{label:"Password",autocapitalize:"off","append-icon":(e.showPassword,""),type:e.showPassword?"text":"password",rules:e.rules.password,outlined:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signInWithEmailAndPassword()}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("v-btn",{staticClass:"my-4",attrs:{align:"center",color:"primary",large:"",block:"",outlined:""},on:{click:function(t){return e.signInWithEmailAndPassword()}}},[e._v(" Log In ")]),e.error?r("v-alert",{attrs:{dense:"",outlined:"",type:"error"}},[e._v(e._s(e.error))]):e._e()],1),r("v-divider",{staticClass:"my-10"}),r("v-btn",{staticClass:"mt-5",attrs:{color:"error",block:"",large:""},on:{click:function(t){return e.signInWithGoogle()}}},[r("span",{staticClass:"mr-2"},[r("v-icon",[e._v("mdi-google")]),e._v(" Log In with Google ")],1)]),r("v-btn",{staticClass:"mt-5",attrs:{color:"primary",block:"",large:""},on:{click:function(t){return e.signInWithFacebook()}}},[r("span",{staticClass:"mr-2"},[r("v-icon",[e._v("mdi-facebook")]),e._v(" Log In with Facebook ")],1)])],1)},z=[],B=(r("d3b7"),r("25f0"),r("466d"),{name:"LoginPage",data:function(){return{loading:!1,error:null,valid:null,email:"",password:"",showPassword:!1,rules:{email:[function(e){return!!(e||"").match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)||"Enter a vaild email address"}],password:[function(e){return!!e||"Password is required"}]}}},methods:{signInWithEmailAndPassword:function(){var e=this;this.$refs.form.validate()&&(this.loading=!0,this.error=null,A().signInWithEmailAndPassword(this.email,this.password).then((function(){return e.loading=!0})).catch((function(t){switch(e.loading=!1,t.code){case"auth/user-not-found":e.error="Email does not exist";break;case"auth/wrong-password":e.error="Incorrect password";break;default:e.error=t.message||t.toString()}})))},signInWithGoogle:function(){var e=this,t=new A.GoogleAuthProvider;this.loading=!0,this.error=null,A().signInWithRedirect(t).then((function(){return e.loading=!1}))},signInWithFacebook:function(){var e=this,t=new A.FacebookAuthProvider;this.loading=!0,this.error=null,A().signInWithRedirect(t).then((function(){return e.loading=!1}))}},beforeMount:function(){this.$root.overlay(!1)}}),W=B,J=r("ce7e"),H=r("4bd4"),X=r("a797"),Z=r("490a"),Y=r("8654"),K=Object(u["a"])(W,G,z,!1,null,null,null),Q=K.exports;p()(K,{VAlert:m["a"],VBtn:j["a"],VContainer:v["a"],VDivider:J["a"],VForm:H["a"],VIcon:R["a"],VOverlay:X["a"],VProgressCircular:Z["a"],VTextField:Y["a"]});var ee={name:"App",data:function(){return{overlay:!1,drawer:!1,group:null,items:[{icon:"mdi-home",title:"Home",path:"/"},{icon:"mdi-account",title:"User",path:"/users",visibility:["admin"]},{icon:"mdi-cart",title:"Products",path:"/products",visibility:["admin","moderator"]}]}},components:{NavBar:q,LoginPage:Q,AccessDenied:h},beforeMount:function(){var e=this;this.$root.overlay=function(t){e.overlay=t}}},te=ee,re=(r("b1e5"),r("7496")),ne=r("40dc"),oe=r("5bc1"),ae=r("1baa"),ie=r("f6c4"),se=Object(u["a"])(te,o,a,!1,null,"2aa86fdd",null),le=se.exports;p()(se,{VApp:re["a"],VAppBar:ne["a"],VAppBarNavIcon:oe["a"],VContainer:v["a"],VIcon:R["a"],VList:T["a"],VListItem:L["a"],VListItemGroup:ae["a"],VListItemIcon:N["a"],VListItemTitle:S["b"],VMain:ie["a"],VNavigationDrawer:E["a"],VOverlay:X["a"],VProgressCircular:Z["a"]});var ce,ue=r("8c4f"),de=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("product-search")],1)},pe=[],me=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",{staticClass:"pb-5",attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{staticClass:"pb-0",attrs:{label:"Search","prepend-inner-icon":"mdi-magnify",clearable:"",solo:""}}),r("v-col",{staticClass:"d-flex justify-end py-0",attrs:{cols:"12"}},[r("v-checkbox",{staticClass:"mr-4",attrs:{label:"In-stock"},model:{value:e.filter.mode[0],callback:function(t){e.$set(e.filter.mode,0,t)},expression:"filter.mode[0]"}}),r("v-checkbox",{attrs:{label:"Out of stock"},model:{value:e.filter.mode[1],callback:function(t){e.$set(e.filter.mode,1,t)},expression:"filter.mode[1]"}})],1)],1),r("v-btn",{staticClass:"mx-2",attrs:{loading:e.loading,disable:e.loading,color:"primary",large:""},on:{click:function(t){return e.search(t)}}},[e._v(" Search ")]),r("v-btn",{staticClass:"mx-2",attrs:{depressed:Boolean(e.panel.length),large:""},on:{click:function(t){e.panel.length?e.panel.pop():e.panel.push(0)}}},[r("v-icon",[e._v("mdi-filter")]),e._v(" Filter ")],1)],1),r("v-expansion-panels",{staticClass:"mt-5",attrs:{multiple:""},model:{value:e.panel,callback:function(t){e.panel=t},expression:"panel"}},[r("v-expansion-panel",[r("v-expansion-panel-header",{staticClass:"hidden"}),r("v-expansion-panel-content",[r("v-row",[r("v-col",{attrs:{cols:"6"}},[r("v-select",{attrs:{items:e.categories,label:"Categories",chips:"",multiple:"",solo:""},model:{value:e.filter.categories,callback:function(t){e.$set(e.filter,"categories",t)},expression:"filter.categories"}})],1),r("v-col",{attrs:{cols:"6"}},[r("v-select",{attrs:{solo:"",items:e.colors,label:"Colors",chips:"",multiple:""},model:{value:e.filter.colors,callback:function(t){e.$set(e.filter,"colors",t)},expression:"filter.colors"}})],1),r("v-col",{attrs:{cols:"12"}},[r("v-label",[e._v("Age Group")]),r("v-range-slider",{staticClass:"mt-5 mx-10",attrs:{step:".5","thumb-label":e.hover,hint:e.ageGroupHint,rules:e.rules.ageGroup,max:"15","persistent-hint":""},nativeOn:{mouseenter:function(t){e.hover=!0},mouseleave:function(t){e.hover=!1}},model:{value:e.filter.ageGroup,callback:function(t){e.$set(e.filter,"ageGroup",t)},expression:"filter.ageGroup"}})],1)],1)],1)],1)],1),r("div",{staticClass:"ma-2"}),e.queried.size||e.queried.time?r("div",[r("p",[e._v(" showing "+e._s(e.queried.size)+" documents ("+e._s((Number(e.queried.time)||0).toFixed(2))+" seconds) ")]),r("v-divider",{staticClass:"my-5"}),r("v-row",e._l(e.results,(function(t,n){return r("v-col",{key:n,attrs:{cols:"12",sm:"6",md:"6",lg:"4",xl:"3"}},[r("product-card",{attrs:{_ref:t.ref,removeProduct:e.removeProduct}})],1)})),1),r("div",{staticClass:"text-center"},[r("v-pagination",{attrs:{length:e.paginate.length},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)],1):e._e()],1)},ve=[],fe=(r("99af"),r("4de4"),r("4160"),r("fb6a"),r("07ac"),r("159b"),r("ddb0"),r("bf19"),r("96cf"),r("1da1")),he=r("3835"),ge=(r("a4d3"),r("e01a"),r("a9e3"),r("d4ec")),be=r("bee2"),ye=function(){function e(t){var r=t.uid,n=t.name,o=t.code,a=t.price,i=t.description,s=t.image,l=t.category,c=t.colors,u=t.stock,d=t.minAge,p=t.maxAge,m=t.createdAt;Object(ge["a"])(this,e);var v=new Date;v.setTime(m),this.uid=r,this.createdAt=v,this.name=n,this.code=o,this.price=Number(a),this.description=i,this.image=s||null,this.category=l,this.colors=c,this.stock=Number(u||0),this.minAge=Number(d||0),this.maxAge=Number(p||0)}return Object(be["a"])(e,null,[{key:"make",value:function(e){var t={};return t.name=e.name,t.code=e.code,t.price=parseFloat(e.price),t.description=e.description||null,t.image=e.image||null,t.category=e.category||null,t.colors=e.colors||[],t.minAge=Number(e.minAge),t.maxAge=Number(e.maxAge),t.stock=Number(e.stock)||0,t.uid=e.uid,t.createdAt=e.createdAt,NaN===t.minAge&&(t.minAge=null),NaN===t.maxAge&&(t.maxAge=null),t}}]),e}(),_e=V.collection("products").withConverter({fromFirestore:function(e){return new ye(e.data())},toFirestore:function(e){return ye.make(e)}}),ke=_e,we=w.child("colors"),xe=we,Ve=w.child("categories"),Ae=Ve,Ce=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{staticClass:"mx-auto my-12",attrs:{loading:e.loading}},[r("template",{slot:"progress"},[r("v-progress-linear",{attrs:{color:"deep-purple",height:"10",indeterminate:""}})],1),r("v-img",{attrs:{height:"250",src:e.imageURL}}),r("v-card-title",[e._v(e._s(e.product.name))]),r("v-card-text",[r("div",{staticClass:"grey--text"},[e._v(e._s(e.product.price)+" Kyats")]),r("div",{staticClass:"grey--text"},[e.product.code?r("v-chip",{attrs:{small:"",color:"blue lighten-4"}},[e._v(" #"+e._s(e.product.code)+" ")]):e._e(),e.product.category?r("v-chip",{staticClass:"mx-1",attrs:{color:"primary",small:""}},[e._v(" "+e._s(e.product.category)+" ")]):e._e(),e._l(e.product.colors,(function(t){return r("span",{key:t},[t.length?r("v-chip",{staticClass:"ma-1",attrs:{small:""}},[e._v(" "+e._s(t)+" ")]):e._e()],1)})),e.product.minAge?r("v-chip",{staticClass:"ma-1",attrs:{small:"",color:"green lighten-4"}},[e._v(" "+e._s(e.product.minAge)+"yrs. ")]):e._e(),e.product.maxAge?r("v-chip",{staticClass:"ma-1",attrs:{small:"",color:"green lighten-3"}},[e._v(" "+e._s(e.product.maxAge)+"yrs. ")]):e._e()],2),r("div",{staticClass:"my-4 subtitle-1 stock"},[e._v(" Stock: "),r("code",[e._v(e._s(e.product.stock||"out of stock"))])]),r("div",[r("p",[e._v(e._s(e.product.description))])])]),r("v-divider",{staticClass:"mx-4"}),r("v-card-actions",[r("v-row",{attrs:{justify:"space-between"}},[r("v-btn",{attrs:{color:"red",text:"",disabled:"admin"!==this.$root.role,loading:e.loading},on:{click:function(t){return e.destory()}}},[e._v("Delete")]),r("span",[r("v-btn",{attrs:{icon:"",color:"primary"},on:{click:function(t){return e.purchase()}}},[r("v-icon",[e._v("mdi-plus")])],1),r("v-btn",{attrs:{icon:"",color:"primary"},on:{click:function(t){return e.sale()}}},[r("v-icon",[e._v("mdi-minus")])],1)],1),r("v-btn",{attrs:{color:"blue",text:""},on:{click:function(t){return e.edit()}}},[e._v("Edit")])],1)],1)],2)},Pe=[],Oe="/assets/image.png",je={name:"ProductCard",props:["_ref","removeProduct"],data:function(){return{loading:!1,snapshot:null,product:{},imageURL:Oe}},methods:{edit:function(){},purchase:function(){this.snapshot.update({stock:this.product.stock+1})},sale:function(){this.snapshot.update({stock:this.product.stock-1})},destory:function(){var e=this;try{this.loading=!0,this.snapshot.delete().then((function(){e.loading=!1}))}catch(t){this.loading=!1,this.removeProduct(snapshot.ref.id)}}},beforeMount:function(){var e=this;return Object(fe["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e._ref.onSnapshot((function(t){var r=t.data();if(!r)return e.removeProduct(t.ref.id);e.snapshot=t.ref,e.product=r,e.product.image&&x.child(e.product.image).getDownloadURL().then((function(t){return e.imageURL=t}))}));case 1:case"end":return t.stop()}}),t)})))()}},$e=je,Re=(r("64b4"),r("99d9")),Ie=r("cc20"),Te=r("8e36"),Le=Object(u["a"])($e,Ce,Pe,!1,null,null,null),Se=Le.exports;p()(Le,{VBtn:j["a"],VCard:$["a"],VCardActions:Re["a"],VCardText:Re["b"],VCardTitle:Re["c"],VChip:Ie["a"],VDivider:J["a"],VIcon:R["a"],VImg:I["a"],VProgressLinear:Te["a"],VRow:D["a"]});var Ne={},Ee=function(){ce=outerWidth<600||outerWidth<960?10:outerWidth<1264||outerWidth<1904?12:16},De={name:"ProductSearch",data:function(){return{loading:!1,panel:[],filter:{ageGroup:[0,15],categories:[],colors:[],mode:[!0,!1]},rules:{ageGroup:[function(e){var t=Object(he["a"])(e,2),r=t[0],n=t[1];return n>r}]},results:[],queried:{size:null,time:null},page:null,paginate:{page:null,length:null,startAt:null,endAt:null},categories:[],colors:[],hover:!1}},methods:{search:function(){var e=this;return Object(fe["a"])(regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.page=0,e.loading=!0,r=Date.now(),n=ke,e.fetchAllProducts||(n=e.fetchInStockOnly?ke.where("stock",">",0):ke.where("stock","<",1)),n.orderBy("stock"),t.next=8,n.get();case 8:o=t.sent,e.results=[],e.panel=[],o.docs.forEach((function(t){e.results.push(t)})),e.loading=!1,e.queried.size=o.size,e.queried.time=(Date.now()-r)/1e3;case 15:case"end":return t.stop()}}),t)})))()},removeProduct:function(e){this.results=this.results.filter((function(t){return t.ref.id!==e})),this.queried.size=this.results.length,this.queried.time=0}},computed:{ageGroupHint:function(){var e=Object(he["a"])(this.filter.ageGroup,2),t=e[0],r=e[1];return t>0||r<15?"minimum age ".concat(t," to ").concat(r," yrs."):""},fetchAllProducts:function(){return this.filter.mode[0]&&this.filter.mode[1]},fetchInStockOnly:function(){return this.filter.mode[0]&&!this.filter.mode[1]},fetchOutOfStockOnly:function(){return!this.filter.mode[0]&&this.filter.mode[1]}},beforeMount:function(){var e=this;return Object(fe["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return Ee(),window.addEventListener("resize",Ee),t.next=4,xe.get();case 4:return r=t.sent,t.next=7,Ae.get();case 7:return n=t.sent,t.t0=Object,t.next=11,r.toJSON();case 11:return t.t1=t.sent,e.colors=t.t0.values.call(t.t0,t.t1),t.t2=Object,t.next=16,n.toJSON();case 16:t.t3=t.sent,e.categories=t.t2.values.call(t.t2,t.t3);case 18:case"end":return t.stop()}}),t)})))()},watch:{page:function(){var e=this,t=this.page;this.paginate.page=t,this.paginate.endAt=ce*t,this.paginate.startAt=this.paginate.endAt-ce;var r=Object.values(Ne).slice(this.paginate.startAt,this.paginate.endAt);r.forEach((function(t){var r=t[0].data();r.id=t[0].id,Ne[t[0].id][1]=r.ref,e.results.push(r)}))}},components:{ProductCard:Se}},Ue=De,Me=(r("0980"),r("ac7c")),Fe=r("62ad"),qe=r("cd55"),Ge=r("49e2"),ze=r("c865"),Be=r("0393"),We=r("24c9"),Je=r("891e"),He=r("5963"),Xe=r("b974"),Ze=Object(u["a"])(Ue,me,ve,!1,null,"7bf724df",null),Ye=Ze.exports;p()(Ze,{VBtn:j["a"],VCheckbox:Me["a"],VCol:Fe["a"],VContainer:v["a"],VDivider:J["a"],VExpansionPanel:qe["a"],VExpansionPanelContent:Ge["a"],VExpansionPanelHeader:ze["a"],VExpansionPanels:Be["a"],VIcon:R["a"],VLabel:We["a"],VPagination:Je["a"],VRangeSlider:He["a"],VRow:D["a"],VSelect:Xe["a"],VTextField:Y["a"]});var Ke={name:"Home",components:{ProductSearch:Ye}},Qe=Ke,et=Object(u["a"])(Qe,de,pe,!1,null,null,null),tt=et.exports,rt=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("h2",[e._v("Users")]),r("v-divider",{staticClass:"my-4"}),e.error?r("v-alert",{attrs:{text:"",prominent:"",type:"error",icon:"mdi-bell-ring-outline"}},[e._v(" "+e._s(e.error)+" ")]):e._e(),r("v-card",{attrs:{loading:e.loading}},[r("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",[e._v("Name")]),r("th",[e._v("Providers")]),r("th",[e._v("Role")]),r("th",[e._v("Last Login")]),r("th",[r("span",{staticClass:"sr-only"},[e._v("actions")])])])]),r("tbody",e._l(e.users,(function(t){return r("tr",{key:t.uid},[r("td",[e._v(" "+e._s(t.displayName)+" "),r("br"),t.email?r("a",{attrs:{href:"mailto:"+t.email}},[e._v(" "+e._s(t.email)+" ")]):e._e(),t.phoneNumber?r("a",{attrs:{href:"tel:"+t.phoneNumber}},[e._v(" "+e._s(t.phoneNumber)+" ")]):e._e()]),r("td",e._l(t.providers,(function(t,n){return r("v-icon",{key:n,attrs:{small:""}},[e._v(e._s(t.icon))])})),1),r("td",[t.role?r("v-chip",{staticClass:"chip",attrs:{small:"",color:"admin"==t.role?"primary":""},domProps:{innerHTML:e._s(t.role||"user")}}):e._e()],1),r("td",[e._v(e._s(t.lastLogin))]),r("td",[t.role&&"admin"!=t.role?r("v-btn",{attrs:{small:"",icon:"",color:"primary",disabled:e.loading},on:{click:function(r){return e.setAdmin(t.uid)}}},[r("v-icon",[e._v("mdi-chess-king")])],1):e._e(),"moderator"!=t.role?r("v-btn",{attrs:{small:"",icon:"",color:"primary",disabled:e.loadingRole},on:{click:function(r){return e.setModerator(t.uid)}}},[r("v-icon",[e._v("mdi-chess-queen")])],1):e._e(),r("v-btn",{attrs:{small:"",icon:"",color:"error",disabled:e.loadingDelete},on:{click:function(r){return e.deleteUser(t.uid)}}},[r("v-icon",[e._v("mdi-delete")])],1)],1)])})),0)]},proxy:!0}])})],1)],1)},nt=[],ot=(r("7db0"),r("d81d"),r("bc3a")),at=r.n(ot),it=(r("a15b"),r("3ca3"),r("2b3d"),"https://serene-galileo-f84e05.netlify.app");function st(e){var t=new URL(it);return t.pathname=[".netlify/functions",e].join("/"),t}var lt={get users(){return st("users")},get role(){return st("role")},get timestamp(){return st("timestamp")},useEmulator:function(e){it=e||[location.protocol,location.host].join("/")}};var ct={password:{icon:"mdi-key"},phone:{icon:"mdi-cellphone"},email:{icon:"mdi-email"},"google.com":{icon:"mdi-google"},"facebook.com":{icon:"mdi-facebook"}},ut={name:"Users",data:function(){return{loading:!0,loadingDelete:!1,loadingRole:!1,error:null,users:[],request_access:[]}},methods:{setAdmin:function(e){var t=this,r=lt.role;this.loading=!0,this.loadingRole=!0,r.searchParams.append("uid",e),r.searchParams.append("role","admin"),at()({url:r,method:"PUT",headers:{"X-Access-Token":this.$root.user.stsTokenManager.accessToken}}).then((function(){var r=t.users.find((function(t){return t.uid==e}));r.role="admin",t.loading=t.loadingRole=!1})).catch((function(e){t.error="Opps! Something went wrong...",t.loading=t.loadingRole=!1}))},setModerator:function(e){var t=this,r=lt.role;this.loading=!0,this.loadingRole=!0,r.searchParams.append("uid",e),r.searchParams.append("role","moderator"),at()({url:r,method:"PUT",headers:{"X-Access-Token":this.$root.user.stsTokenManager.accessToken}}).then((function(){var r=t.users.find((function(t){return t.uid==e}));r.role="moderator",t.loadingRole=t.loading=!1})).catch((function(e){t.error="Opps! Something went wrong...",t.loadingRole=t.loading=!1}))},setUser:function(e){var t=this,r=lt.role;this.loading=this.loadingDelete=this.loadingRole=!0,r.searchParams.append("uid",e),at()({url:r,method:"PUT",headers:{"X-Access-Token":this.$root.user.stsTokenManager.accessToken}}).then((function(){var r=t.users.find((function(t){return t.uid==e}));r.role=null,t.loadingRole=t.loading=t.loadingDelete=!1})).catch((function(e){t.error="Opps! Something went wrong...",t.loadingRole=t.loading=t.loadingDelete=!1}))},deleteUser:function(e){var t=this,r=this.users.find((function(t){return t.uid==e}));if(r.role)return this.setUser(e);var n=lt.users;this.loadingDelete=this.loading=!0,n.searchParams.append("uid",e),at()({url:n,method:"DELETE",headers:{"X-Access-Token":this.$root.user.stsTokenManager.accessToken}}).then((function(r){t.users=t.users.filter((function(t){return t.uid!=e})),t.loadingDelete=t.loading=!1})).catch((function(e){t.error="Unable to delete an user! Please try again...",t.loadingDelete=t.loading=!1}))}},beforeMount:function(){var e=this,t=lt.users;at()({url:t,method:"GET",headers:{"X-Access-Token":this.$root.user.stsTokenManager.accessToken}}).then((function(t){var r=t.data;r.forEach((function(e){e.providers=e.providers.map((function(e){return ct[e]}))})),e.loading=!1,e.users=r})).catch((function(t){e.error="Something went wrong! Please reload this page...",e.loading=!1}))}},dt=ut,pt=(r("49ef"),r("8db5"),r("1f4f")),mt=Object(u["a"])(dt,rt,nt,!1,null,"958c0960",null),vt=mt.exports;p()(mt,{VAlert:m["a"],VBtn:j["a"],VCard:$["a"],VChip:Ie["a"],VContainer:v["a"],VDivider:J["a"],VIcon:R["a"],VSimpleTable:pt["a"]});var ft=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("h2",[e._v("User Profile")]),r("v-divider",{staticClass:"mt-2 py-5"}),e.error?r("v-alert",{attrs:{dense:"",outlined:"",type:"error"},domProps:{innerHTML:e._s(e.error)}}):e._e(),r("v-row",{attrs:{justify:"space-between",align:"start"}},[r("v-col",{attrs:{lg:"4",xl:"4",sm:"4",cols:"12"}},[r("v-avatar",{staticClass:"profile",attrs:{color:"grey",size:"200"}},[r("v-img",{attrs:{src:e.$root.user.photoURL||"/assets/image.png"}})],1)],1),r("v-col",{attrs:{lg:"8",xl:"8",sm:"8",cols:"12"}},[r("v-text-field",{attrs:{label:"Display Name",placeholder:e.$root.user.displayName||" ",outlined:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),r("v-text-field",{attrs:{label:"Email Address",placeholder:e.$root.user.email||"",outlined:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("v-text-field",{attrs:{label:"Phone Number",placeholder:e.$root.user.phoneNumber||" ",outlined:""},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),r("v-btn",{attrs:{color:"primary",large:""}},[r("v-icon",{staticClass:"pr-2"},[e._v("mdi-content-save")]),e._v(" Save")],1)],1),r("v-col",{attrs:{cols:"6"}},[r("v-card-title",[e._v("Created On")]),r("v-card-text",[e._v(e._s(e.createdAt))])],1),r("v-col",{attrs:{cols:"6"}},[r("v-card-title",[e._v("Last Login")]),r("v-card-text",[e._v(e._s(e.lastLoginAt))])],1),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{staticClass:"pl-8 pr-10",attrs:{color:"error"},on:{click:function(t){return e.deleteAccount()}}},[r("v-icon",{staticClass:"pr-2"},[e._v("mdi-delete")]),e._v(" Delete Account")],1)],1)],1)],1)},ht=[],gt=(r("1276"),{name:"Profile",data:function(){return{email:null,name:null,password:null,phone:null,error:null}},methods:{deleteAccount:function(){var e=this;return Object(fe["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(confirm("Are you sure to delete this account?")){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,t.next=5,A().currentUser.delete();case 5:e.$root.role=null,e.$root.user=null,t.next=17;break;case 9:t.prev=9,t.t0=t["catch"](2),t.t1=t.t0.code,t.next="auth/requires-recent-login"===t.t1?14:16;break;case 14:return e.error="<b>Unable to delete your account!</b><br>Please login again to delete this account.",t.abrupt("break",17);case 16:e.error=t.t0.message;case 17:case"end":return t.stop()}}),t,null,[[2,9]])})))()}},computed:{createdAt:function(){var e=new Date;return e.setTime(this.$root.user.createdAt),"".concat(e.toDateString(),", ").concat(e.toTimeString().split(" ")[0])},lastLoginAt:function(){var e=new Date;return e.setTime(this.$root.user.lastLoginAt),"".concat(e.toDateString(),", ").concat(e.toTimeString().split(" ")[0])}}}),bt=gt,yt=Object(u["a"])(bt,ft,ht,!1,null,null,null),_t=yt.exports;p()(yt,{VAlert:m["a"],VAvatar:O["a"],VBtn:j["a"],VCardText:Re["b"],VCardTitle:Re["c"],VCol:Fe["a"],VContainer:v["a"],VDivider:J["a"],VIcon:R["a"],VImg:I["a"],VRow:D["a"],VTextField:Y["a"]});var kt=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"products"},[r("product-create")],1)},wt=[],xt=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-overlay",{attrs:{value:e.loading}},[r("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1),r("v-form",{ref:"form",on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("h2",[e._v("Add New Product")])]),r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{rules:e.rules.name,hint:"required",outlined:"",id:"input-name"},scopedSlots:e._u([{key:"label",fn:function(){return[r("div",[e._v("Product Name "),r("b",[e._v("*")])])]},proxy:!0}]),model:{value:e.select.name,callback:function(t){e.$set(e.select,"name",t)},expression:"select.name"}})],1),r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{rules:e.rules.code,hint:"required",outlined:"",id:"input-code"},on:{change:function(t){e.select.code=e.select.code.toUpperCase()}},scopedSlots:e._u([{key:"label",fn:function(){return[r("div",[e._v("Item Code "),r("b",[e._v("*")])])]},proxy:!0}]),model:{value:e.select.code,callback:function(t){e.$set(e.select,"code",t)},expression:"select.code"}})],1),r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{rules:e.rules.price,hint:"required",suffix:"Ks.",outlined:"",required:"",id:"input-price"},scopedSlots:e._u([{key:"label",fn:function(){return[r("div",[e._v("Sale Price "),r("b",[e._v("*")])])]},proxy:!0}]),model:{value:e.select.price,callback:function(t){e.$set(e.select,"price",t)},expression:"select.price"}})],1),r("v-col",{attrs:{cols:"12"}},[r("v-textarea",{attrs:{hint:"optional",outlined:"",label:"Description",rows:"4"},model:{value:e.select.description,callback:function(t){e.$set(e.select,"description",t)},expression:"select.description"}})],1),r("v-col",{attrs:{cols:"5"}},[r("v-combobox",{attrs:{items:e.categories,label:"Category",clearable:"",outlined:"","persistent-hint":""},model:{value:e.select.category,callback:function(t){e.$set(e.select,"category",t)},expression:"select.category"}})],1),r("v-col",{attrs:{cols:"7"}},[r("v-combobox",{attrs:{items:e.colors,label:"Colors","hide-selected":"",multiple:"",outlined:"","persistent-hint":"","small-chips":""},model:{value:e.select.colors,callback:function(t){e.$set(e.select,"colors",t)},expression:"select.colors"}})],1),r("v-col",{attrs:{cols:"12"}},[r("v-file-input",{attrs:{accept:"image/png, image/jpeg, image/bmp",placeholder:"Upload an image","prepend-icon":"mdi-camera",label:"Photo"},model:{value:e.select.image,callback:function(t){e.$set(e.select,"image",t)},expression:"select.image"}})],1)],1),r("v-col",{attrs:{cols:"12"}},[r("v-card-actions",[r("v-btn",{attrs:{type:"submit",text:"",color:"primary",block:"",outlined:"",large:""}},[e._v(" Save ")])],1)],1)],1)],1)},Vt=[],At=(r("caad"),r("2532"),{name:"ProductCreate",data:function(){return{loading:!1,select:{name:null,code:null,price:null,description:null,category:null,colors:[],image:null,minAge:null,maxAge:null},rules:{name:[function(e){return null!=e}],code:[function(e){return null!=e}],price:[function(e){return null!=e},function(e){return Number(e)>=0}]},colors:[],categories:[]}},methods:{onSubmit:function(e){var t=this;return Object(fe["a"])(regeneratorRuntime.mark((function e(){var r,n,o,a,i,s,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$refs.form.validate()){e.next=2;break}return e.abrupt("return",t.goToRequiredField());case 2:return t.loading=!0,e.next=5,at.a.get(lt.timestamp);case 5:if(r=e.sent,n=r.data.timestamp,o=new Date,o.setTime(n),a={name:t.select.name,code:t.select.code,price:t.select.price,description:t.select.description,category:t.select.category,colors:t.select.colors,image:null,createdAt:o,uid:t.$root.user.uid,minAge:null,maxAge:null},!t.select.image){e.next=16;break}return i=o.getYear()-100,s=o.getMonth()+1,a.image="".concat(i,"/").concat(s,"/").concat(a.uid,"/").concat(n),e.next=15,x.child(a.image).put(t.select.image);case 15:e.sent;case 16:return e.next=18,ke.doc().set(a);case 18:if(e.prev=18,!a.category||t.categories.includes(a.category.toLowerCase())){e.next=23;break}return e.next=22,Ae.push(a.category.toLowerCase());case 22:t.categories.push(a.category.toLowerCase());case 23:a.colors.length&&(l=a.colors.filter((function(e){return!t.colors.includes(e.toLowerCase())})),l.length&&l.forEach(function(){var e=Object(fe["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,xe.push(r.toLowerCase());case 2:t.colors.push(r.toLowerCase());case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())),e.next=29;break;case 26:e.prev=26,e.t0=e["catch"](18),console.warn(e.t0);case 29:t.loading=!1,t.$refs.form.reset();case 31:case"end":return e.stop()}}),e,null,[[18,26]])})))()},goToRequiredField:function(){if(!this.select.name){var e=document.querySelector("#input-name");return e.select(),e.scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})}if(!this.select.code){e=document.querySelector("#input-code");return e.select(),e.scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})}if(!this.select.price){e=document.querySelector("#input-price");return e.select(),e.scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})}}},beforeMount:function(){var e=this;return Object(fe["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,xe.get();case 2:return r=t.sent,t.next=5,Ae.get();case 5:n=t.sent,e.colors=Object.values(r.toJSON()),e.categories=Object.values(n.toJSON());case 8:case"end":return t.stop()}}),t)})))()}}),Ct=At,Pt=r("2b5d"),Ot=r("23a7"),jt=r("a844"),$t=Object(u["a"])(Ct,xt,Vt,!1,null,null,null),Rt=$t.exports;p()($t,{VBtn:j["a"],VCardActions:Re["a"],VCol:Fe["a"],VCombobox:Pt["a"],VContainer:v["a"],VFileInput:Ot["a"],VForm:H["a"],VOverlay:X["a"],VProgressCircular:Z["a"],VRow:D["a"],VTextField:Y["a"],VTextarea:jt["a"]});var It={name:"Products",components:{ProductCreate:Rt}},Tt=It,Lt=Object(u["a"])(Tt,kt,wt,!1,null,null,null),St=Lt.exports;n["a"].use(ue["a"]);var Nt=[{path:"/",name:"Home",component:tt},{path:"/users",name:"Users",component:vt},{path:"/profile",name:"Profile",component:_t},{path:"/products",name:"Products",component:St}],Et=new ue["a"]({routes:Nt}),Dt=Et,Ut=r("f309");n["a"].use(Ut["a"]);var Mt=new Ut["a"],Ft=function(){function e(){Object(ge["a"])(this,e)}return Object(be["a"])(e,null,[{key:"getRole",value:function(){var e=Object(fe["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=A().currentUser){e.next=2;break}return e.abrupt("return",!1);case 2:return e.next=4,t.getIdTokenResult(!0);case 4:return r=e.sent,t=t.toJSON(),t.role=r.role,t.token=r.token,e.abrupt("return",{user:t,role:r.claims.role});case 9:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),e}(),qt=r("9483");Object(qt["a"])("".concat("/","sw.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var Gt={loaded:!1,user:null,denied:null,role:null,overlay:function(){return null}};k.analytics(),k.performance(),A().onAuthStateChanged((function(e){e?Ft.getRole().then((function(e){var t=e.user,r=e.role;Gt.role=r,Gt.denied=!Boolean(r),Gt.user=t,Gt.loaded=!0})):(Gt.role=null,Gt.user=null,Gt.loaded=!0)})),n["a"].config.productionTip=!0,new n["a"]({data:Gt,router:Dt,vuetify:Mt,render:function(e){return e(le)}}).$mount("#app")},"64b4":function(e,t,r){"use strict";r("1985")},"66c4":function(e,t,r){},"66f0":function(e,t,r){},"8db5":function(e,t,r){"use strict";r("66c4")},a3b7:function(e,t,r){"use strict";r("f79b")},b1e5:function(e,t,r){"use strict";r("3bbb")},f79b:function(e,t,r){}});
//# sourceMappingURL=app.e41e9079.js.map