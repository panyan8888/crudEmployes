$(document).ready(function () {
    $("#saveButton").click(function() {
        //fields validation
        var nameVal = $("#name").val();
        var countryVal = $("#country").val();
        var emailVal = $("#email").val();
        var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var phoneRegex = /^([+][374]{3}(([91]{2})|([99]{2})|([96]{2})|([93]{2})|([94]{2})|([98]{2})|([77]{2})|([55]{2})|([41]{2})|([43]{2})|([55]{2})|([95]{2}))[0-9]{6})+$/;
        var phoneVal = $("#phone").val();
        var photoValidation;
        var nameValidation;
        var genderValidation;
        var phoneValidation;
        var emailValidation;
        var countryValidation;

        var photoUpload = $("#imageLoader")[0];
     
        //Validate whether File is valid image file.

        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png)$/;
        if (regex.test(photoUpload.value.toLowerCase())) {
            $("#photoError").css("display", "none");
            $("#photoRule").css("display", "none");
            photoValidation = true;
        } else {
            $("#photoError").css("display", "block");
            $("#photoRule").css("display", "none");
            photoValidation = false;
        }

        if(phoneRegex.test(phoneVal)) {
            $("#phoneError").css("display", "none");
            $("#phoneRule").css("display", "none");
            phoneValidation = true;
        } else {
            $("#phoneError").css("display", "block");
            $("#phoneRule").css("display", "none");
            phoneValidation = false;
        }

        if(emailRegex.test(emailVal)) {
            $("#emailError").css("display", "none");
            $("#emailRule").css("display", "none");
            emailValidation = true;
        } else {
            $("#emailError").css("display", "block");
            $("#emailRule").css("display", "none");
            emailValidation = false;
        }
        if(countryVal.length > 0) {
            $("#countryError").css("display", "none");
            $("#countryRule").css("display", "none");
            countryValidation = true;
        } else {
            $("#countryError").css("display", "block");
            $("#countryRule").css("display", "none");
            countryValidation = false;
        }
        if(nameVal.length < 4) {
            $("#nameError").css("display", "block");
            $("#nameRule").css("display", "none");
            nameValidation = false;
        } else {
            $("#nameError").css("display", "none");
            $("#nameRule").css("display", "none");
            nameValidation = true;
        }

        if($('#male').is(':checked') || $('#female').is(':checked')){
            $("#genderError").css("display", "none");
            $("#genderRule").css("display", "none");
            genderValidation = true;
        } else {
            $("#genderError").css("display", "block");
            $("#genderRule").css("display", "none");
            genderValidation = false;
        }

        if(nameValidation && emailValidation && countryValidation && genderValidation &&
            phoneValidation && photoValidation) {

            var modal = document.getElementById('myModal');
            modal.style.display = "none";
            alert("New Employer Added");

        }
    })
    //when user clicks upload button
    $("body").on("click", "#upload", function () {
        $("#myBtn").css("display", "block");
        var modal = document.getElementById('myModal');
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
            //Empty Fields value;
            $('#name').val('');
            $('#email').val('');
            $('#country').val('');
            $('#phone').val('');
            $('#imageLoader').val('');
            $("#male").prop("checked", false);
            $("#female").prop("checked", false);
        }
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        //Upload Exel file and check if format is .xls or xlsx
        var fileUpload = $("#fileUpload")[0];     
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();     
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    });
    //fuction that fill excel data to html table
    function ProcessExcel(data) {

        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];
 
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        console.log(excelRows);
        //Create a HTML Table element.
        var table = $("<table />");
        table.addClass('paginated');
        table[0].border = "1";
 
        //Add the header row.
        var row = $(table[0].insertRow(-1));
        console.log(row);
 
       //Add the header cells.
        var headerCell = $("<th />");
        headerCell.html("Id");
        row.append(headerCell);
 
        var headerCell = $("<th />");
        headerCell.html("Photo");
        row.append(headerCell);
 
        var headerCell = $("<th />");
        headerCell.html("Name");
        headerCell.addClass('sort');
        row.append(headerCell);

        var headerCell = $("<th />");
        headerCell.html("Gender");
        row.append(headerCell);

        var headerCell = $("<th />");
        headerCell.html("Phone");
        row.append(headerCell);

        var headerCell = $("<th />");
        headerCell.html("Email");
        row.append(headerCell);

        var headerCell = $("<th />");
        headerCell.html("Country");
        row.append(headerCell);
 
        //Add the data rows from Excel file.
        for (var i = 0; i < excelRows.length; i++) {
            //Add the data row.
            var row = $(table[0].insertRow(-1));
 
            //Add the data cells.
            var cell = $("<td />");
            cell.html(excelRows[i].Id);
            row.append(cell);
 
            cell = $("<td />");
            //can display the img
            // cell.html('<img src=' + excelRows[i].Photo + '>');
            cell.html(excelRows[i].Photo);
            row.append(cell);
 
            cell = $("<td />");
            cell.html(excelRows[i].Name);
            row.append(cell);

            cell = $("<td />");
            cell.html(excelRows[i].Gender);
            row.append(cell);

            cell = $("<td />");
            cell.html(excelRows[i].Phone);
            row.append(cell);

            cell = $("<td />");
            cell.html(excelRows[i].Email);
            row.append(cell);

            cell = $("<td />");
            cell.html(excelRows[i].Country);
            row.append(cell);
        }     
        var dvExcel = $("#dvExcel");
        dvExcel.html("");
        dvExcel.append(table);


        //sorting the table
        var table = $('table');
    
 //   $('#facility_header, #city_header, #phone, #spec')
$('.sort')
        .wrapInner('<span title="sort this column"/>')
        .each(function(){
            
            var th = $(this),
                thIndex = th.index(),
                inverse = false;
            
            th.click(function(){
                
                table.find('td').filter(function(){
                    
                    return $(this).index() === thIndex;
                    
                }).sortElements(function(a, b){
                    
                    return $.text([a]) > $.text([b]) ?
                        inverse ? -1 : 1
                        : inverse ? 1 : -1;
                    
                }, function(){
                    
                    // parentNode is the element we want to move
                    return this.parentNode; 
                    
                });
                inverse = !inverse;    
            });    
        });



        $('table.paginated').each(function() {
            var currentPage = 0;
            var numPerPage = 5;
            var $table = $(this);
            $table.bind('repaginate', function() {
                $table.find('tbody tr:not(":has(th)")').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
            });
            $table.trigger('repaginate');
            var numRows = $table.find('tbody tr').length;
            var numPages = Math.ceil(numRows / numPerPage);
            var $pager = $('<div class="pager"></div>');
            for (var page = 0; page < numPages; page++) {
                $('<span class="page-number"></span>').text(page + 1).
                bind('click', {
                    newPage: page
                }, function(event) {
                    currentPage = event.data['newPage'];
                    $table.trigger('repaginate');
                    $(this).addClass('active').siblings().removeClass('active');
                }).appendTo($pager).addClass('clickable');
            }
            $pager.insertAfter($table).find('span.page-number:first').addClass('active');
        });
    };
});