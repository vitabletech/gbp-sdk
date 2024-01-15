# Installation

The `@vitabletech/gbp-sdk` is published on npm and is compatible with modern Node.js environments (v18+). 

It is written natively in TypeScript and includes all necessary type definitions out of the box—you do not need to install a separate `@types` package.

## Using npm

```bash
npm install @vitabletech/gbp-sdk
```

## Using yarn

```bash
yarn add @vitabletech/gbp-sdk
```

## Using pnpm

```bash
pnpm add @vitabletech/gbp-sdk
```

## Peer Dependencies

This SDK has minimal dependencies to keep your bundle size small. It relies on the native `fetch` API available in Node.js 18+.

If you are running an older version of Node.js (v16 or below), you will need to polyfill `fetch`. We strongly recommend upgrading to Node 18+ for the best experience.

## Next Step
Now that the SDK is installed, head over to the [Quick Start](/getting-started/quick-start) to make your first API call!
