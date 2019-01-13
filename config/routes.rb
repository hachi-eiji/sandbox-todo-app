Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    post 'login', to: 'login#show'
    post 'activate', to: 'login#activate'
    post 'reset', to: 'login#reset'
    get 'token', to: 'tokens#index'
    resources :tasks

    namespace :me do
      get 'session', to: 'session#index'
      resources :account, only: [:create]
    end

    # fetchはOPTIONSが飛んでくるのでとりあえず200を返す
    match '*anything', to: 'api#handle_options_method', via: :options
  end
end
