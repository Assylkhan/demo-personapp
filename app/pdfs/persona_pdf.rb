class PersonaPdf < Prawn::Document
  require 'prawn/table'
  def initialize(persona)
    super(:margin => [30, 20])
    @persona = persona
    @persona.id
    line_attributes
  end

  def line_attributes
    move_down 20
    line_item_rows(@persona)
  end

  def line_item_rows(persona)
    font "Helvetica", style: :normal
    header = true
    y = 650
    heigh=150
    float do
      pad_bottom(100) do
        text "Projects - #{@persona.project.name} - #{@persona.name}"
        bounding_box([0, y], width: 260, height: heigh) do
          indent(30) do
            move_down 10
            text "#{persona.name} -" " #{persona.post}"
            indent(40) do
              move_down 30
              unless persona.image.nil? or persona.image == ""
                image "app/assets/images/#{persona.image}", scale: 0.4
              end
              move_down 20
            end
          end
          stroke_bounds
        end

        bounding_box([300, y], width: 260, height: heigh, :margin => [20, 10]) do
          indent(30) do
            move_down 20
            text_box "Behaviours", align: :center, overflow: :expand
            persona.behaviours.each_with_index  do |item, index| 
              text " - "+item
              heigh += 20
            end
            move_down 30
          end
          stroke_bounds
        end
        bounding_box([0, 450], width: 260,:margin => [20, 10]) do
          indent(30) do
            move_down 10
            text "Needs & Goals"
            persona.needs_goals.each_with_index {|item, index| text " - "+item }
          end
          stroke_bounds
        end
        bounding_box([300, 450], width: 260, :margin => [20, 10]) do
          indent(30) do
            move_down 10
            text "Facts & Demographics"
            persona.facts_demographics.each_with_index {|item, index| text " - "+item }
          end
          stroke_bounds
        end
    end
  end
    
  end
end