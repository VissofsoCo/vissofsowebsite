// eslint-config-next 16 publishes flat configs directly, so they are spread
// in as-is. Earlier versions only shipped the old `extends` format and had to
// be bridged with FlatCompat from @eslint/eslintrc; that bridge throws a
// "Converting circular structure to JSON" error against v16, so it is gone.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'scripts/**',
    ],
  },
]

export default eslintConfig
