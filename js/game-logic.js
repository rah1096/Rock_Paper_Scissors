// All code should be written in this file.
//Player One
let playerOneMoveOneType, playerOneMoveTwoType, playerOneMoveThreeType, playerOneMoveOneValue, playerOneMoveTwoValue, playerOneMoveThreeValue;
//Player Two
let playerTwoMoveOneType, playerTwoMoveTwoType, playerTwoMoveThreeType, playerTwoMoveOneValue, playerTwoMoveTwoValue, playerTwoMoveThreeValue;

const validType = type => {
    return (type === 'rock') ||
        (type === 'scissors') ||
        (type === 'paper');
}

const validValue = value => {
    return (value >= 1) && (value <= 99);
}

const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {

    const moveTypes = [moveOneType, moveTwoType, moveThreeType];
    const moveValues = [moveOneValue, moveTwoValue, moveThreeValue];

    const checkMoveTypes = type => /^(rock|paper|scissors)$/.test(type);

    if (!validType(moveOneType) ||
        !validType(moveTwoType) ||
        !validType(moveThreeType)) {
        return;
    }

    if (!validValue(moveOneValue) ||
        !validValue(moveTwoValue) ||
        !validValue(moveThreeValue)) {
        return;
    }

    if (/^Player (One$|Two$)/.test(player)
        && moveTypes.every(checkMoveTypes)
        && (moveOneValue + moveTwoValue + moveThreeValue) < 100
        && moveOneValue > 0 && moveTwoValue > 0
        && moveThreeValue > 0) {
        switch(player) {
            case 'Player One':
                playerOneMoveOneType = moveOneType;
                playerOneMoveTwoType = moveTwoType;
                playerOneMoveThreeType = moveThreeType;
                playerOneMoveOneValue = moveOneValue;
                playerOneMoveTwoValue = moveTwoValue;
                playerOneMoveThreeValue = moveThreeValue;
                break;
            case 'Player Two':
                playerTwoMoveOneType = moveOneType;
                playerTwoMoveTwoType = moveTwoType;
                playerTwoMoveThreeType = moveThreeType;
                playerTwoMoveOneValue = moveOneValue;
                playerTwoMoveTwoValue = moveTwoValue;
                playerTwoMoveThreeValue = moveThreeValue;
                break;
            default:
                return;
        }

        console.log('Good');
    }
}

const getRoundWinner = round => {
    switch(round) {
        case 1:
            return getMoveWinner(playerOneMoveOneType,
                                playerOneMoveOneValue,
                                playerTwoMoveOneType,
                                playerTwoMoveOneValue);
        case 2:
            return getMoveWinner(playerOneMoveTwoType,
                                playerOneMoveTwoValue,
                                playerTwoMoveTwoType,
                                playerTwoMoveTwoValue);
        case 3:
            return getMoveWinner(playerOneMoveThreeType,
                                playerOneMoveThreeValue,
                                playerTwoMoveThreeType,
                                playerTwoMoveThreeValue);
        default:
            return null;
    }
}

const getMoveWinner = (playerOneMoveType, playerOneMoveValue, playerTwoMoveType, playerTwoMoveValue) => {

    if (!playerOneMoveType ||
        !playerOneMoveValue ||
        !playerTwoMoveType ||
        !playerTwoMoveValue) {
        return null;
    }

    if (playerOneMoveType === 'rock' && playerTwoMoveType === 'scissors') {
        return 'Player One';
    } else if (playerOneMoveType === 'paper' && playerTwoMoveType === 'rock') {
        return 'Player One';
    } else if (playerOneMoveType === 'scissors' && playerTwoMoveType === 'paper') {
        return 'Player One';
    } else if (playerOneMoveType === playerTwoMoveType) {
        if (playerOneMoveValue > playerTwoMoveValue) {
            return 'Player One';
        } else if (playerOneMoveValue === playerTwoMoveValue) {
            return 'Tie';
        } else {
            return 'Player Two';
        }
    } else {
        return 'Player Two';
    }
}

const getGameWinner = () => {

    let playerOneCount = 0;
    let playerTwoCount = 0;

    if (!playerOneMoveOneType || !playerOneMoveOneValue ||
        !playerOneMoveTwoType || !playerOneMoveTwoValue ||
        !playerOneMoveThreeType || !playerOneMoveThreeValue ||
        !playerTwoMoveOneType || !playerTwoMoveOneValue ||
        !playerTwoMoveTwoType || !playerTwoMoveTwoValue ||
        !playerTwoMoveThreeType || !playerTwoMoveThreeValue) {
        return null;
    }

    if (getRoundWinner(1) === 'Player One') {
        playerOneCount++ ;
    } else if (getRoundWinner(1) === 'Tie') {
        playerOneCount++;
        playerTwoCount++;
    } else {
        playerTwoCount++;
    }

    if (getRoundWinner(2) === 'Player One') {
        playerOneCount++;
    } else if (getRoundWinner(2) === 'Tie') {
        playerOneCount++;
        playerTwoCount++;
    } else {
        playerTwoCount++;
    }

    if (getRoundWinner(3) === 'Player One') {
        playerOneCount++;
    } else if (getRoundWinner(3) === 'Tie') {
        playerOneCount++;
        playerTwoCount++;
    } else {
        playerTwoCount++;
    }

    if (playerOneCount > playerTwoCount) {
        return 'Player One';
    } else if (playerOneCount === playerTwoCount) {
        return 'Tie';
    } else {
        return 'Player Two';
    }
}

const setComputerMoves = () => {
    let player2Values = [playerTwoMoveOneValue, playerTwoMoveTwoValue, playerTwoMoveThreeValue];
    let types = ["rock", "paper", "scissors"];

    playerTwoMoveOneType = types[getRandomInt(0, 4)];
    playerTwoMoveTwoType = types[getRandomInt(0, 4)];
    playerTwoMoveThreeType = types[getRandomInt(0, 4)];

    playerTwoMoveOneValue = getRandomInt(1, 99 - 2);
    playerTwoMoveTwoValue = getRandomInt(1, 99 - 1 - playerTwoMoveOneValue);
    playerTwoMoveThreeValue = 99 - playerTwoMoveOneValue - playerTwoMoveTwoValue;

    setPlayerMoves('Player Two', playerTwoMoveOneType, playerTwoMoveOneValue, playerTwoMoveTwoType, playerTwoMoveTwoValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);

}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min));
}