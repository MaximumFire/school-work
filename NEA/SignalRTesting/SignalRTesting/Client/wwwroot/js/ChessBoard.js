﻿export function initialise() {
    let chessPiece = null;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let parentRect = null;
    let percentX = 0;
    let percentY = 0;
    let selected = null;

    const grid = document.querySelector(".chess-grid");
    const hoverSquare = document.querySelector(".hover-square");
    const currMoveStartSquare = document.querySelector("#curr-move-start");

    const clamp = (value) => Math.max(-50, Math.min(value, 800));

    document.querySelectorAll(".chess-piece").forEach(piece => {
        piece.addEventListener("mousedown", function (e) {
            if (e.button === 0) {
                if (selected === null) {
                    isDragging = true;
                    const rect = piece.getBoundingClientRect();
                    offsetX = (rect.width / 2);
                    offsetY = (rect.height / 2);
                    piece.classList.add("grabbing");
                    chessPiece = piece;
                    parentRect = chessPiece.parentElement.getBoundingClientRect();
                    selected = piece;

                    var startSquareClass = findSquareClass(piece).split("-");
                    var squareX = startSquareClass[1];
                    var squareY = startSquareClass[2];
                    removeSquareClass(currMoveStartSquare);
                    currMoveStartSquare.classList.add(`square-${squareX}-${squareY}`);
                    currMoveStartSquare.style = "";

                    handleMouse(e);
                } else if (selected && !isDragging) {
                    isDragging = true;
                    const rect = piece.getBoundingClientRect();
                    offsetX = (rect.width / 2);
                    offsetY = (rect.height / 2);
                    piece.classList.add("grabbing");
                    chessPiece = piece;
                    parentRect = chessPiece.parentElement.getBoundingClientRect();
                    selected = piece;
                    handleMouse(e);
                }
            }
        });
    });

    grid.addEventListener("mousedown", function (e) {
        console.log("here");
    })

    grid.addEventListener("mousemove", handleMouse);

    grid.addEventListener("mouseup", function (e) {
        if (e.button === 0 && isDragging) {
            if (true) { // move is valid
                isDragging = false;
                chessPiece.classList.remove("grabbing", "dragging");
                removeSquareClass(chessPiece);
                chessPiece.classList.add(`square-${Math.trunc((percentY + 50) / 100)}-${Math.trunc((percentX + 50) / 100)}`)
                chessPiece.style = "";
                chessPiece = null;
                selected = null;
                hoverSquare.style = "visibility: hidden;";
                currMoveStartSquare.style = "visibility: hidden;";
            } else { // move is invalid
                chessPiece.classList.remove("grabbing", "dragging");
                isDragging = false;
                hoverSquare.style = "visibility: hidden;";
            }
        }
    });

    function handleMouse (e) {
        if (isDragging && chessPiece && parentRect) {
            percentX = clamp(((e.clientX - parentRect.left - offsetX) / parentRect.width) * 800);
            percentY = clamp(((e.clientY - parentRect.top - offsetY) / parentRect.height) * 800);
            chessPiece.style.transform = `translate(${percentX}%, ${percentY}%)`;
            chessPiece.classList.add("dragging");
            console.log(percentX, percentY);

            removeSquareClass(hoverSquare);
            hoverSquare.classList.add(`square-${Math.trunc((percentY + 50) / 100)}-${Math.trunc((percentX + 50) / 100)}`)
            hoverSquare.style = "";
        }
    }

    function removeSquareClass(element) {
        const squareClass = findSquareClass(element);
        if (squareClass) {
            element.classList.remove(squareClass);
        }
    }

    function findSquareClass(element) {
        const squareClassRegex = /^square-\d-\d$/;
        const classes = Array.from(element.classList);
        const squareClass = classes.find(className => squareClassRegex.test(className));
        return squareClass;
    }
}