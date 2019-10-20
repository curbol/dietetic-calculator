export default {
  require: ['./test/ava.setup.js'],
  sources: ['**/*.{js,vue}'],
  files: ['test/specs/**/*'],
  tap: true,
  serial: true,
  verbose: true,
  color: true
}
