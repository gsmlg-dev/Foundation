defmodule GSMLGWeb.LiveHelpers do
  import Phoenix.LiveView.Helpers

  @doc """
  Renders a component inside the `GSMLGWeb.ModalComponent` component.

  The rendered modal receives a `:return_to` option to properly update
  the URL when the modal is closed.

  ## Examples

      <%= live_modal GSMLGWeb.BlogLive.FormComponent,
        id: @blog.id || :new,
        action: @live_action,
        blog: @blog,
        return_to: Routes.blog_index_path(@socket, :index) %>
  """
  def live_modal(component, opts) do
    path = Keyword.fetch!(opts, :return_to)
    modal_opts = [id: :modal, return_to: path, component: component, opts: opts]
    live_component(GSMLGWeb.ModalComponent, modal_opts)
  end

  import Phoenix.HTML
  import Phoenix.HTML.Tag
  import Phoenix.HTML.Form

  def bx_text_input(form, field, opts \\ []) do
    generic_input(:text, form, field, opts)
  end

  def bx_date_select(form, field, opts \\ [], innerOpts \\ []) do
    value = Keyword.get(opts, :value, input_value(form, field) || Keyword.get(opts, :default))

    opts =
      opts
      |> Keyword.put_new(:"date-format", "Y-m-d")
    
    innerOpts =
      innerOpts
      |> Keyword.put_new(:id, input_id(form, field))
      |> Keyword.put_new(:name, input_name(form, field))
      |> Keyword.put_new(:"label-text", humanize(field))
      |> Keyword.put_new(:value, input_value(form, field))

    inner = content_tag(:"bx-date-picker-input", "", innerOpts)
    content_tag(:"bx-date-picker", inner, opts)
  end

  def bx_textarea(form, field, opts \\ []) do
    opts =
      opts
      |> Keyword.put_new(:id, input_id(form, field))
      |> Keyword.put_new(:name, input_name(form, field))
      |> Keyword.put_new(:"label-text", humanize(field))
      |> Keyword.put_new(:value, html_escape(input_value(form, field) || ""))

    content_tag(:"bx-textarea", "", opts)
  end

  defp generic_input(type, form, field, opts)
       when is_list(opts) and (is_atom(field) or is_binary(field)) do
    opts =
      opts
      |> Keyword.put_new(:type, type)
      |> Keyword.put_new(:id, input_id(form, field))
      |> Keyword.put_new(:name, input_name(form, field))
      |> Keyword.put_new(:"label-text", humanize(field))
      |> Keyword.put_new(:value, input_value(form, field))
      |> Keyword.update!(:value, &maybe_html_escape/1)

    content_tag(:"bx-input", "", opts)
  end

  defp maybe_html_escape(nil), do: nil
  defp maybe_html_escape(value), do: html_escape(value)

end
