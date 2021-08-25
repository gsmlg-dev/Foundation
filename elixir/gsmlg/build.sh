#!/bin/sh

export MIX_ENV=prod

mix deps.get
mix compile
mix distillery.release --env prod

