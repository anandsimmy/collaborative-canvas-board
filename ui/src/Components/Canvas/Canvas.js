import React, { useState, useEffect } from 'react';
import './Canvas.css';

const Canvas = () => {

    const [color, setColor] = useState('green');
    
    useEffect(() => {
        const mouseMoveHandler = (e) => findxy('move', e)
        const mouseDownHandler = (e) => findxy('down', e)
        const mouseUpHandler = (e) => findxy('up', e)
        
        let prevX = 0, currX = 0, prevY = 0, currY = 0, flag= false, dot_flag= false;

        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        canvas.addEventListener("mousemove", mouseMoveHandler);
        canvas.addEventListener("mousedown", mouseDownHandler);
        canvas.addEventListener("mouseup", mouseUpHandler);
    
        const draw= (e) => {
        console.log(currY, e)
        context.beginPath();
        context.moveTo(prevX, prevY);
        context.lineTo(currX, currY);
        context.strokeStyle = color;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    }
    
    function findxy(res, e) {
        if (res === 'down') {
            prevX = canvas.offsetLeft;
            prevY = canvas.offsetTop;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
    
            flag = true;
            dot_flag = true;
            if (dot_flag) {
                context.beginPath();
                context.fillStyle = color;
                context.fillRect(currX, currY, 2, 2);
                context.closePath();
                dot_flag = false;
            }
        }
        if (res === 'up' || res === "out") {
            flag = false;
        }
        if (res === 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw(e);
            }
        }
    }
        
    return () => {
        canvas.removeEventListener("mousemove", mouseMoveHandler);
        canvas.removeEventListener("mousedown", mouseDownHandler);
        canvas.removeEventListener("mouseup", mouseUpHandler);
    }
}, [color])

    return (
        <div className='canvas-wrapper'>
            <input
                className='color-picker'
                type='color'
                defaultValue='#00FF00'
                style={{backgroundColor: color}}
                onChange={(e) => setColor(e.target.value)}
            />
            <canvas className='canvas' id='canvas' height='700px' width='1400px'></canvas>
        </div>
    )

}

export default Canvas