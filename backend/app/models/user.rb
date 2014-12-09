require 'bcrypt'

class User < ActiveRecord::Base

  validates :account_name, :email, :password, presence: true
  validates :account_name, :email, uniqueness: true
  validates :email, format: {with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i, message: "E-mail not valid"}

  # Create two virtual (in memory only) attributes to hold the password and its confirmation.
  attr_accessor :new_password, :new_password_confirmation
  # We need to validate that the user has typed the same password twice
  # but we only want to do the validation if they've opted to change their password.
  validates_confirmation_of :new_password, :if=>:password_changed?

  before_save :hash_new_password, :if=>:password_changed?
  has_many :posts, dependent: :destroy
  has_many :active_relationships, class_name:  "Relationship",
           foreign_key: "follower_id",
           dependent:   :destroy
  has_many :passive_relationships, class_name:  "Relationship",
           foreign_key: "followed_id",
           dependent:   :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships


  # By default the form_helpers will set new_password to "",
  # we don't want to go saving this as a password
  def password_changed?
    !@new_password.blank?
  end


  # As is the 'standard' with rails apps we'll return the user record if the
  # password is correct and nil if it isn't.
  def authenticate(email, password)
    # Because we use bcrypt we can't do this query in one part, first
    # we need to fetch the potential user
    user = User.find_by(email: email)

    if user
      # Then compare the provided password against the hashed one in the db.
      if BCrypt::Password.new(user.password).is_password? password
        # If they match we return the user
        return user
      end
    end
    # If we get here it means either there's no user with that email, or the wrong
    # password was provided.  But we don't want to let an attacker know which.
    return nil
  end


  # Follows a user.
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  # Unfollows a user.
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  # Returns true if the current user is following the other user.
  def following?(other_user)
    following.include?(other_user)
  end

  private
  # This is where the real work is done, store the BCrypt has in the
  # database
  def hash_new_password
    self.password = BCrypt::Password.create(@new_password)
  end



end
