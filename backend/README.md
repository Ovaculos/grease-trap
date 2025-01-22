You must add a `.env` file to the front and backend with the `host` and `port` set to the same values:

```
host=localhost
port=9999
```

You also must set a `mongoUrl` in `.env` that's set to the database you'd like to use for bodies:

```
mongoUrl=mongodb://IP:PORT/DB_NAME
```
