class RelationshipsController < Api::BaseController
  before_filter :authenticate, :only => [:create, :destroy]

  def create
    user = User.find(params[:followed_id])
    @current_user.follow(user) ? (render status: 200) : (render status:500)
  end

  def destroy
    user = Relationship.find(params[:id]).followed
    @current_user.unfollow(user) ? (render status: 200) : (render status:500)
  end
end