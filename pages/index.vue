<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
          <p class="decode-result text-wrap text-break">Last result: <b>{{ result }}</b></p>
          <qrcode-capture @decode="onDecode" />
          <div id="qrCode"></div>
          <p><b>{{ resultVerification }}</b></p>
          <!-- <canvas id="canvas" ref="canvas" class="canvas" /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import QrcodeVue from 'qrcode.vue'

export default Vue.extend({ 

  // components: {
  //   QrcodeVue,
  // },
  data () {
    return {
      result: '',
      resultVerification: '',
      qrCode: '',
      url: '',
    }
  },
  head: () => {
    return {
      title: "QRCode",
      script: [
        {
          hid: "QRCode",
          // src: "https://jojotoo-static.oss-cn-shanghai.aliyuncs.com/resources/script/qrcode.min.js",
          src: "../js/qrcode.min.js",
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
    async onDecode (result: any) {
      this.result = result

      this.url = `https://genobank.io/test/shc/#${result.substr(5)}`;
      this.getQRCode();

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
