FROM nixos/nix

COPY ./nix.conf /etc/nix/nix.conf

RUN nix-channel --update

VOLUME /nix
