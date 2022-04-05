defmodule GSMLG.Content do
  @moduledoc """
  The Content context.
  """

  import Ecto.Query, warn: false
  alias GSMLG.Repo

  alias GSMLG.Content.Blog
  @doc """
  Returns the count of blogs.

  ## Examples

      iex> count_blogs()
      [%Blog{}, ...]

  """
  def count_blogs do
    Repo.aggregate(Blog, :count)
  end
  def count_blogs(args) do
    query =
      from b in Blog,
        where: ^args

    Repo.aggregate(query, :count)
  end

  def last_updated_blogs() do
    blog = GSMLG.Repo.one(from GSMLG.Content.Blog, limit: 1, order_by: [desc: :updated_at], select: [:updated_at]);
    blog.updated_at
  end

  @doc """
  Returns the list of blogs.

  ## Examples

      iex> list_blogs()
      [%Blog{}, ...]

  """
  def list_blogs do
    query =
      from b in Blog,
        order_by: [desc: :id]

    Repo.all(query)
  end

  def list_blogs(args) do
    query =
      from b in Blog,
        where: ^args,
        order_by: [desc: :id]

    Repo.all(query)
  end

  def list_blogs_limit(args, limit, offset, order_by) do
    query = cond do
      Enum.count(args) == 0 and Enum.count(order_by) == 0 -> from b in Blog, limit: ^limit, offset: ^offset, order_by: [desc: :id]
      Enum.count(args) == 0 -> from b in Blog, limit: ^limit, offset: ^offset, order_by: ^order_by
      Enum.count(order_by) == 0 and Enum.count(args) > 0 -> from b in Blog, where: ^args, limit: ^limit, offset: ^offset, order_by: [desc: :id]
      Enum.count(args) > 0 -> from b in Blog, where: ^args, limit: ^limit, offset: ^offset, order_by: ^order_by
    end

    Repo.all(query)
  end

  @doc """
  Gets a single blog.

  Raises `Ecto.NoResultsError` if the Blog does not exist.

  ## Examples

      iex> get_blog!(123)
      %Blog{}

      iex> get_blog!(456)
      ** (Ecto.NoResultsError)

  """
  def get_blog!(id), do: Repo.get!(Blog, id)

  def get_blog_by_slug(slug) do
    query = from b in Blog, where: [slug: ^slug]
    Repo.one(query)
  end

  @doc """
  Creates a blog.

  ## Examples

      iex> create_blog(%{field: value})
      {:ok, %Blog{}}

      iex> create_blog(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_blog(attrs \\ %{}) do
    %Blog{}
    |> Blog.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a blog.

  ## Examples

      iex> update_blog(blog, %{field: new_value})
      {:ok, %Blog{}}

      iex> update_blog(blog, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_blog(%Blog{} = blog, attrs) do
    blog
    |> Blog.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a blog.

  ## Examples

      iex> delete_blog(blog)
      {:ok, %Blog{}}

      iex> delete_blog(blog)
      {:error, %Ecto.Changeset{}}

  """
  def delete_blog(%Blog{} = blog) do
    Repo.delete(blog)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking blog changes.

  ## Examples

      iex> change_blog(blog)
      %Ecto.Changeset{data: %Blog{}}

  """
  def change_blog(%Blog{} = blog, attrs \\ %{}) do
    Blog.changeset(blog, attrs)
  end
end
