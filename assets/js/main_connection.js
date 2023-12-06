var in_process = false;

// 파일을 선택하지 않았을 때 원본 이미지 & 마스크 이미지를 인터넷에서 불러오는 함수
function getBase64ImageFromURLBothImages(input_url, num, img_url, mask_url, checked_boxes) {
    var img = new Image();
    var mask = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    mask.setAttribute('crossOrigin', 'anonymous');
    
    img.onload = imgData => {
        mask.onload = imgData => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL_original = canvas.toDataURL("image/png");
            var img_original = dataURL_original;
            var commaIndex = img_original.indexOf(",");
            img_original = img_original.slice(commaIndex+1);
            
            var canvas2 = document.createElement("canvas");
            canvas2.width = mask.width;
            canvas2.height = mask.height;
            var ctx2 = canvas2.getContext("2d");
            ctx2.drawImage(mask, 0, 0);
            var dataURL_mask = canvas2.toDataURL("image/png");
            var img_mask = dataURL_mask;
            var commaIndex = img_mask.indexOf(",");
            img_mask = img_mask.slice(commaIndex+1);

            var scene_graph = document.getElementById("json_preview"+num).innerText;
            scene_graph = JSON.parse(scene_graph);

            var jsonArray = new Object();
            jsonArray['image_contents'] = img_original;
            jsonArray['mask_contents'] = img_mask;
            jsonArray['scene_graph'] = scene_graph;
            jsonArray = JSON.stringify(jsonArray);
            if (num == 4) {
                for(var i=0; i < checked_boxes.length; i++) {
                    postData(input_url+checked_boxes[i], jsonArray, num);
                }
            }
            else {
                postData(input_url, jsonArray, num)
            }
        }
    }
    img.src = img_url;
    mask.src = mask_url;
}

function getBase64ImageFromURLThreeImages(input_url, num, img_url, mask_url, semantic_url, checked_boxes) {
    var img = new Image();
    var mask = new Image();
    var semantic = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    mask.setAttribute('crossOrigin', 'anonymous');
    semantic.setAttribute('crossOrigin', 'anonymous');
    
    img.onload = imgData => {
        mask.onload = imgData => {
            semantic.onload = imgData => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var dataURL_original = canvas.toDataURL("image/png");
                var img_original = dataURL_original;
                var commaIndex = img_original.indexOf(",");
                img_original = img_original.slice(commaIndex+1);
                
                var canvas2 = document.createElement("canvas");
                canvas2.width = mask.width;
                canvas2.height = mask.height;
                var ctx2 = canvas2.getContext("2d");
                ctx2.drawImage(mask, 0, 0);
                var dataURL_mask = canvas2.toDataURL("image/png");
                var img_mask = dataURL_mask;
                var commaIndex = img_mask.indexOf(",");
                img_mask = img_mask.slice(commaIndex+1);

                var canvas3 = document.createElement("canvas");
                canvas3.width = semantic.width;
                canvas3.height = semantic.height;
                var ctx3 = canvas3.getContext("2d");
                ctx3.drawImage(semantic, 0, 0);
                var dataURL_canvas = canvas3.toDataURL("image/png");
                var img_semantic = dataURL_canvas;
                var commaIndex = img_semantic.indexOf(",");
                img_semantic = img_semantic.slice(commaIndex+1);

                var jsonArray = new Object();
                jsonArray['image_contents'] = img_original;
                jsonArray['mask_contents'] = img_mask;
                jsonArray['gt_contents'] = img_original;
                jsonArray['semantic_image_contents'] = img_semantic;
                jsonArray = JSON.stringify(jsonArray);
                if (num == 4) {
                    for(var i=0; i < checked_boxes.length; i++) {
                        postData(input_url+checked_boxes[i], jsonArray, num);
                    }
                }
                else {
                    postData(input_url, jsonArray, num)
                }
            }   
        }
    }
    img.src = img_url;
    mask.src = mask_url;
    semantic.src = semantic_url;
}

function postData(input_url, jsonArray, num) {
    if (in_process) {
        alert("아직 이전 요청을 처리하고 있습니다.");
    }
    else {
        in_process = true;
        $('#json_results'+num).html("loading...");
        if (num == 1 || num == 2 || num == 3) {
            clear_json_visualizer('sys'+num+'_output', '#json_canvas_result'+num);
        }
        $.ajax({
            type: "POST",
            url: input_url,
            data: jsonArray,
            success:function(data){
                var obj = JSON.parse(data);
                console.log(obj);
                if (num == 1 || num == 2 || num == 3) {
                    var scene_graph_result = JSON.stringify(obj.scene_graph_json);
                    $('#json_results'+num).html(scene_graph_result);
                    visualize_json('sys'+num+'_output', scene_graph_result, '#json_canvas_result'+num);
                }
                else if (num == 4) {
                    $('#json_results'+num).html("");
                    var resultImage = document.createElement("img");
                    resultImage.setAttribute("src", 'data:image/png;base64,' + obj.image_contents); 
                    resultImage.setAttribute("style", "max-width: 100%; height: auto;"); 
                    
                    var input_img = document.getElementById('image_container4');
                    resultImage.setAttribute("style", "width: "+input_img.clientWidth+"px; height: auto;");
                    if(input_url.endsWith('SNU')) {  //SNU 
                        $('#image_result4_snu').empty();
                        document.querySelector('#image_result4_snu').appendChild(resultImage); 
                    } else if(input_url.endsWith('POSTECH')) {  //POSTECH
                        $('#image_result4_postech').empty();
                        document.querySelector('#image_result4_postech').appendChild(resultImage); 
                    } else {  //KETI
                        $('#image_result4_keti').empty();
                        document.querySelector('#image_result4_keti').appendChild(resultImage); 
                    }
                }
                in_process = false;
            },
            error:function(data){
                in_process = false;
                $('#json_results'+num).html("Error occurred. Try again.");
                alert(JSON.stringify(data));
            }
        });
    }
}
