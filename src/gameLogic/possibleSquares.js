import CALCULATE_POSSIBLE_MOVES_FOR_A_PAWN from "./pawnCalculation";
import CALCULATE_POSSIBLE_MOVES_FOR_A_ROOK from "./rookCalculation";
import CALCULATE_POSSIBLE_MOVES_FOR_BISHOP from "./bishopCalculation";
import CALCULATE_POSSIBLE_MOVES_FOR_A_KNIGHT from "./knightCalculation";
import CALCULATE_POSSIBLE_MOVES_FOR_A_KING from "./kingCalculation";
import IS_KING_IN_CHECK from "./isKingInCheck";

export default function CALCULATE_POSSIBLE_MOVES_FOR_A_PIECE(pieces, piece, king) {

    let pieceInfo = piece.info;

    //if moving this piece will cause a check to the king with the same color
    //then no possibleMoves for this piece: return []
    if (king.color === pieceInfo.color && king.name !== pieceInfo.name) {
        let piecesCopy = { ...pieces };
        delete piecesCopy[piece.publicName];
        let moveCauseCheck = IS_KING_IN_CHECK(king, piecesCopy).isInCheck;

        if (moveCauseCheck) {
            return [];
        }
    }

    switch(pieceInfo.name){
        case 'WP':
        case 'BP':
            return CALCULATE_POSSIBLE_MOVES_FOR_A_PAWN(pieceInfo, pieces);

        case 'WR':
        case 'BR':
            return CALCULATE_POSSIBLE_MOVES_FOR_A_ROOK(pieceInfo, pieces);

        case 'WB':
        case 'BB':
            return CALCULATE_POSSIBLE_MOVES_FOR_BISHOP(pieceInfo, pieces);

        case 'WQ':
        case 'BQ':
            return [
                ...CALCULATE_POSSIBLE_MOVES_FOR_A_ROOK(pieceInfo, pieces),
                ...CALCULATE_POSSIBLE_MOVES_FOR_BISHOP(pieceInfo, pieces)
            ];
        
        case 'WKN':
        case 'BKN':
            return CALCULATE_POSSIBLE_MOVES_FOR_A_KNIGHT(pieceInfo, pieces);

        case 'WKG':
        case 'BKG':
            return CALCULATE_POSSIBLE_MOVES_FOR_A_KING(pieceInfo, pieces);
        default:
            return [];
    }
}
