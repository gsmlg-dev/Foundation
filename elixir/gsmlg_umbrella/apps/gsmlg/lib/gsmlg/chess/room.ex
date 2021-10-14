defmodule GSMLG.Chess.Room do
  use GenServer
  alias GSMLG.Chess.ChessPieces

  def start_link() do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  def start_room() do
    GenServer.call(__MODULE__, :start_room)
  end

  def get_state() do
    GenServer.call(__MODULE__, :get_state)
  end

  def move_chess(payload) do
    GenServer.call(__MODULE__, {:move_chess, payload})
  end

  def init(_) do
    state = %{start?: false, done?: false, pieces: [], turn: nil}
    {:ok, state}
  end

  def handle_call(:start_room, _from, state) do
    pieces = ChessPieces.init_pieces
    newState = state
    |> Map.put(:pieces, pieces)
    |> Map.put(:start?, true)
    |> Map.put(:turn, "red")
    {:reply, {:ok, pieces}, newState}
  end
  def handle_call(:get_state, _from, state) do
    {:reply, {:ok, state}, state}
  end
  def handle_call({:move_chess, %{"item" => %{"id" => id, "color" => color}, "position" => %{"x" => x, "y" => y}}}, _from, state) do
    pieces = state
    |> Map.fetch!(:pieces)
    |> Enum.map(fn(p) ->
      case p do
        %{id: ^id} -> Map.put(p, :position, %{x: x, y: y})
        %{position: %{x: ^x, y: ^y}} -> Map.put(p, :live, false)
        _ -> p
      end
    end)
    newState = state |> Map.put(:pieces, pieces) |> Map.put(:turn, if(color == "red", do: "black", else: "red"))
    {:reply, {:ok, pieces}, newState}
  end
end
