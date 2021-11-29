defmodule GSMLG.ContentTest do
  use GSMLG.DataCase

  alias GSMLG.Content

  describe "blogs" do
    alias GSMLG.Content.Blog

    import GSMLG.ContentFixtures

    @invalid_attrs %{author: nil, content: nil, date: nil, slug: nil, title: nil}

    test "list_blogs/0 returns all blogs" do
      blog = blog_fixture()
      assert Content.list_blogs() == [blog]
    end

    test "get_blog!/1 returns the blog with given id" do
      blog = blog_fixture()
      assert Content.get_blog!(blog.id) == blog
    end

    test "create_blog/1 with valid data creates a blog" do
      valid_attrs = %{
        author: "some author",
        content: "some content",
        date: ~D[2021-09-26],
        slug: "some slug",
        title: "some title"
      }

      assert {:ok, %Blog{} = blog} = Content.create_blog(valid_attrs)
      assert blog.author == "some author"
      assert blog.content == "some content"
      assert blog.date == ~D[2021-09-26]
      assert blog.slug == "some slug"
      assert blog.title == "some title"
    end

    test "create_blog/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Content.create_blog(@invalid_attrs)
    end

    test "update_blog/2 with valid data updates the blog" do
      blog = blog_fixture()

      update_attrs = %{
        author: "some updated author",
        content: "some updated content",
        date: ~D[2021-09-27],
        slug: "some updated slug",
        title: "some updated title"
      }

      assert {:ok, %Blog{} = blog} = Content.update_blog(blog, update_attrs)
      assert blog.author == "some updated author"
      assert blog.content == "some updated content"
      assert blog.date == ~D[2021-09-27]
      assert blog.slug == "some updated slug"
      assert blog.title == "some updated title"
    end

    test "update_blog/2 with invalid data returns error changeset" do
      blog = blog_fixture()
      assert {:error, %Ecto.Changeset{}} = Content.update_blog(blog, @invalid_attrs)
      assert blog == Content.get_blog!(blog.id)
    end

    test "delete_blog/1 deletes the blog" do
      blog = blog_fixture()
      assert {:ok, %Blog{}} = Content.delete_blog(blog)
      assert_raise Ecto.NoResultsError, fn -> Content.get_blog!(blog.id) end
    end

    test "change_blog/1 returns a blog changeset" do
      blog = blog_fixture()
      assert %Ecto.Changeset{} = Content.change_blog(blog)
    end
  end
end
