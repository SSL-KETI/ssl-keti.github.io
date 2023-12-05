function visualize_json(sys_name, json_input, canvas_id) {
    delete sysObj[sys_name].renderer;
    delete sysObj[sys_name];

    sysObj[sys_name] = arbor.ParticleSystem(1000, 400, 1);
    sysObj[sys_name].parameters({ gravity: true });
    sysObj[sys_name].renderer = Renderer(canvas_id);

    //const json_example = '{"image_id": 9830,    "image_name": "n15075141_47718.JPEG",    "objects": [   {  "object_id": 1,  "class_id": 1,  "class_name": "person",  "object_bbox": { "x": 189, "y": 76, "width": 93, "height": 292  }   },   {  "object_id": 2,  "class_id": 53,  "class_name": "window",  "object_bbox": { "x": 69, "y": 71, "width": 98, "height": 64  }   },   {  "object_id": 3,  "class_id": 55,  "class_name": "ceiling",  "object_bbox": { "x": 0, "y": 0, "width": 313, "height": 66  }   },   {  "object_id": 4,  "class_id": 63,  "class_name": "wall",  "object_bbox": { "x": 0, "y": 0, "width": 332, "height": 412  }   },   {  "object_id": 5,  "class_id": 1,  "class_name": "person",  "object_bbox": { "x": 42, "y": 169, "width": 238, "height": 318  }   },   {  "object_id": 6,  "class_id": 59,  "class_name": "floor",  "object_bbox": { "x": 0, "y": 377, "width": 332, "height": 122  }   }    ],    "predicates": [   {  "predicate_name": "wearing_a_T-shirt",  "predicate_id": 113005,  "subject_id": 1,  "object_id": -1   },   {  "predicate_name": "wearing_shoes",  "predicate_id": 113009,  "subject_id": 1,  "object_id": -1   },   {  "predicate_name": "standing",  "predicate_id": 112016,  "subject_id": 1,  "object_id": -1   },   {  "predicate_name": "Front-view",  "predicate_id": 120001,  "subject_id": 1,  "object_id": -1   },   {  "predicate_name": "male",  "predicate_id": 111013,  "subject_id": 1,  "object_id": -1   },   {  "predicate_name": "closed",  "predicate_id": 112040,  "subject_id": 2,  "object_id": -1   },   {  "predicate_name": "Unknown",  "predicate_id": 120006,  "subject_id": 2,  "object_id": -1   },   {  "predicate_name": "transparent",  "predicate_id": 114030,  "subject_id": 2,  "object_id": -1   },   {  "predicate_name": "Unknown",  "predicate_id": 120006,  "subject_id": 3,  "object_id": -1   },   {  "predicate_name": "solid",  "predicate_id": 114015,  "subject_id": 3,  "object_id": -1   },   {  "predicate_name": "metallic",  "predicate_id": 114001,  "subject_id": 3,  "object_id": -1   },   {  "predicate_name": "with_bricks",  "predicate_id": 113053,  "subject_id": 4,  "object_id": -1   },   {  "predicate_name": "standing",  "predicate_id": 112016,  "subject_id": 4,  "object_id": -1   },   {  "predicate_name": "Unknown",  "predicate_id": 120006,  "subject_id": 4,  "object_id": -1   },   {  "predicate_name": "stone",  "predicate_id": 114010,  "subject_id": 4,  "object_id": -1   },   {  "predicate_name": "wearing_a_T-shirt",  "predicate_id": 113005,  "subject_id": 5,  "object_id": -1   },   {  "predicate_name": "wearing_shoes",  "predicate_id": 113009,  "subject_id": 5,  "object_id": -1   },   {  "predicate_name": "wearing_jeans",  "predicate_id": 113011,  "subject_id": 5,  "object_id": -1   },   {  "predicate_name": "wearing_a_cap",  "predicate_id": 113003,  "subject_id": 5,  "object_id": -1   },   {  "predicate_name": "sitting",  "predicate_id": 112010,  "subject_id": 5,  "object_id": -1   },   {  "predicate_name": "hand_up",  "predicate_id": 112004,  "subject_id": 5,  "object_id": -1   },   {  "predicate_name": "Side-view",  "predicate_id": 120003,  "subject_id": 5,  "object_id": -1   },   {  "predicate_name": "male",  "predicate_id": 111013,  "subject_id": 5,  "object_id": -1   },   {  "predicate_name": "Unknown",  "predicate_id": 120006,  "subject_id": 6,  "object_id": -1   },   {  "predicate_name": "wooden",  "predicate_id": 114003,  "subject_id": 6,  "object_id": -1   },   {  "predicate_name": "lower",  "predicate_id": 220006,  "subject_id": 6,  "object_id": 1   },   {  "predicate_name": "touch__contact",  "predicate_id": 210096,  "subject_id": 6,  "object_id": 1   },   {  "predicate_name": "lower",  "predicate_id": 220006,  "subject_id": 6,  "object_id": 2   },   {  "predicate_name": "lower",  "predicate_id": 220006,  "subject_id": 6,  "object_id": 3   },   {  "predicate_name": "lower",  "predicate_id": 220006,  "subject_id": 6,  "object_id": 4   },   {  "predicate_name": "touch__contact",  "predicate_id": 210096,  "subject_id": 6,  "object_id": 4   },   {  "predicate_name": "lower",  "predicate_id": 220006,  "subject_id": 6,  "object_id": 5   },   {  "predicate_name": "touch__contact",  "predicate_id": 210096,  "subject_id": 6,  "object_id": 5   }    ]}';
    const obj = JSON.parse(json_input);
    var data = { nodes: {}, edges: {} }

    for (let i = 0; i < obj.objects.length; i++) {
        object = obj.objects[i];
        data['nodes'][object.object_id] = { 'color': 'green', 'shape': 'dot', 'label': object.class_name, '_id':object.object_id };
    }

    let predicate_count = 1000;
    for (let i = 0; i < obj.predicates.length; i++) {
        predicate = obj.predicates[i];
        if (predicate.predicate_name == 'Unknown') {
            continue;
        }
        if (predicate.object_id != -1) {
            data['nodes'][predicate_count] = { 'color': 'darkred', 'shape': 'square', 'label': predicate.predicate_name, '_id':predicate_count};
            data['edges'][predicate_count] = {};
            data['edges'][predicate_count][predicate.subject_id] = {}
            data['edges'][predicate_count][predicate.object_id] = {}
        }
        else {
            data['nodes'][predicate_count] = { 'color': 'orange', 'shape': 'square', 'label': predicate.predicate_name, '_id':predicate_count };
            data['edges'][predicate_count] = {};
            data['edges'][predicate_count][predicate.subject_id] = {}
        }
        predicate_count += 1;
    }
    sysObj[sys_name].graft(data);
}

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
    $('#json_results'+num).html("loading...");
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
        },
        error:function(data){
            alert(JSON.stringify(data));
        }
    });
}