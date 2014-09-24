class Project < ActiveRecord::Base
  validates :name, presence: true
  has_many :personas, dependent: :destroy
  belongs_to :user
end
