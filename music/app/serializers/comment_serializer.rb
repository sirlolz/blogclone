class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user, :body
  has_one :post
end
