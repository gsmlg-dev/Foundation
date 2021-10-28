defmodule GSMLG.MixProject do
  use Mix.Project

  def project do
    [
      app: :gsmlg,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.12",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps(),
      xref: [exclude: [GSMLGWeb.Endpoint]],
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {GSMLG.Application, []},
      extra_applications: [:logger, :runtime_tools, :os_mon]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix_pubsub, "~> 2.0"},
      {:ecto_sql, "~> 3.6"},
      {:myxql, ">= 0.0.0"},
      {:jason, "~> 1.2"},
      {:libcluster, "~> 3.0"},
      {:horde, github: "fmbraga/horde", tag: "585b1a57d195f3c3b0fec5992b5eedee8bc1b7e8"}, # temperally fix, wait for replace by production release
      {:swoosh, "~> 1.3"},
      {:absinthe, "~> 1.6"},
      {:guardian, "~> 2.0"},
      {:absinthe, "~> 1.6.0"},
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ecto.setup"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"]
    ]
  end
end
