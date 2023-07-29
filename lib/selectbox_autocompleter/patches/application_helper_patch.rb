require_dependency 'application_helper'

module SelectboxAutocompleter::Patches::ApplicationHelperPatch
  def self.prepended(base)
    base.send(:prepend, InstanceMethods)
  end

  module InstanceMethods
    def principals_options_for_select(collection, selected=nil)
      collection = collection.map do |element|
        new_element = element.clone
        new_element.instance_eval do
          def name
            "#{super} - #{login}"
          end
        end
        new_element
      end
      super
    end
  end
end
