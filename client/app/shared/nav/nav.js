// jQuery logic for active button behavior 
// need to figure out how to get this working with angular
$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});
