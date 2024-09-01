require('dotenv/config')

const { makeKyselyHook, kyselyCamelCaseHook } = require('kanel-kysely')

const makeBrandOptionalHook = (path, lines) => {
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace('__brand:', '__brand?:')
  }
  return lines
}

/** @type {import('kanel').Config} */
module.exports = {
  connection: process.env['DATABASE_URL'],
  preDeleteOutputFolder: true,
  outputPath: './src/__generated__/kanel',

  preRenderHooks: [makeKyselyHook(), kyselyCamelCaseHook],
  postRenderHooks: [makeBrandOptionalHook],
  enumStyle: 'type',
}
