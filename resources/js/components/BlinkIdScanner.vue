<template>
  <div>
    <video ref="videoEl"></video>
    <button @click="startScan">Scan</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as BlinkIDSDK from "@microblink/blinkid-in-browser-sdk";

const videoEl = ref(null);

async function startScan() {
  const licenseKey = import.meta.env.VITE_BLINKID_LICENSE;
  if (!BlinkIDSDK.isBrowserSupported()) {
    alert("Browser not supported");
    return;
  }
  const loadSettings = new BlinkIDSDK.WasmSDKLoadSettings(licenseKey);
  loadSettings.engineLocation = window.location.origin + "/resources/";
  const wasmSDK = await BlinkIDSDK.loadWasmModule(loadSettings);

  const recognizer = await BlinkIDSDK.createBlinkIdSingleSideRecognizer(wasmSDK);
  const runner = await BlinkIDSDK.createRecognizerRunner(wasmSDK, [recognizer], true);
  const videoRecognizer = await BlinkIDSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
    videoEl.value, runner);

  const resultState = await videoRecognizer.recognize();
  if (resultState !== BlinkIDSDK.RecognizerResultState.Empty) {
    const res = await recognizer.getResult();
    console.log(res); // здесь будут поля, включая dob
    // можно отправить на сервер для проверки возраста
  }
}
</script>


<style scoped>

</style>
