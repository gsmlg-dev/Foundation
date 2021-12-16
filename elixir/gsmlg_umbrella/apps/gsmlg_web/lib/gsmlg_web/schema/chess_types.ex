defmodule GSMLGWeb.Schema.ChessTypes do
  use Absinthe.Schema.Notation

  object :chess do
    # start?: false, done?: false, pieces: [], turn: nil
    field :started, :boolean
    field :done, :boolean
    field :pieces, list_of(:piece)
    field :turn, :string
  end

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
