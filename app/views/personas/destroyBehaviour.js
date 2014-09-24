var box = $("#<%= @div_id %>");
box.find(".behAttr#<%= @attrib_index %>").remove();
box.find(".behAttr").map(function(i, obj){
  obj.id = i;
});