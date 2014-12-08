class PostsController < Api::BaseController
  before_filter :authenticate, :only => [:index, :create, :destroy, :update]
  respond_to :json

  def index
    @posts = Post.all
    render json: @posts.as_json(include: :user)
  end

  def show
    respond_with(@post)
  end

  def new
    @post = Post.new
    respond_with(@post)
  end

  def edit
  end

  def create
    @post = Post.new(
      content: params[:content],
      user_id: @current_user.id
    )
    if @post.save
      render json: @post.to_json
    else
      flash[:error] = "Une erreur a empêché la création"
      render :new
    end
  end

  def update
    @post.update(post_params)
    respond_with(@post)
  end

  def destroy
    @post.destroy
    respond_with(@post)
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:user_id)
    end
end
