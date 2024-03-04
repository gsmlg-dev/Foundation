FROM nixos/nix

COPY ./nix.conf /etc/nix/nix.conf

RUN nix-channel --update

RUN nix-build buildImage.nix
