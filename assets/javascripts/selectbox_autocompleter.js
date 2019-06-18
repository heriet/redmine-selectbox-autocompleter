'use strict';

var selectboxAutocompleter = selectboxAutocompleter || {};

selectboxAutocompleter.generateSelectboxAutocompleter = function(id, type) {
  var selectbox = document.getElementById(id);
  var datalistId =  id + '_name_datalist';
  var autocompleteId = id + '_autocomplete';

  if(!selectbox || document.getElementById(datalistId) || document.getElementById(autocompleteId)) {
    return;
  }

  var options = selectbox.getElementsByTagName("option");
  var parent = selectbox.parentNode;

  if (type == 'datalist')
  {
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
    parent.appendChild(nameDatalist);
  }

  var autocomplete = document.createElement('input');
  autocomplete.setAttribute('type', 'text');
  autocomplete.setAttribute('id', autocompleteId);
  autocomplete.setAttribute('class', 'selectbox-autocomplete');
  autocomplete.setAttribute('placeholder', 'Search');
  if (type == 'datalist')
  {
    autocomplete.setAttribute('list', datalistId);
    autocomplete.setAttribute('autocomplete', 'on');
  }

  var span = document.createElement('span');
  span.setAttribute('id', autocompleteId + "_span");
  span.setAttribute('class', 'selectbox-autocomplete-span');

  span.appendChild(autocomplete);
  parent.appendChild(span);

  var inputEvent = function (value) {
    var isMultiple = selectbox.hasAttribute('multiple');
    Array.prototype.forEach.call(options, function(option) {
      if(option.textContent.trim() == value.trim()) {
        if (isMultiple) {
          var needsOnchange = false;
          if (!selectbox[option.index].selected) {
            needsOnchange = true;
          }
          // Chrome : Scroll to the item set to selectedIndex
          // IE     : Scroll to the item last set
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
          selectbox[option.index].selected = true; // IE scrolls here

          // In order to scroll to the selected element in Edge, it is necessary to set scrollTop.
          // However, offsetTop is 0 in IE. In that case, do not scroll.
          if (option.index == 0 || options[option.index].offsetTop != 0)
          {
            selectbox.scrollTop = options[option.index].offsetTop;
          }
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
  };
  autocomplete.addEventListener('input', function (event) {
    inputEvent(this.value);
  })
  
  if (type == 'jquery')
  {
    var data = [];
    Array.prototype.forEach.call(options, function(option) {
      data.push(option.textContent);
    });
    
    $('#' + autocompleteId).autocomplete({
      source: data,
      minLength: 0,
      delay: 100,
      collapsible: true,
      
      response: function(event, ui) {
        // In IE, the list is displayed immediately after element selection.
        // This processing prevents the list display.
        if (ui.content.length == 1 && autocomplete.value == ui.content[0].value)
        {
            ui.content.pop();
        }
      },
      select: function(event, ui) {
        inputEvent(ui.item.value);
        
        // For multiple select box in Edge.
        // Without this, the background color of selected item may not change.
        selectbox.focus();
        autocomplete.focus();
      }
    });
  }
}
