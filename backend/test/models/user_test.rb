require 'rails_helper'

RSpec.describe PostsController, :type => :controller do

    render_views

    describe "User" do

        it "should follow and unfollow a user" do
            michael = User.new(account_name: "Michael", email: "test-m@test.com", new_password:  "test")
            archer  = User.new(account_name: "Archer", email: "test-a@test.com", new_password: "test")

            michael.save
            archer.save

            expect(michael.following?(archer)).to eq(false)
            michael.follow(archer)
            expect(michael.following?(archer)).to eq(true)
            michael.unfollow(archer)
            expect(michael.following?(archer)).to eq(false)
        end
    end

end
