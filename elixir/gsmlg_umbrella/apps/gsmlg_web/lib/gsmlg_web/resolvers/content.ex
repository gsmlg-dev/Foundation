defmodule GSMLGWeb.Resolvers.Content do
  def list_blogs(_parent, args, _resolution) when map_size(args) == 0 do
    {:ok, GSMLG.Content.list_blogs()}
  end
  def list_blogs(_parent, args, _resolution) do
    {:ok, GSMLG.Content.list_blogs(convert_to_klist(args))}
  end

  def find_blog(_parent, %{id: id}, _resolution) do
    {:ok, GSMLG.Content.get_blog!(id)}
  end

  def convert_to_klist(map) do
    IO.inspect map
    Enum.map(map, fn({key, value}) ->
      if (key == :date) do
        value = Date.from_iso8601(value)
      end
      {key, value}
    end)
  end
end
