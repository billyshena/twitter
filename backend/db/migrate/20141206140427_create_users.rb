class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :account_name
      t.string :username
      t.string :email
      t.string :password
      t.text :bio
      t.string :avatar, default: 'default_avatar.png'

      t.timestamps
    end
  end
end
