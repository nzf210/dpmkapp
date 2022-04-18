module.exports = {
  content: ['./src/*.{html,js}',
    './src/*.js', './src/components/*.{html,js,jsx}', './public/*.html', './src/components/**/*.jsx',
    './src/components/sub/config/**/*.jsx'
  ],
  theme: {
    extend: {
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },

  },
  plugins: [],
}