defmodule GsmlgWeb.NodeController do
  use GsmlgWeb, :controller

  def index(conn, _params) do
    state = Gsmlg.Node.Self.get_state
    conn
    |> json(%{name: state.self, isAlive: state.alive?, nodes: Gsmlg.Node.Others.get_nodes, node_list: Node.list})
  end

end
