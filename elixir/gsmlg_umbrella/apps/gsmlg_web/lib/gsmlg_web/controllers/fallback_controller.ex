defmodule GSMLGWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use GSMLGWeb, :controller

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    case handle_path(conn.request_path) do
      {:html, file} ->
        conn
          |> put_resp_header("content-type", "text/html; charset=utf-8")
          |> Plug.Conn.send_file(200, file)
      {:not_found_page, file} ->
        conn
          |> put_resp_header("content-type", "text/html; charset=utf-8")
          |> Plug.Conn.send_file(404, file)
      _ ->
        conn
          |> put_status(:not_found)
          |> put_view(GSMLGWeb.ErrorView)
          |> render(:"404")
    end
  end

  defp handle_path(path) do
    path = if path == "/", do: "/index", else: path
    cond do
      File.exists?("priv/static" <> path <> ".html") -> {:html, "priv/static" <> path <> ".html"}
      File.exists?("priv/static/404.html") -> {:not_found_page, "priv/static/404.html"}
      true -> {:null, nil}
    end
  end
end
