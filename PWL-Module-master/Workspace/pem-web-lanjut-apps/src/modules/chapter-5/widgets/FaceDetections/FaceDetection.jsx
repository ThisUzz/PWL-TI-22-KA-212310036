import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

export function FaceDetection() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const modelRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        async function loadModel() {
            modelRef.current = await blazeface.load();
        }

        loadModel();
    }, []);

    useEffect(() => {
        if (videoLoaded && isDetecting) {
            const detectFaces = async () => {
                if (!videoRef.current || !canvasRef.current || !modelRef.current) {
                    return;
                }

                const predictions = await modelRef.current.estimateFaces(videoRef.current, false);

                // Gambar hasil deteksi di canvas
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) {
                    return;
                }
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                predictions.forEach(prediction => {
                    const start = prediction.topLeft;
                    const end = prediction.bottomRight;
                    const size = [end[0] - start[0], end[1] - start[1]];

                    // Gambar kotak di sekitar wajah
                    ctx.beginPath();
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 2;
                    ctx.rect(start[0], start[1], size[0], size[1]);
                    ctx.stroke();
                });

                if (isDetecting) {
                    requestAnimationFrame(detectFaces);
                }
            };

            detectFaces();
        }
    }, [videoLoaded, isDetecting]);

    const handlePlay = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                setStream(stream);
                videoRef.current.onloadedmetadata = () => {
                    setVideoLoaded(true);
                    videoRef.current.play(); // Panggil play() setelah video dimuat
                    setIsDetecting(true);
                };
            });
    };

    const handleStop = () => {
        setIsDetecting(false);
        setVideoLoaded(false);
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    return (
        <div className='m-auto'>
            <div className="text-center">
                <div className='btn-group'>
                    {stream ? (
                        <button className='btn btn-lg px-10 btn-danger' onClick={handleStop}>Stop</button>
                    ) : (
                        <button className='btn btn-lg px-10 btn-success' onClick={handlePlay}>Play</button>
                    )}
                </div>
            </div>
            <div className='m-auto' style={{ position: 'relative', width: '640px', height: '480px' }}>
                <video ref={videoRef} width="640" height="480" style={{ position: 'absolute', top: 0, left: 0 }} />
                <canvas ref={canvasRef} width="640" height="480" style={{ position: 'absolute', top: 0, left: 0 }} />
            </div>
        </div>
    );
}

