import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { formatIDR } from "../Helpers";

export function QrCodeScanner() {
  const webcamRef = useRef(null);
  const [scannedData, setScannedData] = useState("");
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setScannedData(code.data);
        }
      };
    }
  };

  useEffect(() => {
    const interval = setInterval(capture, 1000); // Capture every second
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="scaning-product">
      <div className="find-product d-flex justify-content-between align-items-center">
        <h2>Toko Agus Jaya</h2>
        <div className="btn-group">
          <button className="btn btn-sm btn-icon btn-info" type="button">
            <i className="bi bi-qr-code-scan fs-2x"></i>
          </button>
          <button className="btn btn-sm btn-light-info" type="button">
            <span className="text-uppercase ms-1">Start Scanner</span>
          </button>
        </div>
      </div>

      <div className="scaners my-5">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
        />
        <p>Scanned Data: {scannedData}</p>
      </div>

      <div className="my-5 table-responsive">
        <h4>Daftar Product</h4>
        <table className="table table-row-dashed align-middle gs-0 gy-3 my-0">
          <thead>
            <tr className="fs-7 fw-bold text-gray-500 border-bottom-0">
              <th width="5%">No</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {ListProduct.map((v, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{v.name}</td>
                <td>{formatIDR(v.price)}</td>
                <td>{v.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ListProduct = [
  { id: 1, name: "Mie Goreng", price: 5000, code: 12345678, stock: 123 },
  { id: 2, name: "Mie Kuah", price: 4000, code: 987654321, stock: 20 },
  { id: 3, name: "Wafer", price: 15000, code: 67898232323, stock: 13 },
  { id: 4, name: "Kecap", price: 18500, code: 342324234234, stock: 3 },
  { id: 5, name: "Saos", price: 5500, code: 5645645654645, stock: 5 },
];
