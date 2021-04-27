example.PropertyPane = Class.extend({
	
	init:function(elementId, view, argument)
	{
		this.html = $("#"+elementId);
		this.view = view;

		// Databinding: helper attributes for the databinding
		this.selectedFigure = null;
		this.updateCallback = null;

        view.on("select", $.proxy(this.onSelectionChanged, $.extend(this, argument)));
    },

	/**
	 * @method
	 * Called if the selection in the canvas has been changed. You must register this
	 * on the canvas to receive this event.
	 *
     * @param {draw2d.Canvas} emitter
     * @param {Object} event
     * @param {draw2d.Figure} event.figure
	 */
	onSelectionChanged : function(emitter, event)
	{
		// Databinding: deregister the old update listener
		if(this.selectedFigure!==null && this.updateCallback !==null){
			this.selectedFigure.off(this.updateCallback);
		}

		this.selectedFigure = event.figure;
        this.html.html("");

		if(event.figure instanceof draw2d.shape.node.Node){
        	this.showPropertiesOpAmp(event.figure, this.category);
        }
	},


	/**
	 * @method
	 * Called if the selection in the canvas has been changed. You must register this
	 * on the canvas to receive this event.
	 * 
	 * @param {draw2d.Figure} figure
	 */
	showPropertiesOpAmp : function(figure, category)
	{

		const blockText = figure.getChildren().data[0].text;
		// TODO: 변수명 변경
		let inputTagItems = '';
		let startIndex = 1;
		for (let i = 0; i < category.length; i++) {
			let jsonData = category[i];
			inputTagItems += '<input type="checkbox" class="test" name="' + jsonData.code_cd + '" id="' + startIndex + '" value="' + (i + 1) + '" checked="checked"/> ' + jsonData.code_nm + '<br>';
			startIndex += 4; //한줄마다의 시작점
		}
        // simple x/y coordinate display
        //
		const appendSelectBox = createBlock(blockText);

        this.html.append(
                '<div id="property_position_container" class="panel panel-default">'+
                ' <div class="panel-heading " >'+
                '     좌표'+
                '</div>'+
                ' <div class="panel-body" id="position_panel">'+
                '   <div class="form-group">'+
                '       <div class="input-group" ></div> '+
                '       X <input id="property_position_x" type="text" class="form-control"/><br>'+
                '       Y <input id="property_position_y" type="text" class="form-control"/>'+
                '   </div>'+
                ' </div>'+
                '</div>'+
                '<br>'+
                '<div id="property_position_container" class="panel panel-default">'+
                ' <div class="panel-heading " >'+
                '     사용자 설정 값'+
                '</div>'+
                ' <div class="panel-body" id="userdata_panel">'+
                '   <div class="form-group">'+
                '       <div class="input-group" ></div> '+ 
                '       블록선택'+ //TODO 동적으로 변경해야함
				appendSelectBox +
                '   </div>'+
                ' </div>'+
                '</div><br><br>' +
		'저장할 목록 선택<br>');
        this.html.append(inputTagItems);
        
    	// Databinding: Figure --> UI
        //
        var isInUpdate=false;
    	figure.on("move",function(){
            // console.log("됨");
    		if(isInUpdate) return;
    		isInUpdate = true; // avoid recursion
    		$("#property_position_x").val(figure.getPosition().x);
       		$("#property_position_y").val(figure.getPosition().y);
       		isInUpdate=false;
       	});
    	
    	// Databinding: UI --> Figure
        //
    	$("#position_panel input").on("change", function(){
    	    // with undo/redo support
    	    var cmd = new draw2d.command.CommandMove(figure);
    	    cmd.setPosition(parseInt($("#property_position_x").val()),parseInt($("#property_position_y").val()));
    	    figure.getCanvas().getCommandStack().execute(cmd);
    	});
    	$("#property_name").on("change", function(){
    		let selectOption = document.getElementById("property_name");
    		selectOption = selectOption.options[selectOption.selectedIndex].value;
    		console.log(selectOption);
    		// figure.getUserData().name = selectOption;
    		figure.getChildren().data[0].attr({
				text: selectOption,
			});
    	});


		$("[class='test']").on("click", function(){

            //TODO: checked unchecked

            if($(this).is(":checked")) {
            	console.log(figure);
            	const checkedIndex = Number(this.id);

				// figure.getChildren().data[(Number(this.id) + 2)].attr({
				// 	visible: true,
				// })
				// figure.getChildren().data[(Number(this.id) + 1)].attr({
				// 	visible: true,
				// })
				// figure.getChildren().data[Number(this.id)].attr({
				// 	visible: true,
				// })
				figure.getChildren().data[checkedIndex].attr({
					// visible: false,
					bgColor: "#0075ff",
				})

            } else {
            	//TODO: 삭제 행 구현하기
				let deleteIndex = Number(this.id);
				//Soft Delete 방식
				// figure.getChildren().data[(deleteIndex + 2)].attr({
				// 	visible: false,
				// })
				//
				// figure.getChildren().data[(deleteIndex + 1)].attr({
				// 	visible: false,
				// })
				figure.getChildren().data[deleteIndex].attr({
					// visible: false,
					bgColor: "white",
				})

            }
		})

	}
});

function createBlock(block){
	//  <input  value=""/>
	if(block === '블록1'){
		return ' <select id="property_name">' +
			'<option value="대블록1">대블록1</option>' +
			' <option value="대블록2">대블록2</option>' +
			'<option value="대블록3">대블록3</option> ' +
			'</select>';
	}else if(block === '블록2'){
		return ' <select id="property_name">' +
				'<option value="중블록1">중블록1</option>' +
				' <option value="중블록2">중블록2</option>' +
				'<option value="중블록3">중블록3</option> ' +
			'</select>';
	}else if(block === '블록3'){
		return ' <select id="property_name">' +
			'<option value="소블록1">소블록1</option>' +
			' <option value="소블록2">소블록2</option>' +
			'<option value="소블록3">소블록3</option> ' +
			'</select>';
	}
}