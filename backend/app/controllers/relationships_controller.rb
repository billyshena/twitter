class RelationshipsController < Api::BaseController
  before_filter :authenticate, :only => [:create, :destroy]

  def create
    user = User.find(params[:followed_id])
    if @current_user.follow(user)
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  def destroy
    puts "DESTROYING"
    user = User.find(params[:id])
    if @current_user.unfollow(user)
      render json: {success: true}
    else
      render json: {success: false}
    end
  end
end