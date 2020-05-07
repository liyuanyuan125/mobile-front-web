FROM aicrs.cn/devops/vue/run

COPY dist /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/default.conf

CMD init && nginx
