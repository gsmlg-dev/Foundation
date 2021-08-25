defmodule Gsmlg do
  @moduledoc """
  Gsmlg keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def name do
    :gsmlg
  end

  def hostname do
    case System.cmd "hostname", [] do
      {name, 0} -> String.trim(name)
      _ -> :error
    end
  end
end
