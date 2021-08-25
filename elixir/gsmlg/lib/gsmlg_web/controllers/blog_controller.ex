defmodule GsmlgWeb.BlogController do
  use GsmlgWeb, :controller
  alias Gsmlg.Gsmlg.Blog

  def index(conn, _params) do
    conn
    |> json(Blog.list)
  end

  def create(conn, %{"blog" => blog} = _params) do
    case Blog.create(blog) do
      {:ok, blogc} -> conn |> json(blogc)
      {:error, %Ecto.Changeset{errors: errors}} -> conn |> json(errors)
    end
  end

  def update(conn, %{"blog" => blog} = _params) do
    case Blog.update(blog) do
      {:ok, blogc} -> conn |> json(blogc)
      {:error, %Ecto.Changeset{errors: errors}} -> conn |> json(errors)
    end
  end

  def show(conn, %{"blog_id" => id} = _params) do
    conn |> json(Blog.get(id))
  end

end
