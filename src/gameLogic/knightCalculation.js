import squareInfo from "./squareInfo";

export default function CALCULATE_POSSIBLE_MOVES_FOR_A_KNIGHT(piece, pieces){
    let X = piece.x
    let Y = piece.y
    let color = piece.color;

    let allPositions = [
        {x: X+1, y: Y+2},
        {x: X-1, y: Y+2},
        {x: X+1, y: Y-2},
        {x: X-1, y: Y-2},
        {x: X+2, y: Y+1},
        {x: X-2, y: Y+1},
        {x:X+2, y: Y-1},
        {x:X-2, y: Y-1},
    ];

    let moves = allPositions.filter(position => {
        let {freeSquare, capturingPossible} = squareInfo(
            position, color, pieces
        );
        return freeSquare || capturingPossible;
    });

    return moves;
}