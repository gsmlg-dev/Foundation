defmodule GSMLGWeb.Schema.ContentTypes do
  use Absinthe.Schema.Notation
  import_types Absinthe.Type.Custom

  object :blog do
    field(:id, :id)
    field(:author, :string)
    field(:content, :string)
    field(:date, :date)
    field(:slug, :string)
    field(:title, :string)
  end
end
