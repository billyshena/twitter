class FavoritesController < Api::BaseController
  before_filter :authenticate, :only => [:index, :create, :destroy]
  respond_to :json

  def index
    @favorites = Favorite.where(user_id: params[:id])
    render json: @favorites.as_json(include: [:user,:post])
  end

  def show
    respond_with(@favorite)
  end

  def new
    @favorite = Favorite.new
    respond_with(@favorite)
  end

  def edit
  end


  def create
    @favorite = Favorite.new(post_id: params[:post_id], user_id: @current_user.id)
    if @favorite.save
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  def update
    @favorite.update(favorite_params)
    respond_with(@favorite)
  end



  def destroy
    @favorite = Favorite.find_by(user_id: @current_user.id, post_id: params[:id])
    render json: Favorite.destroy(@favorite.id)
  end

  private
    def set_favorite
      @favorite = Favorite.find(params[:id])
    end

    def favorite_params
      params[:favorite]
    end
end
