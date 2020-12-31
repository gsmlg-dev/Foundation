# Ubuntu 18.04 Ruby and Elixir Development Setup

Guide to setting up a new Ubuntu 18.04 dev environment with Ruby and Elixir installed with the asdf version management tool.

## Update system and install prerequisite packages

Some of these packages may already be installed

```bash
sudo apt-get install mercurial make binutils bison gcc \
 build-essential git curl zlib1g-dev openssl libssl-dev libreadline-dev \
 libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev \
 software-properties-common wget dnsutils vim zip unzip screen tmux htop \
 libffi-dev redis-server imagemagick ntp ufw sudo dirmngr libxrender1
```

Install postfix SMTP server (Choose internet site configuration and use the server's domain name)

```bash
sudo apt-get install postfix
```

Edit postfix config file

```bash
sudo vim /etc/postfix/main.cf
```

Set inet_interfaces to be loopback-only

```
inet_interfaces = loopback-only
```

Generate an SSH keypair used for deployments

```bash
ssh-keygen -t rsa -C "YOUR@EMAIL.com"
```

Copy the output of this command and paste into [github SSH key settings](https://github.com/settings/keys).

```bash
cat ~/.ssh/id_rsa.pub
```

Check to make sure SSH to github works with your key

```bash
ssh -T git@github.com
```

## PostgreSQL

```bash
sudo apt-get install postgresql-10 libpq-dev
```

Set postgres user password

```
sudo -u postgres psql
postgres=# \password postgres
```

## zsh and oh-my-zsh

```bash
sudo apt-get install zsh fonts-powerline
chsh -s $(which zsh)
# logout and back in
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## asdf version manager

```bash
sudo apt-get install automake autoconf libreadline-dev libncurses-dev \
libssl-dev libyaml-dev libxslt-dev libffi-dev libtool unixodbc-dev \
libwxgtk3.0-dev libgl1-mesa-dev  libglu1-mesa-dev libssh-dev xsltproc fop \
libxml2-utils

git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.4.3

# add to bottom of .zshrc
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.zshrc
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.zshrc

source ~/.zshrc
```

## Ruby and Ruby on Rails

```bash
asdf plugin-add ruby
asdf install ruby 2.5.1
asdf global ruby 2.5.1
ruby -v
```

Tell RubyGems to not install documentation for each gem

```bash
echo "gem: --no-ri --no-rdoc" > ~/.gemrc
```

Install bundler and rails

```bash
gem install bundler
gem install rails
```

## Node.js

```bash
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git
bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
asdf install nodejs 9.11.1
asdf global nodejs 9.11.1
node -v
```

## Erlang, Elixir and Phoenix

### Erlang

```bash
asdf plugin-add erlang
asdf install erlang 20.3.4
asdf global erlang 20.3.4
```

### Elixir

```bash
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
asdf install elixir 1.6.4
asdf global elixir 1.6.4
elixir -v
```

### Phoenix

```bash
sudo apt-get install inotify-tools
mix local.hex
mix archive.install https://github.com/phoenixframework/archives/raw/master/phx_new.ez
```

## Other Tools

### wkhtmltopdf

The wkhtmltopdf packge available in debian repo is version with unpatched QT. You most likely want version with patched QT, so download the precompiled binaries for Linux from https://wkhtmltopdf.org/downloads.html, extract them and cp the binaries in bin folder to `/usr/bin/`

At the time of writing, the latest version is 0.12.4 which has an issue fetching remote images over https, so you will need to install libssl1.0-dev

```bash
sudo apt-get install libssl1.0-dev
```

### PostGIS and Geospatial related tool dependencies

```bash
sudo apt-get install python-all-dev python-dev python3-pip \
 libaio-dev libbz2-dev libjpeg-turbo8-dev libpcre3-dev libexpat1-dev \
 liblzma-dev libevent-dev binutils libproj-dev xsltproc docbook-xsl \
 docbook-mathml libgeos-dev libgeos-3.6.2 postgresql-10-postgis-2.4 \
 libgdal-dev python3-gdal python3-numpy gdal-bin postgresql-10-postgis-scripts
```

Add to .zshrc

```bash
export CPLUS_INCLUDE_PATH=/usr/include/gdal
export C_INCLUDE_PATH=/usr/include/gdal
```

Make sure rgeo will be able to find geos

```bash
sudo ln -s /usr/lib/x86_64-linux-gnu/libgeos-3.6.2.so /usr/lib/libgeos.so
gem install rgeo
```
