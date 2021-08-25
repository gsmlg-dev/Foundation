# GSMLG

![Docker deploy](https://github.com/gsmlg/gsmlg.github.io/workflows/Docker%20deploy/badge.svg?branch=elixir&event=push)

## To start development server:

  * Install dependencies with `mix deps.get`
  * Install Node.js dependencies with `cd assets && ./yarn`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Deployment

  * install docker
  * update version in mix.exs
  * run make ; will create a gsmlg.tag.gz package
  * extract tarbal in production server, start server, must with environment PORT=<\<SERVER PORT>>

## Build

build by docker or buildx
