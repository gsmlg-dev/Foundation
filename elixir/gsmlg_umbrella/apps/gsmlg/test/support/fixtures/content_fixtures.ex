defmodule GSMLG.ContentFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `GSMLG.Content` context.
  """

  @doc """
  Generate a blog.
  """
  def blog_fixture(attrs \\ %{}) do
    {:ok, blog} =
      attrs
      |> Enum.into(%{
        author: "some author",
        content: "some content",
        date: ~D[2021-09-26],
        slug: "some slug",
        title: "some title"
      })
      |> GSMLG.Content.create_blog()

    blog
  end
end
