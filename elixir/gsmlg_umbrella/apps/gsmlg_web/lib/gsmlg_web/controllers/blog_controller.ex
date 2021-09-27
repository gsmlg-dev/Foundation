defmodule GSMLGWeb.BlogController do
  use GSMLGWeb, :controller

  alias GSMLG.Content
  alias GSMLG.Content.Blog

  action_fallback GSMLGWeb.FallbackController

  def index(conn, _params) do
    blogs = Content.list_blogs()
    render(conn, "index.json", blogs: blogs)
  end

  def create(conn, %{"blog" => blog_params}) do
    with {:ok, %Blog{} = blog} <- Content.create_blog(blog_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.blog_path(conn, :show, blog))
      |> render("show.json", blog: blog)
    end
  end

  def show(conn, %{"id" => id}) do
    blog = Content.get_blog!(id)
    render(conn, "show.json", blog: blog)
  end

  def update(conn, %{"id" => id, "blog" => blog_params}) do
    blog = Content.get_blog!(id)

    with {:ok, %Blog{} = blog} <- Content.update_blog(blog, blog_params) do
      render(conn, "show.json", blog: blog)
    end
  end

  def delete(conn, %{"id" => id}) do
    blog = Content.get_blog!(id)

    with {:ok, %Blog{}} <- Content.delete_blog(blog) do
      send_resp(conn, :no_content, "")
    end
  end
end
