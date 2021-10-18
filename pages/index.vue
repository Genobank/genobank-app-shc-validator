<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
          <p class="decode-result text-wrap text-break">Last result: <b>{{ result }}</b></p>
          <qrcode-capture @decode="onDecode" />
          <p><b>{{ resultVerification }}</b></p>
      </div>
    </div>
  </div>
</template>

<script type="module" lang="ts">
import Vue from 'vue'

export default Vue.extend({ 

  data () {
    return {
      result: '',
      resultVerification: '',
    }
  },

  methods: {
     async onDecode (result: any) {
      this.result = result
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
      this.resultVerification = JSON.stringify(res, null, 2);
    }
  }

})
</script>
