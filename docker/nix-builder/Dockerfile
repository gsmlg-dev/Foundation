FROM nixos/nix

COPY ./nix.conf /etc/nix/nix.conf

RUN nix-channel --update

COPY ./buildImage.nix /tmp/buildImage.nix
RUN nix-build /tmp/buildImage.nix
