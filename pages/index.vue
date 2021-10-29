<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12 mt-5 ">
				<a class="navbar-brand justify-content-center mx-auto d-flex" href="https://genobank.io">
					<picture>
						<source media="(max-width: 799px)" srcset="https://genobank.io/images/GenoBank.io_logo@2x.svg">
						<source media="(min-width: 800px)" srcset="https://genobank.io/images/GenoBank.io_logo@2x.svg"> <img class="img-fluid logo" src="https://genobank.io/images/GenoBank.io_logo.png" alt="GenoBank.io Logo"> </picture>
				</a>
				<p id="loginInformation" class="logininforamtion subtitle mt-2 mx-auto text-center"></p>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4 p-2">
				<div class="cardbox  text-center p-3">
          	<picture>
						<source media="(max-width: 799px)" srcset="../assets/images/ca_gov.jpg">
						<source media="(min-width: 800px)" srcset="../assets/images/ca_gov.jpg"> <img class="img-fluid ca-logo mx-auto" src="../assets/images/ca_gov.jpg" alt="CA.gov Logo"> </picture>
					<h3>Upload Vaccine QR Code</h3>
					<qrcode-capture @decode="onDecode" accept="image/*;capture=camera" class="img-fluid" />
					<div id="qrCode" class="img-fluid p-3"></div>
					<button v-if="download" @click="downloadPdf" class="btn btn-primary col-12">Download</button>
				</div>
			</div>
			<div class="col-md-8  p-5 results">
				<h2>Results</h2>
				<div class="row">
					<div class="col-md-5 ">
						<p class="font-weight-light my-0"> <span class="localized en">Name</span> </p>
						<p class="font-weight-bold lead "><span>{{ patientName }}</span> <span>{{ patientSurName }}</span></p>
						<p class="font-weight-light my-0"> <span class="localized en">Date of Birth</span> </p>
						<p class="font-weight-bold lead ">{{birthDay}}</p>
					</div>
					<div class="col-md-7 " >
						<p class="font-weight-light my-0"> <span class="localized en">Issuer</span> </p>
						<p class="font-weight-bold lead "><span class="localized en">{{sourceIssuer}}</span></p>
						<p class="font-weight-light my-0"> <span class="localized en">Vaccine Card Type</span> </p>
						<p class="font-weight-bold lead "><span class="localized en" >{{vaccineCard}}</span></p>
					</div>
				</div>
				<div class="row">
					<div class="col-md-5 ">
						<p class="font-weight-light my-0"> <span class="localized en">Test Type 1</span> </p>
						<p class="font-weight-bold lead ">{{testType1}} {{testTypeCode1}} </p>
						<p class="font-weight-light my-0"> <span class="localized en">Status</span> </p>
						<p class="font-weight-bold lead ">{{testStatus1}}</p>
						<p class="font-weight-light my-0"> <span class="localized en">Date</span> </p>
						<p class="font-weight-bold lead ">{{testDate1}}</p>
						<p class="font-weight-light my-0"> <span class="localized en">Lot Number</span> </p>
						<p class="font-weight-bold lead ">{{testNumber1}}</p>
					</div>
					<div class="col-md-7 ">
						<p class="font-weight-light my-0"> <span class="localized en">Test Type 2</span> </p>
            <p class="font-weight-bold lead ">{{testType2}} {{testTypeCode2}} </p>
						<p class="font-weight-light my-0"> <span class="localized en">Status</span> </p>
						<p class="font-weight-bold lead ">{{testStatus2}}</p>
						<p class="font-weight-light my-0"> <span class="localized en">Date</span> </p>
						<p class="font-weight-bold lead ">{{testDate2}}</p>
						<p class="font-weight-light my-0"> <span class="localized en">Lot Number</span> </p>
						<p class="font-weight-bold lead ">{{testNumber2}}</p>
					</div>
	
				
				</div>
			</div>
		</div>
   
	</div>
</template>
<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data() {
        return {
          result: '',
          resultVerification: '',
          patientName: '',
          patientSurName: '',
          birthDay:'',
          sourceIssuer: '',
          vaccineCard: '',
          testType1:'',
          testTypeCode1:'',
          testStatus1:'',
          testDate1:'',
          testNumber1:'',
          testType2:'',
          testTypeCode2:'',
          testStatus2:'',
          testDate2:'',
          testNumber2:'',
          qrCode: '',
          url: '',
          download: false,
        }
      },
      head: () => {
        return {
          title: "SHC Validator app",
          script: [{
            hid: "QRCode",
            src: "../js/qrcode.min.js",
            defer: true,
          }, {
            hid: "PDFDocument",
            src: "../js/pdfkit.standalone.js",
            defer: true,
          }, {
            hid: "blobStream",
            src: "../js/blob-stream.min.js",
            defer: true,
          }, ]
        };
      },
      methods: {
        async getQRCode() {
            new(window as any).QRCode(document.getElementById("qrCode"), {
              text: this.url,
              width: 420,
              height: 420,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel: (window as any).QRCode.CorrectLevel.L
            });
          },
          async downloadPdf() {
            const doc = new(window as any).PDFDocument({
              margins: {
                top: 60,
                bottom: 60,
                left: 40,
                right: 40,
              }
            });
            const stream = doc.pipe((window as any).blobStream());
            const qrcode = document.getElementById("qrCode")
            const img = (qrcode as any).getElementsByTagName('img');
            doc.image(img[0].src, 60, 60, {
              width: 300
            });
            doc.end();
            stream.on('finish', function() {
              // get a blob you can do whatever you like with
              const blob = stream.toBlob('application/pdf');
              const fileName = `covid result.pdf`;
              if((navigator as any).msSaveBlob) {
                // IE 10+
                (navigator as any).msSaveBlob(blob, fileName);
              } else {
                const link = document.createElement('a');
                // Browsers that support HTML5 download attribute
                if(link.download !== undefined) {
                  const url = URL.createObjectURL(blob);
                  link.setAttribute('href', url);
                  link.setAttribute('download', fileName);
                  link.style.visibility = 'hidden';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }
            });
          },
          async onDecode(result: any) {
            this.result = result
            this.url = `https://genobank.io/test/shc/#${result.substr(5)}`;
            this.getQRCode();
            this.download = true;
            const response = await fetch(`https://apishc.genobank.io/validate`, {
              method: 'POST',
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              body: JSON.stringify({
                input: result
              }),
            });

            const res = await response.json();
            // TODO show basic info from the json
            this.resultVerification = JSON.stringify(res, null, 2);
            this.patientName = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[0].resource.name[0].given[0], null, 2))
            this.patientSurName = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[0].resource.name[0].family, null, 2))
            this.sourceIssuer = JSON.parse(JSON.stringify(res.data.details.iss, null, 2))
            this.vaccineCard = JSON.parse(JSON.stringify(res.data.details.vc.type[0], null, 2))
            this.birthDay = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[0].resource.birthDate, null, 2))
            this.testType1 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.resourceType, null, 2))
            this.testTypeCode1 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.vaccineCode.coding[0].code, null, 2))
            this.testStatus1 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.status, null, 2))
            this.testDate1 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.occurrenceDateTime, null, 2))
            this.testNumber1 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[1].resource.lotNumber, null, 2))

            this.testType2 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.resourceType, null, 2))
            this.testTypeCode2 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.vaccineCode.coding[0].code, null, 2))
            this.testStatus2 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.status, null, 2))
            this.testDate2 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.occurrenceDateTime, null, 2))
            this.testNumber2 = JSON.parse(JSON.stringify(res.data.details.vc.credentialSubject.fhirBundle.entry[2].resource.lotNumber, null, 2))
      

          }
      }
  })
</script>