<template>
  <div class="container">
  <div class="row">
  <div class="col-md-12 mt-5 ">

						<a class="navbar-brand justify-content-center mx-auto d-flex" href="https://genobank.io">
						
							<picture>
								<source media="(max-width: 799px)" srcset="https://genobank.io/images/GenoBank.io_logo@2x.svg">
								<source media="(min-width: 800px)" srcset="https://genobank.io/images/GenoBank.io_logo@2x.svg">
								<img class="img-fluid logo" src="https://genobank.io/images/GenoBank.io_logo.png" alt="GenoBank.io Logo">
							</picture>
						</a>
							<p id="loginInformation" class="logininforamtion subtitle mt-2 mx-auto text-center"></p>

				</div>
  </div>
    <div class="row">
      <div class="col-md-4 p-2">
        <div class="cardbox  text-center p-3">
          <h3>Upload Vaccine QR Code</h3>
    
          <qrcode-capture @decode="onDecode" class="img-fluid"/>
          <div id="qrCode" class="img-fluid p-3"></div>
          <button v-if="download" @click="downloadPdf" class="btn btn-primary col-12">Download</button>
           
         </div>
      </div>
       <div class="col-md-8  p-5 results">
      <h2>Results</h2>

         <p class="font-weight-light my-0">
            <span class="localized en">Name</span>

          </p>
          <p class="font-weight-bold lead " ><span>Daniel</span> <span>Uribe</span></p>
   
           <p class="font-weight-light my-0">
            <span class="localized en" >Date of Birth</span>

          </p>
          <p class="font-weight-bold lead " >1976-02-19</p>
         <div class="row">
         <div class="col-md-6 ">
           <p class="font-weight-light my-0">
            <span class="localized en" >Test Type 1</span>

          </p>
          <p class="font-weight-bold lead " >Immunization 207</p>

           <p class="font-weight-light my-0">
            <span class="localized en" >Status</span>

          </p>
          <p class="font-weight-bold lead " >Complete</p>

            <p class="font-weight-light my-0">
            <span class="localized en">Date</span>

          </p>
          <p class="font-weight-bold lead " >2021-03-25</p>
        
           <p class="font-weight-light my-0">
            <span class="localized en" >Lot Number</span>

          </p>
          <p class="font-weight-bold lead " >028A</p>

          </div>
            <div class="col-md-6 ">
             <p class="font-weight-light my-0">
            <span class="localized en" >Test Type 2</span>

          </p>
          <p class="font-weight-bold lead " >Immunization 207</p>

           <p class="font-weight-light my-0">
            <span class="localized en" >Status</span>

          </p>
          <p class="font-weight-bold lead " >Complete</p>

            <p class="font-weight-light my-0">
            <span class="localized en">Date</span>

          </p>
          <p class="font-weight-bold lead " >2021-04-22</p>
        
           <p class="font-weight-light my-0">
            <span class="localized en" >Lot Number</span>

          </p>
          <p class="font-weight-bold lead " >045B21A</p>

         
        
          </div>
                  <p>{{ resultVerification }}</p>
               <p class="decode-result text-wrap text-break">Data result: <b>{{ result }}</b></p>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({ 
  data () {
    return {
      result: '',
      resultVerification: '',
      qrCode: '',
      url: '',
      download: false,
    }
  },
  head: () => {
    return {
      title: "SHC Validator app",
      script: [
        {
          hid: "QRCode",
          src: "../js/qrcode.min.js",
          defer: true,
        },
         {
          hid: "PDFDocument",
          src: "../js/pdfkit.standalone.js",
          defer: true,
        },
        {
          hid: "blobStream",
          src: "../js/blob-stream.min.js",
          defer: true,
        },
        {
          hid: "axios",
          src: "https://cdn.jsdelivr.net/npm/axios@0.23.0/dist/axios.js",
          defer: true,
        },
      ]
    };
  },
  methods: {
    async getQRCode() {
      new (window as any).QRCode(document.getElementById("qrCode"), {
        text: this.url,
        width: 420,
        height: 420,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: (window as any).QRCode.CorrectLevel.L
      });
    },
    async downloadPdf() {
        const doc = new (window as any).PDFDocument({
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
       doc.image(img[0].src, 60, 60, { width: 300 });
       doc.end();
       stream.on('finish', function () {
        // get a blob you can do whatever you like with
        const blob = stream.toBlob('application/pdf');
       
        const fileName = `covid result.pdf`;
        if ((navigator as any).msSaveBlob) {
          // IE 10+
          (navigator as any).msSaveBlob(blob, fileName);
        } else {
          const link = document.createElement('a');
          // Browsers that support HTML5 download attribute
          if (link.download !== undefined) {
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
    async onDecode (result: any) {
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

    }
  }

})
</script>
