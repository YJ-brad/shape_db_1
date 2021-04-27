

example.View = draw2d.Canvas.extend({
	
	init:function(id)
    {
		this._super(id, 2000,2000);
		this.setScrollArea("#"+id);
	},

    
    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/

    //Table 양식을 드래그해서 가져다 놨을때
    onDrop : function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {
        var tableShape = $(droppedDomNode).data("shape"); //div 태그의 data-shape
        var type = $(droppedDomNode).data("type"); //div 태그의 data-type
        var figure = eval('new ' + tableShape + "(\""+type+"\", " + JSON.stringify(parameter.category) + ");"); //new data-shape("data-type") 형식

        if(figure instanceof draw2d.shape.composite.Raft){
        	var group = new draw2d.shape.composite.Raft({width:50,height:50, x:x, y:y});

        	var inputPort = group.createPort("input");
        	var outputPort = group.createPort("output");

            inputPort.attr({"cssClass": "blue_group_port"});
            outputPort.attr({"cssClass": "blue_group_port"});

        	this.add(group); //만든 객체를 기존의 화면에 융합시킨다는 의미
        }else{ 
        	// create a command for the undo/redo support
            var command = new draw2d.command.CommandAdd(this, figure, x, y);
            command.figure.width = 300; //폭 설정
            this.getCommandStack().execute(command); //객체를 추가함
        }
        
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);
    }
});

