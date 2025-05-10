'use client';
import QRScannerComponent from "@/component/QRScannerComponent";
import Image from "next/image";
import QrScanner from "qr-scanner";

export default function Home() {

// For backwards compatibility, omitting the options object will currently use the old api, returning scan results as
// simple strings. This old api will be removed in the next major release, by which point the options object is then
// also not required anymore to enable the new api.
// const qrScanner = new QrScanner(
//     videoElem,
//     result => console.log('decoded qr code:', result),
//     // No options provided. This will use the old api and is deprecated in the current version until next major version.
// );
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <QRScannerComponent></QRScannerComponent>
       </main>
    </div>
  );
}
