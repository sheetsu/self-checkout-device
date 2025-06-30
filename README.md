# Self checkout device (SŁUPEK)

## Stack: Sinatra + Vite (Vue.js)
- Sinatra (API backend)   - port *4000*
- Vue 3 + Vite (frontend) - port *4001*

--

Sinatra app.rb in development mode:
	•	/api/* – handles API requests
	•	all other paths: redirect to http://localhost:4001 (Vite dev server)

## dev start app's
copy `config.yml.example` to `config.yml` and edit it.
Token value should be setup to your self checkout device token.
```bash
./dev.sh
```

## prod start app's
```bash
./prod.sh
```
