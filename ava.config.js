export default {
  require: ['./test/_setup.js'],
  sources: ['**/*.{js,vue}'],
  files: ['test/specs/**/*'],
  babel: {
    testOptions: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['.'],
            alias: {
              '@': '.',
              '~': '.'
            }
          }
        ]
      ]
    }
  },
  tap: true,
  serial: true,
  verbose: true
}
