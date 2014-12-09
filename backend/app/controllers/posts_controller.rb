class PostsController < Api::BaseController

  before_filter :authenticate, :only => [:index, :create, :destroy, :update, :user_posts, :count, :new_post]
  respond_to :json

  def index
    @posts = Post.all
    render json: @posts.as_json(include: :user)
  end

  def show
    respond_with(@post)
  end

  def new_post
    @post = Post.new(content: params[:content], user_id: @current_user.id)
    if @post.save
      render json: @post.as_json(include: :user)
    end
  end

  def edit
  end

  def create
    puts "creating post"
    @post = Post.new(
      content: params[:post],
      user_id: @current_user.id
    )
    if @post.save
      uploaded_io = params[:file]
      File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
        file.write(uploaded_io.read)
      end
      @updated_post = Post.update(@post.id, :image => uploaded_io.original_filename)

      render json: @updated_post.as_json(include: :user)

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
    @posts = Post.where(user_id: params[:name])
    render json: @posts.as_json(include: :user)
  end

  def count
    @number_posts = Post.where(user_id: @current_user.id).count
    render json: @number_posts.to_json
  end


  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:user_id)
    end
end
