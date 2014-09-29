var quadrant = $("#<%= @div_id %>");
console.log("<%=@div_id%>");
quadrant.find(".behAttr#<%= @attrib_index %>").remove();
checkIfAnyBeh(quadrant);
quadrant.find(".behAttr").map(function(i, obj){
  obj.id = i;
});