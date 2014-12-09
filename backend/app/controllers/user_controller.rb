
  class UserController < Api::BaseController
    respond_to :json
    before_filter :authenticate, :only => [:index, :update, :delete, :upload, :follow, :unfollow]

    def create
      username = params[:username] ? params[:username] : params[:account_name]

      @user = User.new(
          email: params[:email],
          account_name: params[:account_name],
          username: username,
          new_password: params[:new_password],
          bio: params[:bio],
      )
      if @user.save
        render json: @user.to_json
      else
        flash[:error] = "Une erreur a empêché la création"
        render :new
      end
    end

    def update
    end

    def destroy
    end

    def show
      @user = User.find(params[:id])
      render json: @user
    end

    def find_by_name
      @user = User.where(account_name: params[:name])
      render json: @user
    end

    def index
      @user = User.all.to_json
      render json: @user
    end

    def upload
      uploaded_io = params[:file]
      File.open(Rails.root.join('public', 'avatars', uploaded_io.original_filename), 'wb') do |file|
        file.write(uploaded_io.read)
      end
      @updated_user = User.update(@current_user.id, :avatar => uploaded_io.original_filename)
      puts "UPDATED USER : #{@updated_user.inspect}"

      render json: @updated_user.to_json
    end

    def follow
      @user = User.find(@current_user.id)
      @user.follow(params[:id]) ? render status: 200 : render status: 500
    end

    def unfollow
      @user = User.find(@current_user.id)
      @user.unfollow(params[:id]) ? render status: 200 : render status: 500
    end

    def following
      @user = User.find(@current_user.id)
      @user.following?(params[:id]) ? render status: 200 : render status: 500
    end

  end
