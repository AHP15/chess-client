


export default function squareInfo(square,color, pieces){
    let freeSquare = true, capturingPossible = false;

    for(let piece of Object.values(pieces)){
        if(piece.x === square.x && piece.y === square.y){
            freeSquare = false;
        }
        if(piece.x === square.x && piece.y === square.y && piece.color !== color){
            capturingPossible = true;
        }
    }
    
    return {freeSquare, capturingPossible};
}