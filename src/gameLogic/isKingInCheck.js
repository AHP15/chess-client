const WHITE_COLOR = "white";

function pieceInSquare(square, pieces) {
    let data = null;
    Object.values(pieces).forEach(piece => {
        if(piece.x === square.x && piece.y === square.y){
            data =  piece;
        }
    });

    return data;
}

function isKingAttacked(king, pieces, condition, effectX, effectY, attackedBy) {
    let X = king.x;
    let Y = king.y;
    let color = king.color;
    let square;
    let piece = {};
    //positions may need to be filled if there is a check
    let positionsToFilled = [];
    let isInCheck = false;

    while(condition(X, Y)) {
        X = effectX(X);
        Y = effectY(Y);
        square = {x:X, y: Y};
        piece = pieceInSquare(square, pieces);

        if(color === WHITE_COLOR) {
            if(attackedBy.black.indexOf(piece?.name) !== -1) {
                isInCheck = true;
                positionsToFilled.push(square);
            }
        }
        else {
            if(attackedBy.white.indexOf(piece?.name) !== -1) {
                isInCheck = true;
                positionsToFilled.push(square);
            }
        }

        if(piece) break;
    }

    return {isInCheck, positionsToFilled};
}

export default function IS_KING_IN_CHECK(king, pieces) {
    //positions may need to be filled if there is a check
    let positionsToFilled = [];
    let isInCheck = false;

    const attackedByQueenOrRook = {
        white: ["WQ", "WR"],//white queen or white rook
        black: ["BQ", "BR"],//black queen or black rook
    };
    const attackedByQueenOrBishop = {
        white: ["WQ", "WB"],//white queen or white bishop
        black: ["BQ", "BB"],//black queen or black bishop
    };
    
    let isKingAttackedFromTopVerticalLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => x,
        y =>++y,
        attackedByQueenOrRook
    );
    let isKingAttackedFromBottomVerticalLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y >= 0,
        x => x,
        y => --y,
        attackedByQueenOrRook
    );
    let isKingAttackedFromLeftHorizontalLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x >= 0 && y <= 7,
        x => --x,
        y => y,
        attackedByQueenOrRook
    );
    let isKingAttackedFromRightHorizontalLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => ++x,
        y => y,
        attackedByQueenOrRook
    );

    let isKingAttackedFromTopRightLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => ++x,
        y => ++y,
        attackedByQueenOrBishop
    );
    let isKingAttackedFromTopLeftLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x >= 0 && y <= 7,
        x => --x,
        y => ++y,
        attackedByQueenOrBishop
    );
    let isKingAttackedFromBottomRightLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y >= 0,
        x => ++x,
        y => --y,
        attackedByQueenOrBishop
    );
    let isKingAttackedFromBottomLeftLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x >= 0 && y >= 0,
        x => --x,
        y => --y,
        attackedByQueenOrBishop
    );


    const ALL_TESTS = [
        isKingAttackedFromTopVerticalLine,
        isKingAttackedFromBottomVerticalLine,
        isKingAttackedFromLeftHorizontalLine,
        isKingAttackedFromRightHorizontalLine,
        isKingAttackedFromTopRightLine,
        isKingAttackedFromTopLeftLine,
        isKingAttackedFromBottomRightLine,
        isKingAttackedFromBottomLeftLine
    ];

    ALL_TESTS.forEach(test => {
        if(test.isInCheck) {
            isInCheck = true;
            positionsToFilled = [...positionsToFilled, ...test.positionsToFilled];
        }
    });
    
    return {isInCheck, positionsToFilled};
}