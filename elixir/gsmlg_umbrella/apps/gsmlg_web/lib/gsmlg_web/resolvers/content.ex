defmodule GSMLGWeb.Resolvers.Content do
  def list_blogs(_parent, _args, _resolution) do
    {:ok, GSMLG.Content.list_blogs()}
  end
end
