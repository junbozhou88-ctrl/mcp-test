#!/bin/bash
set -eux

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y nginx amazon-ssm-agent
systemctl enable nginx
systemctl enable amazon-ssm-agent
systemctl start amazon-ssm-agent

mkdir -p /var/www/zenflow
cat >/var/www/zenflow/index.html <<'HTML'
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ZenFlow</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #f3f1eb;
        background: #0d0f0d;
      }
      main {
        width: min(390px, calc(100vw - 40px));
        padding: 40px 28px;
        border: 1px solid rgba(187, 217, 170, 0.12);
        border-radius: 20px;
        background: #171916;
      }
      h1 { color: #b6d7a8; }
      p { color: #85887e; line-height: 1.7; }
    </style>
  </head>
  <body>
    <main>
      <h1>ZenFlow EC2 is ready</h1>
      <p>Nginx is running. The real Vite build will be deployed in the next step.</p>
    </main>
  </body>
</html>
HTML

cat >/etc/nginx/sites-available/zenflow <<'NGINX'
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;
  root /var/www/zenflow;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
NGINX

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/zenflow /etc/nginx/sites-enabled/zenflow
nginx -t
systemctl restart nginx
