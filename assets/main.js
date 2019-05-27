var client = ZAFClient.init();
var url;
client.context().then(function(context) {
        url=context.account.subdomain;
});
client.invoke('resize', { width: '100%', height: '200px' });
client.on('ticket.saved', function(info) {
    info.ticket.url=url;
    if(info.ticket.priority=="-")
        info.ticket.priority='LOW';
    if(info.ticket.status=="-")
        info.ticket.status='PENDING';
    if(info.ticket.type=="ticket")
        info.ticket.type='TASK'; 
    info.ticket.priority=info.ticket.priority.toUpperCase();
    info.ticket.status=info.ticket.status.toUpperCase();
    info.ticket.type=info.ticket.type.toUpperCase();   
    console.log('ticket ' + info.ticket.id + ' sent to chatbot!')
/*     xhr=new XMLHttpRequest();
    var url='https://de40b21c.ngrok.io/inject/zendesk';
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
        else
            console.log('error');
    }
    xhr.send(JSON.stringify(info.ticket)); */
/*     $.post('https://cdd6d6ce.ngrok.io/inject/zendesk',JSON.stringify(info.ticket),
    function(data){
        console.log(data);
    },
    "json"); */
      $.ajax({
      url: 'https://d04930db.ngrok.io/inject/zendesk',
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(info.ticket),
      processData: false,
      success: function( data, textStatus, jQxhr ){
          console.log('status '+textStatus);
          console.log( JSON.stringify(data ));
          console.log('succes');
      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log( 'status '+ textStatus);
          console.log('error ' + errorThrown);
      }
  });  
  });


