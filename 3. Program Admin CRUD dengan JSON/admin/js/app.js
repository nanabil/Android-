var apiuri = 'https://api.myjson.com/bins/xz6o6';
var apiuser = 'https://api.myjson.com/bins/dnpf8';

var Application = {
    initApplication : function() {
        $(window).load('pageinit', '#page-one', function(){
            Application.initShowWisata();
        })
       $(document).on('click', '#detail-wst', function(){
            var nama = $(this).data('namawst');
            Application.initShowDetailWst(nama);
        })
        $(document).on('click', '#btn-delete', function(){
            var nama = $(this).data('namawst');
            Application.deleteWst(nama);
        });
        $(document).on('click', '#btn-edit', function(){
            var nama = $(this).data('namawst');
            Application.editWst(nama);
        });
        
        $(document).on('click', '#btnedt', function(){
            var nama = $(this).data('namawst');
            Application.p_editWst(nama);
        });
        
        $(document).on('click', '#btntmb', function(){
            Application.createWst();
        });
        
        $(document).on('click', '#btnlogin', function(){
             Application.loginAdmin();
        });
        
        $(document).on('click', '#btnulogin', function(){
//            alert("tes")
             Application.loginUser();
        });
        
        $(document).on('click', '#btnsgup', function(){
            Application.createUser();
        });
        
    },
    
    
    
    initShowWisata : function(){
       $.ajax({
        url : apiuri,
         type :'get',
         beforeSend : function (){
            $.mobile.loading('show',{ 
               text : 'Please wait while retrieving data...',
               textVisible:true
            });
         },
           
        button : function(){
             
        },
         success : function (dataObject) {   
         for(var i=0;i<dataObject.length;i++){     
        var appendList = '<li><a href="#page-two?id='
        +dataObject[i].nama+'"target="_self" id="detail-wst" data-namawst="'
        +dataObject[i].nama+'"><img src="gambar.png" style="height:75px ;margin: 15px; border-radius: 8px;"><h2>'
        +dataObject[i].nama+'</h2><p>'
        +dataObject[i].lokasi+'</p><p><b>'
        +dataObject[i].harga+'</b></p><p>'
        +dataObject[i].jambuka+'</p><p>'
        +dataObject[i].ket+'</p></a></li>'
        $('#list-wst').append(appendList); 
        $('#list-wst').listview('refresh'); 
            }   
            },
         complete : function () {
            $.mobile.loading('hide');
         }
       });   
      
        },
    
    initShowDetailWst : function (nama){
 
        $.ajax({
            url : apiuri,
            type: 'get',
            beforeSend : function () {
                $.mobile.loading ('show',{
                 text:'Please wait while retrieving data...',
                 textVisible:true
                });
            },
            success : function (dataObject) {
              for(var i=0;i<dataObject.length;i++){ 
                if(dataObject[i].nama == nama){
                     $('#p-foto,#p-nama,#p-harga,#p-lokasi,#p-jambuka,#p-ket,#btns').empty();
                     $('#p-foto').append('<center><img src="gambar.png" style="height:150px;width: 175px; border-radius: 8px; display: block; margin-left: auto;margin-right: auto; margin-bottom: 15px"></center>');
                        $('#p-nama').append('<b>Nama: </b>'+dataObject[i].nama);
                        $('#p-harga').append('<b>Harga: </b>'+dataObject[i].harga);
                        $('#p-lokasi').append('<b>Lokasi: </b>'+dataObject[i].lokasi);
                        $('#p-jambuka').append('<b>Jam Buka: </b>'+dataObject[i].jambuka);
                        $('#p-ket').append('<b>Keterangan: </b>'+dataObject[i].ket);
                    };  
                }  
                $('#btns').append('<button id="btn-delete" data-namawst="'+ nama +'">Delete</button>');
                $('#btns').append(' <a href="#page-four" ><button id="btn-edit" data-namawst="'+ nama +'">Edit</button> </a>');
            },

            complete:function (){
                $.mobile.loading('hide');
            }
        });    
    },
    
    deleteWst: function(nama) {
        
        $.ajax({
            url : apiuri,
            type: 'get',
            beforeSend : function () {
                $.mobile.loading ('show',{
                 text:'Please wait while retrieving data...',
                 textVisible:true
                });
            },
            success : function (dataObject) {
              for(var i=0;i<dataObject.length;i++){ 
                if(dataObject[i].nama == nama){
                    dataObject.splice(i, 1);
                };  
              }
                
              $.ajax({
                url : apiuri,
                type: 'put',
                data: JSON.stringify(dataObject),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success : function (dataObject) {
                  alert("Data terhapus");
                  document.location = "index.html"
                },

                complete:function (){
                    $.mobile.loading('hide');
                }
              }); 
            },

            complete:function (){
                $.mobile.loading('hide');
            }
        }); 
    },
    
    editWst: function(nama) {
         $.ajax({
            url : apiuri,
            type: 'get',
            beforeSend : function () {
                $.mobile.loading ('show',{
                 text:'Please wait while retrieving data...',
                 textVisible:true
                });
            },
            success : function (dataObject) {
              for(var i=0;i<dataObject.length;i++){ 
                if(dataObject[i].nama == nama){
                    $('#edit_nama').val(dataObject[i].nama);
                    $('#edit_harga').val(dataObject[i].harga);
                    $('#edit_lokasi').val(dataObject[i].lokasi);
                    $('#edit_jambuka').val(dataObject[i].jambuka);
                    $('#edit_ket').val(dataObject[i].ket);
                    $('#div_btnedit').append('<button id = "btnedt" data-namawst="'+ nama +'">(+) Edit Wisata</button>');
                }  
              }
                
            }})
    },
                
    createWst: function() {
        
         $.ajax({
            url : apiuri,
            type: 'get',
            beforeSend : function () {
                $.mobile.loading ('show',{
                 text:'Please wait while retrieving data...',
                 textVisible:true
                });
            },
            success : function (dataObject) {
                var wst = {};
                wst.nama = $('#new_nama').val();
                wst.harga = $('#new_harga').val();
                wst.lokasi = $('#new_lokasi').val();
                wst.jambuka = $('#new_jambuka').val();
                wst.ket = $('#new_ket').val();
                
                dataObject.push(wst);
                
              $.ajax({
                url : apiuri,
                type: 'put',
                data: JSON.stringify(dataObject),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success : function (dataObject) {
                  alert("Data Terbuat");
                  document.location = "index.html"
                },

                complete:function (){
                    $.mobile.loading('hide');
                }
              }); 
            },

            complete:function (){
                $.mobile.loading('hide');
            }
        }); 
        
    },
    
    p_editWst: function(nama) {
         $.ajax({
            url : apiuri,
            type: 'get',
            beforeSend : function () {
                $.mobile.loading ('show',{
                 text:'Please wait while retrieving data...',
                 textVisible:true
                });
            },
            success : function (dataObject) {
              for(var i=0;i<dataObject.length;i++){ 
                if(dataObject[i].nama == nama){
                    dataObject[i].nama = $('#edit_nama').val();
                    dataObject[i].harga = $('#edit_harga').val();
                    dataObject[i].lokasi = $('#edit_lokasi').val();
                    dataObject[i].jambuka = $('#edit_jambuka').val();
                    dataObject[i].ket = $('#edit_ket').val();
                }  
              }
            $.ajax({
                url : apiuri,
                type: 'put',
                data: JSON.stringify(dataObject),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success : function (dataObject) {
                  alert("Data Telah Diedit");
                    document.location = "index.html"
                },

                complete:function (){
                    $.mobile.loading('hide');
                }
              });
            }
         
         })
    },
    
    loginAdmin : function() {
         $.ajax({
            url : apiuser,
            type: 'get',
            beforeSend : function () {
                $.mobile.loading ('show',{
                 text:'Please wait while retrieving data...',
                 textVisible:true
                });
            },
            success : function (dataObject) {
              for(var i=0;i<dataObject.length;i++){ 
                 if(dataObject[i].tipe == "admin"){
                     if (dataObject[i].nama == $("#nama_admin").val()){
                         if (dataObject[i].password == $("#pwd_admin").val()){
                             document.location = "index.html"
                         }
                     }
                 }
              }
                
            },
         })
    },
    
    loginUser : function() {
         $.ajax({
            url : apiuser,
            type: 'get',
            beforeSend : function () {
                $.mobile.loading ('show',{
                 text:'Please wait while retrieving data...',
                 textVisible:true
                });
            },
            success : function (dataObject) {
                
              for(var i=0;i<dataObject.length;i++){ 
                 if(dataObject[i].tipe == "user"){
                     if (dataObject[i].nama == $("#unama").val()){
                         if (dataObject[i].password == $("#upass").val()){
                             
                            document.location = "home.html"
                         }
                     }
                 }
              }
                
            },
         })
    },
    
    createUser: function() {
        
         $.ajax({
            url : apiuser,
            type: 'get',
            beforeSend : function () {
                $.mobile.loading ('show',{
                 text:'Please wait while retrieving data...',
                 textVisible:true
                });
            },
            success : function (dataObject) {
                var usr = {};
                usr.nama = $('#new_user').val();
                usr.tipe = $('#new_tipe').val();
                usr.password = $('#new_pass').val();
                
                dataObject.push(usr);
                
              $.ajax({
                url : apiuser,
                type: 'put',
                data: JSON.stringify(dataObject),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success : function (dataObject) {
                  alert("Selamat Datang");
                  document.location = "home.html"
                },

                complete:function (){
                    $.mobile.loading('hide');
                }
              }); 
            },

            complete:function (){
                $.mobile.loading('hide');
            }
        }); 
        
    },
    
}
