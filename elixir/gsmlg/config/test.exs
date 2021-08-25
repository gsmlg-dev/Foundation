use Mix.Config

config :gsmlg, :environment, :test

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :gsmlg, GsmlgWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :gsmlg, Gsmlg.Repo,
  adapter: Etso.Adapter

config :mnesia, :dir, 'priv/data/mnesia/test'
