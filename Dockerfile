FROM node:16.16.0-slim

RUN apt update && apt install -y procps

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]