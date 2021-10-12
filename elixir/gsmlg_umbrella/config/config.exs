# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of the Config module.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
import Config

# Configure Mix tasks and generators
config :gsmlg,
  namespace: GSMLG,
  ecto_repos: [GSMLG.Repo]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :gsmlg, GSMLG.Mailer, adapter: Swoosh.Adapters.Local

config :gsmlg, GSMLG.Guardian,
       issuer: "gsmlg",
       secret_key: "Secret key. You can use `mix guardian.gen.secret` to get one"

# Swoosh API client is needed for adapters other than SMTP.
config :swoosh, :api_client, false

config :gsmlg_web,
  namespace: GSMLGWeb,
  ecto_repos: [GSMLG.Repo],
  generators: [context_app: :gsmlg]

# Configures the endpoint
config :gsmlg_web, GSMLGWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "oHywixWzSdklwLkMiE+SUaNdMDu5gTcmEggpHA9LhRTdb8DgLWBDQNXrOu0wCLEr",
  render_errors: [view: GSMLGWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: GSMLG.PubSub,
  live_view: [signing_salt: "gmmaSSOy"]

# Configure esbuild (the version is required)
config :esbuild,
  version: "0.12.18",
  default: [
    args: ~w(js/app.js --bundle --target=es2016 --outdir=../priv/static/assets),
    cd: Path.expand("../apps/gsmlg_web/assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
