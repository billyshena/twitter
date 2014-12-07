Rails.application.routes.draw do

  resources :cors
  match '/', :to => proc {|env| [200, {'Content-Type' => 'text/plain'}, ["Hello world"]] },
        :via => [:get, :post, :put, :delete, :options, :head, :patch]


  get 'user/create'

  get 'user/update'

  get 'user/destroy'

  get 'user/show'

  get 'user/index'

  resources :user


  controller :user, path: '/user' do
    match 'create', via: [ :post, :options]
  end


  controller :auth, path: '/auth' do
    match 'authenticate', via: [ :post ]
  end


end
