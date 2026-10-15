# Next 16 upgrade: only forced dependency bumps

When moving from Next 14.2 to Next 16.4 / React 19 we upgraded only what React 19 or Next 16 forced (uploadthing 6→7, react-quill → react-quill-new, next-themes, ESLint 9 flat config) and deliberately kept **Tailwind 3, Prisma 5 and next-auth 4**. Each of those is its own migration (CSS-first config, new client generator, Auth.js v5) and bundling them into the framework upgrade would have made any regression impossible to attribute. Upgrade them one at a time in separate changes.

## Consequences

- The root `package.json` no longer carries the React Native packages (`nativewind`, `react-native-web`, `expo-image`, …). They were unused by the Next app and pinned React 18; the `expo-preview/` sandbox owns its own copies and still runs React 18 in its iframe.
- `uploadthing/tw` must not be imported from `tailwind.config.ts`: its `require.resolve(\`@uploadthing/${pkg}\`)` makes Turbopack glob and fail on the packages' `.d.cts` files. Upload button styles come from `@uploadthing/react/styles.css` instead.
- `react-tailwindcss-select` is unmaintained and declares a React 18 peer; an npm `overrides` entry lets it resolve against React 19 (it uses no removed APIs).
- The React Compiler lint rules from `eslint-plugin-react-hooks` v7 are set to `warn` because the compiler is not enabled.
