# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :gsmlg,
  ecto_repos: [Gsmlg.Repo]

# Configures the endpoint
config :gsmlg, GsmlgWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "v3HZYcVkxKaUUbrg/k7m4Ru3HxUkXAtY9xDPTnnRKa3q8RpekScBEiJuBRDTTsyv",
  render_errors: [view: GsmlgWeb.ErrorView, accepts: ~w(html json)],
  pubsub_server: Gsmlg.PubSub,
  live_view: [
    signing_salt: "W9dIqaWrHspJjmqKJNcEvqI62dRtaVGa"
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

