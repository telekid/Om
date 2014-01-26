# Om
## Development installation

1. `npm install -g grunt-cli`
2. `git clone https://github.com/telekid/Om.git`
3. `cd Om`
4. `cp src/js/config.example.js src/js/config.js`
5. enter your credentials in `config.js`
6. `npm install`
7. `cd dist`
8. `grunt`
9. `python -m SimpleHTTPServer`
10. Point your browser to `localhost:8000`

##Cloudant

On Cloudant, you need to enable CORS on your database:

`curl -i -u USERNAME -X PUT https://USERNAME.cloudant.com/_api/v2/user/config/cors \
-H "Content-Type: application/json" \
-d '{"enable_cors":true,"allow_credentials":true,"allow_methods":["GET","PUT","POST","DELETE","OPTIONS"],"origins":{"http://local.dev:8000":{}}}'`

Then, add the following to your hosts file:

`127.0.0.1   local.dev`

Point your browser to `local.dev:8000`