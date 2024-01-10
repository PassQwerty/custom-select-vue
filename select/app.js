import select from "./select.js";

const { createApp, ref, computed, onMounted, onUnmounted, reactive } = Vue;
const app = createApp({
  setup() {
    const select1 = reactive({
      id: "My Component",
      value: "",
      data: ["Volkswagen", "Ford", "Toyota", "Nissan"],
    });
    const select2 = reactive({
      id: "My Component2",
      value: "",
      data: ["Volkswagen", "Ford", "Toyota", "Nissan"],
    });

    const handleSelectValue1 = (text) => select1.value = text;
    const handleSelectValue2 = (text) => select2.value = text;

    return { select1, handleSelectValue1, handleSelectValue2, select2 };
  },
});

app.component("my-select", select);
app.mount("#app");
