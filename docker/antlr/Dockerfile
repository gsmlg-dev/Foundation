FROM openjdk:11

COPY antlr.sh /usr/local/bin/antlr
COPY grun.sh /usr/local/bin/grun

RUN cd /usr/local/lib \
    && wget https://www.antlr.org/download/antlr-4.9.2-complete.jar \
    && ln -s /usr/local/bin/antlr /usr/local/bin/anltr
