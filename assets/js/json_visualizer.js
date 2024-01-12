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

    if ("predicates" in obj){
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
    }
    sysObj[sys_name].graft(data);
}

function clear_json_visualizer(sys_name, canvas_id) {
    delete sysObj[sys_name].renderer;
    delete sysObj[sys_name];

    sysObj[sys_name] = arbor.ParticleSystem(1000, 400, 1);
    sysObj[sys_name].parameters({ gravity: true });
    sysObj[sys_name].renderer = Renderer(canvas_id);

    var data = { nodes: {'0': {'color': 'white'}}, edges: {} }
    sysObj[sys_name].graft(data);
}