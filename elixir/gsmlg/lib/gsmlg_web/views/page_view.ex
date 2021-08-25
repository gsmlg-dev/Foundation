defmodule GsmlgWeb.PageView do
  use GsmlgWeb, :view

  def render("index.html", _assigns) do
    index_html = Path.join([__DIR__, "..", "..", "..", "priv", "static", "index.html"])
    html = File.read!(index_html)
    {:safe, html}
  end
end
