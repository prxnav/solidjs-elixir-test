defmodule BackendWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("broadcast", %{"data" => body}, socket) do
    broadcast!(socket, "update", %{data: body})
    {:noreply, socket}
  end
end
