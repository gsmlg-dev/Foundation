defmodule GSMLG.Chess.Supervisor do
  use Supervisor
  alias GSMLG.Chess.Room

  def start_link() do
    Supervisor.start_link(__MODULE__, :ok);
  end

  def init(_) do
    children = [
      worker(Room, []),
    ]
    supervise(children, strategy: :one_for_one)
  end

end
