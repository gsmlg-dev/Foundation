defmodule GSMLGWeb.Schema.NodeTypes do
  use Absinthe.Schema.Notation

  object :node do
    field(:name, :string)
    field(:self, :boolean)
  end
end
