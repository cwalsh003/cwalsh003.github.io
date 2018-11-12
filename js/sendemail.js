
$(document).ready(function(){

    /* This is a prototype */
    var createSnackbar = (function() {
        // Any snackbar that is already shown
        var previous = null;

        /*
         <div class="paper-snackbar">
         <button class="action">Dismiss</button>
         This is a longer message that won't fit on one line. It is, inevitably, quite a boring thing. Hopefully it is still useful.
         </div>
         */

        return function( actionText,  name, action) {
            var message = `Thank you, ${name}, Your message was sent. Look forward to talking with you.`;
            if (previous) {
                previous.dismiss();
            }
            var snackbar = document.createElement('div');
            snackbar.className = 'paper-snackbar';
            snackbar.dismiss = function() {
                this.style.opacity = 0;
            };
            var text = document.createTextNode(message);
            snackbar.appendChild(text);
            if (actionText) {
                if (!action) {
                    action = snackbar.dismiss.bind(snackbar);
                }
                var actionButton = document.createElement('button');
                actionButton.className = 'action';
                actionButton.innerHTML = actionText;
                actionButton.addEventListener('click', action);
                snackbar.appendChild(actionButton);
            }
            setTimeout(function() {
                if (previous === this) {
                    previous.dismiss();
                }
            }.bind(snackbar), 10000);

            snackbar.addEventListener('transitionend', function(event, elapsed) {
                if (event.propertyName === 'opacity' && this.style.opacity == 0) {
                    this.parentElement.removeChild(this);
                    if (previous === this) {
                        previous = null;
                    }
                }
            }.bind(snackbar));



            previous = snackbar;
            let bottom = document.getElementById('contacto')
            bottom.appendChild(snackbar);
            // In order for the animations to trigger, I have to force the original style to be computed, and then change it.
            getComputedStyle(snackbar).bottom;
            snackbar.style.bottom = '0px';
            snackbar.style.opacity = 1;
        };
    })();

    var shortMessage = 'Your message was sent';



    // document.getElementById('singleaction').addEventListener('click', function() {
    //
    // });








    /* This stuff just for ripple effect for buttons. Not part of the Snackbar */


    var find = document.querySelectorAll.bind(document);
    var buttons = find('.paper-button');

    for(i=0; i < buttons.length; i++){
        var button = buttons[i];
        button.addEventListener('click', function(e) {

            var bound = this.getBoundingClientRect();
            var x = e.clientX - bound.left;
            var y = e.clientY - bound.top;

            var ripple = this.querySelector('.ripple');

            if (ripple) {
                TweenLite.set(ripple, {x: x, y: y, scaleX: 0, scaleY: 0, opacity: 1});

                TweenLite.to(ripple, 1.5, {scaleX: 1, scaleY: 1, opacity: 0, ease: Expo.easeOut});
            }
        });
    }


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
                  var URL = 'https://ebhckvgooi.execute-api.us-east-1.amazonaws.com/mail_no_cors'
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
                            createSnackbar( 'Dismiss', data.name);

                        }}); 
                  $("#name").val('');
                  $("#email").val('');
                  $("#message").val('');
                      // createSnackbar( 'Dismiss', data.name);
               }
               else
               {
                return false;
               }
              });
            });




