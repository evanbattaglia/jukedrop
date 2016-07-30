requires dropbox-sdk-js at evan/battaglia/download-hack

https://github.com/evanbattaglia/dropbox-sdk-js/tree/evanbattaglia/download-hack

clone repo, change branch, run `npm install` and `npm run build`

then create an app & authtoken in dropbox and add it to authtoken.txt

then serve up the files somewhere, e.g.

```python -m SimpleHTTPServer 8000 & google-chrome localhost:8000/dropbox.html```
