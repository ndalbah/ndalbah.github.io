import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
    subtitle: { min: 350, max: 850, default: 350 },
    title: { min: 400, max: 900, default: 400 }
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
            {char === " " ? '\u00A0' : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return () => { };
    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'wght' ${weight}`
        });
    };

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;
        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 2000);
            animateLetter(letter, min + (max - min) * intensity);
        });
    };

    const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3));

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@splinetool/viewer@1.12.73/build/spline-viewer.js";
        script.type = "module";
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, "title");
        const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
        return () => {
            subtitleCleanup();
            titleCleanup();
        };
    }, []);

    return (
        <section id="welcome" className="relative w-dvw h-dvh flex flex-col items-center select-none overflow-hidden">
            <div className="text-center z-10 pt-6 shrink-0">
                <p ref={subtitleRef} className="mb-1">
                    {renderText("Welcome to my portfolio! I'm", "text-2xl font-georama text-gray-300", 350)}
                </p>
                <h1 ref={titleRef}>
                    {renderText("Noah Dalbah", "text-6xl italic font-georama text-gray-100")}
                </h1>
            </div>

            <div
                className="flex-1 w-full flex items-center justify-center overflow-hidden"
                style={{
                    transform: "translateY(-100px) scale(1.3)",
                    transformOrigin: "center center"
                }}
            >
                <spline-viewer
                    url="https://prod.spline.design/dbfDMec7Ir1Lt1Jt/scene.splinecode"
                    style={{ width: "100%", height: "100%", display: "block" }}
                ></spline-viewer>
            </div>

            <div className="small-screen">
                <p>This Portfolio is designed for desktop/tablet screens only.</p>
            </div>
        </section>
    );
};

export default Welcome;