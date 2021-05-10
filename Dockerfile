FROM node:16-alpine3.11 as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM  nginx:1.19.10
COPY --from=builder /usr/src/app/dist/SEE /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'


#FROM node:12
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
#COPY . .
#CMD [ "npm", "run","start" ]
