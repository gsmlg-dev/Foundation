defmodule GSMLGWeb.Resolvers.Node do
  def list_nodes(_parent, _args, _resolution) do
    self = GSMLG.Node.Self.get_state()
    others = GSMLG.Node.Others.list()
    nodes = [%{name: self.self, self: true}] ++ Enum.map(others, fn(n) -> %{name: n, self: false} end)
    {:ok, nodes}
  end
end
