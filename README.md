# Suspense and SWR in Svelte

This is a demo of using [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html) and [SWR](https://swr.vercel.app/) inspired techniques inside a Svelte application.

## Benefits

### Data Fetching

Components can independently declare the data that they need.  Because there is a central cache, duplicate requests are not issued and every component gets access to the same data.  By using stores, request chains are easier to reason about than traditional promise based chains.

See the [Image component](src/routes/_components/image.svelte) for an example of this in action.

### Loading Screens

In addition to fetching data, components can communicate up the component tree when they are "ready".  This allows us to break up the application and deliberately design loading screens without having to know exactly what data is needed.

The [Page component](src/routes/[id].svelte) demonstrates this.  It will display the loading placeholder until the Header component has finished loading.  In this case, that means waiting for two API fetch requests and one image to load but the Page component does not know about this.  In the future, the requirements for Header could be changed completely without ever touching the loading indicator logic.

## Status

This is not production tested or split properly to be turned into an npm package.  At this stage, this is simply a proof of concept to demonstrate possibilities and discuss API surface.
