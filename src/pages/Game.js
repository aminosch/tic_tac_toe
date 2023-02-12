import React, { useState, useEffect } from 'react';
import '../assets/css/Box.css'

function Game() {


    const n = 10;
    const nbSeriesWinner = 5;
    const [end, setEnd] = useState(false)
    //const [result, setResult] = useState("")
    const [player, setPlayer] = useState(true)
    const [beginer, setBeginer]=useState(true)
    const [nbAttempt, setNbAttempt] = useState(0)
    const [winner, setWinner] = useState(null)
    const [matrix, setMatrix] = useState(Array.from({ length: n }, () => Array.from({ length: n }, () => null)));
    const [seriesWinner, setSeriesWinner] = useState(Array.from({ length: nbSeriesWinner }, () => Array.from({ length: 2 }, () => null)));
    const [oScore, setOScore] = useState(0)
    const [xScore, setXScore] = useState(0)
    const [message, setMessage] = useState("O plays")
    const [effect, setEffect] = useState(false)
    

    useEffect((winner) => {
        if (winner!==null) {
            const timer =setTimeout(() => {
                setEffect(!effect)
            }, 500);
            return () => clearTimeout(timer);
        }

    }, [effect]);

    const handelClear = () => {
        handelNewGame();
        setOScore(0)
        setXScore(0)
        //setPlayer(true)

    }
    const handelNewGame = () => {
        let copy = [...matrix];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                copy[i][j] = null
            }
        }
        setMatrix(copy)
        setEnd(false)
        setNbAttempt(0)
        setWinner(null)
        let b= !beginer
        setBeginer(b)
        setPlayer(b)
        setMessage((!b ? "X" : "O") + " plays")
    }
    const handelClick = (row, column) => {
        if (!end) {
            let copy = [...matrix];
            if (!copy[row][column]) {
                copy[row][column] = player ? "O" : "X";
                setMatrix(copy);
                var ver = verif(row, column)
                if (ver.find) {
                    //console.log(ver.mat)
                    setSeriesWinner(ver.mat)
                    if (ver.pwinner === "O") {

                        setOScore(oScore + 1)
                    }
                    else {
                        setXScore(xScore + 1)
                    }
                    setMessage(ver.pwinner + " wins")
                    setEnd(true)
                    setWinner(ver.pwinner)
                }
                else {
                    setNbAttempt(nbAttempt + 1)
                    if (nbAttempt === n * n - 1) {
                        setMessage("Egality")
                        setEnd(true)
                    }
                    else {
                        setPlayer(!player);
                        setMessage((player ? "X" : "O") + " plays")

                    }
                }



            }
        }

    }

    const isWinner = (row, column) => {
        let i = 0;
        while (i < nbSeriesWinner) {
            if (row === seriesWinner[i][0] && column === seriesWinner[i][1]) {
                return true
            }
            i++
        }
        return false
    }

    const verif = (row, column) => {
        var matrixWinner = new Array(nbSeriesWinner)
        for (let i = 0; i < nbSeriesWinner; i++) {
            matrixWinner[i] = new Array(2)
        }



        //Column verification = left column verification + right column verification
        let i = row;
        let nbSeries = 0;
        //left column verification
        let j = column;
        let hope = true;
        matrixWinner[0][0] = i;
        matrixWinner[0][1] = j;
        while (hope === true && j > 0) {
            if (matrix[i][j] === matrix[i][j - 1]) {
                nbSeries++;
                matrixWinner[nbSeries][0] = i
                matrixWinner[nbSeries][1] = j - 1
                if (nbSeries === nbSeriesWinner - 1) {
                    return { find: true, pwinner: matrix[row][column], mat: matrixWinner }
                }
            }
            else {
                hope = false;
            }
            j--;
        }
        //right column verification
        j = column;
        hope = true
        while (hope === true && j < n - 1) {
            if (matrix[i][j] === matrix[i][j + 1]) {
                nbSeries++;
                matrixWinner[nbSeries][0] = i
                matrixWinner[nbSeries][1] = j + 1

                if (nbSeries === nbSeriesWinner - 1) {
                    return { find: true, pwinner: matrix[row][column], mat: matrixWinner }
                }

            } else {
                hope = false
            }
            j++;
        }

        //Row verification = Top row verification + down row verification
        j = column;
        nbSeries = 0;
        //Top row verification
        i = row;
        hope = true;
        matrixWinner[0][0] = i;
        matrixWinner[0][1] = j;
        while (hope === true && i > 0) {
            if (matrix[i][j] === matrix[i - 1][j]) {
                nbSeries++;
                matrixWinner[nbSeries][0] = i - 1
                matrixWinner[nbSeries][1] = j

                if (nbSeries === nbSeriesWinner - 1) {
                    return { find: true, pwinner: matrix[row][column], mat: matrixWinner }
                }
            }
            else {
                hope = false;
            }
            i--;
        }
        //down row verification
        i = row;
        hope = true
        matrixWinner[0][0] = i;
        matrixWinner[0][1] = j;
        while (hope === true && i < n - 1) {
            if (matrix[i][j] === matrix[i + 1][j]) {
                nbSeries++;
                matrixWinner[nbSeries][0] = i + 1
                matrixWinner[nbSeries][1] = j

                if (nbSeries === nbSeriesWinner - 1) {
                    return { find: true, pwinner: matrix[row][column], mat: matrixWinner }
                }

            } else {
                hope = false
            }
            i++;
        }

        //Left diagonal verification = Top left diagonal verification + down left diagonal verification
        i = row;
        j = column;
        nbSeries = 0;
        //Top left diagonal verification
        hope = true;
        matrixWinner[0][0] = i;
        matrixWinner[0][1] = j;
        while (hope === true && i > 0 && j > 0) {
            if (matrix[i][j] === matrix[i - 1][j - 1]) {
                nbSeries++;
                matrixWinner[nbSeries][0] = i - 1
                matrixWinner[nbSeries][1] = j - 1

                if (nbSeries === nbSeriesWinner - 1) {
                    return { find: true, pwinner: matrix[row][column], mat: matrixWinner }
                }
            }
            else {
                hope = false;
            }
            i--;
            j--;
        }
        //down left diagonal verification
        i = row;
        j = column
        hope = true
        while (hope === true && i < n - 1 && j < n - 1) {
            if (matrix[i][j] === matrix[i + 1][j + 1]) {
                nbSeries++;
                matrixWinner[nbSeries][0] = i + 1
                matrixWinner[nbSeries][1] = j + 1

                if (nbSeries === nbSeriesWinner - 1) {
                    return { find: true, pwinner: matrix[row][column], mat: matrixWinner }
                }

            } else {
                hope = false
            }
            i++;
            j++;
        }

        //right diagonal verification = Top right diagonal verification + down right diagonal verification
        i = row;
        j = column;
        nbSeries = 0;
        matrixWinner[0][0] = i;
        matrixWinner[0][1] = j;
        //Top right diagonal verification
        hope = true;
        while (hope === true && i > 0 && j < n - 1) {
            if (matrix[i][j] === matrix[i - 1][j + 1]) {
                nbSeries++;
                matrixWinner[nbSeries][0] = i - 1
                matrixWinner[nbSeries][1] = j + 1

                if (nbSeries === nbSeriesWinner - 1) {
                    return { find: true, pwinner: matrix[row][column], mat: matrixWinner }
                }
            }
            else {
                hope = false;
            }
            i--;
            j++;
        }
        //down right diagonal verification
        i = row;
        j = column
        hope = true
        while (hope === true && i < n - 1 && j > 0) {
            if (matrix[i][j] === matrix[i + 1][j - 1]) {
                nbSeries++;
                matrixWinner[nbSeries][0] = i + 1
                matrixWinner[nbSeries][1] = j - 1

                if (nbSeries === nbSeriesWinner - 1) {
                    return { find: true, pwinner: matrix[row][column], mat: matrixWinner }
                }

            } else {
                hope = false
            }
            i++;
            j--;
        }
        return { find: false };
    }



    return (
        <div className="container">
            <div className='controls'>
                <button onClick={handelNewGame}>New game</button>
                <button onClick={handelClear}>Clear history</button>
            </div>
            <div className='result'>
                <span className={`score oscore ${player && "oturn"}`}>O-Score: {oScore}</span> &nbsp;
                <span className={`score xscore ${!player && "xturn"}`}>X-Score: {xScore}</span>
            </div>
            <div className='message'>
                {message}
            </div>
            <div className='matrix'>
                <table>
                    <tbody>
                        {matrix.map((row, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {row.map((column, columnIndex) => {
                                        if (end && winner && isWinner(rowIndex, columnIndex)) {
                                            if (matrix[rowIndex][columnIndex] === 'O') {
                                                return (
                                                    <td key={columnIndex}>
                                                        < div className={`box red ${effect && "winner"}`}>
                                                            {matrix[rowIndex][columnIndex]}
                                                        </div>
                                                    </td>
                                                )
                                            }
                                            else {
                                                return (
                                                    <td key={columnIndex}>
                                                        < div className={`box blue ${effect && "winner"}`}>
                                                            {matrix[rowIndex][columnIndex]}
                                                        </div>
                                                    </td>
                                                )
                                            }
                                        }
                                        if (matrix[rowIndex][columnIndex] === null) {
                                            return (
                                                <td key={columnIndex}>
                                                    < div className="box" onClick={() => handelClick(rowIndex, columnIndex)}>
                                                        {matrix[rowIndex][columnIndex]}
                                                    </div>
                                                </td>
                                            )
                                        }
                                        else if (matrix[rowIndex][columnIndex] === "O") {
                                            return (
                                                <td key={columnIndex}>
                                                    < div className="box red">
                                                        {matrix[rowIndex][columnIndex]}
                                                    </div>
                                                </td>
                                            )
                                        }
                                        else {
                                            return (
                                                <td key={columnIndex}>
                                                    < div className="box blue">
                                                        {matrix[rowIndex][columnIndex]}
                                                    </div>
                                                </td>
                                            )
                                        }
                                    })}
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




export default Game;