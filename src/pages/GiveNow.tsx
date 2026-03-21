import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const IBAN_DISPLAY = "FI60122030 00177960";
/** Compact form for pasting into banking apps */
const IBAN_COPY = "FI6012203000177960";

const GiveNow = () => {
  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(IBAN_COPY);
      toast.success("IBAN copied to clipboard");
    } catch {
      toast.error("Could not copy. Try selecting the IBAN manually.");
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-start px-4 pt-6 sm:pt-8 pb-8 bg-gray-50">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-8 space-y-6">
          <div>
            <p className="text-sm font-medium text-eecfin-navy uppercase tracking-wide">
              Bank account (Nordea)
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              Ethiopian Evangelical Church in Finland
            </p>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Use your preferred bank app to transfer to this account.
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">IBAN</p>
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="font-mono text-base sm:text-lg text-gray-900 break-all leading-relaxed">
                {IBAN_DISPLAY}
              </p>
              <Button
                type="button"
                onClick={copyIban}
                className="w-full shrink-0 min-h-[48px] bg-eecfin-navy hover:bg-eecfin-navy/90 text-base gap-2 sm:w-auto sm:min-w-[140px]"
              >
                <Copy className="h-5 w-5 shrink-0" aria-hidden />
                Copy IBAN
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs sm:text-sm text-gray-600 leading-relaxed px-1">
          Fundraising permission: RA/2025/336.{" "}
          <Link
            to="/contact"
            className="text-eecfin-navy font-medium underline underline-offset-2"
          >
            Contact Us
          </Link>{" "}
          For More Information.
        </p>
      </div>
    </div>
  );
};

export default GiveNow;
