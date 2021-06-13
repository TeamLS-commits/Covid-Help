// Pre Load Part
function LoadData() {
    try {
        md.showNotification('top', 'right', 'Please Wait. Fetching data!')

        const xhr = new XMLHttpRequest();
        xhr.open("GET",
            base_url + "GetCovidData", true);

        // When response is ready
        xhr.onload = function () {
            if (this.status === 200) {

                // Changing string data into JSON Object
                obj = JSON.parse(JSON.parse(this.responseText)).districtData
                district_data = clean(obj)

                AssignDataToUi(district_data);
                LoadTable(district_data);
            }
            else {
                console.log("Data not retrieved");
                md.showNotification('top', 'right', 'Something went wrong. Try again later!')
            }
        }
        // At last send the request
        xhr.send();
    }
    catch (e) {
        console.log("e");
        md.showNotification('top', 'right', 'Something went wrong. Try again later!')

    }
}
var base_url = 'https://api.covidelp.info/service.asmx/';

// ------------------------------------------------------

// Dashboard part
function clean(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj
}

function AssignDataToUi(data) {
    var result = [];
    for (var i in data)
        result.push([i, data[i]]);
    try {
        if (data.Udupi === null || data.Udupi === undefined) {
            $("#udupiconfirmed").html("NA")
            $("#udupirecovered").html("NA")
            $("#udupideceased").html("NA")
            $("#udupiactive").html("NA")
        }
        else {
            $("#udupiconfirmed").html("Confirmed: " + data.Udupi.confirmed + " cases")
            $("#udupirecovered").html("Recovered: " + data.Udupi.recovered + " ")
            $("#udupideceased").html("Deaths: " + data.Udupi.deceased + " ")
            $("#udupiactive").html("Active: " + data.Udupi.active + " ")
        }
        if (result[8] === null || result[8] === undefined) {
            $("#mangaluruconfirmed").html("NA")
            $("#mangalururecovered").html("NA")
            $("#mangalurudeceased").html("NA")
            $("#mangaluruactive").html("NA")
        }
        else {
            $("#mangaluruconfirmed").html("Confirmed: " + result[10][1].confirmed + " cases")
            $("#mangalururecovered").html("Recovered: " + result[10][1].recovered + " ")
            $("#mangalurudeceased").html("Deaths: " + result[10][1].deceased + " ")
            $("#mangaluruactive").html("Active: " + result[10][1].active + " ")
        }
        // $("#indiaconfirmed").html("C: " + 0)
        // $("#indiarecovered").html("R: " + 0)
        // $("#indiadeceased").html("D: " + 0)
        // $("#indiaactive").html("A: " + 0)
        $("#karnatakaconfirmed").html("Confirmed: " + 0)
        $("#karnatakarecovered").html("Recovered: " + 0)
        $("#karnatakadeceased").html("Deaths: " + 0)
        $("#karnatakaactive").html("Active: " + 0)

        document.getElementById("udupiconfirmed").style.color = 'blue';
        document.getElementById("udupirecovered").style.color = 'green';
        document.getElementById("udupideceased").style.color = 'red';

        document.getElementById("mangaluruconfirmed").style.color = 'blue';
        document.getElementById("mangalururecovered").style.color = 'green';
        document.getElementById("mangalurudeceased").style.color = 'red';
    }
    catch (e) {
        console.log(e);
    }
}

Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop]
    }
    return total
}

function LoadTable(data) {
    try {
        $(function () {

            // $("#grid").jsGrid({
            //     width: "100%",
            //     height: "400px",
            //     filtering: false,
            //     editing: false,
            //     sorting: true,
            //     paging: true,
            //     data: arr,
            //     fields: [
            //         { name: "City", type: "text", width: 75 },
            //         { name: "confirmed", type: "number", width: 50, title: "Confirmed" },
            //         { name: "Active", type: "number", width: 50, title: "Active" },
            //         { name: "deceased", type: "number", width: 50, title: "Deceased" },
            //         { name: "recovered", type: "number", width: 50, title: "Recovered" },
            //     ]
            // })
        })
        var a = Object.entries(data)
        var arr = []

        $.each(a, function (i, news) {
            console.log(i)
            arr.push({
                City: news[0],
                Active: news[1].active,
                confirmed: news[1].confirmed,
                deceased: news[1].deceased,
                recovered: news[1].recovered
            });
        });

        var table = new Tabulator("#grid", {
            data:arr,
            maxHeight:"100%",
            layout:"fitColumns",
            pagination:"local",
            tooltips:true, 
            paginationSize:12,
            paginationSizeSelector:[4, 8, 12, 16],
            movableColumns:true,
            resizableRows:false,
            columns:[
                {title:"City", field:"City", sorter:"string", col:"red", width:310, editor:false},
                {title:"Confirmed", field:"confirmed", sorter:"string", width:310, editor:false},
                {title:"Active", field:"Active", sorter:"string", width:310, editor:false},
                {title:"Deceased", field:"deceased", sorter:"string", width:310, editor:false},
                {title:"Recovered", field:"recovered", sorter:"string" , width:310, editor:false},

            ],
        });

        $("#karnatakaconfirmed").html("Confirmed: " + arr.sum("confirmed") + " cases")
        $("#karnatakarecovered").html("Recovered: " + arr.sum("recovered")+ " ")
        $("#karnatakadeceased").html("Deaths: " + arr.sum("deceased")+ " ")
        $("#karnatakaactive").html("Active: " + arr.sum("Active")+ " ")

        document.getElementById("karnatakaconfirmed").style.color = 'blue';
        document.getElementById("karnatakarecovered").style.color = 'green';
        document.getElementById("karnatakadeceased").style.color = 'red';
        // document.getElementById("karnatakaactive").style.color = 'blue';

        var graph = [];
        var confirmedGraph = [];
        const sorted = RenderData(arr,"active")
        const confirmedCases = RenderData(arr,"confirmed")
        sorted.length = 10;
        confirmedCases.length = 10;
        $.each(sorted, function (i, info) {
            console.log(i)
            graph.push({
                label: info.City,
                y: info.Active,
            });
        });
        $.each(confirmedCases, function (i, info) {
            console.log(i)
            confirmedGraph.push({
                label: info.City,
                y: info.confirmed,
            });
        });
        console.log(graph)
        RenderGraph(graph);
        RenderConfirmedGraph(confirmedGraph);
    }
    catch (e) {
        console.log(e)
    }
}

function RenderData(array,key){
    if(key === "active"){
        return array.slice().sort((a,b)=>b.Active-a.Active)
    }
    else {
        return array.slice().sort((a,b)=>b.confirmed-a.confirmed)
    }
}
function RenderConfirmedGraph(data){
    var chart = new CanvasJS.Chart("chartContainer1", {
        animationEnabled: true,
        title: {
            text: "Top 10 districts with Confirmed cases"
        },
        axisX: {
            interval: 1
        },
        axisY: {
            title: "Confirmed Cases in Karnataka",
            includeZero: true,
            // scaleBreaks: {
            //     // type: "wavy",
            //     customBreaks: [{
            //         startValue: 80,
            //         endValue: 210
            //         },
            //         {
            //             startValue: 230,
            //             endValue: 600
            //         }
            // ]}
        },
        
        data: [{
            type: "bar",
            // toolTipContent: "<img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/\"{url}\"\" style=\"width:40px; height:20px;\"> <b>{label}</b><br>Budget: ${y}bn<br>{gdp}% of GDP",
            dataPoints: data
        }]
    });
    chart.render();
}
function RenderGraph(data){
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Top 10 districts with Active cases"
        },
        axisX: {
            interval: 1
        },
        axisY: {
            title: "Active Cases in Karnataka",
            includeZero: true,
            // scaleBreaks: {
            //     // type: "wavy",
            //     customBreaks: [{
            //         startValue: 80,
            //         endValue: 210
            //         },
            //         {
            //             startValue: 230,
            //             endValue: 600
            //         }
            // ]}
        },
        
        data: [{
            type: "bar",
            // toolTipContent: "<img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/\"{url}\"\" style=\"width:40px; height:20px;\"> <b>{label}</b><br>Budget: ${y}bn<br>{gdp}% of GDP",
            dataPoints: data
        }]
    });
    chart.render();
}
// ------------------------------------------------------


// Oxygen Request Part
function LoadOxygenData() {
    try {
        // md.showNotification('top', 'right', 'Loading!')
        // const xhr3 = new XMLHttpRequest();
        // xhr3.open("GET",
        //     base_url + "Request/GetRequestsByType/oxygen", true);

        // // When response is ready
        // xhr3.onload = function () {
        //     if (this.status === 200) {

        //         // Changing string data into JSON Object
        //         obj = JSON.parse(this.responseText)
        //         LoadOxygenGrid(obj);
        //     }
        //     else {
        //         console.log("File not found");
        //     }
        // }

        // // At last send the request
        // xhr3.send();
        LoadRequestData("oxygen");
    }
    catch (e) {
        console.log(e);
        md.showNotification('top', 'right', 'Something went wrong. Try again later!')
    }

}
function LoadRequestData(req) {
    try {
        var re = {
            "type": req
        }
        md.showNotification('top', 'right', 'Loading!')
        $.ajax({
            url: base_url + 'GetRequestsByType',
            type: 'post',
            dataType: 'json',
            async: true,
            crossDomain: true,
            contentType: 'application/json',
            success: function (data) {
                // obj = JSON.parse(data)
                if (req == "oxygen") {
                    LoadOxygenGrid(data.d);
                }
                else if (req == "icu") {
                    LoadICUGrid(data.d);
                }
                else {
                    LoadPlasmaGrid(data.d);
                }
            },
            data: JSON.stringify(re),
            error: function (xhr, status) {
                md.showNotification('top', 'right', 'Something went wrong. Please try again!')
            }
        });
    }
    catch (e) {
        console.log(e);
        md.showNotification('top', 'right', 'Something went wrong. Try again later!')
    }

}
function LoadOxygenGrid(data) {
    try {
        $(function () {
            // $("#oxygenGrid").jsGrid({
            //     width: "100%",
            //     height: "500px",
            //     filtering: false,
            //     editing: false,
            //     sorting: true,
            //     paging: true,
            //     data: data,
            //     fields: [
            //         { name: "name", type: "text", width: 50, title: "Pat. Name" },
            //         { name: "refname", type: "text", width: 50, title: "Ref. Name" },
            //         { name: "gender", type: "text", width: 20, title: "Gen" },
            //         { name: "age", type: "number", width: 10, title: "Age" },
            //         { name: "location", type: "text", width: 40, title: "Loc" },
            //         { name: "datetime", type: "text", width: 40, title: "DateTime" },
            //         { name: "hospital", type: "text", width: 40, title: "Hosp" },
            //         { name: "comment", type: "text", width: 60, title: "Comments" },
            //         { name: "primaryPhoneNumber", type: "number", width: 40, title: "Contact" },
            //         { name: "secondaryPhoneNumber", type: "number", width: 40, title: "Alt Contact" },
            //     ]
            // })
            if (data == null){
                data = "";
            }
            var table = new Tabulator("#oxygenGrid", {
                data:data,
                maxHeight:"100%",
                layout:"fitColumns",
                pagination:"local",
                tooltips:true, 
                paginationSize:10,
                paginationSizeSelector:[5, 10, 15, 20],
                movableColumns:true,
                resizableRows:false,
                columns:[
                    {title:"Name", field:"name", sorter:"string", col:"red", width:150, editor:false},
                    {title:"Ref Name", field:"refname", sorter:"string", width:150, editor:false},
                    {title:"Gender", field:"gender", sorter:"string", width:85, editor:false},
                    {title:"Age", field:"age", sorter:"string", width:60, editor:false},
                    {title:"Location", field:"location", sorter:"string" , width:100, editor:false},
                    {title:"Date", field:"datetime", sorter:"date", width:80, editor:false},
                    {title:"Hospital Name", field:"hospital", sorter:"string", width:100, editor:false},
                    {title:"Blood Group", field:"bloodgroup", sorter:"string", width:100, editor:false},
                    {title:"Comments", field:"comment", sorter:"string", width:200, editor:false},
                    {title:"Contact", field:"primaryPhoneNumber", sorter:"number", width:100, editor:false},
                    {title:"Alternate Contact", field:"secondaryPhoneNumber", sorter:"number", width:100, editor:false},
    
                ],
            });
        })
    }
    catch (e) {
        console.log(e)
    }
}
// ------------------------------------------------------

// ICU request part
function LoadICUData() {
    try {
        // md.showNotification('top', 'right', 'Loading!!')
        // const xhr2 = new XMLHttpRequest();
        // xhr2.open("GET",
        //     base_url + "Request/GetRequestsByType/icu", true);

        // // When response is ready
        // xhr2.onload = function () {
        //     if (this.status === 200) {

        //         // Changing string data into JSON Object
        //         obj = JSON.parse(this.responseText)
        //         LoadICUGrid(obj);
        //     }
        //     else {
        //         console.log("No data retrieved");
        //     }
        // }

        // // At last send the request
        // xhr2.send();
        LoadRequestData("icu");
    }
    catch (e) {
        console.log(e)
        md.showNotification('top', 'right', 'Something went wrong. Try again later!')
    }
}
function LoadICUGrid(data) {
    try {
        $(function () {

        //     $("#icuGrid").jsGrid({
        //         width: "100%",
        //         height: "500px",
        //         filtering: false,
        //         editing: false,
        //         sorting: true,
        //         paging: true,
        //         autoload: true,
        //         pageSize: 15,
        //         pageButtonCount: 5,
        //         data: data,
        //         fields: [
        //             { name: "name", type: "text", width: 50, title: "Pat. Name" },
        //             { name: "refname", type: "text", width: 50, title: "Ref. Name" },
        //             { name: "gender", type: "text", width: 20, title: "Gen" },
        //             { name: "age", type: "number", width: 10, title: "Age" },
        //             { name: "location", type: "text", width: 40, title: "Loc" },
        //             { name: "datetime", type: "text", width: 40, title: "DateTime" },
        //             { name: "hospital", type: "text", width: 40, title: "Hosp" },
        //             { name: "comment", type: "text", width: 60, title: "Comments" },
        //             { name: "primaryPhoneNumber", type: "number", width: 40, title: "Contact" },
        //             { name: "secondaryPhoneNumber", type: "number", width: 40, title: "Alt Contact" },
        //         ],

        //     })
        // })
        if (data == null){
            data = "";
        }
        var table = new Tabulator("#icuGrid", {
            data:data,
            maxHeight:"100%",
            layout:"fitColumns",
            pagination:"local",
            tooltips:true, 
            paginationSize:10,
            paginationSizeSelector:[5, 10, 15, 20],
            movableColumns:true,
            resizableRows:false,
            columns:[
                {title:"Name", field:"name", sorter:"string", col:"red", width:150, editor:false},
                {title:"Ref Name", field:"refname", sorter:"string", width:150, editor:false},
                {title:"Gender", field:"gender", sorter:"string", width:85, editor:false},
                {title:"Age", field:"age", sorter:"string", width:60, editor:false},
                {title:"Location", field:"location", sorter:"string" , width:100, editor:false},
                {title:"Date", field:"datetime", sorter:"date", width:80, editor:false},
                {title:"Hospital Name", field:"hospital", sorter:"string", width:100, editor:false},
                {title:"Blood Group", field:"bloodgroup", sorter:"string", width:100, editor:false},
                {title:"Comments", field:"comment", sorter:"string", width:200, editor:false},
                {title:"Contact", field:"primaryPhoneNumber", sorter:"number", width:100, editor:false},
                {title:"Alternate Contact", field:"secondaryPhoneNumber", sorter:"number", width:100, editor:false},

            ],
        });
    })
    }
    catch (e) {
        console.log(e)
    }
}
// ------------------------------------------------------


// Plasma Request Part
function LoadPlasmaData() {
    try {
        // md.showNotification('top', 'right', 'Loading!!')
        // const xhr1 = new XMLHttpRequest();

        // xhr1.open("GET",
        //     base_url + "Request/GetRequestsByType/blood", true);

        // // When response is ready
        // xhr1.onload = function () {
        //     if (this.status === 200) {

        //         // Changing string data into JSON Object
        //         obj = JSON.parse(this.responseText)
        //         LoadPlasmaGrid(obj);
        //     }
        //     else {
        //         console.log("No data retrieved");
        //     }
        // }

        // // At last send the request
        // xhr1.send();
        LoadRequestData("blood");
    }
    catch (e) {
        console.log(e);
        md.showNotification('top', 'right', 'Something went wrong. Try again later!')
    }
}

function LoadPlasmaGrid(data) {
    // md.showNotification('top', 'right', 'Loading!!')
    try {
        $(function () {

            // $("#plasmaGrid").jsGrid({
            //     width: "100%",
            //     height: "500px",
            //     filtering: false,
            //     editing: false,
            //     sorting: true,
            //     paging: true,
            //     data: data,
            //     fields: [
            //         { name: "name", type: "text", width: 50, title: "Pat. Name" },
            //         { name: "refname", type: "text", width: 50, title: "Ref. Name" },
            //         { name: "gender", type: "text", width: 20, title: "Gen" },
            //         { name: "age", type: "number", width: 10, title: "Age" },
            //         { name: "location", type: "text", width: 40, title: "Loc" },
            //         { name: "datetime", type: "text", width: 40, title: "DateTime" },
            //         { name: "hospital", type: "text", width: 40, title: "Hosp" },
            //         { name: "comment", type: "text", width: 60, title: "Comments" },
            //         { name: "primaryPhoneNumber", type: "number", width: 40, title: "Contact" },
            //         { name: "secondaryPhoneNumber", type: "number", width: 40, title: "Alt Contact" },

            //     ]
            // })
            var table = new Tabulator("#plasmaGrid", {
                data:data,
                maxHeight:"100%",
                layout:"fitColumns",
                pagination:"local",
                tooltips:true, 
                paginationSize:10,
                paginationSizeSelector:[5, 10, 15, 20],
                movableColumns:true,
                resizableRows:false,
                columns:[
                    {title:"Name", field:"name", sorter:"string", col:"red", width:150, editor:false},
                    {title:"Ref Name", field:"refname", sorter:"string", width:150, editor:false},
                    {title:"Gender", field:"gender", sorter:"string", width:85, editor:false},
                    {title:"Age", field:"age", sorter:"string", width:60, editor:false},
                    {title:"Location", field:"location", sorter:"string" , width:100, editor:false},
                    {title:"Date", field:"datetime", sorter:"date", width:80, editor:false},
                    {title:"Hospital Name", field:"hospital", sorter:"string", width:100, editor:false},
                    {title:"Blood Group", field:"bloodgroup", sorter:"string", width:100, editor:false},
                    {title:"Comments", field:"comment", sorter:"string", width:200, editor:false},
                    {title:"Contact", field:"primaryPhoneNumber", sorter:"number", width:100, editor:false},
                    {title:"Alternate Contact", field:"secondaryPhoneNumber", sorter:"number", width:100, editor:false},
    
                ],
            });
        })
    }
    catch (e) {
        console.log(e)
    }
}
// -------------------------------------------------------

// Submit Request Part
// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

try {
    $("#requestsubmit").submit(function (e) {
        var datetime = new Date().today() + " " + new Date().timeNow();

        var request_data = {}
        request_data.type = $("#requesttype").val(),
            request_data.name = $("#patientname").val(),
            request_data.refname = $("#referencename").val(),
            request_data.gender = $("#gender").val(),
            request_data.age = parseInt($("#age").val()),
            request_data.location = $("#location").val(),
            request_data.datetime = datetime,
            request_data.status = 0,
            request_data.hospital = $("#hospitalname").val(),
            request_data.comment = $("#comments").val(),
            request_data.primary_phonenumber = Number($("#contactnumber").val()),
            request_data.secondary_phonenumber = Number($("#alternatenumber").val())
            request_data.bloodgroup = $("#bloodtype").val()


        e.preventDefault(); // avoid to execute the actual submit of the form.

        $.ajax({
            url: base_url + 'CreateRequest',
            type: 'post',
            dataType: 'json',
            async: true,
            crossDomain: true,
            contentType: 'application/json',
            success: function (data) {
                if (data.d.status == 200) {
                    md.showNotification('top', 'right', 'Your request is successfully submitted. Kindly update us via email once your request is fulfilled. ')
                    setTimeout(() => {
                        location.reload();
                    }, 2000);                }
                else {
                    md.showNotification('top', 'right', 'Something went wrong. Please try again!')
                }

            },
            data: JSON.stringify(request_data),
            error: function (xhr, status) {
                md.showNotification('top', 'right', 'Something went wrong. Please try again!')
            }
        });
    });
}
catch (e) {
    console.log(e)
}

// -------------------------------------------------------


// Vaccine part
try {
    $("#vaccinesubmit").submit(function (e) {
        md.showNotification('top', 'right', 'Loading!!')
        var date = $("#datetimepicker1").val();
        var place = $("#place").val();
        var pid = 0;
        if (place === "udupi_v") {
            pid = 286;
        }
        else if (place === "bengaluru_rural_v"){
            pid = 276;
        }
        else if (place === "bengaluru_urban_v"){
            pid = 265;
        }
        else if (place === "bbmp_v"){
            pid = 294;
        }
        else {
            pid = 269;
        }

        e.preventDefault(); // avoid to execute the actual submit of the form.

        try {
            // md.showNotification('top', 'right', 'Please Wait. Fetching data!')

            const xhr5 = new XMLHttpRequest();
            xhr5.open("GET",
            "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+pid+"&date="+ date, true);

            // When response is ready
            xhr5.onload = function () {
                if (this.status === 200) {

                    // Changing string data into JSON Object
                    obj = JSON.parse(this.responseText).centers
                    LoadVaccineGrid(obj);

                }
                else {
                    console.log("Data not retrieved");
                    md.showNotification('top', 'right', 'Something went wrong. Try again later!')
                }
            }
            // At last send the request
            xhr5.send();
            // var re = {
            //     "districtId": pid,
            //     "date": date
            // }
            // $.ajax({
            //     url: base_url + 'GetCovidVaccineData',
            //     type: 'post',
            //     dataType: 'json',
            //     async: true,
            //     crossDomain: true,
            //     contentType: 'application/json',
            //     success: function (data) {
            //         obj = JSON.parse(data.d)
            //         LoadVaccineGrid(obj);
            //     },
            //     data: JSON.stringify(re),
            //     error: function (xhr, status) {
            //         md.showNotification('top', 'right', 'Something went wrong. Please try again!')
            //     }
            // });
        }
        catch (e) {
            console.log("e");
            md.showNotification('top', 'right', 'Something went wrong. Try again later!')

        }
    });
}
catch (e) {
    console.log(e)
}

function LoadVaccineGrid(data) {

    var arr = [];
    $.each(data, function (i, news) {
        console.log(i)
        arr.push({
            blockName: news.block_name,
            feeType: news.fee_type,
            from: news.from,
            name: news.name,
            pincode: news.pincode,
            to: news.to,
            available: news.sessions[0].available_capacity,
            available_capacity_dose1 : news.sessions[0].available_capacity_dose1,
            available_capacity_dose2 : news.sessions[0].available_capacity_dose2,
            ageLimit: news.sessions[0].min_age_limit,
            vaccine: news.sessions[0].vaccine,
        });
    });

    LoadVaccine(arr);
}

function LoadVaccine(data) {
    // $("#gridVaccine").jsGrid({
    //     width: "100%",
    //     height: "500px",
    //     filtering: false,
    //     editing: false,
    //     sorting: true,
    //     paging: true,
    //     data: data,
    //     fields: [
    //         { name: "blockName", type: "text", width: 40, title: "Blk Name" },
    //         { name: "name", type: "number", width: 50, title: "Name" },
    //         { name: "feeType", type: "text", width: 20, title: "Fees" },
    //         { name: "from", type: "text", width: 20, title: "From" },
    //         { name: "to", type: "text", width: 20, title: "To" },
    //         { name: "available", type: "text", width: 20, title: "Avl Cap" },
    //         { name: "pincode", type: "text", width: 20, title: "Pin" },
    //         { name: "ageLimit", type: "text", width: 10, title: "Age Lim" },
    //     ]
    // })
    var table = new Tabulator("#gridVaccine", {
        data:data,
        maxHeight:"100%",
        layout:"fitColumns",
        pagination:"local",
        tooltips:true, 
        paginationSize:12,
        paginationSizeSelector:[6, 12, 18, 24],
        movableColumns:true,
        resizableRows:false,
        columns:[
            {title:"Block Name", field:"blockName", sorter:"string", col:"red", width:200, editor:false},
            {title:"Name", field:"name", sorter:"string", width:350, editor:false},
            {title:"Fee Type", field:"feeType", sorter:"string", width:100, editor:false},
            {title:"From", field:"from", sorter:"string", width:100, editor:false},
            {title:"To", field:"to", sorter:"string" , width:100, editor:false},
            {title:"Availablity", field:"available", sorter:"date", width:180, editor:false},
            {title:"Availablity Dose1 ", field:"available_capacity_dose1", sorter:"date", width:180, editor:false},
            {title:"Availablity Dose2", field:"available_capacity_dose2", sorter:"date", width:180, editor:false},
            {title:"Pincode", field:"pincode", sorter:"string", width:150, editor:false},
            {title:"Age Limit", field:"ageLimit", sorter:"string", width:200, editor:false},
            {title:"Vaccine", field:"vaccine", sorter:"string", width:200, editor:false},
        ],
    });
}

// ------------------------------------------------------

// Report Error part

try {
    $("#reportsubmit").submit(function (e) {

        let to = "covidhelp232424@gmail.com";
        let subject = $("#subject").val();
        let contact = $("#reportcontact").val();
        let errorcomment = $("#errorcomment").val();
        e.preventDefault(); // avoid to execute the actual submit of the form.

        window.open('mailto:' + to + '?subject=' + subject + ' ' + contact + '&body=' + errorcomment + '');
        md.showNotification('top', 'right', 'Please wait...')
        setTimeout(() => {
            console.log("Waiting to open email")
            location.reload();
        }, 2000);

    });
}
catch (e) {
    console.log(e);
    md.showNotification('top', 'right', 'Something went wrong. Please try again!')

}
// ------------------------------------------------------