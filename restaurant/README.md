thêm c2se-team34.site, www.c2se-team34.site
sudo dnf install supervisor | sudo pip3 install supervisor
cd /etc/supervisor/conf.d/
sudo touch gunicorn.conf
sudo nano gunicorn.conf

[program:gunicorn]
directory = /home/linux/codio
command = /home/linux/env/bin/gunicorn --workers 3 --bind unix:home/linux/codigo/app.sock codigo.wsgi:application
autostart = true
autorestart=true
stderr_logfile= /var/log/gunicorn/gunicorn.err.log
stdout_logfile= /var/log/gunicorn/gunicorn.err.log
[group:guni]
programs:gunicorn

sudo mkdir /var/log/gunicorn
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl status
sudo systemctl reload nginx
cd /etc/nginx/sites-available/
ls sudo nano default 

server_name 3.108.56.110 c2se-team34.site www.c2se-team34.site;

location {
    include proxy_params;
    proxy_pass http://unix:/home/linux/eklavya_school/app.sock;
}

