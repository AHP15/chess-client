import squareInfo from "./squareInfo";

const WHITE_COLOR = "white";
export default function CALCULATE_POSSIBLE_MOVES_FOR_A_PAWN(piece, pieces){
    let moves = [];
    let color = piece.color;
    let X = piece.x;
    let X1 = X + 1;
    let X2 = X - 1;

    let Y = piece.y;
    let Y1 = color === WHITE_COLOR? Y + 1: Y - 1;
    let Y2 = color === WHITE_COLOR? Y + 2: Y - 2;
    let square;

    //For each pawn we have a maximum of 4 squares
    //and each square require a certain condition

    //square 1
    square = {x:X,y:Y1};
    //condition for square 1
    if(squareInfo(square, piece.color, pieces).freeSquare) {
        moves.push(square);

        //square 2
        square = { x: X, y: Y2 };
        //condition for square 1
        if (squareInfo(square, piece.color, pieces).freeSquare && piece.isFirstMove) {
            moves.push(square);
        }
    }

    //square 3
    square = {x:X1, y:Y1};
    //condition for square 1
    if(squareInfo(square, piece.color, pieces).capturingPossible) {
        moves.push(square);
    }

    //square 4
    square = {x:X2, y:Y1};
    //condition for square 1
    if(squareInfo(square, piece.color, pieces).capturingPossible) {
        moves.push(square);
    }


    return moves;
}