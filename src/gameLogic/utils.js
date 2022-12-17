import squareInfo from "./squareInfo";

export function traverseChessLine(piece, pieces, condition, effectX, effectY) {
    let moves = [];
    let X = piece.x;
    let Y = piece.y;
    let square;
    
    while(condition(X, Y)){
        X = effectX(X);
        Y = effectY(Y);
        square = {x:X, y:Y};
        let {freeSquare, capturingPossible} = squareInfo(square, piece.color, pieces);

        if(freeSquare || capturingPossible){
            moves.push(square);
        }
        else{
            break;
        }
        if(capturingPossible) break;
    }

    return moves;
}