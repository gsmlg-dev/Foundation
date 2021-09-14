defmodule GSMLGWeb.PageController do
  use GSMLGWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
