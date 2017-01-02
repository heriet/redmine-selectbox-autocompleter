module SelectboxAutocompleter
  class Hooks < Redmine::Hook::ViewListener

    render_on :view_layouts_base_html_head,
      :partial => "selectbox_autocompleter/headers"

    render_on :view_layouts_base_body_bottom,
      :partial => "selectbox_autocompleter/footer"

  end
end
