var dataObject = [{"nim":"125060400111044","nama":"Isyana Sarasvati","jurusan":"Teknik Informatika","fakultas":"Filkom","alamat":"Jl. Suka Nyanyi","noHp":"081234567890"},
{"nim":"135060401111005","nama":"Marion Jola","jurusan":"komunikasi","fakultas":"FISIP","alamat":"Kec. Wakanda","noHp":"08765432109"},
{"nim" :"165150201111211","nama": "Nadya Dwi S","jurusan": "Teknik Informatika","fakultas": "Filkom","alamat": "Jl. Bendungan Sutami","noHP": "0822333987654"}];

var Application = {
 initApplication : function(){
  $(window).load('pageinit','#page-one', function(){
   Application.initShowMhs();
  })
  $(document).on('click', '#detail-mhs', function(){
   var nim = $(this).data('nimmhs');
   Application.initShowDetailMhs(nim);
  })
 },

 initShowMhs : function(){
	  for(var i = 0; i < dataObject.length; i++){
		  var appendList = '<li><a href=#page-two?id='+dataObject[i].nim +'" target="_self" id="detail-mhs" data-nimmhs="'+dataObject[i].nim+'"><h2>'+dataObject[i].nama+'</h2><p>'+dataObject[i].nim+'</p><p><b>'+dataObject[i].fakultas+'</b></p></a></li>'
		  $('#list-mhs').append(appendList);
		 }
 },
initShowDetailMhs : function(nim){
	  var appendDetail="";
	  var tbdy = $("#table-detailMhs tbody");
	  var ulang = true;
	  var a = 0;
	  while(ulang){
		  if(dataObject[a].nim == nim && tbdy.children().length == 0){
		   appendDetail = '<tr><td>'+dataObject[a].nim+'</td><td>'+dataObject[a].nama+'</td><td>'+dataObject[a].jurusan+'</td><td>'
		   +dataObject[a].fakultas+'</td><td>'+dataObject[a].alamat+'</td><td>'+dataObject[a].noHp+'</td></tr>';
		   ulang = false;
		  };
			 $('#table-detailMhs').append(appendDetail);
		  a++;
		 }
	 }
};
