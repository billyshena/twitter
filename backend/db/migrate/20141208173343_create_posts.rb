class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.references :user, index: true
      t.text :content
      t.string :image
      t.timestamps
    end
  end
end
