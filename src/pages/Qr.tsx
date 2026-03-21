import { useState } from "react";

/** Production donation URL — QR always encodes this so scans work from print/staging. */
const GIVE_NOW_PUBLIC_URL = "https://eecfin.org/givenow";

const QR_PX = 300;

/** Public QR image (no npm dependency — avoids stale Docker node_modules missing packages). */
function qrImageUrl(data: string): string {
  const params = new URLSearchParams({
    size: `${QR_PX}x${QR_PX}`,
    margin: "10",
    data,
  });
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
}

const Qr = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center px-4 pt-6 sm:pt-8 pb-8 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-eecfin-navy mb-2 text-center">
        Give
      </h1>
      <p className="text-gray-600 text-center mb-6 max-w-md text-sm sm:text-base leading-relaxed">
        Scan this code with your phone camera to open the quick donation page
        with bank and payment details.
      </p>
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100">
        {!imgError ? (
          <img
            src={qrImageUrl(GIVE_NOW_PUBLIC_URL)}
            alt="QR code linking to the Give now donation page"
            width={QR_PX}
            height={QR_PX}
            className="block h-[300px] w-[300px] max-w-[min(85vw,340px)] object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-[300px] w-[300px] max-w-[min(85vw,340px)] items-center justify-center rounded-lg border border-amber-200 bg-amber-50 px-3 text-center text-sm text-amber-900">
            Could not load QR image. Check your connection or open the link below.
          </div>
        )}
      </div>
      <p className="mt-6 max-w-md break-all px-2 text-center text-xs text-gray-500 sm:text-sm">
        {GIVE_NOW_PUBLIC_URL}
      </p>
      <a
        href={GIVE_NOW_PUBLIC_URL}
        className="mt-6 text-sm font-medium text-eecfin-navy underline underline-offset-4 hover:text-eecfin-navy/80"
      >
        Open Give now
      </a>
    </div>
  );
};

export default Qr;
