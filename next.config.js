/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  compiler: {
    removeConsole: true
  }
}

module.exports = nextConfig
