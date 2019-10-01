class CommentsController < ApplicationController
    def index
        render json: Comment.all
    end

    def new
        @comment = Comment.new
    end

    def create
        @comment = Comment.new
        puts "##################"
        puts params
        puts "##################"
        @comment.post_id = params["comment"]["id"]
        @comment.body = params["comment"]["body"]
    end
end
