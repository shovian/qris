import { useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { QRCodeSVG } from 'qrcode.react'; // Import QRCodeSVG

export default function QRScannerComponent() {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [inputData, setInputData] = useState<string>('');

  useEffect(() => {
    // Make sure the code runs only in the browser
    if (typeof window !== 'undefined') {
      const videoElem = document.getElementById("xx") as HTMLVideoElement || document.createElement("video");
      document.body.appendChild(videoElem); // Append to the body or your desired container

      const qrScanner = new QrScanner(
        videoElem,
        result => {
          console.log('Decoded QR code:', result);
          setQrCodeData(result.data); // Update state with decoded result

          // Check if the decoded QR code is a valid URL
          if (isValidUrl(result.data)) {
            window.location.href = result.data; // Redirect to the valid URL
          }
        },
        { returnDetailedScanResult: true } // Optional, for more details
      );

      qrScanner.start(); // Start the QR scanner

      // Clean up on component unmount
      return () => {
        qrScanner.destroy(); // Clean up resources
      };
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  // Function to validate URL
  const isValidUrl = (url: string) => {
    const regex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[^\s]*)?$/i;
    return regex.test(url);
  };

  return (
    <div>
      <h1>QR Scanner & Generator</h1>
      
      <div>
        <h2>Scan a QR Code</h2>
        <video id="xx" width="100%" height="auto" />
        
        {/* Display the QR code data if available */}
        {qrCodeData ? (
          <div>
            <h3>Decoded QR Code Data:</h3>
            <pre>{qrCodeData.toString()}</pre>
          </div>
        ) : (
          <p>Scan a QR code to see the data here.</p>
        )}
      </div>

      <hr />
      
      <div>
        <h2>Generate a QR Code</h2>
        <input
          type="text"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Enter text to generate QR"
        />
        <div>
          {inputData && <QRCodeSVG value={inputData} size={256} />}
        </div>
      </div>
    </div>
  );
}
