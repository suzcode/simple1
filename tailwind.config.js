module.exports = {
  content: ["./dist/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/components/stores/*.{vue,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}