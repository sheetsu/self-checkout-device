<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="testApi">GET test</button>
    <button @click="testBackendApi">GET backend test</button>
    <button @click="testPlaceOrder">POST create order</button>
    <div v-if="response">{{ response }}</div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup() {
    const response = ref("");
    const responseBackend = ref("");
    const responsePlaceOrder = ref("");

    const testApi = async () => {
      try {
        const res = await fetch("/api/hello");
        const data = await res.json();
        response.value = data.message;
      } catch (error) {
        response.value = "Error: " + error;
      }
    };

    const testBackendApi = async () => {
      try {
        const res = await fetch("/api/v1/terminal/health_check");
        const data = await res.json();
        responseBackend.value = data.message;
      } catch (error) {
        responseBackend.value = "Error: " + error;
      }
    };

    const testPlaceOrder = async () => {
          try {
            const res = await fetch("/api/v2/self_checkout_devices/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  "employee_id": 116,
                  "order_items": [
                      {"menu_item_id": "14387", "quantity": 1}
                  ]
              }),
            });
            const data = await res.json();
            responsePlaceOrder.value = data.message;
          } catch (error) {
            responsePlaceOrder.value = "Error: " + error;
          }
    };

    return {
      response,
      responseBackend,
      responsePlaceOrder,
      testApi,
      testBackendApi,
      testPlaceOrder
    };
  },
});
</script>
