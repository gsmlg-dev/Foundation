defmodule GSMLGWeb.ChessChannel do
  use Phoenix.Channel
  # alias Guardian.Phoenix.Socket
  alias Phoenix.Socket.Broadcast
  alias GSMLG.Chess.Room

  def join("room:chess", msg, socket) do
    send(self(), {:after_join, msg})
    {:ok, socket}
  end

  def handle_info({:after_join, _msg}, socket) do
    {:ok, %{pieces: pieces, turn: turn, start?: started, done: done}} = Room.get_state()
    push(socket, "init_pieces", %{pieces: pieces, turn: turn, started: started, done: done})
    {:noreply, socket}
  end

  def handle_info(%Broadcast{topic: _, event: event, payload: payload}, socket) do
    push(socket, event, payload)
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    Socket.current_resource(socket)
    :ok
  end

  def handle_in("start", _payload, socket) do
    {:ok, %{pieces: pieces, turn: turn, done: done, start?: started}} = Room.start_room()
    push(socket, "init_pieces",%{pieces: pieces, turn: turn, done: done, start?: started})
    broadcast!(socket, "init_pieces", %{pieces: pieces, turn: turn, done: done, start?: started})
    {:noreply, socket}
  end

  def handle_in("move_chess", payload, socket) do
    {:ok, %{pieces: pieces, turn: turn, done: done, start?: started}} = Room.move_chess(payload)
    broadcast!(socket, "move_chess_remote", Map.put(payload, :pieces, pieces))
    {:noreply, socket}
  end

  def handle_in("new:msg", _msg, socket) do
    {:noreply, socket}
  end
end
