defmodule Gsmlg.Gsmlg.Blog do
  use Ecto.Schema
  import Ecto.Query, warn: false
  import Ecto.Changeset
  alias Gsmlg.Repo
  alias Gsmlg.Gsmlg.Blog


  schema "blogs" do
    field :author, :string
    field :content, :string
    field :resources, :string
    field :title, :string
    field :created_at, :date

    timestamps()
  end

  def list do
    query = from b in Blog,
      select: map(b, [:id, :title, :author, :created_at, :updated_at])
    Repo.all(query)
  end

  def create(attrs) do
    %Blog{}
    |> create_changeset(attrs)
    |> Repo.insert()
  end

  def update(attrs) do
    %Blog{}
    |> update_changeset(attrs)
    |> Repo.update()
  end

  def get(id) do
    Repo.get(Blog, id)
  end

  @doc false
  def create_changeset(%Blog{} = blog, attrs) do
    blog
    |> cast(attrs, [:title, :author, :content, :resources])
    |> validate_required([:title, :author, :content])
  end

  @doc false
  def update_changeset(%Blog{} = blog, attrs) do
    blog
    |> cast(attrs, [:content, :resources])
    |> validate_required([:content, :resources])
  end
end

defimpl Jason.Encoder, for: Gsmlg.Gsmlg.Blog do
  def encode(blog, options) do
    Jason.Encoder.encode(%{
      id: blog.id,
      title: blog.title,
      author: blog.author,
      content: blog.content,
      resources: blog.resources,
      created_at: blog.created_at,
      inserted_at: blog.inserted_at,
      updated_at: blog.updated_at,
    }, options)
  end
end
