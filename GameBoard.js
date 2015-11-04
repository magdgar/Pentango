var CrossImage = "res/Cross.png";
var ShapeImage = "res/Shape.png";
var DefaultImage = "res/CircleCross.jpg";

var RightArrow = "res/arrowL.png";
var LeftArrow = "res/arrowL.png";

var foo = function(x){
    return [Math.floor(x/3), x%3];
};

var Game = React.createClass({
    getInitialState: function(){
        var boards = [];
        for(var i = 0; i <4; i++)
            boards[i] = <Board randomBoard={this.randomBoard} ref = { "id" + i.toString()} id = { "id" + i.toString()} />;
        return({
            boards: boards
        })
    },
    render: function(){
            return(
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td><Button id="kot" /></td> <td></td>
                            <td></td> <td><Button /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{this.state.boards[0]}</td>
                            <td>{this.state.boards[1]}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{this.state.boards[2]}</td>
                            <td>{this.state.boards[3]}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><Button /></td> <td></td>
                            <td></td> <td><Button /></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
    },

    randomBoard: function(){
        var randomId = Math.floor((Math.random() * 4));
        var isMarkSucced = true;

        //no co za menda, musze switcha pisac
        switch (randomId){
            case 0:
                isMarkSucced = this.refs.id0.oponentMarkField();
                break;
            case 1:
                isMarkSucced = this.refs.id1.oponentMarkField();
                break;
            case 2:
                isMarkSucced = this.refs.id2.oponentMarkField();
                break;
            case 3:
                isMarkSucced = this.refs.id3.oponentMarkField();
                break;
        }
        if(!isMarkSucced)
            this.randomBoard();
    }

});

var BoardWithButton = React.createClass({
    render: function () {
        return(
            <table>
                <tbody>
                    <tr>
                        <td><Button /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Board /></td>
                    </tr>
                </tbody>
            </table>
        )
    }
})

var Board = React.createClass({
    getInitialState: function(){
        var fields = [[], [], []];
        for(var i = 0; i <3; i++)
            for(var k = 0; k<3; k++)
                fields[i][k] = DefaultImage;
        return({
            numberOfMarkedFileds: 0,
            imageFields: fields

        })
    },
    render: function(){
        var crossArray = [];
        for(var i = 0; i < 9; i++){
            crossArray.push(<Field key = {i} possition = {i} markFieldFunction={this.markField} image={this.state.imageFields[Math.floor(i/3)][i%3]}/>);
        }
        return(
            <div id="stars">
                {crossArray}
            </div>
        )
    },
    markField: function(x, y){
        var fields = this.state.imageFields;
        if(fields[x][y] == DefaultImage) {
            fields[x][y] = ShapeImage;
            this.setState({
                imageFields: fields,
                numberOfMarkedFileds: this.state.numberOfMarkedFileds + 1
            })
            setTimeout(this.props.randomBoard, 1000);
        }
    },
    oponentMarkField: function(){
        var isTrue = true;
        if(this.state.numberOfMarkedFileds <9) {
            while (isTrue) {
                var oponentPossition = Math.floor((Math.random() * 9));
                if (this.state.imageFields[Math.floor(oponentPossition / 3)][oponentPossition % 3] == DefaultImage) {
                    var fields = this.state.imageFields;
                    fields[Math.floor(oponentPossition / 3)][oponentPossition % 3] = CrossImage;
                    this.setState({
                        imageFields: fields,
                        numberOfMarkedFileds : this.state.numberOfMarkedFileds +1
                    })
                    isTrue = false;
                    return true;
                }
            }
        }
        return false;
    }
});

var Field = React.createClass({
    render: function(){
        return(
            <a href="#" onClick={this.props.markFieldFunction.bind(null, Math.floor(this.props.possition / 3), this.props.possition % 3)}>
                <img className="field" src={this.props.image}/>
            </a>
        );
    }
});

var Button = React.createClass({
    render: function(){
        return(
            <a href="#" onClick={this.rotate.bind(this, "left")}>
                <img className="button" src={RightArrow}/>
            </a>
        );
    },
    rotate: function(direction) {
        console.log("och maciek");
        var angle = -90;
        if (direction == "left") {
            angle = -90;
        }else {
            angle = 90;
        }
        $("#kot").animate({borderSpacing: angle}, {
            step: function (now, fx) {
                console.log("funkcja kurwa");
                $(this).css("-webkit-transform-origin", "center center");
                $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
                $(this).css('transform', 'rotate(' + now + 'deg)');
            },
            duration: 'slow'
        }, 'linear');
    }
});

ReactDOM.render(
    <Game />,
    document.getElementById('root'));