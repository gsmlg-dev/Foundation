defmodule GSMLG.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do

    topologies = case System.get_env("CLUSTER_MODE") do
      "KUBERNETES" -> 
        [
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
      _ -> 
        [
          gsmlg: [
            # The selected clustering strategy. Required.
            strategy: Cluster.Strategy.Epmd,
            # Configuration for the provided strategy. Optional.
            config: [hosts: [ GSMLG.Node.Self.name ]],
            # The function to use for connecting nodes. The node
            # name will be appended to the argument list. Optional
            connect: {:net_kernel, :connect_node, []},
            # The function to use for disconnecting nodes. The node
            # name will be appended to the argument list. Optional
            disconnect: {:erlang, :disconnect_node, []},
            # The function to use for listing nodes.
            # This function must return a list of node names. Optional
            list_nodes: {:erlang, :nodes, [:connected]},
          ]
        ]
    end

    children = [
      {Horde.Registry,
       [name: GSMLG.GSMLGRegistry, keys: :unique, members: registry_members()]},
      {Horde.DynamicSupervisor,
       [
         name: GSMLG.GSMLGSupervisor,
         strategy: :one_for_one,
         distribution_strategy: Horde.UniformQuorumDistribution,
         max_restarts: 100_000,
         max_seconds: 1,
         members: supervisor_members()
       ]},
      # Start the Ecto repository
      GSMLG.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: GSMLG.PubSub, adapter: Phoenix.PubSub.PG2},
      # Start a worker by calling: GSMLG.Worker.start_link(arg)
      # {GSMLG.Worker, arg}
      # Start distribute Node
      {GSMLG.Node.Supervisor, name: GSMLG.Node.Supervisor},
      # supervisor(GSMLG.Chess.Supervisor, []),
      {Cluster.Supervisor, [topologies, [name: GSMLG.ClusterSupervisor]]},
      %{
        id: GSMLG.ClusterConnector,
        restart: :transient,
        start:
          {Task, :start_link,
           [
             fn ->
               Horde.DynamicSupervisor.wait_for_quorum(GSMLG.GSMLGSupervisor, 30_000)
               Horde.DynamicSupervisor.start_child(GSMLG.GSMLGSupervisor, GSMLG.Node.Others)
             end
           ]}
      }
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: GSMLG.Supervisor)
  end

  def how_many?() do
    Horde.Registry.meta(GSMLG.GSMLGRegistry, "count")
  end

  defp registry_members do
    [
      {GSMLG.GSMLGRegistry, GSMLG.Node.Self.name()},
    ] ++ other_menbers()
  end

  defp supervisor_members do
    [
      {GSMLG.GSMLGSupervisor, GSMLG.Node.Self.name()},
    ] ++ other_menbers()
  end

  defp other_menbers do
    GSMLG.Node.Others.list() |> Enum.map(fn(node) ->
      {GSMLG.GSMLGSupervisor, node}
    end)
  end
end
