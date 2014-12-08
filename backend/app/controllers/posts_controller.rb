class PostsController < Api::BaseController
  before_filter :authenticate, :only => [:index, :create, :destroy, :update, :user_posts, :count]
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
      render json: @post.as_json(include: :user)
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

  def user_posts
    @posts = Post.where(user_id: @current_user.id)
    render json: @posts.as_json(include: :user)
  end

  def count
    @number_posts = Post.where(user_id: @current_user.id).count
    puts "zedjzoejezd"
    render json: @number_posts.to_json
  end

  def upload
    puts "uploading"


  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:user_id)
    end
end
