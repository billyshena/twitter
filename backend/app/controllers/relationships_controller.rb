class RelationshipsController < Api::BaseController
  before_filter :authenticate, :only => [:create, :destroy]

  def create
    user = User.find(params[:followed_id])
    @current_user.follow(user)
    render json: user.to_json
  end

  def destroy
    user = Relationship.find(params[:id]).followed
    @current_user.unfollow(user)
    render json: user.to_json
  end
end