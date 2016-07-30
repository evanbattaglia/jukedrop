requires dropbox-sdk-js at evan/battaglia/download-hack
(for now compiled included in this repo)

create an app & authtoken in dropbox and add it to authtoken.txt

then serve up the files somewhere, e.g.

```python -m SimpleHTTPServer 8000 & google-chrome localhost:8000/dropbox.html```
