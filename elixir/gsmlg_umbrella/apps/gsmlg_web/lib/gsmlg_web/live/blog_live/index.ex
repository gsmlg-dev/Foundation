defmodule GSMLGWeb.BlogLive.Index do
  use GSMLGWeb, :live_view

  alias GSMLG.Content
  alias GSMLG.Content.Blog

  @impl true
  def mount(_params, _session, socket) do
    Process.send_after(__MODULE__, :refresh_list, 15_000)

    {:ok, assign(socket, :blogs, list_blogs())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Blog")
    |> assign(:blog, Content.get_blog!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Blog")
    |> assign(:blog, %Blog{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Blogs")
    |> assign(:blog, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    blog = Content.get_blog!(id)
    {:ok, _} = Content.delete_blog(blog)

    {:noreply, assign(socket, :blogs, list_blogs())}
  end

  def handle_info(:refresh_list, socket) do
    Process.send_after(__MODULE__, :refresh_list, 15_000)
    {:noreply, assign(socket, :blogs, list_blogs())}
  end

  defp list_blogs do
    Content.list_blogs()
  end
end
