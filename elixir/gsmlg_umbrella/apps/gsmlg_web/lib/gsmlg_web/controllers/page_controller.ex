defmodule GSMLGWeb.PageController do
  use GSMLGWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def not_found(conn, _params) do
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
      File.exists?(file_path = Path.join(:code.priv_dir(:gsmlg_web), "static", path <> ".html")) ->
        {:html, file_path}

      File.exists?(
        file_path = Path.join(:code.priv_dir(:gsmlg_web), "static", path, "/index.html")
      ) ->
        {:html, file_path}

      File.exists?(file_path = Path.join(:code.priv_dir(:gsmlg_web), "static/404.html")) ->
        {:not_found_page, file_path}

      true ->
        {:null, nil}
    end
  end
end
