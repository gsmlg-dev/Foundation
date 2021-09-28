defmodule GSMLGWeb.NodeControllerTest do
  use GSMLGWeb.ConnCase

  import GSMLG.ManagementFixtures

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  describe "index" do
    test "lists all nodes", %{conn: conn} do
      conn = get(conn, Routes.node_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Nodes"
    end
  end

end
