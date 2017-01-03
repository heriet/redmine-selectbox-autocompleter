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
  autocomplete.setAttribute('class', 'selectbox-autocomplete');
  autocomplete.setAttribute('list', datalist_id);
  autocomplete.setAttribute('placeholder', 'Search');
  autocomplete.setAttribute('autocomplete', 'on');

  var span = document.createElement('span');
  span.setAttribute('id', autocomplete_id + "_span");
  span.setAttribute('class', 'selectbox-autocomplete-span');

  span.appendChild(autocomplete);
  parent.appendChild(span);

  autocomplete.addEventListener('input', function (event) {
    var self = this;
    var value = self.value;

    Array.prototype.forEach.call(options, function(option) {
      if(option.textContent.trim() == value.trim()) {
        if(selectbox.selectedIndex != option.index) {
          selectbox.selectedIndex = option.index;
          if (selectbox.onchange) { selectbox.onchange(); }
        }
        return;
      }
    });
  });
}

