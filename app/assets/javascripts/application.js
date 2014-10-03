//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require jquery.serializejson.min
//= require_tree .

function checkIfAnyBeh(el){
  if (el.find(".behAttr").length > 0)
    el.find(".placeholderText").addClass("hide");
  else
    el.find(".placeholderText").removeClass("hide");
};
function behFormOpened(){
  if ($(".behForm").length > 0){
    if (behAttrContent != "")
      $(".behForm").replaceWith('<li id='+$(".behForm").index()+' class="behAttr">'+behAttrContent+'</li>');
    else
      $(".behForm").remove();
  };
};
function images() {
  for (var i = 1; i<11; i++){
    $('.pImages').append("<li id='face_" + i + "'><a href='javascript:void(0)'><img alt='face_" + i + "' src='/assets/face_" + i + ".png' /></a></li>");
  }
};
$(document).on("click", ".next", function(e){
  if ($("#project_name").val() == "")
    alert('please provide a project name');
  else
    var valueToSubmit = $("#new_project").serialize();
    $.ajax({
      type: 'POST',
      url: $("#new_project").attr('action'),
      data: valueToSubmit,
      dataType: "script"
    });
    return false;
});
$(document).on("click", ".save", function(e){
  if ($("#persona_name").val() == "") {
    alert('please provide a persona name');
    return false;
  } else {
    var hash = {};
    hash["project_id"] = $(this).attr("id");
    hash["persona"] = $("#new_persona").serializeJSON().persona;    
    $.ajax({
      type: 'POST',
      url: $("#new_persona").attr('action'),
      data: hash,
      dataType: "script"
    });
    return false;
  }
});

$(document).on("click", ".addPersona", function(e){
  e.preventDefault();
  var project_id = $(this).data('id').replace("project_", "");
  $(".btn-danger.save").attr("id", project_id);
});
$(document).on("click", ".panel-heading", function() { 
  $(this).parent().addClass("panel-primary")
  .find(".panel-body").slideDown(300).removeClass("hide");
});
$(document).on("click", ".panel-primary>.panel-heading", function() {
  $(this).parent().removeClass("panel-primary")
  .find(".panel-body").slideUp(300);
});
$(document).on("click", ".pImages>li", function() {
  var hash = {};
  var self = $(this);
  hash["id"] = self.parent().attr("id").replace("persona_", "");
  hash["persona"] = {};

  if ($(".pImages>li:visible").length == 1)
    hash["persona"]["image"] = '';
  else
    hash["persona"]["image"] = self.attr("id") + ".png"; 
  $.ajax({
    type: 'PUT',
    url: '/personas/'+hash["id"],
    data: hash,
    dataType: "script"
  });
});
$(document).on("click", "li.behForm", function(e) { 
  e.stopPropagation();
});
$(document).on("mouseenter", "li.behAttr", function(e) {
  $(this).find(".deleteAttr").removeClass("hidden");
}).on("mouseleave", "li.behAttr", function(e) {
  $(this).find(".deleteAttr").addClass("hidden");
});
$(document).on("click", ".deleteAttr", function(e){
  e.stopPropagation();
  behFormOpened();
  if (confirm("Are you sure you want to delete this item")) {
    var hash = {};
    hash["id"] = $(".pImages").attr("id").replace("persona_", "");
    hash["attrib_index"] = $(this).parent().attr("id");
    hash["div_id"] = $(this).closest(".dashboard-panel-6").attr("id");
    $.ajax({
      type: 'DELETE',
      url: '/behaviours/'+hash["id"],
      data: hash,
      dataType: "script"
    });
  }
});
$(document).on("click", ".delete_persona", function(e){
  e.stopPropagation();
  if (confirm("Are you sure you want to delete this persona")) {
    var hash = {};
    hash["id"] = $(this).attr("id");
    $.ajax({
      type: 'DELETE',
      url: '/personas/'+hash["id"],
      dataType: "script"
    });
  };
});
$(document).on("click", ".persona_name strong", function(e){ 
  e.stopPropagation();
  var hash = {};
  hash["id"] = $(".pImages").attr("id").replace("persona_", "");
  hash["persona_name"] = $(".persona_name>strong").html();
  $.ajax({
    type: 'POST',
    url: '/input_name',
    data: hash,
    dataType: "script"
  });
});
$(document).on("click", ".persona_post strong", function(e){ 
  e.stopPropagation();
  var hash = {};
  hash["id"] = $(".pImages").attr("id").replace("persona_", "");
  hash["persona_post"] = $(".persona_post>strong").html();
  $.ajax({
    type: 'POST',
    url: '/input_name',
    data: hash,
    dataType: "script"
  });
});
$(".persona_name>form>#persona_name").keypress(function(e) {
  if (e.which == 13)
    $(".persona_name>form").submit();
});
$(".persona_post>form>#persona_post").keypress(function(e) {
  if (e.which == 13)
    $(".persona_post>form").submit();
});
$(document).on("mouseenter", ".persona_image", function(e){
  $(this).find(".delete_persona").removeClass("hidden");
}).on("mouseleave", ".persona_image", function(e){
  $(this).find(".delete_persona").addClass("hidden");
});