defmodule GSMLGWeb.Schema do
  use Absinthe.Schema
  import_types(Absinthe.Plug.Types)
  import_types(GSMLGWeb.Schema.ContentTypes)
  import_types(GSMLGWeb.Schema.NodeTypes)
  import_types(GSMLGWeb.Schema.ChessTypes)

  alias GSMLGWeb.Resolvers

  query do
    @desc "Get all blogs"
    field :blogs, list_of(:blog) do
      resolve(&Resolvers.Content.list_blogs/3)
    end

    @desc "Get all nodes"
    field :nodes, list_of(:node) do
      resolve(&Resolvers.Node.list_nodes/3)
    end

    @desc "Get all chess piece"
    field :pieces, list_of(:piece) do
      resolve(&Resolvers.Chess.list_pieces/3)
    end
  end
end
