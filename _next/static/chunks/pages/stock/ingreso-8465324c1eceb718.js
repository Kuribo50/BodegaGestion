(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[686],{54994:(e,t,o)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/stock/ingreso",function(){return o(4553)}])},4553:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>d});var a=o(74848),r=o(96540),i=o(78465),n=o.n(i),l=o(96365),s=o(46005),c=o(56598);function d(){var e,t,o,i;let[d,u]=(0,r.useState)({nombre:"",articulo_id:"",categoria:"",cantidad:"",modelo:"",marca:"",numero_serie:"",codigo_minvu:"",codigo_interno:"",mac:"",descripcion:"",ubicacion:"",motivo:""}),[m,g]=(0,r.useState)([]),[b,f]=(0,r.useState)([]),[p,h]=(0,r.useState)([]),[x,v]=(0,r.useState)([]),[y,N]=(0,r.useState)([]),[w,j]=(0,r.useState)([]),[C,S]=(0,r.useState)(!1),[_,k]=(0,r.useState)(!0),[A,O]=(0,r.useState)(null),[B,E]=(0,r.useState)(!1);(0,r.useEffect)(()=>{L()},[]);let L=async()=>{try{k(!0);let e=localStorage.getItem("access_token"),[t,o,a,r,i,n]=await Promise.all([fetch("http://localhost:8000/api/categorias/",{headers:{Authorization:"Bearer ".concat(e)}}),fetch("http://localhost:8000/api/marcas/",{headers:{Authorization:"Bearer ".concat(e)}}),fetch("http://localhost:8000/api/modelos/",{headers:{Authorization:"Bearer ".concat(e)}}),fetch("http://localhost:8000/api/ubicaciones/",{headers:{Authorization:"Bearer ".concat(e)}}),fetch("http://localhost:8000/api/articulos/",{headers:{Authorization:"Bearer ".concat(e)}}),fetch("http://localhost:8000/api/motivos/",{headers:{Authorization:"Bearer ".concat(e)}})]),[l,s,c,d,u,m]=await Promise.all([t.json(),o.json(),a.json(),r.json(),i.json(),n.json()]);g(l),f(s),h(c),v(d),N(u.map(e=>({value:String(e.id),nombre:e.nombre,stock:e.stock_actual,codes:[{label:"C\xf3digo MINVU",value:e.codigo_minvu||"N/A"},{label:"C\xf3digo Interno",value:e.codigo_interno||"N/A"},{label:"N\xfamero de Serie",value:e.numero_serie||"N/A"},{label:"MAC Address",value:e.mac||"N/A"}].filter(e=>"N/A"!==e.value),categoria:e.categoria,marca:e.marca,modelo:e.modelo,ubicacion:e.ubicacion,descripcion:e.descripcion}))),j(m.map(e=>({label:e.nombre,value:String(e.id)})))}catch(e){console.error("Error al cargar los datos de la API:",e),n().fire({icon:"error",title:"Error",text:"Error al cargar los datos de la API.",position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}})}finally{k(!1)}},I=async e=>{if(e){if(e.__isNew__)try{let t=localStorage.getItem("access_token"),o=await fetch("http://localhost:8000/api/motivos/",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)},body:JSON.stringify({nombre:e.label})});if(!o.ok){let e=await o.json();n().fire({icon:"error",title:"Error",text:"Error al crear el motivo: ".concat(JSON.stringify(e)),position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}});return}let a=await o.json();j(e=>[...e,{label:a.nombre,value:String(a.id)}]),u(e=>({...e,motivo:String(a.id)})),n().fire({icon:"success",title:"\xa1\xc9xito!",text:"Motivo creado correctamente.",timer:1500,showConfirmButton:!1,toast:!0,position:"center"})}catch(e){console.error("Error al crear el motivo:",e),n().fire({icon:"error",title:"Error",text:"Hubo un problema al crear el motivo.",position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}})}else u(t=>({...t,motivo:String(e.value)}))}else u(e=>({...e,motivo:""}))},M=()=>{if(!d.nombre||!d.cantidad)return n().fire({icon:"warning",title:"Campos requeridos",text:"Todos los campos son obligatorios.",position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"}}),!1;let e=parseInt(d.cantidad,10);return!isNaN(e)&&!(e<=0)||(n().fire({icon:"warning",title:"Cantidad inv\xe1lida",text:"La cantidad debe ser un n\xfamero positivo.",position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"}}),!1)},P=async e=>{if(e.preventDefault(),S(!0),!M()){S(!1);return}try{let e=localStorage.getItem("access_token"),t=parseInt(d.cantidad,10),o=d.motivo;if(!o){let t=w.find(e=>"entrada de stock"===e.label.toLowerCase());if(t)o=t.value;else{let t=await fetch("http://localhost:8000/api/motivos/",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({nombre:"Entrada de Stock"})});if(t.ok){let e=await t.json();j(t=>[...t,{label:e.nombre,value:String(e.id)}]),o=String(e.id)}else{let e=await t.json();n().fire({icon:"error",title:"Error",text:"Error al crear el motivo por defecto: ".concat(JSON.stringify(e)),position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}}),S(!1);return}}}let a={articulo:d.articulo_id,tipo_movimiento:"Entrada",cantidad:t,fecha:new Date().toISOString(),ubicacion:d.ubicacion,comentario:"Entrada de stock",motivo:o},r=await fetch("http://localhost:8000/api/movimientos/",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify(a)});if(r.ok)n().fire({icon:"success",title:"\xa1\xc9xito!",text:"Entrada de stock registrada correctamente.",timer:1500,showConfirmButton:!1,position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}}),O(e=>e+t),N(e=>e.map(e=>e.value===d.articulo_id?{...e,stock:(e.stock||0)+t}:e)),T();else{let e=await r.json();n().fire({icon:"error",title:"Error",text:"Hubo un error al registrar la entrada de stock: ".concat(JSON.stringify(e)),position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}})}}catch(e){console.error("Error al registrar la entrada de stock:",e),n().fire({icon:"error",title:"Error",text:"Error al comunicarse con el servidor.",position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}})}finally{S(!1)}},T=()=>{u({nombre:"",articulo_id:"",categoria:"",cantidad:"",modelo:"",marca:"",numero_serie:"",codigo_minvu:"",codigo_interno:"",mac:"",descripcion:"",ubicacion:"",motivo:""}),O(null),E(!1)};return(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)(l.A,{}),(0,a.jsxs)("main",{className:"flex-1 p-6 sm:ml-64 bg-gray-100",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-6",children:"Entrada de Producto"}),(0,a.jsxs)("form",{onSubmit:P,className:"bg-white p-6 rounded-lg shadow mb-6 space-y-4",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-4 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Nombre"}),(0,a.jsx)(s.Ay,{options:y,onChange:e=>{if(e){let i=y.find(t=>t.value===e.value);if(i){var t,o,a,r;u({...d,nombre:i.nombre,articulo_id:i.value,categoria:i.categoria,marca:i.marca,modelo:i.modelo,ubicacion:i.ubicacion,numero_serie:(null===(t=i.codes.find(e=>"N\xfamero de Serie"===e.label))||void 0===t?void 0:t.value)||"",codigo_minvu:(null===(o=i.codes.find(e=>"C\xf3digo MINVU"===e.label))||void 0===o?void 0:o.value)||"",codigo_interno:(null===(a=i.codes.find(e=>"C\xf3digo Interno"===e.label))||void 0===a?void 0:a.value)||"",mac:(null===(r=i.codes.find(e=>"MAC Address"===e.label))||void 0===r?void 0:r.value)||"",descripcion:i.descripcion||"",motivo:""}),O(i.stock||0),E(!0)}}else T()},className:"w-full",placeholder:"Seleccionar Producto",isLoading:_,value:d.articulo_id&&y.find(e=>e.value===d.articulo_id)||null,isDisabled:C,formatOptionLabel:e=>(0,a.jsxs)("div",{className:"flex flex-col",children:[(0,a.jsx)("span",{className:"font-semibold",children:e.nombre}),e.codes.length>0&&(0,a.jsx)("span",{className:"text-sm text-gray-500",children:e.codes.map((t,o)=>(0,a.jsxs)("span",{children:[t.label,": ",t.value,o<e.codes.length-1&&" | "]},o))}),(0,a.jsxs)("span",{className:"text-xs text-gray-400",children:["Stock: ",e.stock]})]}),filterOption:(e,t)=>e.data.nombre.toLowerCase().includes(t.toLowerCase())})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Categor\xeda"}),(0,a.jsx)("input",{type:"text",value:d.categoria&&(null===(e=m.find(e=>e.id===d.categoria))||void 0===e?void 0:e.nombre)||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Cantidad"}),(0,a.jsx)("input",{type:"number",name:"cantidad",value:d.cantidad,onChange:e=>{let{name:t,value:o}=e.target;u(e=>({...e,[t]:o}))},className:"w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500",min:"1",disabled:C,required:!0})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Stock Actual"}),(0,a.jsx)("input",{type:"text",value:null!==A?A:"Sin informaci\xf3n",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Modelo"}),(0,a.jsx)("input",{type:"text",value:d.modelo&&(null===(t=p.find(e=>e.id===d.modelo))||void 0===t?void 0:t.nombre)||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Marca"}),(0,a.jsx)("input",{type:"text",value:d.marca&&(null===(o=b.find(e=>e.id===d.marca))||void 0===o?void 0:o.nombre)||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Ubicaci\xf3n"}),(0,a.jsx)("input",{type:"text",value:d.ubicacion&&(null===(i=x.find(e=>e.id===d.ubicacion))||void 0===i?void 0:i.nombre)||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"N\xfamero de Serie"}),(0,a.jsx)("input",{type:"text",value:d.numero_serie||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"MAC Address"}),(0,a.jsx)("input",{type:"text",value:d.mac||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"C\xf3digo Interno"}),(0,a.jsx)("input",{type:"text",value:d.codigo_interno||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"C\xf3digo MINVU"}),(0,a.jsx)("input",{type:"text",value:d.codigo_minvu||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100"})]}),(0,a.jsxs)("div",{className:"sm:col-span-2",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Descripci\xf3n"}),(0,a.jsx)("textarea",{value:d.descripcion||"",disabled:!0,className:"w-full border-gray-300 rounded-lg bg-gray-100",rows:"2"})]})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Motivo"}),(0,a.jsx)(c.A,{name:"motivo",options:w,onChange:I,className:"w-full",isClearable:!0,placeholder:"Seleccionar o Crear Motivo",isLoading:_,formatCreateLabel:e=>'Crear "'.concat(e,'"'),value:d.motivo&&w.find(e=>e.value===d.motivo)||null,isDisabled:C})]}),(0,a.jsxs)("div",{className:"flex justify-end mt-4",children:[(0,a.jsx)("button",{type:"button",onClick:()=>{n().fire({title:"\xbfCancelar ingreso?",text:"Todos los datos ingresados se perder\xe1n.",icon:"warning",showCancelButton:!0,confirmButtonText:"S\xed, cancelar",confirmButtonColor:"#d33",cancelButtonText:"No, continuar",cancelButtonColor:"#3085d6",position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",cancelButton:"bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}}).then(e=>{e.isConfirmed&&(T(),n().fire({icon:"success",title:"Cancelado",text:"El ingreso fue cancelado.",position:"center",buttonsStyling:!1,customClass:{confirmButton:"bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}}))})},className:"mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200",children:"Cancelar"}),(0,a.jsx)("button",{type:"submit",disabled:C,className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 ".concat(C?"bg-blue-300 cursor-not-allowed":""),children:C?"Registrando...":"Registrar Entrada"})]})]})]})]})}},56598:(e,t,o)=>{"use strict";o.d(t,{A:()=>b});var a=o(58168),r=o(96540),i=o(107),n=o(52836),l=o(89379),s=o(64241),c=o(82305),d=o(49164),u=["allowCreateWhileLoading","createOptionPosition","formatCreateLabel","isValidNewOption","getNewOptionData","onCreateOption","options","onChange"],m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,o=arguments.length>2?arguments[2]:void 0,a=String(e).toLowerCase(),r=String(o.getOptionValue(t)).toLowerCase(),i=String(o.getOptionLabel(t)).toLowerCase();return r===a||i===a},g={formatCreateLabel:function(e){return'Create "'.concat(e,'"')},isValidNewOption:function(e,t,o,a){return!(!e||t.some(function(t){return m(e,t,a)})||o.some(function(t){return m(e,t,a)}))},getNewOptionData:function(e,t){return{label:t,value:e,__isNew__:!0}}};o(40961),o(27003);var b=(0,r.forwardRef)(function(e,t){var o,m,b,f,p,h,x,v,y,N,w,j,C,S,_,k,A,O,B,E,L,I,M,P,T,V,D,z,J=(b=void 0!==(m=(o=(0,n.u)(e)).allowCreateWhileLoading)&&m,p=void 0===(f=o.createOptionPosition)?"last":f,x=void 0===(h=o.formatCreateLabel)?g.formatCreateLabel:h,y=void 0===(v=o.isValidNewOption)?g.isValidNewOption:v,w=void 0===(N=o.getNewOptionData)?g.getNewOptionData:N,j=o.onCreateOption,S=void 0===(C=o.options)?[]:C,_=o.onChange,O=void 0===(A=(k=(0,c.A)(o,u)).getOptionValue)?i.g:A,E=void 0===(B=k.getOptionLabel)?i.b:B,L=k.inputValue,I=k.isLoading,M=k.isMulti,P=k.value,T=k.name,V=(0,r.useMemo)(function(){return y(L,(0,d.H)(P),S,{getOptionValue:O,getOptionLabel:E})?w(L,x(L)):void 0},[x,w,E,O,L,y,S,P]),D=(0,r.useMemo)(function(){return(b||!I)&&V?"first"===p?[V].concat((0,s.A)(S)):[].concat((0,s.A)(S),[V]):S},[b,p,I,V,S]),z=(0,r.useCallback)(function(e,t){if("select-option"!==t.action)return _(e,t);var o=Array.isArray(e)?e:[e];if(o[o.length-1]===V){if(j)j(L);else{var a=w(L,L);_((0,d.D)(M,[].concat((0,s.A)((0,d.H)(P)),[a]),a),{action:"create-option",name:T,option:a})}return}_(e,t)},[w,L,M,T,V,j,_,P]),(0,l.A)((0,l.A)({},k),{},{options:D,onChange:z}));return r.createElement(i.S,(0,a.A)({ref:t},J))})},46005:(e,t,o)=>{"use strict";o.d(t,{Ay:()=>l});var a=o(52836),r=o(58168),i=o(96540),n=o(107);o(95852),o(40961),o(27003);var l=(0,i.forwardRef)(function(e,t){var o=(0,a.u)(e);return i.createElement(n.S,(0,r.A)({ref:t},o))})}},e=>{var t=t=>e(e.s=t);e.O(0,[563,615,356,23,706,365,636,593,792],()=>t(54994)),_N_E=e.O()}]);