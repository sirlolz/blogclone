class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user, :body, :post_id
  has_one :post
end
