function setImageThumbnail(event, image_area) {
    var reader = new FileReader(); 
    reader.onload = function(event) { 
        var img = document.createElement("img"); 
        img.setAttribute("src", event.target.result); 
        img.setAttribute("style", "max-width: 100%; height: auto;");
        $(image_area).empty();
        document.querySelector(image_area).appendChild(img);
    }; 
    reader.readAsDataURL(event.target.files[0]); 
}

function setJsonThumbnail(event, json_area) {
    var reader = new FileReader(); 
    reader.onload = function(event) { 
        $(json_area).html("");
        $(json_area).html(event.target.result);
    };
    reader.readAsText(event.target.files[0]);
}

function getBase64Image(reader) {
    var base64image = reader.result;
    var commaIndex = base64image.indexOf(",");
    base64image = base64image.slice(commaIndex+1);
    return base64image;
}