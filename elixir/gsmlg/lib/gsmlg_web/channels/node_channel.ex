defmodule GsmlgWeb.NodeChannel do
  use GsmlgWeb, :channel

  def join("node:lobby", payload, socket) do
    if authorized?(payload) do
      send(self(), {:after_join, payload})
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info({:after_join, _msg}, socket) do
    state = Gsmlg.Node.Self.get_state
    push socket, "node_state", %{name: state.self, isAlive: state.alive?, nodes: Gsmlg.Node.Others.get_nodes, node_list: Node.list}
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (node:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
