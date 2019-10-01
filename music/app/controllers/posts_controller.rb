class PostsController < ApplicationController
    def index
        render json: Post.all
    end

    def show
        render json: Post.all.find(params[:id])
    end
    
    def new
        @post = Post.new
    end
    
    def create
        @post = Post.new
        puts @post
        @post.title = params["post"]["title"]
        @post.body = params["post"]["body"]
        @post.save
        render json: @post
    end

    def update
        @post = Post.all.find(params[:id])
        @post.update(title: params['post']['title'], body: params['post']['body'])
        render json: @post
    end

    def destroy
        post = Post.all.find(params[:id])
        post.destroy
    end
end
