defmodule Gsmlg.Chess.ChessPieces do

  def types() do
    [
      0, # 帅
      1, # 士
      2, # 相
      3, # 马
      4, # 车
      5, # 炮
      6, # 兵
    ]
  end

  def redPieces() do
    [
      %{
        name: "车",
        type: 4,
        position: %{x: 0, y: 0}
      },
      %{
        name: "马",
        type: 3,
        position: %{x: 1, y: 0}
      },
      %{
        name: "相",
        type: 2,
        position: %{x: 2, y: 0}
      },
      %{
        name: "士",
        type: 1,
        position: %{x: 3, y: 0}
      },
      %{
        name: "帅",
        type: 0,
        position: %{x: 4, y: 0}
      },
      %{
        name: "士",
        type: 1,
        position: %{x: 5, y: 0}
      },
      %{
        name: "相",
        type: 2,
        position: %{x: 6, y: 0}
      },
      %{
        name: "马",
        type: 3,
        position: %{x: 7, y: 0}
      },
      %{
        name: "车",
        type: 4,
        position: %{x: 8, y: 0}
      },
      %{
        name: "炮",
        type: 5,
        position: %{x: 1, y: 2}
      },
      %{
        name: "炮",
        type: 5,
        position: %{x: 7, y: 2}
      },
      %{
        name: "兵",
        type: 6,
        position: %{x: 0, y: 3}
      },
      %{
        name: "兵",
        type: 6,
        position: %{x: 2, y: 3}
      },
      %{
        name: "兵",
        type: 6,
        position: %{x: 4, y: 3}
      },
      %{
        name: "兵",
        type: 6,
        position: %{x: 6, y: 3}
      },
      %{
        name: "兵",
        type: 6,
        position: %{x: 8, y: 3}
      },
    ]
  end

  def blackPieces() do
    [
      %{
        name: "車",
        type: 4,
        position: %{x: 0, y: 9}
      },
      %{
        name: "馬",
        type: 3,
        position: %{x: 1, y: 9}
      },
      %{
        name: "象",
        type: 2,
        position: %{x: 2, y: 9}
      },
      %{
        name: "仕",
        type: 1,
        position: %{x: 3, y: 9}
      },
      %{
        name: "将",
        type: 0,
        position: %{x: 4, y: 9}
      },
      %{
        name: "仕",
        type: 1,
        position: %{x: 5, y: 9}
      },
      %{
        name: "象",
        type: 2,
        position: %{x: 6, y: 9}
      },
      %{
        name: "馬",
        type: 3,
        position: %{x: 7, y: 9}
      },
      %{
        name: "車",
        type: 4,
        position: %{x: 8, y: 9}
      },
      %{
        name: "砲",
        type: 5,
        position: %{x: 1, y: 7}
      },
      %{
        name: "砲",
        type: 5,
        position: %{x: 7, y: 7}
      },
      %{
        name: "卒",
        type: 6,
        position: %{x: 0, y: 6}
      },
      %{
        name: "卒",
        type: 6,
        position: %{x: 2, y: 6}
      },
      %{
        name: "卒",
        type: 6,
        position: %{x: 4, y: 6}
      },
      %{
        name: "卒",
        type: 6,
        position: %{x: 6, y: 6}
      },
      %{
        name: "卒",
        type: 6,
        position: %{x: 8, y: 6}
      },
    ]
  end

  def init_pieces() do
    red = redPieces() |> Enum.with_index |> Enum.map(fn({v, k}) -> v |> Map.put(:id, "r#{k}") |> Map.put(:color, "red") |> Map.put(:live, true) end)
    black = blackPieces() |> Enum.with_index |> Enum.map(fn({v, k}) -> v |> Map.put(:id, "b#{k}") |> Map.put(:color, "black") |> Map.put(:live, true) end)
    red ++ black
  end

end
