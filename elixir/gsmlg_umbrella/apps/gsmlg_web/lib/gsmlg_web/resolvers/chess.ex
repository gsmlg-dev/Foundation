defmodule GSMLGWeb.Resolvers.Chess do
  def list_pieces(_parent, _args, _resolution) do
    {:ok, %{start?: _started, done?: _done, pieces: pieces, turn: _turn}} =
      GSMLG.Chess.Room.get_state()

    {:ok, pieces}
  end
end
