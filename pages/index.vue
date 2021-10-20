<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
          <p class="decode-result text-wrap text-break">Last result: <b>{{ result }}</b></p>
          <qrcode-capture @decode="onDecode"></qrcode-capture>
          <div id="qrCode"></div>
          <button v-if="download" @click="downloadPdf">Download</button>
          <p><b>{{ resultVerification }}</b></p>
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
