Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    variant: {
      type: String,
      value: 'plain'
    },
    radius: {
      type: String,
      value: 'md'
    },
    padding: {
      type: String,
      value: 'md'
    },
    pressable: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onTap() {
      if (!this.data.pressable) {
        return
      }
      this.triggerEvent('tap')
    }
  }
})