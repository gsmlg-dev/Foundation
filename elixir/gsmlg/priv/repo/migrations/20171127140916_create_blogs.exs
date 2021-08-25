defmodule Gsmlg.Repo.Migrations.CreateBlogs do
  use Ecto.Migration

  def change do
    create table(:blogs) do
      add :title, :string
      add :author, :string
      add :content, :string
      add :resources, :text
      add :created_at, :date

      timestamps()
    end

  end
end
