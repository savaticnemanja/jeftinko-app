FROM node:18-alpine
WORKDIR /app

RUN npm install -g npm@9

COPY package*.json .
COPY themes ./themes
COPY translations ./translations
COPY extensions ./extensions
COPY config ./config
COPY media ./media
COPY public ./public
# COPY translations ./translations

RUN npm install
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start"]