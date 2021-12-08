module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    [
      '@babel/preset-typescript',
      {
        isTsx: true
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-typescript'
  ]
}
