(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{246:function(e,t,a){"use strict";var n,l=a(0),r=a(23),c=a(262),i=a.n(c),o=a(263),s=a.n(o),u=a(256),d=a.n(u),m=a(357),h=a.n(m),E=a(252),p=a(284),g=a.n(p),C=a(317),b=a.n(C),S=a(298),y=a.n(S),k=a(356),w=a.n(k),v=a(24),O=a.n(v);!function(e){e[e.NONE=0]="NONE",e[e.CHECKBOX=1]="CHECKBOX",e[e.RADIO=2]="RADIO"}(n||(n={}));var P=a(5);var R=Object(P.withStyles)(e=>Object(P.createStyles)({root:{},chkStyle:{paddingBottom:0}}))(({rows:e,onRequestSort:t,selectType:a,numSelected:r,rowCount:c,onSelectAllClick:i,order:o,orderBy:s,classes:u})=>{function m(e){return function(a){t(a,e)}}const h=o||"desc";return l.createElement(y.a,null,l.createElement(E.a,null,function(){switch(a){case n.CHECKBOX:return l.createElement(d.a,{padding:"none"},l.createElement(g.a,{indeterminate:r>0&&r<c,checked:r===c,onChange:i,className:u.chkStyle}),l.createElement(O.a,{variant:"caption",align:"center"},"(",r,")"));case n.RADIO:return l.createElement(d.a,{padding:"none"})}}(),e.map(e=>l.createElement(d.a,{key:e.uniqueDataKey,numeric:e.numeric,sortDirection:s===e.uniqueDataKey&&o},l.createElement(w.a,{active:s===e.uniqueDataKey,direction:h,onClick:m(e.uniqueDataKey)},e.label)),void 0)))});function D(e,t,a){return t[a]<e[a]?1:t[a]>e[a]?-1:0}var x=function(e,t,a){const n=e.map((e,t)=>({data:e,index:t})),l=function(e,t){return"desc"===e?(e,a)=>D(e,a,t):(e,a)=>-D(e,a,t)}(t,a);return n.sort((e,t)=>{const a=l(e.data,t.data);return 0!==a?a:e.index-t.index}),n.map(e=>e.data)};a.d(t,"a",function(){return _});const B=[5,10,20,50],_=n;t.b=Object(P.withStyles)(e=>Object(P.createStyles)({root:{overflow:"auto"},clickableRow:{cursor:"pointer"},clickableCell:{color:e.palette.primary.main}}))(class extends l.PureComponent{constructor(e){super(e),this.handleRequestSort=(e,t)=>{const a=t;let n="desc";this.state.orderBy===t&&"desc"===this.state.order&&(n="asc"),this.setState(Object(r.a)(e=>{e.order=n,e.orderBy=a}))},this.handleChangePage=(e,t)=>{this.setState(Object(r.a)(e=>{e.page=t}))},this.handleChangeRowsPerPage=e=>{const t=Number(e.target.value);this.setState(Object(r.a)(e=>{e.rowsPerPage=t}))},this._sliceData=e=>{const{withPagination:t}=this.props,{rowsPerPage:a,page:n}=this.state;return t?e.slice(n*a,n*a+a):e},this._renderPagination=()=>{const{data:e,withPagination:t}=this.props,{rowsPerPage:a,page:n}=this.state;return t?l.createElement(h.a,{rowsPerPageOptions:B,component:"div",count:e.length,rowsPerPage:a,page:n,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:this.handleChangePage,onChangeRowsPerPage:this.handleChangeRowsPerPage}):null},this._updateCheckBoxValue=e=>{const{callbackForSelectedCheckboxValues:t}=this.props;this.setState(Object(r.a)(a=>{a.selectedCheckbox=e,t&&t(a.selectedCheckbox)}))},this._handleSelectAllClick=e=>{e.target.checked?this._updateCheckBoxValue(this.props.data.map(e=>`${e.id}`)):this._updateCheckBoxValue([])},this._handleRadioChange=e=>{const{callbackForSelectedRadioValues:t}=this.props;this.setState(Object(r.a)(a=>{a.selectedRadio=e,t&&t(e)}))},this._handleCheckChange=e=>{const{selectedCheckbox:t}=this.state,a=t.indexOf(e);let n=[];-1===a?n=n.concat(t,e):0===a?n=n.concat(t.slice(1)):a===t.length-1?n=n.concat(t.slice(0,-1)):a>0&&(n=n.concat(t.slice(0,a),t.slice(a+1))),this._updateCheckBoxValue(n)},this._handleRowClick=e=>t=>{const{withSelection:a,callbackForClickableRow:l}=this.props,c=`${e}`;switch(a){case n.CHECKBOX:this._handleCheckChange(c);break;case n.RADIO:this._handleRadioChange(c)}l&&this.setState(Object(r.a)(e=>{e.singleSelectedRow=c,l(c)}))},this._renderSelectBox=(e,t)=>{const{selectedRadio:a,selectedCheckbox:r}=this.state,c=`${e}`,i=-1!==r.indexOf(c);switch(t){case n.CHECKBOX:return l.createElement(d.a,{padding:"none"},l.createElement(g.a,{value:c,checked:i,name:name,color:"primary","aria-label":c}));case n.RADIO:return l.createElement(d.a,{padding:"none"},l.createElement(b.a,{checked:a===c,value:c,name:name,color:"primary","aria-label":c}))}},this._decorateCell=()=>{const{callbackForClickableRow:e,classes:t}=this.props;return{r:e?{hover:t.clickableRow}:{},c:e?{body:t.clickableCell}:{}}},this._selectedRow=e=>{const{callbackForClickableRow:t}=this.props,{singleSelectedRow:a}=this.state;return!(!t||""===a||a!=e)},this.state={order:!1,orderBy:"",page:0,rowsPerPage:this.props.defaultRowsPerPage||5,selectedRadio:"",selectedCheckbox:[],singleSelectedRow:""}}render(){const{data:e,header:t,withPagination:a,withSelection:n,classes:r}=this.props,{selectedCheckbox:c,order:o,orderBy:u,rowsPerPage:m,page:h}=this.state;return l.createElement("div",null,l.createElement("div",{className:r.root},l.createElement(i.a,{"aria-labelledby":"tableTitle"},l.createElement(R,{rows:t,onRequestSort:this.handleRequestSort,order:o,orderBy:u,selectType:n,onSelectAllClick:this._handleSelectAllClick,numSelected:c.length,rowCount:e.length}),l.createElement(s.a,null,this._sliceData(x(e,o,u)).map(e=>l.createElement(E.a,{hover:!0,selected:this._selectedRow(e.id),tabIndex:-1,key:e.id,onClick:this._handleRowClick(e.id),materialUiTableRowClass:this._decorateCell().r},this._renderSelectBox(e.id,n),t.map((t,a)=>l.createElement(d.a,{key:`${t.uniqueDataKey}_${e.id}`,numeric:t.numeric,classes:this._decorateCell().c},e[t.uniqueDataKey]))))))),this._renderPagination())}})},252:function(e,t,a){"use strict";var n=a(0),l=a(19),r=a(297),c=a.n(r),i=a(5);t.a=Object(i.withStyles)(e=>Object(i.createStyles)({nopadding:{height:"unset"}}))(({classes:e,children:t,selected:a,hover:r,tabIndex:i,onClick:o,materialUiTableRowClass:s})=>{return n.createElement(l.a,null,l=>(function(l){return n.createElement(c.a,{classes:s,className:l?e.nopadding:"",selected:a,hover:r,tabIndex:i,onClick:o},t)})(l.isCompact))})},269:function(e,t,a){"use strict";var n=a(0),l=a(21),r=a(5),c=a(279),i=a.n(c),o=a(24),s=a.n(o),u=a(259),d=a.n(u),m=a(244);const h=Object(l.d)(m.a,Object(r.withStyles)(e=>Object(r.createStyles)({root:{position:"relative",width:"100%",padding:2*e.spacing.unit},closeBtn:{position:"absolute",width:"100%",textAlign:"right",cursor:"pointer",padding:2*e.spacing.unit,left:0,top:"5px"},divider:{marginTop:"5px"}})));t.a=h(({title:e,canClose:t,history:a,classes:l})=>{return n.createElement("div",{className:l.root},n.createElement(s.a,{variant:"h5",component:"h5"},e),t&&n.createElement("div",{className:l.closeBtn},n.createElement(i.a,{onClick:function(){a.length>1&&a.goBack()}})),n.createElement(d.a,{className:l.divider}))})},277:function(e,t,a){"use strict";var n=a(0),l=a(23),r=a(313),c=a.n(r),i=a(270),o=a.n(i),s=a(247),u=a.n(s);t.a=class extends n.Component{constructor(e){super(e),this._handleClick=e=>{const t=e.currentTarget;this.setState(Object(l.a)(e=>{e.anchorEl=t}))},this._handleClose=e=>()=>{this.setState(Object(l.a)(t=>{t.anchorEl=null,null!=e&&e()}))},this.state={anchorEl:null}}render(){const{anchorEl:e}=this.state,{id:t,btnLabel:a,options:l}=this.props;return n.createElement(n.Fragment,null,n.createElement(u.a,{variant:"contained",onClick:this._handleClick,id:t},a),n.createElement(c.a,{id:t,anchorEl:e,open:Boolean(e),onClose:this._handleClose(null),PaperProps:{style:{maxHeight:300,width:200,marginLeft:"20px"}}},l.map((e,t)=>n.createElement(o.a,{key:`${e.label}_${t}`,onClick:this._handleClose(e.handleClick)},e.label))))}}},286:function(e,t,a){"use strict";var n=a(0),l=a(5),r=a(63),c=a.n(r),i=a(271),o=a.n(i),s=a(247),u=a.n(s),d=a(318),m=a.n(d);t.a=Object(l.withStyles)(e=>Object(l.createStyles)({root:{marginLeft:e.spacing.unit}}))(({callbackForSearchTextChanged:e,handleSearchClick:t,displaySearchText:a,id:l,classes:r})=>{return n.createElement(o.a,{className:r.root,id:l,label:a,variant:"outlined",onChange:function(t){const a=t.target.value;e(a)},InputProps:{startAdornment:n.createElement(m.a,{position:"start"},n.createElement(c.a,null)),endAdornment:n.createElement(m.a,{position:"end"},n.createElement(u.a,{variant:"contained",color:"primary",onClick:t},"Search"))}})})},721:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a(23),r=a(264),c=a.n(r),i=a(247),o=a.n(i),s=a(107),u=a.n(s),d=a(24),m=a.n(d),h=a(272),E=a.n(h),p=a(283),g=a.n(p),C=a(292),b=a.n(C),S=a(278),y=a.n(S),k=a(285),w=a.n(k),v=a(299),O=a.n(v),P=a(5),R=a(246),D=a(286),x=a(277),B=a(269),_=a(259),f=a.n(_),j=a(262),T=a.n(j),K=a(263),N=a.n(K),q=a(256),A=a.n(q),I=a(252);var F=Object(P.withStyles)(e=>Object(P.createStyles)({root:Object.assign({marginTop:2*e.spacing.unit},e.mixins.gutters())}))(({classes:e})=>n.createElement(u.a,{className:e.root},n.createElement(m.a,{variant:"subtitle1"},"Detail - HardCoded"),n.createElement(f.a,null),n.createElement(T.a,null,n.createElement(N.a,null,n.createElement(I.a,null,n.createElement(A.a,null,"Set Description"),n.createElement(A.a,null,"BOSS Replication Capture control critical Status set")),n.createElement(I.a,null,n.createElement(A.a,null,"System"),n.createElement(A.a,null,"BOSS")),n.createElement(I.a,null,n.createElement(A.a,null,"Component"),n.createElement(A.a,null,"BOSS")),n.createElement(I.a,null,n.createElement(A.a,null,"Instance Id"),n.createElement(A.a,null)),n.createElement(I.a,null,n.createElement(A.a,null,"Category"),n.createElement(A.a,null,"Hardware Status")),n.createElement(I.a,null,n.createElement(A.a,null,"Category Description"),n.createElement(A.a,null,"Hardware Status")),n.createElement(I.a,null,n.createElement(A.a,null,"Details"),n.createElement(A.a,null,"Unable to get DB Connection")),n.createElement(I.a,null,n.createElement(A.a,null,"Time timeReceived"),n.createElement(A.a,null,"Dec 10, 2018 12:13:51 PM")),n.createElement(I.a,null,n.createElement(A.a,null,"Auto-Clear"),n.createElement(A.a,null,"False")),n.createElement(I.a,null,n.createElement(A.a,null,"Persistence"),n.createElement(A.a,null,"True")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Date and Time"),n.createElement(A.a,null,"Dec 10, 2018 12:13:51 PM")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Component Type"),n.createElement(A.a,null,"BOSS Replication")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Component Category"),n.createElement(A.a,null,"Retail\\SelfCheckout\\BOSS")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Component Instance"),n.createElement(A.a,null)),n.createElement(I.a,null,n.createElement(A.a,null,"Event Condition"),n.createElement(A.a,null,"Capture Control")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Condition Value"),n.createElement(A.a,null,"Failed")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Text"),n.createElement(A.a,null,"Unable to get DB Connection")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Source"),n.createElement(A.a,null,"BOSS")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Category"),n.createElement(A.a,null,"Alert")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Sender Name"),n.createElement(A.a,null,"Store01-BOSS")),n.createElement(I.a,null,n.createElement(A.a,null,"Event Detail"),n.createElement(A.a,null,"Unable to get connection to database initializing replication"))))));function H(){return(H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}const V=({classes:e,setShowDisplayError:t,callbackForRowClick:a})=>{return n.createElement(c.a,{container:!0},n.createElement(B.a,{title:"System Alert",canClose:!0}),n.createElement(c.a,{item:!0,xs:12,className:e.root},n.createElement(u.a,{className:e.paper},n.createElement(m.a,{variant:"body2"},"View the active status reported for all discovered system."),n.createElement("div",{className:e.buttonContainer},n.createElement(x.a,{id:"actions",btnLabel:"Actions...",options:[{label:"Delete",handleClick:()=>{}},{label:"Ignore",handleClick:()=>{}}]}),n.createElement(o.a,{variant:"contained",color:"primary",onClick:t(!0)},"Refresh"),n.createElement(o.a,{variant:"contained",color:"primary",onClick:()=>alert("Download as CSV")},n.createElement(O.a,{fontSize:"small"})),n.createElement(D.a,{callbackForSearchTextChanged:()=>{},handleSearchClick:()=>{},displaySearchText:"Filter..."})),n.createElement("div",null,n.createElement(R.b,{data:[{id:0,name:"Unable to get DB Connection",severity:"Critical",system:"BOSS",component:"BOSS",category:"Hardware Status",timeReceived:"Dec 10, 2018 12:12",details:"Unable to get DB Connection"}],header:[{uniqueDataKey:"name",numeric:!1,label:"Name"},{uniqueDataKey:"severity",numeric:!1,label:"Severity"},{uniqueDataKey:"system",numeric:!1,label:"System"},{uniqueDataKey:"component",numeric:!1,label:"Component"},{uniqueDataKey:"category",numeric:!1,label:"Category"},{uniqueDataKey:"timeReceived",numeric:!1,label:"Time Received"},{uniqueDataKey:"details",numeric:!1,label:"Details"}],defaultRowsPerPage:5,withPagination:!0,withSelection:R.a.CHECKBOX,callbackForClickableRow:a})))))};var U=Object(P.withStyles)(e=>Object(P.createStyles)({root:Object.assign({},e.mixins.gutters()),paper:Object.assign({},e.mixins.gutters(),{paddingTop:2*e.spacing.unit,paddingBottom:2*e.spacing.unit}),buttonContainer:{paddingTop:8*e.spacing.unit,paddingBottom:3*e.spacing.unit,display:"flex",alignItems:"center","& > button":{marginRight:e.spacing.unit}}}))(class extends n.PureComponent{constructor(e){super(e),this._displayError=e=>()=>{this.setState(Object(l.a)(t=>{t.dialogOpen=e}))},this._handleClose=()=>{this.setState(Object(l.a)(e=>{e.dialogOpen=!1}))},this._detailClick=e=>{this.setState(Object(l.a)(e=>{e.showDetail=!0}))},this.state={dialogOpen:!1,showDetail:!1}}render(){const{classes:e}=this.props,{showDetail:t}=this.state;return n.createElement(n.Fragment,null,n.createElement(V,H({},this.props,{setShowDisplayError:this._displayError,callbackForRowClick:this._detailClick})),t&&n.createElement(F,null),n.createElement(E.a,{open:this.state.dialogOpen,onClose:this._handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},n.createElement(y.a,{id:"alert-dialog-title"},"Selection error"),n.createElement(g.a,null,n.createElement(b.a,{id:"alert-dialog-description"},"You are required to select records before starting an action.")),n.createElement(w.a,null,n.createElement(o.a,{onClick:this._handleClose,color:"primary"},"Close"))))}});t.default=()=>n.createElement(U,null)}}]);
//# sourceMappingURL=8.bundle.js.map