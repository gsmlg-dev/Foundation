defmodule GSMLGWeb.BlogView do
  use GSMLGWeb, :view
  alias GSMLGWeb.BlogView

  def render("index.json", %{blogs: blogs}) do
    %{data: render_many(blogs, BlogView, "blog.json")}
  end

  def render("show.json", %{blog: blog}) do
    %{data: render_one(blog, BlogView, "blog.json")}
  end

  def render("blog.json", %{blog: blog}) do
    %{
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      date: blog.date,
      author: blog.author,
      content: blog.content
    }
  end
end
