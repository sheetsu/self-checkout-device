# Self checkout device (SŁUPEK)

## Stack: Sinatra + Vite (Vue.js)
- Sinatra (API backend)   - port *4000*
- Vue 3 + Vite (frontend) - port *4001*

--

Sinatra app.rb in development mode:
	•	/api/* – handles API requests
	•	all other paths: redirect to http://localhost:4001 (Vite dev server)

## dev start app's
Copy `config.yml.example` to `config.yml` and edit it.
the `token` value should be setup to your self checkout device token.
```bash
./dev.sh
```

### Simulating Hardware Scans

To simulate card/QR code scanning or card reading, send a POST request to the `/process-scanned-code` endpoint:

```bash
curl --location 'http://localhost:4000/process-scanned-code' \
  --header 'Content-Type: application/json' \
  --data '{"code":"12345","kind":"qr"}'
```

**Parameters:**
- `code` (string): The scanned value (card data, QR content, or card number)
- `kind` (string): Hardware type - either `"card"` or `"qr"`

**Examples:**
```bash
# Simulate QR code scan
curl -X POST http://localhost:4000/process-scanned-code \
  -H "Content-Type: application/json" \
  -d '{"code":"PRODUCT_123456","kind":"qr"}'

# Simulate card scan
curl -X POST http://localhost:4000/process-scanned-code \
  -H "Content-Type: application/json" \
  -d '{"code":"4111111111111111","kind":"card"}'
```

**Response:**
- Success: `{"status":"success"}` (HTTP 200)
- Error: `{"status":"error","message":"error details"}` (HTTP 400)

The scanned data will be:
1. Processed by the backend API
2. Broadcast to all connected SSE clients (if any)
3. Logged for debugging purposes

## Prod start app's
```bash
./prod.sh
```
