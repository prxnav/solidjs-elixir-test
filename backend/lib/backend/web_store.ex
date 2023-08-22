defmodule Backend.WebStore do
  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    {:ok, state}
  end

  defp store_data(pid, id, data) do
    GenServer.cast(pid, {:store_data, id, data})
  end

  defp get_data(pid, id) do
    GenServer.call(pid, {:get_data, id})
  end

  def handle_cast({:store_data, id, data}, state) do
    updated_state = Map.update!(state, id, data, &Map.put(&1, :data, data))
    {:noreply, updated_state}
  end

  def handle_call({:get_data, id}, _from, state) do
    data = Map.get(state, id, %{})
    {:reply, data[:data], state}
  end

end
