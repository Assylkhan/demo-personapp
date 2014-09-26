var box = $("#<%= @div_id %>");
box.find(".behAttr#<%= @attrib_index %>").remove();
checkIfAnyBeh(box);
box.find(".behAttr").map(function(i, obj){
  obj.id = i;
});