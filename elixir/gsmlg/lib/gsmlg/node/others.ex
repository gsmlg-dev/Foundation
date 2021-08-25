defmodule Gsmlg.Node.Others do
  use GenServer
  alias Gsmlg.Node.Others
  alias Gsmlg.Node.Self

  def start_link() do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__);
  end

  def add(name) when is_atom(name) do
    GenServer.call(__MODULE__, {:add, name})
  end

  def remove(name) when is_atom(name) do
    GenServer.call(__MODULE__, {:remove, name})
  end

  def get_nodes do
    case GenServer.call(__MODULE__, :get_state) do
      {:ok, %{nodes: nodes}} -> nodes
      _ ->[]
    end
  end

  def list do
    Node.list
  end

  def init(_) do
    state = %{nodes: Others.list}
    Process.send_after(__MODULE__, :keep_alive, 60000)
    {:ok, state}
  end

  def handle_call({:add, name}, _from, %{nodes: nodes} = state) do
    newState = state
    |> Map.put(:nodes, nodes ++ [name])
    Node.connect(name)
    GsmlgWeb.Endpoint.broadcast "node:lobby", "list_add", %{add_node: name, nodes: newState.nodes, from: Self.name}
    {:reply, {:ok}, newState}
  end

  def handle_call({:remove, name}, _from, %{nodes: nodes} = state) do
    newState = state
    |> Map.put(:nodes, List.delete(nodes, name))
    Node.disconnect(name)
    GsmlgWeb.Endpoint.broadcast "node:lobby", "list_remove", %{remove_node: name, nodes: newState.nodes, from: Self.name}
    {:reply, {:ok}, newState}
  end

  def handle_call(:get_state, _from, state) do
    {:reply, {:ok, state}, state}
  end

  def handle_info(:keep_alive, %{nodes: nodes} = state) do
    Enum.each(nodes, fn(n) ->
      if Enum.member?(Node.list, n), do: Node.ping(n), else: Node.connect(n)
    end)
    GsmlgWeb.Endpoint.broadcast "node:lobby", "list_info", %{node_list: Node.list, nodes: nodes, from: Self.name}

    Process.send_after(__MODULE__, :keep_alive, 60000)

    ext = Enum.reduce(Node.list, [], fn(n, acc) ->
      if !Enum.member?(nodes, n) do
        [n | acc]
      else
        acc
      end
    end)

    {:noreply, Map.put(state, :nodes, nodes ++ ext)}
  end
end
