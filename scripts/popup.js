var AlumniGenerator = {
  showAlumni: function(){
    var rows = Alumni.getAlumniRows();
    if(rows.length > 0){
      AlumniHttp.getCompiledMarkup({ rows: rows }, function(markup){
        $('body').empty().append(markup);
        chrome.browserAction.setBadgeText({ text:''});
      });
    }
  },

  handleError: function(e){
    this.showError(e.statusText);
  },

  showError: function(text){
    $('body').append('Error: ' + text);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  AlumniHttp.requestAlumni()
    .done(Alumni.handleAlumni.bind(Alumni))
    .fail(AlumniGenerator.handleError)
    .always(AlumniGenerator.showAlumni);
});