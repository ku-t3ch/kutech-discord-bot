module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 80,
  trailingComma: 'es5',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    'dotenv/config',
    '^discord.js',
    '^@discordjs',
    '<THIRD_PARTY_MODULES>',
    '^[.][.]',
    '^[.]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
