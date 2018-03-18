'use strict';

var selectboxAutocompleter = selectboxAutocompleter || {};

selectboxAutocompleter.generateSelectboxAutocompleter = function(id) {
  var selectbox = document.getElementById(id);
  var datalistId =  id + '_name_datalist';
  var autocompleteId = id + '_autocomplete';

  if(!selectbox || document.getElementById(datalistId) || document.getElementById(autocompleteId)) {
    return;
  }

  var options = selectbox.getElementsByTagName("option");

  var nameDatalist = document.createElement('datalist');
  nameDatalist.setAttribute('id', datalistId);

  var current = "";

  Array.prototype.forEach.call(options, function(option) {
    var optionDatalist = document.createElement('option');
    optionDatalist.setAttribute('value', option.textContent);
    nameDatalist.appendChild(optionDatalist);

    if (option.selected) {
      current = option.textContent;
    }
  });

  var parent = selectbox.parentNode;
  parent.appendChild(nameDatalist);

  var autocomplete = document.createElement('input');
  autocomplete.setAttribute('type', 'text');
  autocomplete.setAttribute('id', autocompleteId);
  autocomplete.setAttribute('class', 'selectbox-autocomplete');
  autocomplete.setAttribute('list', datalistId);
  autocomplete.setAttribute('placeholder', 'Search');
  autocomplete.setAttribute('autocomplete', 'on');

  var span = document.createElement('span');
  span.setAttribute('id', autocompleteId + "_span");
  span.setAttribute('class', 'selectbox-autocomplete-span');

  span.appendChild(autocomplete);
  parent.appendChild(span);

  autocomplete.addEventListener('input', function (event) {
    var self = this;
    var value = self.value;

    var isMultiple = selectbox.hasAttribute('multiple');
    Array.prototype.forEach.call(options, function(option) {
      if(option.textContent.trim() == value.trim()) {
        if (isMultiple) {
          var needsOnchange = false
          if (!selectbox[option.index].selected) {
            needsOnchange = true
          }
          // Chrome : Scroll to the item set to selectedIndex
          // Edge   : Scroll to the item last set
          var selectedOptions = new Array();
          Array.prototype.forEach.call(options, function(opt) {
            if (opt.selected) {
              selectedOptions.push(opt.index);
            }
          });
          selectbox.selectedIndex = option.index; // Chrome scrolls here 
          Array.prototype.forEach.call(selectedOptions, function(selected) {
            selectbox[selected].selected = true;
          });
          selectbox[option.index].selected = true; // Edge scrolls here
          if (needsOnchange && selectbox.onchange) { selectbox.onchange(); }
        } else {
          if(selectbox.selectedIndex != option.index) {
            selectbox.selectedIndex = option.index;
            if (selectbox.onchange) { selectbox.onchange(); }
          }
        }
        return;
      }
    });
  });
}

