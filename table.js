$(function  () {
    //TODO: index.html의 app 객체 생성 된 이후에
    setTimeout(function () {
        var canvas = app.view;
        var table = new draw2d.shape.layout.FlexGridLayout({
            rows:"25px, 20px, 20px, 20px, 20px, 20px, 20px, 20px, 20px, 20px",
            columns:"80px, 70px, 50px, 25px",
            resizeable: false
        });
        table.createPort("input");
        table.createPort("output");


        var fontSize = {
            small: "10px",
            normal: "12px", // default
            large: "14px"
        }

        function col(text, params) {
            return new draw2d.shape.basic.Label($.extend({resizeable: true, stroke: 0, text: text}, params));
        }

        function header(text, params) {
            return col(text, Object.assign({bold: true, bgColor: "#4d5864", fontColor: "#ffffff"}, params));
        }

        function col1(text, params) {
            return col(text, Object.assign({bold: true}, params));
        }

        function col2(text, params) {
            return col(text, Object.assign({resizeable: false, bold: true, fontSize: fontSize.large, fontColor: "#0000ff"}, params));
        }

        function col3(text, params) {
            return col(text, Object.assign({resizeable: false, fontSize: fontSize.small}, params));
        }

        table.add(header("헤더"), {row:0, colspan: 4});

        table.add(col1("순서유량"), {row:1, col:0});
        table.add(col2("1224"), {row:1, col:1});
        table.add(col3("순서유량"), {row:1, col:2});
        table.add(new draw2d.shape.basic.Rectangle({bgColor: "none", stroke: 1, width: 10, height: 10}), {row:1, col:3})
        // table.setPadding(50);
        table.add(col1("적신유량"), {row:2, col:0});
        table.add(col2("-"), {row:2, col:1, align: "right"});
        table.add(col3("㎥"), {row:2, col:2, align: "right"});

        table.add(col1("수압"), {row:3, col:0});
        table.add(col2("-"), {row:3, col:1, align: "right"});
        table.add(col3("kgf/㎠"), {row:3, col:2, align: "right"});

        table.add(col1("야간최소유량"), {row:4, col:0});
        table.add(col2("-"), {row:4, col:1, align: "right"});
        table.add(col3("㎥/hr"), {row:4, col:2, align: "right"});

        table.add(col1("탁도"), {row:5, col:0});
        table.add(col2("-"), {row:5, col:1, align: "right"});
        table.add(col3("NTU"), {row:5, col:2, align: "right"});

        table.add(col1("pH"), {row:6, col:0});
        table.add(col2("-"), {row:6, col:1, align: "right"});
        table.add(col3("pH"), {row:6, col:2, align: "right"});

        table.add(col1("잔류염소"), {row:7, col:0});
        table.add(col2("-"), {row:7, col:1, align: "right"});
        table.add(col3("㎎/L"), {row:7, col:2, align: "right"});

        table.add(col1("전기전도도"), {row:8, col:0});
        table.add(col2("-"), {row:8, col:1, align: "right"});
        table.add(col3("㎲/㎠"), {row:8, col:2, align: "right"});

        table.add(col1("수온"), {row:9, col:0});
        table.add(col2("-"), {row:9, col:1, align: "right"});
        table.add(col3("℃"), {row:9, col:2, align: "right"});
        //
        canvas.add(table,1200,100); // element, x, y

        var writer = new draw2d.io.json.Writer();
        writer.marshal(canvas, function(json){
            // convert the json object into string representation
            var jsonTxt = JSON.stringify(json,null,2);

            // console.log(json);
            // console.log(jsonTxt);
            // insert the json string into a DIV for preview or post
            // it via ajax to the server....
            // $("#json").text(jsonTxt);

        });
        //
        //
        var jsonDocument =
            [
                {
                    "type": "draw2d.shape.layout.FlexGridLayout",
                    // "id": "8b7c9cf3-82d9-1d84-4e6c-700094c11065",
                    "x": 1200,
                    "y": 100,
                    "width": 190,
                    "height": 200,
                    "alpha": 1,
                    "selectable": true,
                    "draggable": true,
                    "angle": 0,
                    "userData": {},
                    "cssClass": "draw2d_shape_layout_FlexGridLayout",
                    "ports": [
                        {
                            "type": "draw2d.InputPort",
                            "id": "f3885311-3dff-aaf1-89ac-085bbcb44a61",
                            "width": 10,
                            "height": 10,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 0,
                            "userData": {},
                            "cssClass": "draw2d_InputPort",
                            "bgColor": "rgba(79,104,112,1)",
                            "color": "rgba(27,27,27,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "input0",
                            "semanticGroup": "global",
                            "port": "draw2d.InputPort",
                            "locator": "draw2d.layout.locator.InputPortLocator",
                            "locatorAttr": {}
                        },
                        {
                            "type": "draw2d.OutputPort",
                            "id": "f2aa893b-b5c1-5870-7b5f-5c2aaddcc855",
                            "width": 10,
                            "height": 10,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 0,
                            "userData": {},
                            "cssClass": "draw2d_OutputPort",
                            "bgColor": "rgba(79,104,112,1)",
                            "color": "rgba(27,27,27,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "output0",
                            "semanticGroup": "global",
                            "port": "draw2d.OutputPort",
                            "locator": "draw2d.layout.locator.OutputPortLocator",
                            "locatorAttr": {}
                        }
                    ],
                    "bgColor": "rgba(0,0,0,0)",
                    "color": "rgba(27,27,27,1)",
                    "stroke": 2,
                    "radius": 0,
                    "dasharray": null
                }
            ];
        // console.log(jsonDocument);


        // unmarshal the JSON document into the canvas
        // (load)
        // var reader = new draw2d.io.json.Reader();
        // reader.unmarshal(canvas, jsonDocument);


    }, 0);
});
