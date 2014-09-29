WickedPdf.config = {
  #:wkhtmltopdf => '/usr/local/bin/wkhtmltopdf',
  #:layout => "pdf.html",
  :exe_path => '/usr/local/bin/wkhtmltopdf'
}

module WickedPdfHelper
  def wicked_pdf_stylesheet_link_tag(*sources)
  sources.collect { |source|
  "<style type='text/css'>#{Rails.application.assets.find_asset("#{source}.css")}</style>"
  }.join("\n").gsub(/url\(['"](.+)['"]\)(.+)/,%[url("#{wicked_pdf_image_location("\\1")}")\\2]).html_safe
  end
end