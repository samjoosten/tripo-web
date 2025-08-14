const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        // you can either spread `colors` to apply all the colors
        ...colors,
        sdaffold: "#F8FBFE"
      }
    }
  }
}