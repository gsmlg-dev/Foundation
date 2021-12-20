defmodule GSMLGWeb.Resolvers.Chess do
  def start_chess(_parent, args, _resolution) do
    {:ok, pieces} = GSMLG.Chess.Room.start_room()
    {:ok, %{started: true, pieces: pieces}}
  end

  def get_chess(_parent, _args, _resolution) do
    {:ok, %{start?: started, done?: done, pieces: pieces, turn: turn}} =
      GSMLG.Chess.Room.get_state()

    GSMLG.Chess.Room.get_state()
    {:ok, %{started: started, done: done, pieces: pieces, turn: turn}}
  end

  def list_pieces(_parent, _args, _resolution) do
    {:ok, %{start?: _started, done?: _done, pieces: pieces, turn: _turn}} =
      GSMLG.Chess.Room.get_state()

    {:ok, pieces}
  end
end
