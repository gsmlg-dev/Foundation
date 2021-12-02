defmodule GSMLGWeb.BlogLive.Modify do
  use GSMLGWeb, :live_view

  alias GSMLG.Content
  alias GSMLG.Content.Blog

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(%{"id" => id}, _, socket) do
    blog = Content.get_blog!(id)
    changeset = Content.change_blog(blog)

    {:noreply,
     socket
     |> assign(:page_title, page_title(socket.assigns.live_action))
     |> assign(:changeset, changeset)
     |> assign(:blog, blog)}
  end

  @impl true
  def handle_params(_, _, socket) do
    changeset = Content.change_blog(%Blog{date: Date.utc_today()})

    {:noreply,
     socket
     |> assign(:page_title, page_title(socket.assigns.live_action))
     |> assign(:changeset, changeset)
     |> assign(:blog, %Blog{})}
  end

  defp page_title(:new), do: "New Blog"
  defp page_title(:edit), do: "Edit Blog"

  def update(%{blog: blog} = assigns, socket) do
    changeset = Content.change_blog(blog)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"blog" => blog_params}, socket) do
    changeset =
      socket.assigns.blog
      |> Content.change_blog(blog_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"blog" => blog_params}, socket) do
    IO.inspect(blog_params)
    save_blog(socket, socket.assigns.live_action, blog_params)
  end

  defp save_blog(socket, :edit, blog_params) do
    case Content.update_blog(socket.assigns.blog, blog_params) do
      {:ok, blog} ->
        {:noreply,
         socket
         |> put_flash(:info, "Blog updated successfully")
         |> push_redirect(to: Routes.blog_show_path(socket, :show, blog))}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_blog(socket, :new, blog_params) do
    case Content.create_blog(blog_params) do
      {:ok, blog} ->
        {:noreply,
         socket
         |> put_flash(:info, "Blog created successfully")
         |> push_redirect(to: Routes.blog_show_path(socket, :show, blog))}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
