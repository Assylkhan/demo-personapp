// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require jquery.serializejson.min
//= require_tree .
$(document).on("click", ".btn-danger.next", function(e){
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
$(document).on("click", ".btn-danger.save", function(e){
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
  var _self = $(this);
  var project_id = _self.data('id').replace("project_", "");
  $(".btn-danger.save").attr("id", project_id);
});
$(document).on("click", "li>.panel-heading", function() { 
  $(this).parent().addClass("panel-primary");
  $(this).parent().find(".panel-body").slideDown(300).removeClass("hide");
});
$(document).on("click", "li.panel.panel-primary>.panel-heading", function() {
  $(this).parent().find(".panel-body").slideUp(300);
  $(this).parent().removeClass("panel-primary");
});
$(document).on("click", ".pImages>li", function() {
  var hash = {};
  hash["id"] = $(this).parent().attr("id").replace("persona_", "");
  hash["persona"] = {};

  if ($(".pImages>li:visible").length == 1)
    hash["persona"]["image"] = '';
  else
    hash["persona"]["image"] = $(this).attr("id") + ".png"; 
  $.ajax({
    type: 'PUT',
    url: '/personas/'+hash["id"],
    data: hash,
    dataType: "script"
  });
});
// onButtonTap = function(btn, event, options) {
//   var me = this,
//       now = Date.now();


//   // Keep the user from multiple clicks
//   if (now < me.lastTapTimestamp + 300) {
//       me.lastTapTimestamp = now;
//       return;
//   }
//   me.lastTapTimestamp = now;


//   me.(btn.id, btn, event, options);
// }
$(document).on("dblclick", ".dashboard-panel-6.inform", function(e) {
  return false;
});
$(document).on("click", ".dashboard-panel-6.inform", function(e) {
  e.stopPropagation();
  var hash = {};
  var self = $(this);
  var openedForm = $(".behForm").closest(".dashboard-panel-6");
  if ($(".dashboard-panel-6").find(".behForm").length > 0 && behAttrContent != "")
    $(".behForm").replaceWith('<li id='+$(".behForm").index()+' class="behAttr">'+behAttrContent+'</li>');
  else
    $(".behForm").remove();
  checkIfAnyBeh(openedForm);
  hash["id"] = $(".pImages").attr("id").replace("persona_", "");
  hash["lastIndex"] = self.find("ul>li.behAttr:last-child").index()+1;
  hash["div_id"] = self.attr("id");
    $.ajax({
    type: 'POST',
    url: '/behaviours',
    data: hash,
    dataType: "script"
  });
});
function checkIfAnyBeh(element){
  if (element.find(".behAttr").length > 0) {
    element.find(".placeholderText").hide();
  }
  else
    element.find(".placeholderText").show();
};
$(document).on("click", ".cancel", function(e) {
  e.stopPropagation();
  var behaviours_div = $(this).closest(".dashboard-panel-6");
  if (behAttrContent == "")
    $(".behForm").remove();
  else
    $(".behForm").replaceWith('<li id='+$(".behForm").attr("id")+' class="behAttr">'+behAttrContent+'</li>')
  // $(this).find(".deleteAttr").addClass("hidden");
  console.log(behAttrContent);
  checkIfAnyBeh(behaviours_div);
});
$(document).on("click", ".behForm", function(e) { 
  e.stopPropagation();
});
function behFormOpened(){
  if ($(".behForm").length > 0){
    if (behAttrContent != "")
      $(".behForm").replaceWith('<li id='+$(".behForm").index()+' class="behAttr">'+behAttrContent+'</li>');
    else
      $(".behForm").remove();
  };
};
$(document).on("click", ".behAttr", function(e) {
  e.stopPropagation();
  $(this).find(".deleteAttr").addClass("hidden");
  var hash = {};
  var box = $(this).closest(".dashboard-panel-6");
  behFormOpened();
  hash["id"] = $(".pImages").attr("id").replace("persona_", "");
  hash["index"] = $(this).attr("id");
  hash["div_id"] = box.attr("id");
  $.ajax({
    type: 'POST',
    url: '/behaviours',
    data: hash,
    dataType: "script"
  });
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
  // if $(this).closest(".dashboard-panel-6").find("form").length > 0
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
  if (e.which == 13) {
    $(".persona_name>form").submit();
  };
});
$(".persona_post>form>#persona_post").keypress(function(e) {
  if (e.which == 13) {
    $(".persona_post>form").submit();
  };
});
$(document).on("mouseenter", ".persona_image", function(e){
  $(this).find(".delete_persona").removeClass("hidden");
}).on("mouseleave", ".persona_image", function(e){
  $(this).find(".delete_persona").addClass("hidden");
});
function send_shared_persona(persona_id){
  if (confirm("This will make this persona publicly viewable to anyone with this link, are you sure you want to proceed?")) {
    var persona = {};
    persona["id"] = persona_id;
    $.ajax({
      type: 'POST',
      url: '/share',
      data: persona,
      dataType: "script"
    });
  };
};