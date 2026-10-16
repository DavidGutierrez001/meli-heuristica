import { gsap } from "gsap";
import { useLayoutEffect, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

function Modal({ saveMedia, onClose }) {
    const overlayRef = useRef(null);
    const mediaRef = useRef(null);

    useLayoutEffect(() => {
        if (!saveMedia) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        });

        const mediactx = gsap.context(() => {
            gsap.fromTo(
                mediaRef.current,
                { clipPath: "inset(50% 0% 50% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: .5, ease: "power2.out" }
            );
        });

        const handleEscape = (e) => {
            if (e.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", handleEscape);

        return () => {
            ctx.revert();
            mediactx.revert();
            document.removeEventListener("keydown", handleEscape);
        };

    }, [saveMedia, onClose]);

    const isClosing = useRef(false);

    if (!saveMedia) return null;

    const handleClose = () => {
        if (isClosing.current) return; // evita doble clic mientras anima
        isClosing.current = true;

        // por si la animación de apertura sigue en curso
        gsap.killTweensOf([overlayRef.current, mediaRef.current]);

        gsap.timeline({
            onComplete: () => {
                isClosing.current = false;
                onClose(); // ahora sí el padre pone saveMedia en null
            },
        })
            .to(mediaRef.current, {
                clipPath: "inset(50% 0% 50% 0%)",
                duration: 0.4,
                ease: "power2.in",
            })
            .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    };





    return (
        <div
            className="overlay fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-5 backdrop-blur-sm"
            onClick={handleClose}
            ref={overlayRef}
        >
            <div
                className="rounded-xl max-w-6xl w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <Button variant="ghost" onClick={handleClose} className="absolute top-0 -right-20 w-15 h-15 rounded-full bg-secondary">
                    < X strokeWidth={1} className="size-8" />
                </Button>
                <div ref={mediaRef} className="w-full h-full relative">
                    {saveMedia.type === "video" ? (
                        <video
                            className="w-full rounded-xl object-cover"
                            src={`/videos/${saveMedia.hallazgo}.mp4`}
                            autoPlay
                            muted
                            controls
                        />
                    ) : (
                        <img
                            className="w-full rounded-xl"
                            src={`/${saveMedia.hallazgo}.svg`}
                            alt={`Problema heurístico ${saveMedia.hallazgo}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;