defmodule GSMLG.Repo do
  use Ecto.Repo,
    otp_app: :gsmlg,
    adapter: Ecto.Adapters.MyXQL
end
