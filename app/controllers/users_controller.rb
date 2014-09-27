class UsersController < ApplicationController
  before_action :signed_in_user, only: [:destroy, :show, :update]
  # caches_page :index, :new
  # caches_action :show, :create, :destroy, :update
  def index
    redirect_to projects_path if signed_in?
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to the Sample App"
      redirect_to projects_path(@user)
    else
      render 'new'
    end
  end

  def destroy
    unless params[:id] == current_user.id 
      User.find(params[:id]).destroy
      flash[:success] = "User deleted"
      redirect_to users_url
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def update
    current_user.update_attributes(user_params)
    if current_user.errors.empty?
      flash[:success] = "Your settings have been saved."
      redirect_to current_user
    else
      flash[:errors] = "Sorry but there are some errors in the form."
      render "show"
    end

  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password,
                                   :behaviours_title,:facts_demographics_title,
                                   :needs_goals_title)
    end
end