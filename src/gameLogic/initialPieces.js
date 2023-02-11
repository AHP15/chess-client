const  initialPieces = {
    // white pieces
    RH1:{name:"WR", x:7, y:0, color:"white",isFirstMove:true, image: 'white-rook.png'},//white Rook
    RA1:{name:"WR", x:0, y:0, color:"white", isFirstMove:true, image: 'white-rook.png'},//white Rook
    KNG1:{name:"WKN", x:6, y:0, color:"white", image: 'right-white-knight.png'},//white Knight
    KNB1:{name:"WKN", x:1, y:0, color:"white", image: 'left-white-knight.png'},//white Knight
    BF1:{name:"WB", x:5, y:0, color:"white", image: 'white-bishop.png'},//white Bishop
    BC1:{name:"WB", x:2, y:0, color:"white", image: 'white-bishop.png'},//white Bishop
    QD1:{name:"WQ", x:3, y:0, color:"white", image: 'white-queen.png'},//white Queen
    //white King
    KGE1:{name:"WKG", x:4, y:0, color:"white", isFirstMove:true, image: 'white-king.png'},
    //white Pawn
    PA2:{name:"WP", x:0, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'},
    //white Pawn
    PB2:{name:"WP", x:1, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'},
    //white Pawn
    PC2:{name:"WP", x:2, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'},
    //white Pawn
    PD2:{name:"WP", x:3, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'},
    //white Pawn
    PE2:{name:"WP", x:4, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'},
    //white Pawn
    PF2:{name:"WP", x:5, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'},
    //white Pawn
    PG2:{name:"WP", x:6, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'},
    //white Pawn
    PH2:{name:"WP", x:7, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'},

    // black pieces
    RA8:{name:"BR", x:0, y:7, color:"black", isFirstMove:true, image: 'black-rook.png'},//black Rook
    RH8:{name:"BR", x:7, y:7, color:"black", isFirstMove:true, image: 'black-rook.png'},//black Rook
    KNB8:{name:"BKN", x:1, y:7, color:"black", image: 'left-black-knight.png'},//black Knight
    KNG8:{name:"BKN", x:6, y:7, color:"black", image: 'right-black-knight.png'},//black Knight
    BC8:{name:"BB", x:2, y:7, color:"black", image: 'black-bishop.png'},//black Bishop
    BF8:{name:"BB", x:5, y:7, color:"black", image: 'black-bishop.png'},//black Bishop
    QE8:{name:"BQ", x:3, y:7, color:"black", image: 'black-queen.png'},//black Queen
    //black King
    KGD8:{name:"BKG", x:4, y:7, color:"black",isFirstMove:true, image: 'black-king.png'},
    //black Pawn
    PA7:{name:"BP", x:0, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'},
    //black Pawn
    PB7:{name:"BP", x:1, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'},
    //black Pawn
    PC7:{name:"BP", x:2, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'},
    //black Pawn
    PD7:{name:"BP", x:3, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'},
    //black Pawn
    PE7:{name:"BP", x:4, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'},
    //black Pawn
    PF7:{name:"BP", x:5, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'},
    //black Pawn
    PG7:{name:"BP", x:6, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'},
    //black Pawn
    PH7:{name:"BP", x:7, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'},
};


export default initialPieces;