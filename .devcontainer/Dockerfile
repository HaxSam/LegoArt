# docker build -t legoart .
# docker run --rm -v C:\Users\Haysam\Desktop\Projekt\LegoArt:/LegoArt -v C:\Users\Haysam\Desktop\Projekt\.vscode-server:/root/.vscode-server --hostname localhost -d --name legoart -i legoart
# docker exec -it legoart /bin/bash

FROM ubuntu:19.10

ENV LC_CTYPE C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
  apt-get install -y vim python3 python3-pip python3-dev python python-pip wget git make nodejs npm && \
  pip install esptool && \
  pip3 install rshell ampy && \
  npm install -g jshint

WORKDIR /workspaces/LegoArt

EXPOSE 8000
EXPOSE 3000