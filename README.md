# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## TODO

- Display README.md somewhere
- Clicking an item head opens the item detail view
    - If ctrl is pressed, open in new tab
- Clicking an image opens the image viewer
- Add a help page
- Add shortcuts
  - show/hide
  - focus on search input
  - focus an option
  - go to next/previous item
  - go to next/previous image
- Load more items when scrolling to the bottom


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
