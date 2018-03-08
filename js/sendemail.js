
$(document).ready(function(){



        function validateForm()
            {
             "use strict";  
                var title = $("#name").val();
                var err=true;
                if (title=="" || title==null) {  
                  $("#name").addClass("validation");
                
                  var err= false;
                } else {  $("#name").removeClass("validation");}
                var email = $("#email").val();
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
                 $("#email").addClass("validation"); 
                 
                   var err= false;
                } else {  $("#email").removeClass("validation"); }
                var title = $("#message").val();
                if (title=="" || title==null) { 
                  $("#message").addClass("validation"); 
                   var err= false;
                } else{ $("#message").removeClass("validation"); }
              return err;
            }


              $("#button").click(function(e){
                  var URL = 'https://ebhckvgooi.execute-api.us-east-1.amazonaws.com/mail'
                  var data = {
                      name: $("#name").val(),
                      email: $("#email").val(),
                      message:  $("#message").val()
                  }
                  console.log(JSON.stringify(data))
                  "use strict";
                  if(validateForm()){
                 e.preventDefault();
                  $.ajax({type: "POST",
                          url: URL,
                            dataType: 'json',
                          data: JSON.stringify(data),
                          success:function(result){
                          $("#successmsg").toggleClass("hidden");

                        }}); 
                  $("#name").val('');
                  $("#email").val('');
                  $("#message").val('');
                $("#successmsg").toggleClass("hidden");
               }
               else
               {
                return false;
               }
              });
            });




