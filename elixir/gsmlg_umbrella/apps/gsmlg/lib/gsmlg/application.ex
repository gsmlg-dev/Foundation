defmodule GSMLG.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    import Supervisor.Spec

    topologies = [
      gsmlg: [
        strategy: Cluster.Strategy.Kubernetes,
        config: [
          mode: :ip,
          kubernetes_ip_lookup_mode: :pods,
          kubernetes_node_basename: "#{GSMLG.name}",
          kubernetes_selector: System.get_env("SELECTOR", "gsmlg.org/app=gsmlg"),
          kubernetes_namespace: System.get_env("NAMESPACE", "#{GSMLG.name}"),
          polling_interval: 10_000
        ]
      ]
    ]

    children = [
      # Start the Ecto repository
      GSMLG.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: GSMLG.PubSub, adapter: Phoenix.PubSub.PG2},
      # Start a worker by calling: GSMLG.Worker.start_link(arg)
      # {GSMLG.Worker, arg}
      supervisor(GSMLG.Node.Supervisor, []),
      # supervisor(GSMLG.Chess.Supervisor, []),
      {Cluster.Supervisor, [topologies, [name: GSMLG.ClusterSupervisor]]},
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: GSMLG.Supervisor)
  end
end
