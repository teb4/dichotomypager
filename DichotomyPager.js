/* 
 * Dichotomy pager
 * 
 *  v1.0 
 * 
 * © Tolmachev Eugeny, 2015 
 * 
 */
function Pos( value ){
    var val = value.value;
    var obj = value.object;
    var callback = value.callback; 

    function refresh(){
        if( !( obj === undefined ) ){    
            obj.value = val;
        }            
        if( !( callback === undefined ) ){ 
            callback( val );
        }                   
    }

    refresh();

    this.set = function( value ){
        val = value;                
        refresh();
    }
    this.get = function(){
        return val;
    }
}
function DichotomyPager( param ){
    var left = new Pos( { value: param.left.value, object: param.left.view, callback: param.left.callback } );
    var right = new Pos( { value: param.right.value, object: param.right.view, callback: param.right.callback } );
    var middle = new Pos( { value: param.middle.value, object: param.middle.view, callback: param.middle.callback } );

    var undo = [];

    function mapControlButton(){
        param.moveButton.left.onclick = clickLeftButton;
        param.moveButton.back.onclick = clickBackButton;
        param.moveButton.right.onclick = clickRightButton;                                        
    }
    clickLeftButton = function(){
        if( ( middle.get() - left.get() ) > 1 ){
            undo.push( { left: left.get(), middle: middle.get(), right: right.get() } );
            right.set( middle.get() );
            middle.set( Math.round( left.get() + ( middle.get() - left.get() ) / 2 ) );
        }
    }            
    clickRightButton = function(){
        if( ( right.get() - middle.get() ) > 1 ){
            undo.push( { left: left.get(), middle: middle.get(), right: right.get() } );
            left.set( middle.get() );
            middle.set( Math.round( middle.get() + ( right.get() - middle.get() ) / 2 ) );
        }
    }            
    clickBackButton = function(){
        if( undo.length > 0 ){
            var position = undo.pop();
            left.set( position.left );
            middle.set( position.middle );
            right.set( position.right );
        }
    }            
    this.getVersion = function(){
        return { interface: 1, update: 0 };
    }
    this.getLeft = function(){
        return left.get();
    }
    this.getRight = function(){
        return right.get();
    }    
    this.getMiddle = function(){
        return middle.get();
    }    
    mapControlButton();
}