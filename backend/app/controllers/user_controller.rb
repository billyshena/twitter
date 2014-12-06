class UserController < ApplicationController
  respond_to :json

  def create
    @user = User.new(
        email: params[:email],
        account_name: params[:account_name],
        username: params[:username],
        password: params[:password],
        bio: params[:bio],
    )
    if @user.save
      render json: 'User created'
    else
      flash[:error] = "Une erreur a empêché la création"
      render :new
    end end
  def update
  end

  def destroy
  end

  def show
  end

  def index
  end
end
