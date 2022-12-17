

export default function SUBMIT_MOVE(pieces, piece, newSquare) {
    let piecesCopy = pieces;

    for(let [k,p] of Object.entries(piecesCopy)){
        if(p.x === newSquare.x && p.y === newSquare.y){
            delete piecesCopy[k];
        }
    }

    let pieceName = piece.publicName;
    let newPiecePosition = {
        ...piece.info,
        x: newSquare.x,
        y: newSquare.y,
        isFirstMove: false, //this properety will be used only for kings and pawns
    }
    
    //See if this move is castling moving
    //If so: move the rook too
    if(piece.info.name === "WKG" || piece.info.name === "BKG") {

        let rightCastlingXvalue = 6;
        let leftCastlingXvalue = 2;

        if(newSquare.x === rightCastlingXvalue) { // it is a right castling
            let rightRook = piece.info.name === "WKG"? "RH1":"RH8";
            piecesCopy = {
                ...piecesCopy,
                [rightRook]: {
                    ...piecesCopy[rightRook],
                    x: newSquare.x - 1,
                }
            }
        }

        if(newSquare.x === leftCastlingXvalue) { // it is a right castling
            let leftRook = piece.info.name === "WKG"? "RA1":"RA8";
            piecesCopy = {
                ...piecesCopy,
                [leftRook]: {
                    ...piecesCopy[leftRook],
                    x: newSquare.x + 1,
                }
            }
        }
    }

    //delete piecesCopy[pieceName];
    piecesCopy = {
        ...piecesCopy,
        [pieceName]:newPiecePosition,//computed properity name
    }

    return piecesCopy;
}