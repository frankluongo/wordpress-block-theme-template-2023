# WordPress Development Kit 2023

This project is created using `esbuild` and intended to run alongside a `DevKinsta` WordPress site. You can use it to either create a custom WordPress Theme and/or a WordPress Plugin.

## Getting started

- Create .env file and add `DIST_DIR`, `URL`, and `NAME` variables
  - `DIST_DIR` will be where the final wordpress theme will go
  - `URL` is where the WP Site will open in your browser
  - `NAME` is the name of your theme or plugin
- Install node, NPM and the node modules
- Use `(p)npm run dev` to start the app in development
- Use `(p)npm run build` to build a production-ready version of the theme
- Use `(p)npm run deploy` to build a product-ready version of the theme AND zip it up

## Included features

- Automatic page refresh when a change occurs
- JavaScript and CSS are compiled/minified
- All other files are copied over, unchanged



