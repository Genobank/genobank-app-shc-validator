(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{268:function(t,e,n){"use strict";n.r(e);var r=n(28),l=(n(21),n(49),n(54),n(266),n(208),n(20),n(73),n(7).default.extend({data:function(){return{result:"",resultVerification:"",patientName:"",patientSurName:"",birthDay:"",sourceIssuer:"",vaccineCard:"",testType1:"",testTypeCode1:"",testStatus1:"",testDate1:"",testNumber1:"",testType2:"",testTypeCode2:"",testStatus2:"",testDate2:"",testNumber2:"",qrCode:"",url:"",download:!1}},head:function(){return{title:"SHC Validator app",script:[{hid:"QRCode",src:"../js/qrcode.min.js",defer:!0},{hid:"PDFDocument",src:"../js/pdfkit.standalone.js",defer:!0},{hid:"blobStream",src:"../js/blob-stream.min.js",defer:!0}]}},methods:{getQRCode:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:new window.QRCode(document.getElementById("qrCode"),{text:t.url,width:420,height:420,colorDark:"#000000",colorLight:"#ffffff",correctLevel:window.QRCode.CorrectLevel.L});case 1:case"end":return e.stop()}}),e)})))()},downloadPdf:function(){return Object(r.a)(regeneratorRuntime.mark((function t(){var e,n,r,img;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=new window.PDFDocument({margins:{top:60,bottom:60,left:40,right:40}}),n=e.pipe(window.blobStream()),r=document.getElementById("qrCode"),img=r.getElementsByTagName("img"),e.image(img[0].src,60,60,{width:300}),e.end(),n.on("finish",(function(){var t=n.toBlob("application/pdf"),e="covid result.pdf";if(navigator.msSaveBlob)navigator.msSaveBlob(t,e);else{var link=document.createElement("a");if(void 0!==link.download){var r=URL.createObjectURL(t);link.setAttribute("href",r),link.setAttribute("download",e),link.style.visibility="hidden",document.body.appendChild(link),link.click(),document.body.removeChild(link)}}}));case 7:case"end":return t.stop()}}),t)})))()},onDecode:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.result=t,e.url="https://genobank.io/test/shc/#".concat(t.substr(5)),e.getQRCode(),e.download=!0,n.next=6,fetch("https://apishc.genobank.io/validate",{method:"POST",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify({input:t})});case 6:return r=n.sent,n.next=9,r.json();case 9:l=n.sent,e.resultVerification=JSON.stringify(l,null,2),e.patientName=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[0].resource.name[0].given[0],null,2)),e.patientSurName=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[0].resource.name[0].family,null,2)),e.sourceIssuer=JSON.parse(JSON.stringify(l.data.details.iss,null,2)),e.vaccineCard=JSON.parse(JSON.stringify(l.data.details.vc.type[0],null,2)),e.birthDay=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[0].resource.birthDate,null,2)),e.testType1=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.resourceType,null,2)),e.testTypeCode1=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.vaccineCode.coding[0].code,null,2)),e.testStatus1=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.status,null,2)),e.testDate1=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.occurrenceDateTime,null,2)),e.testNumber1=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.lotNumber,null,2)),e.testType2=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.resourceType,null,2)),e.testTypeCode2=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.vaccineCode.coding[0].code,null,2)),e.testStatus2=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.status,null,2)),e.testDate2=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.occurrenceDateTime,null,2)),e.testNumber2=JSON.parse(JSON.stringify(l.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.lotNumber,null,2));case 26:case"end":return n.stop()}}),n)})))()}}})),c=n(67),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t._m(0),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4 p-2"},[n("div",{staticClass:"cardbox  text-center p-3"},[n("h3",[t._v("Upload Vaccine QR Code")]),t._v(" "),n("qrcode-capture",{staticClass:"img-fluid",on:{decode:t.onDecode}}),t._v(" "),n("div",{staticClass:"img-fluid p-3",attrs:{id:"qrCode"}}),t._v(" "),t.download?n("button",{staticClass:"btn btn-primary col-12",on:{click:t.downloadPdf}},[t._v("Download")]):t._e()],1)]),t._v(" "),n("div",{staticClass:"col-md-8  p-5 results"},[n("h2",[t._v("Results")]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-5 "},[t._m(1),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[n("span",[t._v(t._s(t.patientName))]),t._v(" "),n("span",[t._v(t._s(t.patientSurName))])]),t._v(" "),t._m(2),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.birthDay))])]),t._v(" "),n("div",{staticClass:"col-md-7 "},[t._m(3),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[n("span",{staticClass:"localized en"},[t._v(t._s(t.sourceIssuer))])]),t._v(" "),t._m(4),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[n("span",{staticClass:"localized en"},[t._v(t._s(t.vaccineCard))])])])]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-5 "},[t._m(5),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.testType1)+" "+t._s(t.testTypeCode1)+" ")]),t._v(" "),t._m(6),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.testStatus1))]),t._v(" "),t._m(7),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.testDate1))]),t._v(" "),t._m(8),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.testNumber1))])]),t._v(" "),n("div",{staticClass:"col-md-7 "},[t._m(9),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.testType2)+" "+t._s(t.testTypeCode2)+" ")]),t._v(" "),t._m(10),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.testStatus2))]),t._v(" "),t._m(11),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.testDate2))]),t._v(" "),t._m(12),t._v(" "),n("p",{staticClass:"font-weight-bold lead "},[t._v(t._s(t.testNumber2))])])])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12 mt-5 "},[n("a",{staticClass:"navbar-brand justify-content-center mx-auto d-flex",attrs:{href:"https://genobank.io"}},[n("picture",[n("source",{attrs:{media:"(max-width: 799px)",srcset:"https://genobank.io/images/GenoBank.io_logo@2x.svg"}}),t._v(" "),n("source",{attrs:{media:"(min-width: 800px)",srcset:"https://genobank.io/images/GenoBank.io_logo@2x.svg"}}),t._v(" "),n("img",{staticClass:"img-fluid logo",attrs:{src:"https://genobank.io/images/GenoBank.io_logo.png",alt:"GenoBank.io Logo"}})])]),t._v(" "),n("p",{staticClass:"logininforamtion subtitle mt-2 mx-auto text-center",attrs:{id:"loginInformation"}})])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Name")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Date of Birth")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Issuer")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Vaccine Card Type")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Test Type 1")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Status")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Date")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Lot Number")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Test Type 2")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Status")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Date")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"font-weight-light my-0"},[n("span",{staticClass:"localized en"},[t._v("Lot Number")])])}],!1,null,null,null);e.default=component.exports}}]);