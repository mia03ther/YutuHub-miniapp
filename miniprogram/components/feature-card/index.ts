Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    icon: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    },
    tone: {
      type: String,
      value: 'purple'
    },
    layout: {
      type: String,
      value: 'tile'
    },
    badge: {
      type: String,
      value: ''
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('select', { title: this.data.title })
    }
  }
})