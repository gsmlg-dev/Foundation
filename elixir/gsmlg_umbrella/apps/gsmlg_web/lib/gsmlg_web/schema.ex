defmodule GSMLGWeb.Schema do
  use Absinthe.Schema
  import_types(Absinthe.Plug.Types)
  import_types(GSMLGWeb.Schema.ContentTypes)

  alias GSMLGWeb.Resolvers

  query do
    @desc "Get all blogs"
    field :blogs, list_of(:blog) do
      resolve(&Resolvers.Content.list_blogs/3)
    end
  end
end
