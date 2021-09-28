defmodule GSMLGWeb.NodeManagementController do
  use GSMLGWeb, :controller

  def index(conn, _params) do
    nodes = Node.list()
    render(conn, "index.html", nodes: nodes)
  end

end
