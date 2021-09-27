defmodule GSMLG.Content.Blog do
  use Ecto.Schema
  import Ecto.Changeset

  schema "blogs" do
    field :author, :string
    field :content, :string
    field :date, :date
    field :slug, :string
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(blog, attrs) do
    blog
    |> cast(attrs, [:slug, :title, :date, :author, :content])
    |> validate_required([:slug, :title, :date, :author, :content])
  end
end
