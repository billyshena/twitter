Rails.application.routes.draw do

  resources :posts

  resources :cors
  match '/', :to => proc {|env| [200, {'Content-Type' => 'text/plain'}, ["Hello world"]] },
        :via => [:get, :post, :put, :delete, :options, :head, :patch]


  get 'user/create'

  get 'user/update'

  get 'user/destroy'

  get 'user/show'

  get 'user/index'

  post '/file/upload', to: "user#upload"

  get '/user/get/:name', to: "user#find_by_name"

  post '/posts/new', to: "posts#create"

  get '/userPosts/:name', to: "posts#user_posts"

  get '/count/posts', to: "posts#count"

  resources :user do
    member do
      get :following, :followers
    end
  end


  controller :user, path: '/user' do
    match 'create', via: [ :post, :options]
  end


  controller :auth, path: '/auth' do
    match 'authenticate', via: [ :post ]
  end


end
