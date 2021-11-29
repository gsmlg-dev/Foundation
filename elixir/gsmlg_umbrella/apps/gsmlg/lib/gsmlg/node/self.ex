defmodule GSMLG.Node.Self do
  use GenServer
  alias GSMLG.Node.Self

  def start_link() do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  def start do
    GenServer.call(__MODULE__, :start)
  end

  def stop do
    GenServer.call(__MODULE__, :stop)
  end

  @doc """
  get node state
  """
  def get_state do
    case GenServer.call(__MODULE__, :get_state) do
      {:ok, state} -> state
      _ -> nil
    end
  end

  def host() do
    hostname = System.get_env("HOSTNAME", "127.0.0.1")
    host = System.get_env("POD_IP", hostname)
    "#{host}"
  end

  @doc """
  node name, used by Node.start
  """
  def name do
    :"#{GSMLG.name()}@#{host()}"
  end

  def init(init) do
    state = node_start(%{alive?: Node.alive?(), self: Node.self(), pid: nil, restart?: true})
    Process.send_after(__MODULE__, :keep_alive, 60000)
    {:ok, state}
  end

  def handle_call(:start, _from, state) do
    newState = Self.node_start(state)
    {:reply, {:ok, newState}, newState}
  end

  def handle_call(:stop, _from, state) do
    newState = Self.node_stop(state)
    {:reply, {:ok, newState}, newState}
  end

  def handle_call(:get_state, _from, state) do
    {:reply, {:ok, state}, state}
  end

  def handle_info(:keep_alive, state) do
    newState =
      case {Map.fetch!(state, :restart?), Map.fetch!(state, :alive?)} do
        {true, false} ->
          Self.node_start(state)

        _ ->
          broadcast("node:lobby", "node_info", %{
            name: Node.self(),
            isAlive: Node.alive?(),
            from: Self.name()
          })

          state
      end

    Process.send_after(__MODULE__, :keep_alive, 60000)
    {:noreply, newState}
  end

  def node_start(state) do
    pid =
      case Node.start(Self.name()) do
        {:ok, pid} -> pid
        {:error, {:already_started, pid}} -> pid
        e -> IO.inspect(e)
      end

    newState =
      state
      |> Map.put(:alive?, Node.alive?())
      |> Map.put(:self, Node.self())
      |> Map.put(:pid, pid)
      |> Map.put(:restart?, true)

    broadcast("node:lobby", "node_start", %{
      name: Node.self(),
      isAlive: Node.alive?(),
      from: Self.name()
    })

    newState
  end

  def node_stop(state) do
    Node.stop()

    newState =
      state
      |> Map.put(:alive?, Node.alive?())
      |> Map.put(:self, Node.self())
      |> Map.put(:pid, nil)
      |> Map.put(:restart?, false)

    broadcast("node:lobby", "node_stop", %{
      name: Node.self(),
      isAlive: Node.alive?(),
      from: Self.name()
    })

    newState
  end

  def broadcast(room, event, opts) do
    try do
      GSMLGWeb.Endpoint.broadcast(room, event, opts)
    rescue
      _ ->
        IO.puts("Broadcask node events to node:lobby failed!")
        IO.inspect(room)
        IO.inspect(event)
        IO.inspect(opts)
    end
  end
end
