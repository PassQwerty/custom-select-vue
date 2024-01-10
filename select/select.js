export default {
  template: `
      <div class="select">
         <!-- Кнопка для открытия выпадающего списка -->
         <button type="button" @click="openDropDown" class="selectToggle" :class="{active: isActiveDropdown}">
            <div class="wrapperValue">
              <span class="buttonValue">{{valueText}}</span>
            </div>  
          <i class="fa fa-caret-down"></i>
         </button>
         <div class="wrapperDropdown" :class="{ active: isActiveDropdown, no_active: !isActiveDropdown }" id="wrapperDropdown">
            <!-- Поиск -->
            <div class="wrapperSearch">
            <div class="searchInput">
               <input type="text" @input="Search" v-model="input">
               <i class="fa fa-search" aria-hidden="true"></i>
            </div>
            </div>
            <!-- Выпадающий список -->
            <div class="selectDropdown">
            <ul class="selectOptions" id="selectOptions">
               <li v-for="item in filteredDropdownData" @click="clickItemHandler(item)" :key="item">{{item}}</li>
               <li v-if="filteredDropdownData.length === 0" class="no_result">Совпадений не найденно "{{input}}"</li>
            </ul>
            </div>
         </div>
      </div>
   `,
  emits: ["current-value"],
  props: {
    id: String,
    data: Array,
  },
  data() {
    return {
      isActiveDropdown: false,
      valueText: "Выберите опцию",
      input: "",
    };
  },
  methods: {
    clickItemHandler(text) {
      this.valueText = text;
      this.input = "";
      this.$emit('current-value', text);
      this.isActiveDropdown = false;
    },
    openDropDown() {
      this.isActiveDropdown = !this.isActiveDropdown;
      this.input = "";
    },
    closeDropdown(event) {
      const isClickInsideButton = event.target.closest(".selectToggle");
      const isClickInsideDropdown = event.target.closest(".wrapperDropdown");
      const isClickInsideSearch = event.target.closest(".wrapperSearch");

      if (
        !isClickInsideButton &&
        !isClickInsideDropdown &&
        !isClickInsideSearch
      ) {
        this.isActiveDropdown = false;
      }
    },
    Search() {
      const inputValue = this.input;

      const formatText = inputValue.toLowerCase();
      return this.data.filter((item) => {
        return item.toLowerCase().includes(formatText);
      });
    },
  },
  computed: {
    filteredDropdownData() {
      return this.Search();
    },
  },
  mounted() {
    document.addEventListener("click", this.closeDropdown);
  },
  unmounted() {
    document.removeEventListener("click", this.closeDropdown);
  },
};
