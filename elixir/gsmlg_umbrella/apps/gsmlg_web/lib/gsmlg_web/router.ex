defmodule GSMLGWeb.Router do
  use GSMLGWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {GSMLGWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/admin", GSMLGWeb do
    pipe_through :browser

    get "/", PageController, :index

    get "/node_management", NodeManagementController, :index
    post "/node_management", NodeManagementController, :update

    live "/blogs", BlogLive.Index, :index
    live "/blogs/new", BlogLive.Modify, :new
    live "/blogs/:id", BlogLive.Show, :show
    live "/blogs/:id/edit", BlogLive.Modify, :edit

    if Mix.env() in [:prod] do
      import Phoenix.LiveDashboard.Router

      live_dashboard "/dashboard", metrics: GSMLGWeb.Telemetry
    end
  end

  # Other scopes may use custom stacks.
  scope "/api", GSMLGWeb do
    pipe_through :api

    resources "/blogs", BlogController, except: [:new, :edit]
  end

  forward "/graphiql", 
    Absinthe.Plug.GraphiQL, 
    schema: GSMLGWeb.Schema,
    socket: GSMLGWeb.UserSocket

  forward "/graphql", Absinthe.Plug, schema: GSMLGWeb.Schema

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: GSMLGWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  # fallback not_found
  scope "/", GSMLGWeb do
    pipe_through :browser

    get "/*request_path", PageController, :not_found
  end
end
