class PersonasController < ApplicationController
  before_action :signed_in_user
  def create
    @persona = current_user.projects.find_by(id: params[:project_id]).personas.create(persona_fields)
    puts params
    respond_to do |format|
      format.js
    end
  end

  def show
    @persona = Persona.find_by(id: params[:id])
    respond_to do |format|
      format.html
      format.pdf do
        pdf = PersonaPdf.new(@persona)
        send_data pdf.render, filename: "persona_#{@persona.id}.pdf",
                              type: "application/pdf",
                              disposition: "inline"
      end
    end
  end

  def update
    # params[:persona][:image] = "" if params[:persona][:image].blank?
    @persona = Persona.find_by(id: params[:id])
    @persona.update_attributes(persona_fields)
    respond_to do |format|
      format.js
    end
  end

  def updateBehaviours
    @persona = Persona.find_by(id: params[:id])
    @div_id = params[:div_id]
    @index = params[:index]
    if params[:update] == "true"
      @persona[@div_id][@index.to_i] = params[:attrib] unless params[:attrib].blank?
      @update = true
    else
      @persona[@div_id] << params[:attrib] unless params[:attrib].blank?
      @update = false
    end
    case @div_id
    when "behaviours"
      @persona.behaviours_will_change!
    when "facts_demographics"
      @persona.facts_demographics_will_change!
    when "needs_goals"
      @persona.needs_goals_will_change!
    end
    @persona.save
    puts @persona[@div_id][@index.to_i]
    respond_to do |format|
      format.js
    end
  end

  def destroy
    @persona = Persona.find_by(id: params[:id]).destroy
    respond_to do |format|
      format.js
    end
  end

  def destroyBehaviour
    @persona = Persona.find_by(id: params[:id])
    @div_id = params[:div_id]
    @attrib_index = params[:attrib_index]
    @persona[@div_id].delete_at(params[:attrib_index].to_i)
    case @div_id
    when "behaviours"
      @persona.behaviours_will_change!
    when "facts_demographics"
      @persona.facts_demographics_will_change!
    when "needs_goals"
      @persona.needs_goals_will_change!
    end
    @persona.save
    respond_to do |format|
      format.js
    end
  end

  def new
    @persona = Persona.new
    respond_to do |format|
      format.html
      format.js
    end
  end

  def inputBehaviours
    @persona = Persona.find_by(id: params[:id])
    if params[:index]
      @index = params[:index]
      @update = true
    else
      @index = ''
      @update = false
    end
    @div_id = params[:div_id]
    @lastIndex = params[:lastIndex]
    respond_to do |format|
      format.js
    end
  end

  def input_name
    @attrib = params[:persona_post] ? "persona_post" : "persona_name"
    @persona = Persona.find_by(id: params[:id])
    # @persona = Persona.find_by(id: params[:id])

    respond_to do |format|
      format.js
    end
  end

  def update_name
    @persona = Persona.find_by(id: params[:id])
    if params[:name]
      @persona.name = params[:name]
    else
      @persona.post = params[:post]
    end
    @persona.save
    @class = params[:name] ? "name" : "post"
    respond_to do |format|
      format.js
    end
  end

  def download_pdf
    output = CustomersReport.new.to_pdf
    send_data output, :type => 'application/pdf', :filename => "customers.pdf"
  end

  private
    def persona_fields
      params.require(:persona).permit(:name, :image, :post)
    end
end
