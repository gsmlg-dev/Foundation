defmodule GSMLG.Repo.Migrations.CreateBlogs do
  use Ecto.Migration

  def change do
    create table(:blogs) do
      add :slug, :string
      add :title, :string
      add :date, :date
      add :author, :string
      add :content, :text

      timestamps()
    end
  end
end
