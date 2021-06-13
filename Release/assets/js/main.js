function LoadData(){try{md.showNotification("top","right","Please Wait. Fetching data!");const e=new XMLHttpRequest;e.open("GET",base_url+"GetCovidData",!0),e.onload=function(){200===this.status?(obj=JSON.parse(JSON.parse(this.responseText)).districtData,district_data=clean(obj),AssignDataToUi(district_data),LoadTable(district_data)):(console.log("Data not retrieved"),md.showNotification("top","right","Something went wrong. Try again later!"))},e.send()}catch(e){console.log("e"),md.showNotification("top","right","Something went wrong. Try again later!")}}var base_url="https://api.covidelp.info/service.asmx/";function clean(e){for(var t in e)null!==e[t]&&void 0!==e[t]||delete e[t];return e}function AssignDataToUi(e){var t=[];for(var i in e)t.push([i,e[i]]);try{null===e.Udupi||void 0===e.Udupi?($("#udupiconfirmed").html("NA"),$("#udupirecovered").html("NA"),$("#udupideceased").html("NA"),$("#udupiactive").html("NA")):($("#udupiconfirmed").html("Confirmed: "+e.Udupi.confirmed+" cases"),$("#udupirecovered").html("Recovered: "+e.Udupi.recovered+" "),$("#udupideceased").html("Deaths: "+e.Udupi.deceased+" "),$("#udupiactive").html("Active: "+e.Udupi.active+" ")),null===t[8]||void 0===t[8]?($("#mangaluruconfirmed").html("NA"),$("#mangalururecovered").html("NA"),$("#mangalurudeceased").html("NA"),$("#mangaluruactive").html("NA")):($("#mangaluruconfirmed").html("Confirmed: "+t[10][1].confirmed+" cases"),$("#mangalururecovered").html("Recovered: "+t[10][1].recovered+" "),$("#mangalurudeceased").html("Deaths: "+t[10][1].deceased+" "),$("#mangaluruactive").html("Active: "+t[10][1].active+" ")),$("#karnatakaconfirmed").html("Confirmed: 0"),$("#karnatakarecovered").html("Recovered: 0"),$("#karnatakadeceased").html("Deaths: 0"),$("#karnatakaactive").html("Active: 0"),document.getElementById("udupiconfirmed").style.color="blue",document.getElementById("udupirecovered").style.color="green",document.getElementById("udupideceased").style.color="red",document.getElementById("mangaluruconfirmed").style.color="blue",document.getElementById("mangalururecovered").style.color="green",document.getElementById("mangalurudeceased").style.color="red"}catch(e){console.log(e)}}function LoadTable(e){try{$(function(){});var t=Object.entries(e),i=[];$.each(t,function(e,t){console.log(e),i.push({City:t[0],Active:t[1].active,confirmed:t[1].confirmed,deceased:t[1].deceased,recovered:t[1].recovered})});new Tabulator("#grid",{data:i,maxHeight:"100%",layout:"fitColumns",pagination:"local",tooltips:!0,paginationSize:12,paginationSizeSelector:[4,8,12,16],movableColumns:!0,resizableRows:!1,columns:[{title:"City",field:"City",sorter:"string",col:"red",width:310,editor:!1},{title:"Confirmed",field:"confirmed",sorter:"string",width:310,editor:!1},{title:"Active",field:"Active",sorter:"string",width:310,editor:!1},{title:"Deceased",field:"deceased",sorter:"string",width:310,editor:!1},{title:"Recovered",field:"recovered",sorter:"string",width:310,editor:!1}]});$("#karnatakaconfirmed").html("Confirmed: "+i.sum("confirmed")+" cases"),$("#karnatakarecovered").html("Recovered: "+i.sum("recovered")+" "),$("#karnatakadeceased").html("Deaths: "+i.sum("deceased")+" "),$("#karnatakaactive").html("Active: "+i.sum("Active")+" "),document.getElementById("karnatakaconfirmed").style.color="blue",document.getElementById("karnatakarecovered").style.color="green",document.getElementById("karnatakadeceased").style.color="red";var o=[],a=[];const r=RenderData(i,"active"),n=RenderData(i,"confirmed");r.length=10,n.length=10,$.each(r,function(e,t){console.log(e),o.push({label:t.City,y:t.Active})}),$.each(n,function(e,t){console.log(e),a.push({label:t.City,y:t.confirmed})}),console.log(o),RenderGraph(o),RenderConfirmedGraph(a)}catch(e){console.log(e)}}function RenderData(e,t){return"active"===t?e.slice().sort((e,t)=>t.Active-e.Active):e.slice().sort((e,t)=>t.confirmed-e.confirmed)}function RenderConfirmedGraph(e){new CanvasJS.Chart("chartContainer1",{animationEnabled:!0,title:{text:"Top 10 districts with Confirmed cases"},axisX:{interval:1},axisY:{title:"Confirmed Cases in Karnataka",includeZero:!0},data:[{type:"bar",dataPoints:e}]}).render()}function RenderGraph(e){new CanvasJS.Chart("chartContainer",{animationEnabled:!0,title:{text:"Top 10 districts with Active cases"},axisX:{interval:1},axisY:{title:"Active Cases in Karnataka",includeZero:!0},data:[{type:"bar",dataPoints:e}]}).render()}function LoadOxygenData(){try{LoadRequestData("oxygen")}catch(e){console.log(e),md.showNotification("top","right","Something went wrong. Try again later!")}}function LoadRequestData(e){try{var t={type:e};md.showNotification("top","right","Loading!"),$.ajax({url:base_url+"GetRequestsByType",type:"post",dataType:"json",async:!0,crossDomain:!0,contentType:"application/json",success:function(t){"oxygen"==e?LoadOxygenGrid(t.d):"icu"==e?LoadICUGrid(t.d):LoadPlasmaGrid(t.d)},data:JSON.stringify(t),error:function(e,t){md.showNotification("top","right","Something went wrong. Please try again!")}})}catch(e){console.log(e),md.showNotification("top","right","Something went wrong. Try again later!")}}function LoadOxygenGrid(e){try{$(function(){null==e&&(e="");new Tabulator("#oxygenGrid",{data:e,maxHeight:"100%",layout:"fitColumns",pagination:"local",tooltips:!0,paginationSize:10,paginationSizeSelector:[5,10,15,20],movableColumns:!0,resizableRows:!1,columns:[{title:"Name",field:"name",sorter:"string",col:"red",width:150,editor:!1},{title:"Ref Name",field:"refname",sorter:"string",width:150,editor:!1},{title:"Gender",field:"gender",sorter:"string",width:85,editor:!1},{title:"Age",field:"age",sorter:"string",width:60,editor:!1},{title:"Location",field:"location",sorter:"string",width:100,editor:!1},{title:"Date",field:"datetime",sorter:"date",width:80,editor:!1},{title:"Hospital Name",field:"hospital",sorter:"string",width:100,editor:!1},{title:"Blood Group",field:"bloodgroup",sorter:"string",width:100,editor:!1},{title:"Comments",field:"comment",sorter:"string",width:200,editor:!1},{title:"Contact",field:"primaryPhoneNumber",sorter:"number",width:100,editor:!1},{title:"Alternate Contact",field:"secondaryPhoneNumber",sorter:"number",width:100,editor:!1}]})})}catch(e){console.log(e)}}function LoadICUData(){try{LoadRequestData("icu")}catch(e){console.log(e),md.showNotification("top","right","Something went wrong. Try again later!")}}function LoadICUGrid(e){try{$(function(){null==e&&(e="");new Tabulator("#icuGrid",{data:e,maxHeight:"100%",layout:"fitColumns",pagination:"local",tooltips:!0,paginationSize:10,paginationSizeSelector:[5,10,15,20],movableColumns:!0,resizableRows:!1,columns:[{title:"Name",field:"name",sorter:"string",col:"red",width:150,editor:!1},{title:"Ref Name",field:"refname",sorter:"string",width:150,editor:!1},{title:"Gender",field:"gender",sorter:"string",width:85,editor:!1},{title:"Age",field:"age",sorter:"string",width:60,editor:!1},{title:"Location",field:"location",sorter:"string",width:100,editor:!1},{title:"Date",field:"datetime",sorter:"date",width:80,editor:!1},{title:"Hospital Name",field:"hospital",sorter:"string",width:100,editor:!1},{title:"Blood Group",field:"bloodgroup",sorter:"string",width:100,editor:!1},{title:"Comments",field:"comment",sorter:"string",width:200,editor:!1},{title:"Contact",field:"primaryPhoneNumber",sorter:"number",width:100,editor:!1},{title:"Alternate Contact",field:"secondaryPhoneNumber",sorter:"number",width:100,editor:!1}]})})}catch(e){console.log(e)}}function LoadPlasmaData(){try{LoadRequestData("blood")}catch(e){console.log(e),md.showNotification("top","right","Something went wrong. Try again later!")}}function LoadPlasmaGrid(e){try{$(function(){new Tabulator("#plasmaGrid",{data:e,maxHeight:"100%",layout:"fitColumns",pagination:"local",tooltips:!0,paginationSize:10,paginationSizeSelector:[5,10,15,20],movableColumns:!0,resizableRows:!1,columns:[{title:"Name",field:"name",sorter:"string",col:"red",width:150,editor:!1},{title:"Ref Name",field:"refname",sorter:"string",width:150,editor:!1},{title:"Gender",field:"gender",sorter:"string",width:85,editor:!1},{title:"Age",field:"age",sorter:"string",width:60,editor:!1},{title:"Location",field:"location",sorter:"string",width:100,editor:!1},{title:"Date",field:"datetime",sorter:"date",width:80,editor:!1},{title:"Hospital Name",field:"hospital",sorter:"string",width:100,editor:!1},{title:"Blood Group",field:"bloodgroup",sorter:"string",width:100,editor:!1},{title:"Comments",field:"comment",sorter:"string",width:200,editor:!1},{title:"Contact",field:"primaryPhoneNumber",sorter:"number",width:100,editor:!1},{title:"Alternate Contact",field:"secondaryPhoneNumber",sorter:"number",width:100,editor:!1}]})})}catch(e){console.log(e)}}Array.prototype.sum=function(e){for(var t=0,i=0,o=this.length;i<o;i++)t+=this[i][e];return t},Date.prototype.today=function(){return(this.getDate()<10?"0":"")+this.getDate()+"/"+(this.getMonth()+1<10?"0":"")+(this.getMonth()+1)+"/"+this.getFullYear()},Date.prototype.timeNow=function(){return(this.getHours()<10?"0":"")+this.getHours()+":"+(this.getMinutes()<10?"0":"")+this.getMinutes()+":"+(this.getSeconds()<10?"0":"")+this.getSeconds()};try{$("#requestsubmit").submit(function(e){var t=(new Date).today()+" "+(new Date).timeNow(),i={};i.type=$("#requesttype").val(),i.name=$("#patientname").val(),i.refname=$("#referencename").val(),i.gender=$("#gender").val(),i.age=parseInt($("#age").val()),i.location=$("#location").val(),i.datetime=t,i.status=0,i.hospital=$("#hospitalname").val(),i.comment=$("#comments").val(),i.primary_phonenumber=Number($("#contactnumber").val()),i.secondary_phonenumber=Number($("#alternatenumber").val()),i.bloodgroup=$("#bloodtype").val(),e.preventDefault(),$.ajax({url:base_url+"CreateRequest",type:"post",dataType:"json",async:!0,crossDomain:!0,contentType:"application/json",success:function(e){200==e.d.status?(md.showNotification("top","right","Your request is successfully submitted. Kindly update us via email once your request is fulfilled. "),setTimeout(()=>{location.reload()},2e3)):md.showNotification("top","right","Something went wrong. Please try again!")},data:JSON.stringify(i),error:function(e,t){md.showNotification("top","right","Something went wrong. Please try again!")}})})}catch(e){console.log(e)}try{$("#vaccinesubmit").submit(function(e){md.showNotification("top","right","Loading!!");var t=$("#datetimepicker1").val(),i=$("#place").val(),o=0;o="udupi_v"===i?286:"bengaluru_rural_v"===i?276:"bengaluru_urban_v"===i?265:"bbmp_v"===i?294:269,e.preventDefault();try{const i=new XMLHttpRequest;i.open("GET","https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+o+"&date="+t,!0),i.onload=function(){200===this.status?(obj=JSON.parse(this.responseText).centers,LoadVaccineGrid(obj)):(console.log("Data not retrieved"),md.showNotification("top","right","Something went wrong. Try again later!"))},i.send()}catch(e){console.log("e"),md.showNotification("top","right","Something went wrong. Try again later!")}})}catch(e){console.log(e)}function LoadVaccineGrid(e){var t=[];$.each(e,function(e,i){console.log(e),t.push({blockName:i.block_name,feeType:i.fee_type,from:i.from,name:i.name,pincode:i.pincode,to:i.to,available:i.sessions[0].available_capacity,available_capacity_dose1:i.sessions[0].available_capacity_dose1,available_capacity_dose2:i.sessions[0].available_capacity_dose2,ageLimit:i.sessions[0].min_age_limit,vaccine:i.sessions[0].vaccine})}),LoadVaccine(t)}function LoadVaccine(e){new Tabulator("#gridVaccine",{data:e,maxHeight:"100%",layout:"fitColumns",pagination:"local",tooltips:!0,paginationSize:12,paginationSizeSelector:[6,12,18,24],movableColumns:!0,resizableRows:!1,columns:[{title:"Block Name",field:"blockName",sorter:"string",col:"red",width:200,editor:!1},{title:"Name",field:"name",sorter:"string",width:350,editor:!1},{title:"Fee Type",field:"feeType",sorter:"string",width:100,editor:!1},{title:"From",field:"from",sorter:"string",width:100,editor:!1},{title:"To",field:"to",sorter:"string",width:100,editor:!1},{title:"Availablity",field:"available",sorter:"date",width:180,editor:!1},{title:"Availablity Dose1 ",field:"available_capacity_dose1",sorter:"date",width:180,editor:!1},{title:"Availablity Dose2",field:"available_capacity_dose2",sorter:"date",width:180,editor:!1},{title:"Pincode",field:"pincode",sorter:"string",width:150,editor:!1},{title:"Age Limit",field:"ageLimit",sorter:"string",width:200,editor:!1},{title:"Vaccine",field:"vaccine",sorter:"string",width:200,editor:!1}]})}try{$("#reportsubmit").submit(function(e){let t=$("#subject").val(),i=$("#reportcontact").val(),o=$("#errorcomment").val();e.preventDefault(),window.open("mailto:covidhelp232424@gmail.com?subject="+t+" "+i+"&body="+o),md.showNotification("top","right","Please wait..."),setTimeout(()=>{console.log("Waiting to open email"),location.reload()},2e3)})}catch(e){console.log(e),md.showNotification("top","right","Something went wrong. Please try again!")}