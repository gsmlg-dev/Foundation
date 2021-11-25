defmodule GSMLGWeb.NodeManagementController do
  use GSMLGWeb, :controller

  def index(conn, _params) do
    nodes = Node.list()
    render(conn, "index.html", nodes: nodes)
  end

  def update(conn, %{"action" => "set-node-cookie", "cookie" => cookie} = _params) do
    case cookie |> String.to_atom() |> Node.set_cookie() do
      true ->
        send_resp(conn, :created, ~s({"cookie": "#{cookie}"}))

      error ->
        IO.inspect(error)
        send_resp(conn, :forbidden, ~s({"error": "error"}))
    end
  end
  def update(conn, %{"action" => "connect-node", "target_node" => target_node} = _params) do
    case target_node |> String.to_atom() |> Node.connect() do
      true ->
        send_resp(conn, :created, ~s({"target_node": "#{target_node}"}))

      error ->
        IO.inspect(error)
        send_resp(conn, :forbidden, ~s({"error": "error"}))
    end
  end
  def update(conn, _params) do
    send_resp(conn, :no_content, "")
  end
end
