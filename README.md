### Install all node modules:
```
npm i
```

### Starting local server:
npm start
```
npm start
```

### Building production js file:
```
npm run build
```


#### *To fix 'hot load' run the next commands:*
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```