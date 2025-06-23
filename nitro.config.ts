// nitro.config.ts
export default defineNitroConfig({
  compatibility: {
    node: true
  },
  experimental: {
    compatibilityFlags: ['nodejs_compat']
  }
})
