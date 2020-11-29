(this["webpackJsonpentity-labeler"]=this["webpackJsonpentity-labeler"]||[]).push([[0],{29:function(e,t,n){},30:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var c,o,i=n(3),r=n(2),a=n.n(r),d=n(12),l=n.n(d),s=(n(29),n(30),n(6)),u=n(1),b=n(0),j=n(23),h=n(14),O=[{type:"paragraph",children:[{type:"start_token",children:[{text:""}]},{type:"token",children:[{text:"Token 1"}]},{type:"token",children:[{text:"Token 2"}]},{type:"token",children:[{text:"Token 3"}]},{type:"token",children:[{text:"Token 4"}]},{type:"end_token",children:[{text:""}]}]}],f="content",p={isBoldMarkActive:function(e){var t=b.a.nodes(e,{match:function(e){return!0===e.bold},universal:!0});return!!Object(u.a)(t,1)[0]},isCodeBlockActive:function(e){var t=b.a.nodes(e,{match:function(e){return"code"===e.type}});return!!Object(u.a)(t,1)[0]},toggleBoldMark:function(e){var t=p.isBoldMarkActive(e);b.i.setNodes(e,{bold:!t||null},{match:function(e){return b.h.isText(e)},split:!0})},toggleCodeBlock:function(e){var t=p.isCodeBlockActive(e);b.i.setNodes(e,{type:t?null:"code"},{match:function(t){return b.a.isBlock(e,t)}})},saveValue:function(e){var t=function(e){return JSON.stringify(e)}(e.children);localStorage.setItem(f,t)},loadValue:function(){try{var e;return null!==(t=localStorage.getItem(f),e=JSON.parse(t))&&void 0!==e?e:O}catch(n){return O}var t},expandSelectionToTokenBoundaries:function(e){var t=e.selection;e.children;if((null===t||void 0===t?void 0:t.anchor)&&(null===t||void 0===t?void 0:t.focus)){var n=b.f.isAfter(t.anchor,t.focus)?[t.focus,t.anchor]:[t.anchor,t.focus],c=Object(u.a)(n,2),o=c[0],i=c[1],r=o.path.slice(0,-1),a=i.path.slice(0,-1),d=b.c.get(e,r),l=b.c.get(e,a);"token"===d.type&&"token"===l.type&&(b.i.setSelection(e,{anchor:{offset:0,path:o.path},focus:{offset:b.c.get(e,i.path).text.length,path:i.path}}),console.log({startToken:d,endToken:l}))}},wrapNodes:function(e){b.i.wrapNodes(e,{type:"entity",children:[]})}},x=p,g=(n(34),function(e){return Object(i.jsx)("span",Object(s.a)(Object(s.a)({},e.attributes),{},{className:"".concat(e.leaf.bold?"leaf-bold":""),children:e.children}))}),v=function(e){return Object(i.jsx)("pre",Object(s.a)(Object(s.a)({},e.attributes),{},{children:Object(i.jsx)("code",{children:e.children})}))},k=function(e){return Object(i.jsx)("div",Object(s.a)(Object(s.a)({},e.attributes),{},{className:"paragraph",children:e.children}))},y=function(e){return Object(i.jsx)("div",Object(s.a)(Object(s.a)({},e.attributes),{},{className:"entity",children:e.children}))},M=function(e){return Object(i.jsx)("div",Object(s.a)(Object(s.a)({},e.attributes),{},{className:"token",children:e.children}))},m=function(e){return Object(i.jsx)("div",Object(s.a)(Object(s.a)({},e.attributes),{},{className:"element",children:e.children}))},N=(n(35),n(7));!function(e){e.None="None",e.LabelMode="NoTextEdit"}(o||(o={}));var C=o.None,T=(c={},Object(N.a)(c,o.None,[]),Object(N.a)(c,o.LabelMode,["insert_text","remove_text","split_node","merge_node"]),c);var B=function(e){function t(t){var n=t.target.value;e.editor.editMode=n,console.log({editMode:e.editor.editMode})}return a.a.useEffect((function(){console.log("Change: ",{editMode:e.editor.editMode})}),[e.editor.editMode,e.editor.debug]),Object(i.jsxs)("div",{className:"toolbar",children:[Object(i.jsxs)("fieldset",{children:[Object(i.jsx)("legend",{children:"Mode:"}),Object(i.jsxs)("label",{htmlFor:"editMode-none",children:[Object(i.jsx)("input",{id:"editMode-none",onChange:t,type:"radio",value:o.None,defaultChecked:e.editor.editMode===o.None,name:"editMode"}),"None"]}),Object(i.jsxs)("label",{htmlFor:"editMode-noTextEdit",children:[Object(i.jsx)("input",{id:"editMode-noTextEdit",onChange:t,type:"radio",value:o.LabelMode,name:"editMode"}),"Label"]})]}),Object(i.jsxs)("fieldset",{children:[Object(i.jsx)("legend",{children:"Options"}),Object(i.jsxs)("label",{htmlFor:"editMode-debug",children:[Object(i.jsx)("input",{type:"checkbox",onChange:function(){e.editor.debug=!e.editor.debug},defaultChecked:Boolean(e.editor.debug)}),"Debug"]})]}),Object(i.jsxs)("fieldset",{children:[Object(i.jsx)("legend",{children:"Actions:"}),Object(i.jsx)("button",{type:"button",onClick:function(){return x.wrapNodes(e.editor)},children:"Wrap Nodes"}),Object(i.jsx)("button",{type:"button",onClick:function(){return x.saveValue(e.editor)},children:"Save"}),Object(i.jsx)("button",{type:"button",onClick:function(){return e.setValue(x.loadValue())},children:"Load"}),Object(i.jsx)("button",{type:"button",onClick:function(){return e.setValue(O)},children:"Reset"})]})]})},S=function(){var e=a.a.useMemo((function(){return function(e){var t=e;t.editMode=C,t.debug=!1;var n=e.apply;return e.apply=function(e){console.log({editMode:t.editMode,debug:t.debug,operationType:e.type,operation:e}),T[t.editMode].includes(e.type)||n(e)},t}(Object(h.c)(Object(j.a)(Object(b.j)())))}),[]),t=a.a.useState((function(){return x.loadValue()})),n=Object(u.a)(t,2),c=n[0],r=n[1],d=a.a.useCallback((function(e){switch(e.element.type){case"paragraph":return Object(i.jsx)(k,Object(s.a)({},e));case"entity":return Object(i.jsx)(y,Object(s.a)({},e));case"token":return Object(i.jsx)(M,Object(s.a)({},e));case"code":return Object(i.jsx)(v,Object(s.a)({},e));default:return Object(i.jsx)(m,Object(s.a)({},e))}}),[]),l=a.a.useCallback((function(e){return Object(i.jsx)(g,Object(s.a)({},e))}),[]),O=a.a.useCallback((function(t){e.editMode===o.LabelMode&&x.expandSelectionToTokenBoundaries(e)}),[e]);return Object(i.jsxs)("div",{className:"entity-labeler",children:[Object(i.jsx)(B,{editor:e,setValue:r}),"Mode: ",e.editMode,"Debug: ",e.debug?"True":"False",Object(i.jsx)("div",{className:"slate-container ".concat(e.debug?"slate-debug":""),children:Object(i.jsx)(h.b,{editor:e,value:c,onChange:function(e){r(e)},children:Object(i.jsx)(h.a,{renderElement:d,renderLeaf:l,onMouseUp:O})})})]})};var L=function(){return Object(i.jsxs)("div",{className:"app",children:[Object(i.jsxs)("header",{children:[Object(i.jsx)("h1",{children:"Entity Labeler"}),Object(i.jsx)("p",{children:"Label hierarchial entities with the new Slate editor"})]}),Object(i.jsx)("div",{children:Object(i.jsx)(S,{})})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),o(e),i(e),r(e)}))};l.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(L,{})}),document.getElementById("root")),w()}},[[45,1,2]]]);
//# sourceMappingURL=main.fa77a317.chunk.js.map