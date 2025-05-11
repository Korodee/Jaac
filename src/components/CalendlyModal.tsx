import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CalendlyModalProps {
    isOpen: boolean;
    onClose: () => void;
    customerName: string;
    customerEmail: string;
}

export default function CalendlyModal({
    isOpen,
    onClose,
    customerName,
    customerEmail,
}: CalendlyModalProps) {
    const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

    useEffect(() => {
        // Load Calendly script
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        script.onload = () => setIsCalendlyLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (isCalendlyLoaded && isOpen) {
            // Initialize Calendly inline widget
            (window as any).Calendly.initInlineWidget({
                url: "https://calendly.com/your-calendly-username",
                parentElement: document.getElementById("calendly-inline"),
                prefill: {
                    name: customerName,
                    email: customerEmail,
                },
                utm: {
                    utmSource: "JAAC Website",
                    utmMedium: "Booking",
                },
            });
        }
    }, [isCalendlyLoaded, isOpen, customerName, customerEmail]);

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl shadow-xl">
                    <div className="flex justify-between items-center p-4 border-b">
                        <Dialog.Title className="text-xl font-semibold text-gray-900">
                            Schedule Your Session
                        </Dialog.Title>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-4">
                        <div
                            id="calendly-inline"
                            className="min-h-[600px] w-full"
                        />
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
