if Rails.env.production?
  WickedPdf.config = {
    exe_path: "/opt/application/current/gems/wkhtmltopdf-binary-#{Gem.loaded_specs['wkhtmltopdf-binary'].version}/bin/wkhtmltopdf_linux_x64"
  }
else
  WickedPdf.config = {
    #:wkhtmltopdf => '/usr/local/bin/wkhtmltopdf',
    #:layout => "pdf.html",
    :exe_path => '/usr/local/bin/wkhtmltopdf'
  }
end