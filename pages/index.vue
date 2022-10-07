<template>
  <div id="app-cover">
    <div id="app" :class="{'opened': opened}">
      <form @submit.prevent="onSubmit">
        <div id="f-element">
          <div id="inp-cover">
            <input
              type="text"
              v-model="query"
              name="query"
              placeholder="Type username(s) ..."
              autocomplete="off"
              :class="{'move-up': inputUp}"
              ref="searchInput"
            />
          </div>
        </div>
        <button
          type="submit"
          :class="{'shadow': hasShadow}"
        >
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <!-- Ctas -->
    <div
      id="layer"
      :class="{'sl': layerSl}"
      title="Click the blue area to hide the form"
      @click.stop="toggleSearch"
    >
    </div>
    <div
      id="init"
      @click.stop="toggleSearch"
    >
    </div>
  </div>
</template>

<script>
const sleep = ms => new Promise(r => setTimeout(r, ms))

export default {
  data: () => ({
    query: "",
    opened: false,
    hasShadow: true,
    inputUp: false,
    layerSl: false
  }),
  methods: {
    async toggleSearch() {
      // Toggle
      this.opened = !this.opened
      
      // Morph
      await sleep(300)
      this.hasShadow = !this.hasShadow

      await sleep(200)
      this.inputUp = this.opened;
      
      await sleep(100);
      (this.opened) && this.$refs.searchInput.focus()

      await sleep(300)
      this.layerSl = !this.layerSl

      return 0
    },
    async onSubmit() {
      console.log('Query: ', this.query.split(','))

      try {
        const result = await this.$getReport()
        console.log('result', result)
      } catch (error) {
        console.error(error)
      }

      // Reset state
      if (this.opened) {
        this.toggleSearch()
        this.query = ""
      }
    }
  }
}
</script>
