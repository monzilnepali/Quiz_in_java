$(document).ready(function(){
 //mobile sidebar

$('.sidebar-toggler').click(function(){
  $('.sidebar-container').toggleClass('sidebar-opener');
    $(".color-overlay").toggleClass("reveal");
});

//end if mobile-sidebar
  
    //for dynamically generating academic field box
     	$(document).on('click','.fa-plus-circle',function(){
     		console.log("dynamic element");     	
     	var listLen= $(".academic-qualification>li").length;
     	console.log(listLen);
     	listElement=$('<li for='+(listLen)+'></li>').html('<input type="text" placeholder="Degree" style="width:15%"><input type="text" placeholder="Board/University" style="width: 45%;margin-left:9px;" ><input type="text" placeholder="Year" style="width: 15%;margin-left:9px;"><input type="text" placeholder="Percent" style="width:15%;margin-left:9px;"><i class="fa fa-minus-circle delete" aria-hidden="true"></i>');
     	$('.academic-qualification').append(listElement);

     });
     //for dynamically deleting  element
     $(document).on('click','.delete',function(){
     	console.log('delete clicked');
     	$(this).parent().remove();
      //console.log(itemArray)
     });
     $("form>.tab>p").click(function(){
      console.log("toggle clickeed");
     	$(this).parent().next().slideToggle();
     });

   $("#pdf-generator-btn").click(function(){
    //pdfmaker function is called and pdf preview will show in sidetab
    console.log("pdf-generator btn is clicked");
    //pdfmaking code is below



//getting data from input field
var formdata=$('form>.list');
//formdata[0]=personal info,formdata[1]=career objectives,formdata[2]=qualification
var inputClass=formdata[0].className.slice(5);
//console.log(inputClass);
var persoanlInput=$('.'+inputClass+'>input');
var name=persoanlInput[0].value+' '+persoanlInput[1].value;
var address=persoanlInput[2].value;
var contactInfo=persoanlInput[3].value;
var emailId=persoanlInput[4].value;
//career TextArea
inputClass=formdata[1].className.slice(5);
//console.log(inputClass);
var careerBox=$('.'+inputClass+'>textarea');
var careerInput=careerBox[0].value;
//academic qualification
inputClass=formdata[2].className.slice(5);
console.log(inputClass);
var listItem=$('.'+inputClass+'>li');
var i,j,lengthOfList=listItem.length;
var itemArray=[];
for( i=0;i<lengthOfList;i++){
var item=$(listItem[i]).children()
for(j=0;j<4;j++){
  itemArray.push(item[j].value);
  }
}


var doct = {
  margin:[25,30,25,25],
  content: [
    { text: name, style: 'header'},
    {
      style:'boldTxt',
      margin:[0,0,0,3],
      text:[
         {text:'Address: '},
         address+'\n',
         {text:'Contact No.: '},
         contactInfo+'\n',
         {text:'Email Address: '},
         emailId
        ]
    },
    //career objective
    {text:'Career Objective',style:'header',margin:[0,30,0,10]},
    careerInput,  
  //end of career objective
    
//academic 
{text:'academic Qualification',style:'header',margin:[0,15,0,10]},
{//table part
  table:{

        headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],
       body:[
          ['Degree','Board/University','percent','Year'],
          
       ]
  }
}//end of table
    
  ],
  styles: {
    header: {
      fontSize: 18,
      margin:[0,0,0,5]
      
    },
    boldTxt:{
      fontSize:12
    }
  }
  
}
   

   pdfPreview(doct);
   
   });//end of pdf-generator btn	
    
	});//end of document on ready

function pdfPreview(docName){
  pdfMake.createPdf(docName).getDataUrl(function(dataURl){
    //console.log(dataURl);
    $("#pdf_preview").attr("src",dataURl);
  });
}