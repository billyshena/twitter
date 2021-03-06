Rails.application.routes.draw do

  resources :favorites

  resources :posts

  resources :cors
  match '/', :to => proc {|env| [200, {'Content-Type' => 'text/plain'}, ["Hello world"]] },
        :via => [:get, :post, :put, :delete, :options, :head, :patch]


  get 'user/create'

  get 'user/update'

  get 'user/destroy'

  get 'user/show'

  get 'user/index'

  get '/user/get/:name', to: "user#find_by_name"

  post '/posts/new', to: "posts#create"

  post '/posts/new_post', to: "posts#new_post"

  get '/userPosts/:name', to: "posts#user_posts"

  get '/count/posts', to: "posts#count"

  get 'user/is_following/:id', to: "user#following?"

  resources :user do
    member do
      get :following, :followers
    end
  end

  post 'relationships/create', to: "relationships#create"

  delete 'relationships/:id', to: "relationships#destroy"

  controller :user, path: '/user' do
    match 'create', via: [ :post, :options]
  end


  controller :auth, path: '/auth' do
    match 'authenticate', via: [ :post ]
  end

  post '/upload_avatar', to: "user#upload"

  post '/posts/new', to: "posts#create"


  post '/favorites/create', to: "favorites#create"

  get '/getFavorites/:id', to: "favorites#index"

  get '/is_favorite/:id', to: "user#favorite?"

  delete 'favorites/:id', to: "favorites#destroy"


end
