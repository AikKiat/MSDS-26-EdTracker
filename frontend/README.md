# EdTracker Frontend Test Development Repo


## Frontend (React)

> Project File Structure:

1. **pages folder (main pages)** — contains the main pages/screens of the website, i.e. login, dashboard, settings, etc.
2. **components folder (reusable UI)** — contains reusable UI components, i.e. navbar, sidebar, buttons, cards, forms, etc.
3. **services folder (API calls)** — handles communication with the Express backend, i.e. GET/POST/PUT/DELETE requests.
4. **hooks folder (custom React hooks)** — contains reusable React logic/state.
5. **context folder (global state)** — stores data/state that needs to be shared across multiple components/pages, i.e. logged-in user information.
6. **utils folder (helper functions)** — contains reusable helper functions.
7. **assets folder (static files)** — contains images, icons, logos, etc.
8. **styles folder (styling)** — contains global/shared CSS and styling files.
9. **config folder (configuration)** — contains frontend configuration, i.e. backend API URL.10. **mocks folder (fake backend)** — in-memory stand-in for the backend and AI assistant, used by the services while `VITE_USE_MOCKS` is not `"false"`. Data resets on page reload.
