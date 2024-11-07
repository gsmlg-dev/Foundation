FROM rabbitmq:4-management

LABEL org.opencontainers.image.source https://github.com/gsmlg-dev/Foundation/tree/main/docker/rabbitmq

RUN rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_federation_management rabbitmq_stomp
