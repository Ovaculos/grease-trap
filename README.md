## Grease Trap

Grease Trap is an open-source http-request inspector. It provides real-time visualization of HTTP requests, allowing for easy testing / debugging.

### Instructions

You must add a `.env` file to backend with the `host`, `frontPort`, and `backPort` set to the same values. As the respective values on the frontend:

```
host=localhost
frontPort=5173
backPort=9999
mongoUrl=mongodb://IP:PORT/DB_NAME
```

Frontend's `.env` looks different and follows this format.

`frontPort` for both needs to be the same as the port that Vite will run the frontend on:

```
VITE_host=localhost
VITE_frontPort=5173
VITE_backPort=9999
```
