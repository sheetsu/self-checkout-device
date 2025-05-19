# Self checkout device (SŁUPEK)

## Stack: Sinatra + Vite (Vue.js)
- Sinatra (API backend)   - port *4567*
- Vue 3 + Vite (frontend) - port *5173*
--

Sinatra app.rb in development mode:
	•	/api/* – handles API requests
	•	all other paths: redirect to http://localhost:5173 (Vite dev server)

## dev start app's
```bash
./dev.sh
```
