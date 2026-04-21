require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-native-biometric"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.license      = "MIT"
  s.authors      = "Local Dev"
  s.homepage     = "https://github.com/local/dev"
  s.platforms    = { :ios => "12.4" }
  s.source       = { :git => "https://github.com/local/repo.git", :tag => "#{s.version}" }
  
  s.frameworks   = "LocalAuthentication"
  s.source_files = "ios/**/*.{h,m,mm,swift}"

  install_modules_dependencies(s)

  
end