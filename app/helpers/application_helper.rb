module ApplicationHelper
  include TweetButton
  def image_url(image)
    if image.nil? || image.blank?
      "../assets/blank.png"
    else
      "../assets/"+image
    end
  end

  def render_partial(partial_path, locals = {})
    render partial: partial_path, locals: locals, layout: false
  end

end
