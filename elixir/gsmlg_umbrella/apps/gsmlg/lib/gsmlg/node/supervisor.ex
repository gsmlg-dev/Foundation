defmodule GSMLG.Node.Supervisor do
  use Supervisor
  alias GSMLG.Node.Distributed
  alias GSMLG.Node.Self
  alias GSMLG.Node.Others

  def start_link() do
    Supervisor.start_link(__MODULE__, :ok);
  end

  def init(_) do
    children = [
      worker(Self, []),
      worker(Others, []),
    ]
    supervise(children, strategy: :one_for_one)
  end

end
