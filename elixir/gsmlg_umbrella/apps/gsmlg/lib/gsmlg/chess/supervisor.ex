defmodule GSMLG.Chess.Supervisor do
  use Supervisor
  alias GSMLG.Chess.Room

  def start_link([name: name]) do
    Supervisor.start_link(name, :ok);
  end

  def init(_) do
    children = [
      worker(Room, []),
    ]
    supervise(children, strategy: :one_for_one)
  end

end
