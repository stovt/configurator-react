npm i

to start server run:
npm start

to build production js run:
npm run build

to fix 'hot load' run the next commands:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p