import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Quagga from "@ericblade/quagga2";
import { formatIDR } from "../Helpers";
import Scanner from "./Scanner";
import { openModal } from "../../../chapter-4/widgets/components/ModalPopUp";

export function Scanners() {
  const sizeCamera = {width:640, height:480};
  const [scanning, setScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [cameraId, setCameraId] = useState(null);
  const [results, setResults] = useState([]);
  const [torchOn, setTorch] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    const enableCamera = async () => {
      await Quagga.CameraAccess.request(null, {});
    };
    const disableCamera = async () => {
      await Quagga.CameraAccess.release();
    };
    const enumerateCameras = async () => {
      const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
      console.log("Cameras Detected: ", cameras);
      return cameras;
    };
    enableCamera()
      .then(disableCamera)
      .then(enumerateCameras)
      .then((cameras) => setCameras(cameras))
      .then(() => Quagga.CameraAccess.disableTorch())
      .catch((err) => openModal({header:"Information", message:"Camera tidak terdeteksi "+err}));
    return () => disableCamera();
  }, []);

  const onTorchClick = useCallback(() => {
    const torch = !torchOn;
    setTorch(torch);
    if (torch) {
      Quagga.CameraAccess.enableTorch();
    } else {
      Quagga.CameraAccess.disableTorch();
    }
  }, [torchOn, setTorch]);


  const listData = ListProduct;
  const ResultData = useMemo(() => {
    let computedData = listData;
    if (results) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) =>
          listData[key].toString().toLowerCase().includes(results)
        );
      });
    }
    return computedData;
  }, [listData, results]);

  return (
    <div className="scaning-product">
      <div className="find-product d-flex justify-content-between align-items-center">
        <h2>Toko Agus Jaya</h2>
        <div className="btn-actions d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button className="btn btn-sm btn-icon btn-info" type="button">
              <i className="bi bi-upc-scan fs-2x"></i>
            </button>
            <button
              className="btn btn-sm btn-light-info"
              type="button"
              onClick={() => setScanning(!scanning)}
            >
              <span className="text-uppercase ms-1">
                {scanning ? "Stop" : "Start"} Scanner
              </span>
            </button>
          </div>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              name="endging"
              className="form-check-input"
              value={torchOn}
              onChange={onTorchClick}
            />
            <label className="form-check-label text-muted">
              {torchOn ? "Disable Torch" : "Enable Torch"}
            </label>
          </div>
        </div>
      </div>

      {scanning && (
        <div className="scaners my-5">
          <div
            className="m-auto bg-light rounded"
            style={{ width: sizeCamera.width, height: sizeCamera.height }}
          >
            <div ref={scannerRef}>
              <canvas
                className="drawingBuffer"
                style={{ position: "absolute" }}
                width={sizeCamera.width}
                height={sizeCamera.height}
              />
              {scanning ? (
                <Scanner
                  scannerRef={scannerRef}
                  cameraId={cameraId}
                  onDetected={(result) => setResults([result])}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}

      <div className="my-5 table-responsive">
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-3 mb-lg-0 bg-white border rounded w-250px">
            <input type="text" className="form-control form-control-sm form-control-flush" defaultValue={results} onChange={(e)=>setResults(e.target.value.toLowerCase())} />
            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  opacity="0.5"
                  x="17.0365"
                  y="15.1223"
                  width="8.15546"
                  height="2"
                  rx="1"
                  transform="rotate(45 17.0365 15.1223)"
                  fill="currentColor"
                ></rect>
                <path
                  d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </div>
          <button className="btn btn-sm bg-light-primary fs-7" disabled={true}>
            <span className="text-primary fw-bold">Total item {ResultData.length}</span>
          </button>
        </div>
        <table className="table table-row-dashed align-middle gs-0 gy-3 my-0">
          <thead>
            <tr className="fs-7 fw-bold text-gray-500 border-bottom-0 text-uppercase">
              <th width="5%">No</th>
              <th>Code</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {ResultData.length > 0 ? (
              ResultData.map((v, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-upc fs-2x"></i>
                      <span className="text-muted fw-bold">{v.code}</span>
                    </div>
                  </td>
                  <td>{v.name}</td>
                  <td>{formatIDR(v.price)}</td>
                  <td>{v.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No record found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ListProduct = [
  { id: 1, name: "Mie Goreng", price: 5000, code: "12345678", stock: 123 },
  { id: 2, name: "Mie Kuah", price: 4000, code: "3410921020914", stock: 20 },
  { id: 3, name: "Wafer", price: 15000, code: "9328251177731", stock: 13 },
  { id: 4, name: "Kecap", price: 18500, code: "0089686590043", stock: 3 },
  { id: 5, name: "Saos", price: 5500, code: "1514102780511", stock: 5 },
  { id: 6, name: "Ciki", price: 8500, code: "4019420590073", stock: 5 },
  
];
