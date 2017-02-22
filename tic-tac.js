//

(function(){

var TicTac = function(){

    var currentSymbol = null,
        values = [];

    function init(){
        bindEvents();
    }

    function bindEvents(){

        var liElem = document.querySelector('.container .tic-tac');
        if(liElem){
            document.addEventListener('click',function(e){
                var target = e.target;
                    
                if(target.nodeName === 'LI'){
                    var _class = target.getAttribute('class') || null,
                        data = target.getAttribute('data-val');
                    if(_class) return false;
                    currentSymbol = getSymbol(currentSymbol);
                    target.innerText = currentSymbol;
                    target.setAttribute('class','locked');

                    storeValues(data, currentSymbol);
                }
            })
        }
    }

    function getSymbol(cur){
        return (cur && cur === 'X')?'0':'X';
    }

    function storeValues(axisValues, symbol){
        var axis = axisValues.split(',');
        
        if(values[axis[0]] === undefined){
            values[axis[0]] = [];
        }

        values[axis[0]][axis[1]] = symbol;
        console.log(values); 
        checkStatus(axis, symbol);
    }

    function checkStatus(axis, symbol){
        var x = axis[0], 
            y = axis[1],
            winX = 0,
            winY = 0,
            xAxisFull = true,
            yAxisFull = true;

        for(var i=0;i<3;i++){

            var xVal = (values[x])?values[x][i]: null,
                yVal = (values[i])?values[i][y]: null;

            if(!xVal){
                xAxisFull = false;
            }

            if(!yVal){
                yAxisFull = false;
            }
            
            if(xVal && symbol === xVal){
                winX++;
            }

            if(yVal && symbol === yVal){
                winY++;
            }
        }

        if(winX === 3){
            stopGame(symbol +' is the Winner');
            return;
        }    

        if(winY === 3){
            stopGame(symbol +' is the Winner');
            return;
        }

        if(i === 3 && xAxisFull && yAxisFull){
            stopGame('Match Drawn!!');
            return;
        }
    }

    function stopGame(message){
        //lock all blocks
        document.querySelectorAll('.container .tic-tac li').forEach((node)=>{
            node.setAttribute('class', 'locked');
        });
        document.querySelector('.container .tic-tac p').innerText = message;
    }


    return{
        init : init
    }
}

new TicTac().init();

})();