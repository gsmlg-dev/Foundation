defmodule GSMLGWeb.Schema.ChessTypes do
  use Absinthe.Schema.Notation

  object :piece do
    field(:id, :id)
    field(:name, :string)
    field(:type, :integer)
    field(:position, :position)
    field(:color, :string)
    field(:live, :boolean)
  end

  object :position do
    field(:x, :integer)
    field(:y, :integer)
  end
end
