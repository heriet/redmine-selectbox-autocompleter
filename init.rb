require 'redmine'

Redmine::Plugin.register :selectbox_autocompleter do
  name 'Selectbox Autocompleter plugin'
  author 'heriet'
  description 'This plugin generate Autocomplete box for Select box'
  version '1.0.0'
  url 'https://github.com/heriet/redmine_selectbox_autocompleter'
  author_url 'http://heriet.info'
end

require_dependency 'selectbox_autocompleter/hooks'
