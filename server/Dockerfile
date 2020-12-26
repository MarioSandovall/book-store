FROM node

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

COPY [".", "/usr/src"]

EXPOSE 5000

CMD ["npm", "run", "start"]