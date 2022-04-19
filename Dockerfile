# Dockerfile
FROM node:14
WORKDIR /app
COPY . /app

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# 安装
RUN npm set registry https://registry.npmmirror.com/
RUN npm i

# 环境变量
ENV SERVER_NAME owner-server
ENV AUTHOR_NAME monster

# 启动
CMD echo $SERVER_NAME && echo $AUTHOR_NAME && npm run prd-dev && npx pm2 log