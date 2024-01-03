/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'
  }
}

module.exports = nextConfig
