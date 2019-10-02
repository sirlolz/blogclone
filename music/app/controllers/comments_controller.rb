class CommentsController < ApplicationController
    def index
        render json: Comment.all
    end

    def new
        @comment = Comment.new
    end

    def create
        @comment = Comment.new        
        @comment.post_id = params["comment"]["post_id"]
        @comment.body = params["comment"]["body"]
        @comment.save
        render json: @comment
    end

    def destroy
        Comment.find(params[:comment][:id]).destroy
        puts '###################################################'
    end
end
