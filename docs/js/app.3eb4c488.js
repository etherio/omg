(function(e){function t(t){for(var n,i,s=t[0],l=t[1],c=t[2],d=0,p=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,s=1;s<r.length;s++){var l=r[s];0!==a[l]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},o=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"17c9":function(e,t,r){"use strict";r("e9d1")},"3bbb":function(e,t,r){},"49ef":function(e,t,r){"use strict";r("66f0")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-overlay",{attrs:{value:e.overlay}}),r("v-navigation-drawer",{attrs:{fixed:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[r("v-list",{attrs:{nav:"",dense:""}},[r("v-list-item-group",{attrs:{"active-class":"deep-purple--text text--accent-4"},model:{value:e.group,callback:function(t){e.group=t},expression:"group"}},e._l(e.items,(function(t,n){return!t.visibility||t.visibility.includes(e.$root.role)?r("v-list-item",{key:n,attrs:{to:t.path}},[r("v-list-item-icon",[r("v-icon",[e._v(e._s(t.icon))])],1),r("v-list-item-title",[e._v(e._s(t.title))])],1):e._e()})),1)],1)],1),r("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[r("nav-bar",[r("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!0}}})],1)],1),e.$root.loaded?r("v-main",[e.$root.user?r("v-container",[e.$root.denied?r("access-denied"):r("router-view")],1):r("login-page")],1):r("v-container",[r("div",{attrs:{id:"preload"}},[r("v-progress-circular",{attrs:{size:"70",indeterminate:"",color:"primary"}})],1)])],1)},o=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-alert",{attrs:{text:"",prominent:"",type:"error",icon:"mdi-bell-ring-outline"}},[r("b",[e._v(" You do not have permission to access this page.")]),r("br"),e._v(" Please contact site admin for further more information. ")])],1)},s=[],l=r("260b"),c=(r("000b"),r("ea7b"),r("66ce"),r("e71f"),r("ca8a"),r("588e"),"Y3RrZXNxbVBIR0pIVzk1Z012bkw="),u=l["a"].initializeApp({appId:atob("MTo5NjYwNDA3NDU0NDI6d2ViOjJhODNjMDgyMTM3MjFjZGFhY2I1YmI="),apiKey:atob("QUl6YVN5QmlTa3hYX2dmbnF5aFBhdGgydkZ3bjJnakxjbHJGQ3RJ"),projectId:atob("ZXRoZXJpby12dWU="),authDomain:"etherio-vue.firebaseapp.com",storageBucket:"etherio-vue.appspot.com",databaseURL:"https://etherio-vue.firebaseio.com"}),d=l["a"].database().ref(atob(c)),p=l["a"].storage().ref("databases/".concat(atob(c))),v=l["a"].firestore().collection("public").doc(atob(c)),m=l["a"].auth,f=d.child("request_access"),h=f,g={name:"AccessDenied"},b=g,y=r("2877"),_=r("6544"),x=r.n(_),k=r("0798"),w=r("a523"),V=Object(y["a"])(b,i,s,!1,null,null,null),C=V.exports;x()(V,{VAlert:k["a"],VContainer:w["a"]});var A=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",{attrs:{align:"center",justify:"space-around"}},[e._t("default"),r("v-toolbar-title",[r("v-img",{staticClass:"shrink mr-2",attrs:{alt:"OMG",contain:"",src:"https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",transition:"scale-transition",width:"40"}})],1),r("v-spacer"),e.$root.user?r("div",[r("v-btn",{attrs:{text:""},on:{click:function(t){e.showAccount=!e.showAccount}}},[r("v-avatar",{attrs:{color:"primary",size:"30"}},[e.$root.user.photoURL?r("img",{attrs:{src:e.$root.user.photoURL,alt:"profile"}}):r("v-icon",[e._v("mdi-account-circle")])],1),r("span",{staticClass:"text-regular",domProps:{innerHTML:e._s(e.$root.user.displayName||"My Account")}})],1),e.showAccount?r("div",{staticClass:"account"},[r("v-card",{attrs:{elevation:"12"}},[r("v-navigation-drawer",{attrs:{floating:"",permanent:""}},[r("v-list",{attrs:{dense:"",rounded:""}},[r("v-list-item",{on:{click:function(t){return e.viewProfile()}}},[r("v-list-item-icon",[r("v-icon",[e._v("mdi-account")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("Profile")])],1)],1),r("v-list-item",{on:{click:function(t){return e.signOut()}}},[r("v-list-item-icon",[r("v-icon",[e._v("mdi-login-variant")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("Log Out")])],1)],1)],1)],1)],1)],1):e._e()],1):e._e()],2)},O=[],P=(r("b0c0"),r("ac1f"),r("5319"),{name:"NavBar",data:function(){return{showAccount:!1}},methods:{viewProfile:function(){this.showAccount=!1,"/profile"!==this.$route.path&&this.$router.replace("/profile")},signOut:function(){var e=this,t=this.$route.name;this.showAccount=!1,m().signOut().then((function(){return"Home"===t?null:e.$router.replace("/")}))}},watch:{showAccount:function(e){this.$root.overlay(e)}}}),j=P,$=(r("a3b7"),r("8212")),S=r("8336"),I=r("b0af"),T=r("132d"),L=r("adda"),R=r("8860"),N=r("da13"),E=r("5d23"),D=r("34c3"),M=r("f774"),U=r("0fd9"),B=r("2fa4"),G=r("2a7f"),F=Object(y["a"])(j,A,O,!1,null,"7701132c",null),q=F.exports;x()(F,{VAvatar:$["a"],VBtn:S["a"],VCard:I["a"],VIcon:T["a"],VImg:L["a"],VList:R["a"],VListItem:N["a"],VListItemContent:E["a"],VListItemIcon:D["a"],VListItemTitle:E["b"],VNavigationDrawer:M["a"],VRow:U["a"],VSpacer:B["a"],VToolbarTitle:G["a"]});var z=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{justify:"center"}},[r("v-overlay",{attrs:{value:e.loading}},[r("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1),r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("h2",{staticClass:"mb-4"},[e._v("Log In with Email")]),r("v-text-field",{attrs:{label:"Email",type:"email",rules:e.rules.email,outlined:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signInWithEmailAndPassword()}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("v-text-field",{attrs:{label:"Password",autocapitalize:"off","append-icon":(e.showPassword,""),type:e.showPassword?"text":"password",rules:e.rules.password,outlined:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signInWithEmailAndPassword()}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("v-btn",{staticClass:"my-4",attrs:{align:"center",color:"primary",large:"",block:"",outlined:""},on:{click:function(t){return e.signInWithEmailAndPassword()}}},[e._v(" Log In ")]),e.error?r("v-alert",{attrs:{dense:"",outlined:"",type:"error"}},[e._v(e._s(e.error))]):e._e()],1),r("v-divider",{staticClass:"my-10"}),r("v-btn",{staticClass:"mt-5",attrs:{color:"error",block:"",large:""},on:{click:function(t){return e.signInWithGoogle()}}},[r("span",{staticClass:"mr-2"},[r("v-icon",[e._v("mdi-google")]),e._v(" Log In with Google ")],1)]),r("v-btn",{staticClass:"mt-5",attrs:{color:"primary",block:"",large:""},on:{click:function(t){return e.signInWithFacebook()}}},[r("span",{staticClass:"mr-2"},[r("v-icon",[e._v("mdi-facebook")]),e._v(" Log In with Facebook ")],1)])],1)},W=[],J=(r("d3b7"),r("25f0"),r("466d"),{name:"LoginPage",data:function(){return{loading:!1,error:null,valid:null,email:"",password:"",showPassword:!1,rules:{email:[function(e){return!!(e||"").match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)||"Enter a vaild email address"}],password:[function(e){return!!e||"Password is required"}]}}},methods:{signInWithEmailAndPassword:function(){var e=this;this.$refs.form.validate()&&(this.loading=!0,this.error=null,m().signInWithEmailAndPassword(this.email,this.password).then((function(){return e.loading=!0})).catch((function(t){switch(e.loading=!1,t.code){case"auth/user-not-found":e.error="Email does not exist";break;case"auth/wrong-password":e.error="Incorrect password";break;default:e.error=t.message||t.toString()}})))},signInWithGoogle:function(){var e=this,t=new m.GoogleAuthProvider;this.loading=!0,this.error=null,m().signInWithRedirect(t).then((function(){return e.loading=!1}))},signInWithFacebook:function(){var e=this,t=new m.FacebookAuthProvider;this.loading=!0,this.error=null,m().signInWithRedirect(t).then((function(){return e.loading=!1}))}},beforeMount:function(){this.$root.overlay(!1)}}),H=J,Y=r("ce7e"),Z=r("4bd4"),X=r("a797"),K=r("490a"),Q=r("8654"),ee=Object(y["a"])(H,z,W,!1,null,null,null),te=ee.exports;x()(ee,{VAlert:k["a"],VBtn:S["a"],VContainer:w["a"],VDivider:Y["a"],VForm:Z["a"],VIcon:T["a"],VOverlay:X["a"],VProgressCircular:K["a"],VTextField:Q["a"]});var re={name:"App",data:function(){return{overlay:!1,drawer:!1,group:null,items:[{icon:"mdi-home",title:"Home",path:"/"},{icon:"mdi-account",title:"User",path:"/users",visibility:["admin"]},{icon:"mdi-cart",title:"Products",path:"/products",visibility:["admin","moderator"]}]}},components:{NavBar:q,LoginPage:te,AccessDenied:C},beforeMount:function(){var e=this;this.$root.overlay=function(t){e.overlay=t}}},ne=re,ae=(r("b1e5"),r("7496")),oe=r("40dc"),ie=r("5bc1"),se=r("1baa"),le=r("f6c4"),ce=Object(y["a"])(ne,a,o,!1,null,"2aa86fdd",null),ue=ce.exports;x()(ce,{VApp:ae["a"],VAppBar:oe["a"],VAppBarNavIcon:ie["a"],VContainer:w["a"],VIcon:T["a"],VList:R["a"],VListItem:N["a"],VListItemGroup:se["a"],VListItemIcon:D["a"],VListItemTitle:E["b"],VMain:le["a"],VNavigationDrawer:M["a"],VOverlay:X["a"],VProgressCircular:K["a"]});var de,pe=r("8c4f"),ve=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("product-search")],1)},me=[],fe=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",{staticClass:"pb-5",attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{staticClass:"pb-0",attrs:{label:"Search","prepend-inner-icon":"mdi-magnify",clearable:"",solo:""}}),r("v-col",{staticClass:"d-flex justify-end py-0",attrs:{cols:"12"}},[r("v-checkbox",{staticClass:"mr-4",attrs:{label:"In-stock"},model:{value:e.filter.mode[0],callback:function(t){e.$set(e.filter.mode,0,t)},expression:"filter.mode[0]"}}),r("v-checkbox",{attrs:{label:"Out of stock"},model:{value:e.filter.mode[1],callback:function(t){e.$set(e.filter.mode,1,t)},expression:"filter.mode[1]"}})],1)],1),r("v-btn",{staticClass:"mx-2",attrs:{loading:e.loading,disable:e.loading,color:"primary",large:""},on:{click:function(t){return e.search(t)}}},[e._v(" Search ")]),r("v-btn",{staticClass:"mx-2",attrs:{depressed:Boolean(e.panel.length),large:""},on:{click:function(t){e.panel.length?e.panel.pop():e.panel.push(0)}}},[r("v-icon",[e._v("mdi-filter")]),e._v(" Filter ")],1)],1),r("v-expansion-panels",{staticClass:"mt-5",attrs:{multiple:""},model:{value:e.panel,callback:function(t){e.panel=t},expression:"panel"}},[r("v-expansion-panel",[r("v-expansion-panel-header",{staticClass:"hidden"}),r("v-expansion-panel-content",[r("v-row",[r("v-col",{attrs:{cols:"6"}},[r("v-select",{attrs:{items:e.categories,label:"Categories",chips:"",multiple:"",solo:""},model:{value:e.filter.categories,callback:function(t){e.$set(e.filter,"categories",t)},expression:"filter.categories"}})],1),r("v-col",{attrs:{cols:"6"}},[r("v-select",{attrs:{solo:"",items:e.colors,label:"Colors",chips:"",multiple:""},model:{value:e.filter.colors,callback:function(t){e.$set(e.filter,"colors",t)},expression:"filter.colors"}})],1),r("v-col",{attrs:{cols:"12"}},[r("v-label",[e._v("Age Group")]),r("v-range-slider",{staticClass:"mt-5 mx-10",attrs:{step:".5","thumb-label":e.hover,hint:e.ageGroupHint,rules:e.rules.ageGroup,max:"15","persistent-hint":""},nativeOn:{mouseenter:function(t){e.hover=!0},mouseleave:function(t){e.hover=!1}},model:{value:e.filter.ageGroup,callback:function(t){e.$set(e.filter,"ageGroup",t)},expression:"filter.ageGroup"}})],1)],1)],1)],1)],1),r("div",{staticClass:"ma-2"}),e.queried.time?r("div",[r("p",[e._v(" showing "+e._s(e.queried.size)+" documents ("+e._s(e.queried.time.toFixed(2))+" seconds) ")]),r("v-divider",{staticClass:"my-5"}),r("v-row",e._l(e.results,(function(t,n){return r("v-col",{key:n,attrs:{cols:"12",sm:"6",md:"6",lg:"4",xl:"3"}},[r("product-card",{attrs:{product:t,destroy:e.deleteProduct}})],1)})),1),r("div",{staticClass:"text-center"},[r("v-pagination",{attrs:{length:e.paginate.length},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)],1):e._e()],1)},he=[],ge=(r("99af"),r("4de4"),r("4160"),r("fb6a"),r("07ac"),r("159b"),r("ddb0"),r("bf19"),r("96cf"),r("1da1")),be=r("3835"),ye=(r("a4d3"),r("e01a"),r("a9e3"),r("2909")),_e=r("d4ec"),xe=r("bee2"),ke="/assets/image.png",we=function(){function e(t){var r=this,n=t.uid,a=t.name,o=t.code,i=t.price,s=t.description,l=t.image,c=t.category,u=t.colors,d=t.stock,v=t.minAge,m=t.maxAge,f=t.createdAt,h=t.createdBy;Object(_e["a"])(this,e);var g=new Date;g.setTime(f),this.photoURL=ke,this.createdBy=n||h,this.createdAt=g,this.uid=String(n),this.name=String(a),this.code=String(o),this.price=Number(i||0),this.description=String(s||""),this.image=l||null,this.category=String(c)||null,this.colors=Array.apply(void 0,Object(ye["a"])(u)),this.stock=Number(d||0),this.minAge=Number(v||0)||null,this.maxAge=Number(m||0)||null,this.image&&p.child(this.image).getDownloadURL().then((function(e){r.photoURL=e}))}return Object(xe["a"])(e,null,[{key:"make",value:function(e){var t=e.name,r=e.code,n=e.price,a=e.description,o=e.image,i=e.category,s=e.colors,l=e.stock,c=e.minAge,u=e.maxAge,d=e.createdAt,p=m().currentUser,v=new Date;v.setTime(d),this.createdAt=v.getTime(),this.createdBy=p,this.name=String(t),this.code=String(r),this.price=Number(n),this.description=String(a)||null,this.image=String(o)||null,this.category=String(i)||null,this.colors=Array.apply(void 0,Object(ye["a"])(s)),this.stock=Number(l)||0,this.minAge=Number(c)||0,this.maxAge=Number(u)||0}}]),e}(),Ve=v.collection("products").withConverter({fromFirestore:function(e){return new we(e.data())},toFirestore:function(e){return we.make(e)}}),Ce=Ve,Ae=d.child("colors"),Oe=Ae,Pe=d.child("categories"),je=Pe,$e=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{staticClass:"mx-auto my-12",attrs:{loading:e.loading}},[r("template",{slot:"progress"},[r("v-progress-linear",{attrs:{color:"deep-purple",height:"10",indeterminate:""}})],1),r("v-img",{attrs:{height:"250",src:e.product.photoURL}}),r("v-card-title",[e._v(e._s(e.product.name))]),r("v-card-text",[r("div",{staticClass:"grey--text"},[e.product.code?r("v-chip",{attrs:{small:"",color:"blue lighten-4"}},[e._v(" #"+e._s(e.product.code)+" ")]):e._e(),e.product.category?r("v-chip",{staticClass:"mx-1",attrs:{color:"primary",small:""}},[e._v(" "+e._s(e.product.category)+" ")]):e._e(),e._l(e.product.colors,(function(t){return r("span",{key:t},[t.length?r("v-chip",{staticClass:"ma-1",attrs:{small:""}},[e._v(" "+e._s(t)+" ")]):e._e()],1)})),e.product.minAge?r("v-chip",{staticClass:"ma-1",attrs:{small:"",color:"green lighten-4"}},[e._v(" "+e._s(e.product.minAge)+"yrs. ")]):e._e(),e.product.maxAge?r("v-chip",{staticClass:"ma-1",attrs:{small:"",color:"green lighten-3"}},[e._v(" "+e._s(e.product.maxAge)+"yrs. ")]):e._e()],2),r("div",{staticClass:"my-4 subtitle-1"},[e._v(e._s(e.product.price)+" Kyats")]),r("div",[e._v(" "+e._s(e.product.description)+" ")])]),r("v-divider",{staticClass:"mx-4"}),r("v-card-actions",[r("v-row",{attrs:{justify:"space-between"}},[r("v-btn",{attrs:{color:"blue",text:""}},[e._v("Edit")]),e.product.stock?r("v-btn",{attrs:{fab:"",outlined:"",color:"primary",small:""}},[e._v(e._s(e.product.stock))]):e._e(),r("v-btn",{attrs:{color:"red",text:"",disabled:"admin"!==this.$root.role,loading:e.loading},on:{click:function(t){return e.deleted()}}},[e._v("Delete")])],1)],1)],2)},Se=[],Ie={name:"ProductCard",props:["product","destroy"],data:function(){return{loading:!1}},methods:{deleted:function(){var e=this;"admin"===this.$root.role&&(this.loading=!0,this.destroy(this.product.id).then((function(t){return e.loading=!1})))}}},Te=Ie,Le=r("99d9"),Re=r("cc20"),Ne=r("8e36"),Ee=Object(y["a"])(Te,$e,Se,!1,null,null,null),De=Ee.exports;x()(Ee,{VBtn:S["a"],VCard:I["a"],VCardActions:Le["a"],VCardText:Le["b"],VCardTitle:Le["c"],VChip:Re["a"],VDivider:Y["a"],VImg:L["a"],VProgressLinear:Ne["a"],VRow:U["a"]});var Me={},Ue=function(){de=outerWidth<600||outerWidth<960?10:outerWidth<1264||outerWidth<1904?12:16},Be={name:"ProductSearch",data:function(){return{loading:!1,panel:[],filter:{ageGroup:[0,15],categories:[],colors:[],mode:[!0,!1]},rules:{ageGroup:[function(e){var t=Object(be["a"])(e,2),r=t[0],n=t[1];return n>r}]},results:[],queried:{size:null,time:null},page:null,paginate:{page:null,length:null,startAt:null,endAt:null},categories:[],colors:[],hover:!1}},methods:{search:function(){var e=this;return Object(ge["a"])(regeneratorRuntime.mark((function t(){var r,n,a,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.results=[],e.page=0,e.loading=!0,r=Date.now(),console.log("firestore:",Ce.path),n=Ce,e.fetchAllProducts||(n=e.fetchInStockOnly?Ce.where("stock",">",0):Ce.where("stock","<",1)),n.orderBy("stock"),t.next=10,n.get();case 10:a=t.sent,a.docs.forEach((function(e){return Me[e.id]=[e]})),e.panel=[],o=a.size/de,i=Math.round(o),i<o&&i++,e.page=1,e.paginate.length=i,e.paginate.startAt=e.paginate.startAt+de,e.loading=!1,e.queried.size=a.size,e.queried.time=(Date.now()-r)/1e3;case 22:case"end":return t.stop()}}),t)})))()},deleteProduct:function(e){var t=this;return Object(ge["a"])(regeneratorRuntime.mark((function r(){var n,a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(Me[e]){r.next=2;break}return r.abrupt("return",!1);case 2:return n=Object(be["a"])(Me[e],2),a=n[0],n[1],r.next=5,a.ref.delete();case 5:return o=r.sent,t.results=t.results.filter((function(e){return e.id!=a.id})),r.abrupt("return",o);case 8:case"end":return r.stop()}}),r)})))()}},computed:{ageGroupHint:function(){var e=Object(be["a"])(this.filter.ageGroup,2),t=e[0],r=e[1];return t>0||r<15?"minimum age ".concat(t," to ").concat(r," yrs."):""},fetchAllProducts:function(){return this.filter.mode[0]&&this.filter.mode[1]},fetchInStockOnly:function(){return this.filter.mode[0]&&!this.filter.mode[1]},fetchOutOfStockOnly:function(){return!this.filter.mode[0]&&this.filter.mode[1]}},beforeMount:function(){var e=this;return Object(ge["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return Ue(),window.addEventListener("resize",Ue),t.next=4,Oe.get();case 4:return r=t.sent,t.next=7,je.get();case 7:return n=t.sent,t.t0=Object,t.next=11,r.toJSON();case 11:return t.t1=t.sent,e.colors=t.t0.values.call(t.t0,t.t1),t.t2=Object,t.next=16,n.toJSON();case 16:t.t3=t.sent,e.categories=t.t2.values.call(t.t2,t.t3);case 18:case"end":return t.stop()}}),t)})))()},watch:{page:function(){var e=this,t=this.page;this.paginate.page=t,this.paginate.endAt=de*t,this.paginate.startAt=this.paginate.endAt-de;var r=Object.values(Me).slice(this.paginate.startAt,this.paginate.endAt);r.forEach((function(t){var r=t[0].data();r.id=t[0].id,Me[t[0].id][1]=r.ref,e.results.push(r)}))}},components:{ProductCard:De}},Ge=Be,Fe=(r("9966"),r("ac7c")),qe=r("62ad"),ze=r("cd55"),We=r("49e2"),Je=r("c865"),He=r("0393"),Ye=r("24c9"),Ze=r("891e"),Xe=r("5963"),Ke=r("b974"),Qe=Object(y["a"])(Ge,fe,he,!1,null,"1c94555e",null),et=Qe.exports;x()(Qe,{VBtn:S["a"],VCheckbox:Fe["a"],VCol:qe["a"],VContainer:w["a"],VDivider:Y["a"],VExpansionPanel:ze["a"],VExpansionPanelContent:We["a"],VExpansionPanelHeader:Je["a"],VExpansionPanels:He["a"],VIcon:T["a"],VLabel:Ye["a"],VPagination:Ze["a"],VRangeSlider:Xe["a"],VRow:U["a"],VSelect:Ke["a"],VTextField:Q["a"]});var tt={name:"Home",components:{ProductSearch:et}},rt=tt,nt=Object(y["a"])(rt,ve,me,!1,null,null,null),at=nt.exports,ot=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("h2",[e._v("Users")]),r("v-divider",{staticClass:"my-4"}),r("v-card",[r("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",[e._v("Name")]),r("th",[e._v("Providers")]),r("th",[e._v("Role")]),r("th",[e._v("Last Login")]),r("th",[r("span",{staticClass:"sr-only"},[e._v("actions")])])])]),r("tbody",e._l(e.users,(function(t){return r("tr",{key:t.uid},[r("td",[e._v(" "+e._s(t.displayName)+" "),r("br"),t.email?r("a",{attrs:{href:"mailto:"+t.email}},[e._v(" "+e._s(t.email)+" ")]):e._e(),t.phoneNumber?r("a",{attrs:{href:"tel:"+t.phoneNumber}},[e._v(" "+e._s(t.phoneNumber)+" ")]):e._e()]),r("td",e._l(t.providers,(function(t,n){return r("v-icon",{key:n,attrs:{small:""}},[e._v(e._s(t.icon))])})),1),r("td",[t.role?r("v-chip",{staticClass:"chip",attrs:{small:"",color:"admin"==t.role?"primary":""},domProps:{innerHTML:e._s(t.role||"user")}}):e._e()],1),r("td",[e._v(e._s(t.lastLogin))]),r("td",[t.role&&"admin"!=t.role?r("v-btn",{attrs:{small:"",icon:"",color:"primary"},on:{click:function(r){return e.setAdmin(t.uid)}}},[r("v-icon",[e._v("mdi-chess-king")])],1):e._e(),"moderator"!=t.role?r("v-btn",{attrs:{small:"",icon:"",color:"primary"},on:{click:function(r){return e.setModerator(t.uid)}}},[r("v-icon",[e._v("mdi-chess-queen")])],1):e._e(),r("v-btn",{attrs:{small:"",icon:"",color:"error"},on:{click:function(r){return e.deleteUser(t.uid)}}},[r("v-icon",[e._v("mdi-delete")])],1)],1)])})),0)]},proxy:!0}])})],1)],1)},it=[],st=(r("7db0"),r("d81d"),r("1276"),r("bc3a")),lt=r.n(st),ct="https://serene-galileo-f84e05.netlify.app/.netlify/functions",ut={password:{icon:"mdi-key"},phone:{icon:"mdi-cellphone"},email:{icon:"mdi-email"},google:{icon:"mdi-google"},facebook:{icon:"mdi-facebook"}},dt={name:"Users",data:function(){return{users:[],request_access:[]}},methods:{setAdmin:function(e){var t=this;lt.a.get("".concat(ct,"/role?uid=").concat(e,"&role=admin&token=").concat(this.$root.user.stsTokenManager.accessToken)).then((function(){var r=t.users.find((function(t){return t.uid==e}));r.role="admin",console.log(r)}))},setModerator:function(e){var t=this;lt.a.get("".concat(ct,"/role?uid=").concat(e,"&role=moderator&token=").concat(this.$root.user.stsTokenManager.accessToken)).then((function(){var r=t.users.find((function(t){return t.uid==e}));r.role="moderator",console.log(r)}))},deleteUser:function(e){var t=this;lt.a.delete("".concat(ct,"/users?token=").concat(this.$root.user.stsTokenManager.accessToken,"&uid=").concat(e)).then((function(r){t.users=t.users.filter((function(t){return t.uid!=e}))}))},acceptRequest:function(e){var t=this;this.request_access.filter((function(r){if(r.uid!==e)return!0;lt()({method:"GET",url:"".concat(ct,"/role?uid=").concat(r.uid,"&role=moderator&token=").concat(t.$root.user.stsTokenManager.accessToken)})}))}},beforeMount:function(){var e=this;h.get().then((function(t){t.forEach((function(t){var r=t.toJSON();r.ref=t.ref,e.request_access.push(r)}))})),lt.a.get("".concat(ct,"/users?token=").concat(this.$root.user.stsTokenManager.accessToken)).then((function(t){var r=t.data,n=r.filter((function(t){return t.uid!=e.$root.user.uid}));n.forEach((function(e){e.providers=e.providers.map((function(e){return ut[e.split(".")[0]]}))})),e.users=n}))}},pt=dt,vt=(r("49ef"),r("17c9"),r("1f4f")),mt=Object(y["a"])(pt,ot,it,!1,null,"011fc1fc",null),ft=mt.exports;x()(mt,{VBtn:S["a"],VCard:I["a"],VChip:Re["a"],VContainer:w["a"],VDivider:Y["a"],VIcon:T["a"],VSimpleTable:vt["a"]});var ht=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("h2",[e._v("User Profile")]),r("v-divider",{staticClass:"mt-2 py-5"}),e.error?r("v-alert",{attrs:{dense:"",outlined:"",type:"error"},domProps:{innerHTML:e._s(e.error)}}):e._e(),r("v-row",{attrs:{justify:"space-between",align:"start"}},[r("v-col",{attrs:{lg:"4",xl:"4",sm:"4",cols:"12"}},[r("v-avatar",{staticClass:"profile",attrs:{color:"grey",size:"200"}},[r("v-img",{attrs:{src:e.$root.user.photoURL||"/assets/image.png"}})],1)],1),r("v-col",{attrs:{lg:"8",xl:"8",sm:"8",cols:"12"}},[r("v-text-field",{attrs:{label:"Display Name",placeholder:e.$root.user.displayName||" ",outlined:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),r("v-text-field",{attrs:{label:"Email Address",placeholder:e.$root.user.email||"",outlined:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("v-text-field",{attrs:{label:"Phone Number",placeholder:e.$root.user.phoneNumber||" ",outlined:""},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),r("v-btn",{attrs:{color:"primary",large:""}},[r("v-icon",{staticClass:"pr-2"},[e._v("mdi-content-save")]),e._v(" Save")],1)],1),r("v-col",{attrs:{cols:"6"}},[r("v-card-title",[e._v("Created On")]),r("v-card-text",[e._v(e._s(e.createdAt))])],1),r("v-col",{attrs:{cols:"6"}},[r("v-card-title",[e._v("Last Login")]),r("v-card-text",[e._v(e._s(e.lastLoginAt))])],1),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{staticClass:"pl-8 pr-10",attrs:{color:"error"},on:{click:function(t){return e.deleteAccount()}}},[r("v-icon",{staticClass:"pr-2"},[e._v("mdi-delete")]),e._v(" Delete Account")],1)],1)],1)],1)},gt=[],bt={name:"Profile",data:function(){return{email:null,name:null,password:null,phone:null,error:null}},methods:{deleteAccount:function(){var e=this;return Object(ge["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(confirm("Are you sure to delete this account?")){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,t.next=5,m().currentUser.delete();case 5:e.$root.role=null,e.$root.user=null,t.next=17;break;case 9:t.prev=9,t.t0=t["catch"](2),t.t1=t.t0.code,t.next="auth/requires-recent-login"===t.t1?14:16;break;case 14:return e.error="<b>Unable to delete your account!</b><br>Please login again to delete this account.",t.abrupt("break",17);case 16:e.error=t.t0.message;case 17:case"end":return t.stop()}}),t,null,[[2,9]])})))()}},computed:{createdAt:function(){var e=new Date;return e.setTime(this.$root.user.createdAt),"".concat(e.toDateString(),", ").concat(e.toTimeString().split(" ")[0])},lastLoginAt:function(){var e=new Date;return e.setTime(this.$root.user.lastLoginAt),"".concat(e.toDateString(),", ").concat(e.toTimeString().split(" ")[0])}}},yt=bt,_t=Object(y["a"])(yt,ht,gt,!1,null,null,null),xt=_t.exports;x()(_t,{VAlert:k["a"],VAvatar:$["a"],VBtn:S["a"],VCardText:Le["b"],VCardTitle:Le["c"],VCol:qe["a"],VContainer:w["a"],VDivider:Y["a"],VIcon:T["a"],VImg:L["a"],VRow:U["a"],VTextField:Q["a"]});var kt=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"products"},[r("product-create")],1)},wt=[],Vt=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[e.loading?r("skeleton-loader",{attrs:{type:"article, list-item-two-line"}}):r("v-form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("h2",[e._v("Add New Product")])]),r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{rules:e.rules.name,hint:"required",outlined:""},scopedSlots:e._u([{key:"label",fn:function(){return[r("div",[e._v("Product Name "),r("b",[e._v("*")])])]},proxy:!0}]),model:{value:e.select.name,callback:function(t){e.$set(e.select,"name",t)},expression:"select.name"}})],1),r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{rules:e.rules.code,hint:"required",outlined:""},scopedSlots:e._u([{key:"label",fn:function(){return[r("div",[e._v("Item Code "),r("b",[e._v("*")])])]},proxy:!0}]),model:{value:e.select.code,callback:function(t){e.$set(e.select,"code",t)},expression:"select.code"}})],1),r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{rules:e.rules.price,hint:"required",suffix:"Ks.",outlined:"",required:""},scopedSlots:e._u([{key:"label",fn:function(){return[r("div",[e._v("Sale Price "),r("b",[e._v("*")])])]},proxy:!0}]),model:{value:e.select.price,callback:function(t){e.$set(e.select,"price",t)},expression:"select.price"}})],1),r("v-col",{attrs:{cols:"12"}},[r("v-textarea",{attrs:{hint:"optional",outlined:"",label:"Description",rows:"4"},model:{value:e.select.description,callback:function(t){e.$set(e.select,"description",t)},expression:"select.description"}})],1),r("v-col",{attrs:{cols:"5"}},[r("v-combobox",{attrs:{items:e.categories,label:"Category",clearable:"",outlined:"","persistent-hint":""},model:{value:e.select.category,callback:function(t){e.$set(e.select,"category",t)},expression:"select.category"}})],1),r("v-col",{attrs:{cols:"7"}},[r("v-combobox",{attrs:{items:e.colors,label:"Colors","hide-selected":"",multiple:"",outlined:"","persistent-hint":"","small-chips":""},model:{value:e.select.colors,callback:function(t){e.$set(e.select,"colors",t)},expression:"select.colors"}})],1),r("v-col",{attrs:{cols:"12"}},[r("v-file-input",{attrs:{accept:"image/png, image/jpeg, image/bmp",placeholder:"Upload an image","prepend-icon":"mdi-camera",label:"Photo"},model:{value:e.select.file,callback:function(t){e.$set(e.select,"file",t)},expression:"select.file"}})],1)],1),r("v-col",{attrs:{cols:"12"}},[e._l(e.errors,(function(t){return r("v-alert",{key:t,attrs:{type:"error"}},[e._v(" "+e._s(t)+" ")])})),r("v-card-actions",[r("v-btn",{attrs:{type:"submit",text:"",color:"primary",block:"",outlined:"",large:""}},[e._v(" Save ")])],1)],2)],1)],1)},Ct=[],At=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",[r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-sheet",{staticClass:"pa-3"},[r("v-skeleton-loader",{staticClass:"mx-auto",attrs:{type:e.type}})],1)],1)],1)},Ot=[],Pt={name:"SkeletonLoader",props:["type"]},jt=Pt,$t=r("8dd9"),St=r("3129"),It=Object(y["a"])(jt,At,Ot,!1,null,null,null),Tt=It.exports;x()(It,{VCol:qe["a"],VRow:U["a"],VSheet:$t["a"],VSkeletonLoader:St["a"]});var Lt={name:"ProductSearch",components:{SkeletonLoader:Tt},data:function(){return{loading:!1,errors:[],select:{name:null,price:null,description:null,category:null,colors:[],file:null},rules:{name:[function(e){return null!=e}],code:[function(e){return null!=e}],price:[function(e){return null!=e}]},colors:[],categories:[]}},methods:{validate:function(){var e=[];return this.rules.name[0](this.select.name)||e.push("You should enter product name"),this.rules.code[0](this.select.code)||e.push("You should enter item code"),this.rules.price[0](this.select.price)||e.push("You should enter product price"),e},onSubmit:function(e){var t=this;return Object(ge["a"])(regeneratorRuntime.mark((function r(){var n,a,o,i,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(n=null,a=null,e.target,t.errors=t.validate(),!t.errors.length){r.next=5;break}return r.abrupt("return",!1);case 5:return o=new Date,r.next=8,fetch("https://ethereal-demo-link.netlify.app/.netlify/functions/timestamp");case 8:return i=r.sent,r.t0=o,r.next=12,i.text();case 12:if(r.t1=r.sent,r.t0.setTime.call(r.t0,r.t1),!t.select.file){r.next=18;break}return n="".concat(timestamp.getYear()-100,"/").concat(timestamp.getMonth()+1),r.next=18,p.child(n).put(t.select.file);case 18:s={code:t.select.code,price:t.select.price,description:t.select.description,category:t.select.category,color:a,image:n,createdAt:o.getTime()},console.log("donne!!!",s);case 20:case"end":return r.stop()}}),r)})))()}},beforeMount:function(){var e=this;return Object(ge["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Oe.get();case 2:return r=t.sent,t.next=5,je.get();case 5:return n=t.sent,t.t0=Object,t.next=9,r.toJSON();case 9:return t.t1=t.sent,e.colors=t.t0.values.call(t.t0,t.t1),t.t2=Object,t.next=14,n.toJSON();case 14:t.t3=t.sent,e.categories=t.t2.values.call(t.t2,t.t3);case 16:case"end":return t.stop()}}),t)})))()}},Rt=Lt,Nt=r("2b5d"),Et=r("23a7"),Dt=r("a844"),Mt=Object(y["a"])(Rt,Vt,Ct,!1,null,null,null),Ut=Mt.exports;x()(Mt,{VAlert:k["a"],VBtn:S["a"],VCardActions:Le["a"],VCol:qe["a"],VCombobox:Nt["a"],VContainer:w["a"],VFileInput:Et["a"],VForm:Z["a"],VRow:U["a"],VTextField:Q["a"],VTextarea:Dt["a"]});var Bt={name:"Products",components:{ProductCreate:Ut}},Gt=Bt,Ft=Object(y["a"])(Gt,kt,wt,!1,null,null,null),qt=Ft.exports;n["a"].use(pe["a"]);var zt=[{path:"/",name:"Home",component:at},{path:"/users",name:"Users",component:ft},{path:"/profile",name:"Profile",component:xt},{path:"/products",name:"Products",component:qt}],Wt=new pe["a"]({routes:zt}),Jt=Wt,Ht=r("f309");n["a"].use(Ht["a"]);var Yt=new Ht["a"],Zt=function(){function e(){Object(_e["a"])(this,e)}return Object(xe["a"])(e,null,[{key:"getRole",value:function(){var e=Object(ge["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=m().currentUser){e.next=2;break}return e.abrupt("return",!1);case 2:return e.next=4,t.getIdTokenResult(!0);case 4:return r=e.sent,t=t.toJSON(),t.role=r.role,t.token=r.token,e.abrupt("return",{user:t,role:r.claims.role});case 9:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),e}(),Xt={loaded:!1,user:null,denied:null,role:null,overlay:function(){return null}};u.analytics(),u.performance(),m().onAuthStateChanged((function(e){e?Zt.getRole().then((function(e){var t=e.user,r=e.role;Xt.role=r,Xt.denied=!Boolean(r),Xt.user=t,Xt.loaded=!0})):(Xt.role=null,Xt.user=null,Xt.loaded=!0)})),n["a"].config.productionTip=!0,new n["a"]({data:Xt,router:Jt,vuetify:Yt,render:function(e){return e(ue)}}).$mount("#app")},"66f0":function(e,t,r){},9966:function(e,t,r){"use strict";r("f2ea")},a3b7:function(e,t,r){"use strict";r("f79b")},b1e5:function(e,t,r){"use strict";r("3bbb")},e9d1:function(e,t,r){},f2ea:function(e,t,r){},f79b:function(e,t,r){}});
//# sourceMappingURL=app.3eb4c488.js.map