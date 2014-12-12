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


        
        it "should not create the user if the email passed does not meet the regex" do
            user = User.create(account_name: "Billy Shen", email: "billy.shen@")
            expect(user.id).to eq(nil)

            user_other = User.create(account_name: "Cecile Shen", email: "cecile.shen@gmail.com")
            expect(user_other.id).to be > 0
        end
    end

end
