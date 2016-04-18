     var editor,
         output;
     var TIMEOUT=1000;
     function buttonUp(){
        $('#editor').css("bottom","70%");
        $('#header').css("bottom","65%");
        $('#header').css("top","31%");
        $('#console').css("bottom","0%");
        $('#console').css("top","35%");    
        output.resize();
        editor.resize();
        setTimeout(coloring,TIMEOUT/10);
     }
     
     function buttonDown(){
        $('#editor').css("bottom","15%");
        $('#header').css("bottom","16%");
        $('#header').css("top","85%");
        $('#console').css("bottom","0%");
        $('#console').css("top","88%");       
        output.resize();
        editor.resize();
        setTimeout(coloring,TIMEOUT/10);
     }
     
     
     function coloring(){
         $("#console").find("div.ace_layer.ace_text-layer")
                             .find('div')
                             .find('.ace_constant.ace_numeric')
                             .css('color',function(){
                                    var value=parseInt($(this).text());
                                    if(value>=10000){
                                         var target=colorValue(value);
                                         $(this).text(value+"-- [ "+target[0]+" ] ");
                                         return target[1];
                                    }
                              });
         
         
     }
     
     function scrollBarEvent(){
         $("#console > .ace_scrollbar.ace_scrollbar-v").scroll(function(){
            coloring();
         });
     }
     
    $("#output_up").click(function(){
        $('#output_up').hide();
        $('#output_down').show();
        buttonUp();
        
    })
    
    $("#output_down").click(function(){
        $('#output_down').hide();
        $('#output_up').show();
        buttonDown();
    })

     output = ace.edit("console");
     output.setTheme("ace/theme/vibrant_ink");
     output.session.setMode("ace/mode/python");
     output.setReadOnly(true);
     output.setFontSize('14px');
    
     editor = ace.edit("editor");
     editor.setTheme("ace/theme/vibrant_ink");
     editor.session.setMode("ace/mode/distalgo");
     editor.setFontSize('14px');
     editor.resize();
     buttonDown();

    $("#running").click(function(){
        $('#output_up').hide();
        $('#output_down').show();
        buttonUp();
        output.alignCursors();
        var code=editor.getValue();
        output.setValue('Pending...',0);
        
        $.ajax({
            url : "http://localhost:3000/write",
            type:"POST",
            data:JSON.stringify({'code':code}),
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success : function (data) {                                      
                output.setValue(data['out'],0);
                initialColors();
                setTimeout(coloring,TIMEOUT);
                setTimeout(scrollBarEvent,TIMEOUT);
                
            }
        });
    
    })
    $("#killing").click(function(){
        $.ajax({
            url : "http://localhost:3000/killprocess",
            type:"GET",
            success : function (data) {         
                alert(data);
                
            }
        });
    
    })
    $(document).ready(function() {
        $.ajax({
            url : "orig.da",
            dataType: "text",
            success : function (data) {  
                $('#output_down').hide();
                editor.setValue(data,0);
            }
        });
    });