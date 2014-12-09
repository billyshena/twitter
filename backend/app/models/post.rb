class Post < ActiveRecord::Base
  belongs_to :user

  validates :content, length: { maximum: 150, too_long: "%{count} characters is the maximum allowed" }
  validates :user_id, :content, presence: true

end
