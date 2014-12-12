require 'rails_helper'

RSpec.describe PostsController, :type => :controller do

  render_views

  describe "Post" do

    it "should not create a post unless we have an user and a content" do
      post = Post.create
      expect(post.created_at).to eq(nil)
    end


    it "should not create a post if the content length is > 150" do
      post = Post.create(
          user_id: 1,
          content: "le faux texte standard de l'imprimerie depuis les années 1500,
                    quand un peintre anonyme assembla ensemble des morceaux
                    de texte pour réaliser un li")
      expect(post.id).to eq(nil)
    end

  end

end