WickedPdf.config = {
  #:wkhtmltopdf => '/usr/local/bin/wkhtmltopdf',
  #:layout => "pdf.html",
  :exe_path => Rails.root.join('bin', 'wkhtmltopdf').to_s 
  # '/usr/local/bin/wkhtmltopdf'
}
# config.root_url = "http://localhost:3000" unless Rails.env.staging? || Rails.env.production?