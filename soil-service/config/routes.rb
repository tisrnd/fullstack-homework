Rails.application.routes.draw do
  resources :fields, params: :fields, only: [:index, :create]
  resources :crops, only: [:index]
end
