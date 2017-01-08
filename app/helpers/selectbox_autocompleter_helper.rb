module SelectboxAutocompleterHelper

  def generate_target_list_for_js
    target_list =  Setting.plugin_selectbox_autocompleter[:target_list]
    
    return "[]" if target_list.blank?
    
    joind_target = target_list.split.map{ |line| "'#{j(line.chomp)}'" }.join(', ')
    generate_array = "[#{joind_target}]"
  end

end
