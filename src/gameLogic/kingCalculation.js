import IS_KING_IN_CHECK from "./isKingInCheck";
import squareInfo from "./squareInfo";

const WHITE_COLOR = "white";
export default function CALCULATE_POSSIBLE_MOVES_FOR_A_KING(piece, pieces){
    
    let X = piece.x;
    let Y = piece.y;
    let positions = [
        {x:X+1, y:Y},
        {x:X+1, y:Y+1},
        {x:X, y:Y+1},
        {x:X-1, y:Y+1},
        {x:X-1, y:Y},
        {x:X-1, y:Y-1},
        {x:X, y:Y-1},
        {x:X+1, y:Y-1},
    ];
    let king = piece;
    let color = piece.color;

    let moves = positions.filter(position => {
        let {freeSquare, capturingPossible} = squareInfo(
            position, color, pieces
        );
        king = {
            ...king,
            x: position.x,
            y: position.y
        };
        if(IS_KING_IN_CHECK(king, pieces).isInCheck) return false;

        return freeSquare || capturingPossible;
    });
    
    //test for casling possiblity
    let rightRook = color === WHITE_COLOR? pieces.RH1:pieces.RH8;
    let leftRook = color === WHITE_COLOR? pieces.RA1:pieces.RA8;
    let rightCasling;
    let leftCasling;
    let square = {x: X, y: Y};

    function testCasling(square, effectX) {
        //The number 2 here represent two squares
        //ether to the right or the left of the board
        let king = piece;
        let i = 0;
        while(i++ < 2) {
            square = { x: effectX(square.x), y: square.y };
            let { freeSquare } = squareInfo(square, color, pieces);
            king = {
                ...king,
                x: square.x,
                y: square.y
            }
            if (!freeSquare || IS_KING_IN_CHECK(king, pieces).isInCheck) return null;
        }
        return square;
    }

    if(piece.isFirstMove && rightRook.isFirstMove) {
        rightCasling = testCasling(square, x => ++x);
        if(rightCasling) {
            moves.push(rightCasling)
        }
    }

    if(piece.isFirstMove && leftRook.isFirstMove) {
        leftCasling = testCasling(square, x => --x);
        if(leftCasling) {
            moves.push(leftCasling)
        }
    }
    return moves;
}