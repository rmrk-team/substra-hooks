# Dotsama wallet react

Highly opinionated Dotsama react wallet.

A lot of the code is taken from [Subwallet](https://github.com/Koniverse/SubWallet-Extension) and [Talisman](https://talisman.xyz/)

Opinionated because:

- uses [Chakra UI](https://chakra-ui.com/) for UI and styling.
- uses [zustand](https://github.com/pmndrs/zustand) for state management
- uses [Substra hooks](https://github/rmrk-team/substra-hooks/packages/core) because reasons (provides a nice set of utils to work with polkadot.js)

## Example

[Example use](../example-nextjs/pages/index.tsx)

## TODO:
- Provide a set of hooks to be used with any UI library and not just Chakra UI
- Provide a way to pass a custom config with translations and wallet list/config
- Remove @substra-hooks/core dependency
