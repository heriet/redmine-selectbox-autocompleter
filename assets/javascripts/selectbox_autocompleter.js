'use strict';

var selectbox_autocompleter = selectbox_autocompleter || {};

selectbox_autocompleter.generateSelectboxAutocompleter = function(id) {
  var selectbox = document.getElementById(id);
  var datalist_id =  id + '_name_datalist';
  var autocomplete_id = id + '_autocomplete';

  if(!selectbox || document.getElementById(datalist_id) || document.getElementById(autocomplete_id)) {
    return;
  }

  var options = selectbox.getElementsByTagName("option");

  var name_datalist = document.createElement('datalist');
  name_datalist.setAttribute('id', datalist_id);

  var current = "";

  Array.prototype.forEach.call(options, function(option) {
    var option_datalist = document.createElement('option');
    option_datalist.setAttribute('value', option.textContent);
    name_datalist.appendChild(option_datalist);

    if (option.selected) {
      current = option.textContent;
    }
  });

  var parent = selectbox.parentNode;
  parent.appendChild(name_datalist);

  var autocomplete = document.createElement('input');
  autocomplete.setAttribute('type', 'text');
  autocomplete.setAttribute('id', autocomplete_id);
  autocomplete.setAttribute('list', datalist_id);
  autocomplete.setAttribute('placeholder', 'Search');
  autocomplete.setAttribute('autocomplete', 'on');

  var seach_icon = document.createElement('span');
  seach_icon.innerHTML = "&nbsp;&#128269;";

  parent.appendChild(seach_icon);
  parent.appendChild(autocomplete);

  autocomplete.addEventListener('input', function (event) {
    var self = this;
    var value = self.value;

    Array.prototype.forEach.call(options, function(option) {
      if(option.textContent.trim() == value.trim()) {
        selectbox.selectedIndex = option.index;
        return;
      }
    });
  });
}

