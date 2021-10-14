import {
  constructRoutes,
  constructApplications,
  // constructLayoutEngine,
} from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

const routes = constructRoutes(document.querySelector('#single-spa-layout') as Element, {
  loaders: {
    header: '<h1>Loading Header</h1>',
    footer: '<h1>Loading Footer</h1>',
    main: '<h1>Loading Main</h1>',
  },
  errors: {
    header: '<h1>Failed to load Header</h1>',
    footer: '<h1>Failed to load Footer</h1>',
    main: '<h1>Failed to load Main</h1>',
  },
  props: {
    locale: 'en-us',
  },
});

const applications = constructApplications({
  routes,
  loadApp: ({ name }) => System.import(name),
});

// Delay starting the layout engine until the styleguide CSS is loaded
// const layoutEngine = constructLayoutEngine({
//   routes,
//   applications,
//   active: false,
// });

applications.forEach(registerApplication);

// System.import("@react-mf/styleguide").then(() => {
//   // Activate the layout engine once the styleguide CSS is loaded
//   layoutEngine.activate();
// });

start();
