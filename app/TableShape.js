// var table = new draw2d.shape.layout.VerticalLayout();
//     canvas.add(table,200,100);
//     table.add(new draw2d.shape.basic.Label({text:"Header of the table",bold:true, stroke:4, resizeable:true}));

TableShape = draw2d.shape.layout.FlexGridLayout.extend({

	NAME: "TableShape",
	
    init : function(type, attr)
    {
        // 라벨 설정 생성자
    	var text; //글자
        var str = '';
        for (let i = 0; i <= attr.length; i++) {
            if(i === attr.length) {
                str += "20px";
            } else {
                str += "20px, ";
            }
        }
        var object = {};
        object.rows = str;
        console.log('rows', object);
        console.log('rows', object.rows);

    	if(type === "Large"){//대블록
            text = "블록1";
    	}else if(type === "Middle"){//중블록
            text = "블록2";
    	}else if(type === "Small"){//소블록
            text = "블록3";
    	}

        //여기서 라벨에 대한 설정을 진행함.
    	this._super($.extend({
            rows: str, //행 너비값
            columns:"5px, 80px, 70px, 50px", //4열로 각 너비 설정
            resizeable:false
    	}, object));


        this.createPort("input").attr({"cssClass": "blue_group_port"});
        this.createPort("output").attr({"cssClass": "blue_group_port"});
        this.label = header(text);
        this.add(this.label, {row:0, colspan: 4});

        for(let i = 0; i < attr.length; i++){
            makeTable(this, attr[i].code_cd, attr[i].code_nm, (i + 1));
        }
    }
});


/**
  *  @createFunction - SeungJae
  */ 
function makeTable(figure, code_cd, code_nm, rowIndex){
    figure.add(new draw2d.shape.basic.Rectangle({bgColor: '#0075ff', width: 5}), {row: rowIndex, col: 0});
    figure.add(col1(code_cd, {userData: {name: code_nm}}), {row: rowIndex, col:1});
    figure.add(col2("500000", {userData: {name: code_nm}}), {row: rowIndex, col:2, align: "right"});
    figure.add(col3("kgf/㎠", {userData: {name: code_nm}}), {row: rowIndex, col:3, align: "right"});
}

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