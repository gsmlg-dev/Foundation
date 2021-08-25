defmodule Gsmlg.Node.Supervisor do
  use Supervisor
  alias Gsmlg.Node.Distributed
  alias Gsmlg.Node.Self
  alias Gsmlg.Node.Others

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
