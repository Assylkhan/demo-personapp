class ProjectsController < ApplicationController
  before_action :signed_in_user
  def index
    @projects = current_user.projects.all
    @projects = @projects.includes(:personas)
    @persona = Persona.new
  end

  def create
    @project = current_user.projects.create(project_params)
    respond_to do |format|
      format.js
    end
  end

  def new
    @project = current_user.projects.build
  end

  def destroy
    @project = current_user.projects.find_by(id: params[:id])
    @project = @project.destroy!
    respond_to do |format|
      format.js
    end
  end

  private
    def project_params
      params.require(:project).permit(:name)
    end
end
