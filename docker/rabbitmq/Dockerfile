FROM rabbitmq:4-management

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/rabbitmq"
LABEL org.opencontainers.image.title="RabbitMQ Server"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="RabbitMQ is a reliable and mature messaging and streaming broker, which is easy to deploy on cloud environments, on-premises, and on your local machine. It is currently used by millions worldwide."
LABEL org.opencontainers.image.licenses=MIT
LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS="-rabbitmq_stream advertised_host localhost"

RUN rabbitmq-plugins enable --offline \
  rabbitmq_mqtt \
  rabbitmq_federation_management \
  rabbitmq_stomp \
  rabbitmq_stream \
  rabbitmq_stream_management
