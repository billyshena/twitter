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

  get '/user/get/:name', to: "user#find_by_name"

  get '/userPosts/:name', to: "posts#user_posts"

  get '/count/posts', to: "posts#count"

  post '/user/follow', to: "user#follow"

  post '/user/unfollow', to: "user#unfollow"

  get 'user/following/:id', to: "user#following"

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

  post '/file/upload', to: "user#upload"

  post '/posts/new', to: "posts#create"


end
