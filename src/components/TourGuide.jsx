import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";

const TOUR_STEPS = [
    {
        id: 0,
        message: "Hey there! I'm Cursor 👋\nWelcome to Noah's portfolio!",
        subtext: "Let me show you around.",
        x: 93, y: 82,
        bubbleDir: "bottom",
    },
    {
        id: 1,
        message: "This is the desktop.\nExplore it just like a real Mac!",
        subtext: "Click on apps to open windows.",
        x: 30, y: 45,
        bubbleDir: "top",
    },
    {
        id: 2,
        message: "📁 Open the Portfolio app\nto learn more about Noah.",
        subtext: "It works just like macOS Finder!",
        targetId: "finder",
        bubbleDir: "bottom",
        highlight: "finder",
    },
    {
        id: 3,
        message: "💼 View the Skills app\nto see Noah's full tech stack.",
        subtext: "Everything from styling to databases and dev tools.",
        targetId: "terminal",
        bubbleDir: "bottom",
        highlight: "safari",
    },
    {
        id: 4,
        message: "🌐 Check out the Projects\napp for full project details.",
        subtext: "GitHub links and tech stack inside.",
        targetId: "safari",
        bubbleDir: "bottom",
        highlight: "resume",
    },
    {
        id: 5,
        message: "📬 Head to the Contact app\nto get in touch.",
        subtext: "All socials and email in one place.",
        targetId: "contact",
        bubbleDir: "bottom",
        highlight: "contact",
    },
    {
        id: 6,
        message: "That's everything!\nEnjoy exploring 🚀",
        subtext: "Click to close — have fun!",
        x: 97, y: 87,
        bubbleDir: "bottom",
    },
];

const BUTTON_TARGET = { x: 97, y: 87 };

const CursorCharacter = ({ isWalking, isClicking, isIdle }) => (
    <svg
        width="44"
        height="52"
        viewBox="0 0 44 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible", display: "block" }}
    >
        <ellipse cx="7" cy="50" rx="5" ry="2" fill="rgba(0,0,0,0.15)" />

        <path
            d="M4 2 L4 38 L11 31 L17 46 L22 44 L16 29 L26 29 Z"
            fill="white"
            stroke="#1a2a4a"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
                transformOrigin: "4px 2px",
                animation: isClicking
                    ? "cursorClick 0.25s ease-in-out"
                    : isWalking
                        ? "cursorBob 0.38s ease-in-out infinite alternate"
                        : isIdle
                            ? "cursorIdle 3.5s ease-in-out infinite"
                            : "none",
            }}
        />

        <circle
            cx="17"
            cy="46"
            r="3.5"
            fill={isClicking ? "#FFD93D" : "#5B8DEF"}
            style={{
                transition: "fill 0.15s",
                filter: isClicking ? "drop-shadow(0 0 6px #FFD93D)" : "none",
            }}
        />

        {isWalking && (
            <>
                <circle cx="30" cy="16" r="1.5" fill="#5B8DEF" opacity="0.6"
                        style={{ animation: "sparkle 0.55s ease-out infinite" }} />
                <circle cx="34" cy="25" r="1"   fill="#7DF8FF" opacity="0.5"
                        style={{ animation: "sparkle 0.55s ease-out 0.18s infinite" }} />
                <circle cx="28" cy="33" r="1"   fill="#5B8DEF" opacity="0.4"
                        style={{ animation: "sparkle 0.55s ease-out 0.08s infinite" }} />
            </>
        )}
    </svg>
);

const SpeechBubble = ({ message, subtext, direction, step, total, onNext, onSkip, isVisible, flipLeft }) => {
    const lines = message.split("\n");
    const isLast = step === total - 1;

    const tailLeft = flipLeft ? "auto" : "22px";
    const tailRight = flipLeft ? "22px" : "auto";

    const tailStyle = direction === "bottom"
        ? { bottom: "-10px", left: tailLeft, right: tailRight, borderColor: "white transparent transparent transparent", borderWidth: "10px 8px 0 8px" }
        : { top: "-10px",   left: tailLeft, right: tailRight, borderColor: "transparent transparent white transparent", borderWidth: "0 8px 10px 8px" };


    return (
        <div
            className={
                `tour-bubble 
                ${isVisible ? "tour-bubble--visible" : ""} 
                ${direction === "bottom" ? "tour-bubble--above" : "tour-bubble--below"}
                ${flipLeft ? "tour-bubble--flip-left" : ""}`
            }
            role="dialog"
            aria-label="Tour guide message"
        >
            <span className="tour-bubble__tail" style={tailStyle} />

            <div className="tour-bubble__dots">
                {Array.from({ length: total }).map((_, i) => (
                    <span key={i} className={`tour-bubble__dot ${i === step ? "tour-bubble__dot--active" : ""}`} />
                ))}
            </div>

            <div className="tour-bubble__message">
                {lines.map((line, i) => (
                    <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
                ))}
            </div>

            {subtext && <p className="tour-bubble__subtext">{subtext}</p>}

            <div className="tour-bubble__actions">
                <button className="tour-bubble__skip" onClick={onSkip}>Skip tour</button>
                <button className="tour-bubble__next" onClick={onNext}>
                    {isLast ? "Got it! ✓" : "Next →"}
                </button>
            </div>
        </div>
    );
};

const RestartButton = ({ onClick, spawning }) => (
    <button
        className={`navi-restart-btn ${spawning ? "navi-restart-btn--spawn" : ""}`}
        onClick={onClick}
        title="Restart tour"
    >
        <span className="navi-restart-btn__icon">
            <svg width="13" height="16" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4 2 L4 38 L11 31 L17 46 L22 44 L16 29 L26 29 Z"
                    fill="white"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
        Tour guide
    </button>
);

const TourGuide = forwardRef(({ onHighlight }, ref) => {
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [walkingOut, setWalkingOut] = useState(false);
    const [showRestartBtn, setShowRestartBtn] = useState(false);
    const [btnSpawning, setBtnSpawning] = useState(false);
    const [charPos, setCharPos] = useState({ x: 50, y: 52 });
    const [isWalking, setIsWalking] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isIdle, setIsIdle] = useState(true);
    const [bubbleVisible, setBubbleVisible] = useState(false);
    const [displayStep, setDisplayStep] = useState(0);

    const animFrameRef= useRef(null);
    const posRef = useRef({ x: 50, y: 52 });

    const resolveStepPosition = useCallback((step) => {
        if (step.targetId) {
            const el = document.querySelector(`[data-tour-id="${step.targetId}"]`);
            if (el) {
                const rect = el.getBoundingClientRect();
                return {
                    x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
                    y: ((rect.top - 10) / window.innerHeight) * 100,
                };
            }
        }
        return { x: step.x, y: step.y };
    }, []);

    const walkTo = useCallback((newX, newY, onArrival, fast = false) => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

        const dx = newX - posRef.current.x;
        const dy = newY - posRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.4) { onArrival?.(); return; }

        setIsWalking(true);
        setIsIdle(false);
        setBubbleVisible(false);
        if (onHighlight) onHighlight(null);

        const baseSpeed = fast ? 0.6 : Math.min(0.18 + dist * 0.012, 0.55);
        const startX    = posRef.current.x;
        const startY    = posRef.current.y;
        let   progress  = 0;

        const tick = () => {
            progress = Math.min(progress + baseSpeed, dist);
            const t    = progress / dist;
            const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const cx   = startX + dx * ease;
            const cy   = startY + dy * ease;
            posRef.current = { x: cx, y: cy };
            setCharPos({ x: cx, y: cy });

            if (progress < dist) {
                animFrameRef.current = requestAnimationFrame(tick);
            } else {
                posRef.current = { x: newX, y: newY };
                setCharPos({ x: newX, y: newY });
                setIsWalking(false);
                onArrival?.();
            }
        };

        animFrameRef.current = requestAnimationFrame(tick);
    }, [onHighlight]);

    const dismiss = useCallback(() => {
        setBubbleVisible(false);
        if (onHighlight) onHighlight(null);

        setTimeout(() => {
            setWalkingOut(true);
            walkTo(BUTTON_TARGET.x, BUTTON_TARGET.y, () => {
                setIsClicking(true);
                setTimeout(() => {
                    setIsClicking(false);
                    setExiting(true);
                    setTimeout(() => {
                        setVisible(false);
                        setWalkingOut(false);
                        setExiting(false);
                        setBtnSpawning(true);
                        setShowRestartBtn(true);
                        setTimeout(() => setBtnSpawning(false), 500);
                        localStorage.setItem("navi-tour-done", "true");
                    }, 320);
                }, 220);
            }, true);
        }, 120);
    }, [walkTo, onHighlight]);

    const goToStep = useCallback((idx) => {
        if (idx >= TOUR_STEPS.length) { dismiss(); return; }
        const step = TOUR_STEPS[idx];
        const { x, y } = resolveStepPosition(step);   // ← resolve live position

        setBubbleVisible(false);

        walkTo(x, y, () => {
            setDisplayStep(idx);
            setBubbleVisible(true);
            if (onHighlight) onHighlight(step.highlight || null);
        });
    }, [walkTo, resolveStepPosition, onHighlight]);

    const restartTour = useCallback(() => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        setShowRestartBtn(false);
        setBtnSpawning(false);
        setExiting(false);
        setWalkingOut(false);
        setStep(0);
        setDisplayStep(0);
        setBubbleVisible(false);
        setIsWalking(false);
        setIsClicking(false);
        setIsIdle(false);
        if (onHighlight) onHighlight(null);
        const { x, y } = TOUR_STEPS[0];
        posRef.current = { x, y };
        setCharPos({ x, y });
        setVisible(true);
    }, [onHighlight]);

    useImperativeHandle(ref, () => ({ restartTour }), [restartTour]);

    useEffect(() => {
        const done = localStorage.getItem("navi-tour-done");
        if (done) { setShowRestartBtn(true); return; }
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!visible) return;
        const { x, y } = TOUR_STEPS[0];
        posRef.current = { x, y };
        setCharPos({ x, y });
        setIsIdle(false);
        setIsClicking(true);
        const t = setTimeout(() => {
            setIsClicking(false);
            setIsIdle(true);
            setBubbleVisible(true);
            setDisplayStep(0);
        }, 550);
        return () => clearTimeout(t);
    }, [visible]);

    useEffect(() => () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }, []);

    const handleNext = () => { const n = displayStep + 1; setStep(n); goToStep(n); };

    const currentStep = TOUR_STEPS[displayStep];
    const bubbleAbove = currentStep?.bubbleDir === "bottom";

    const flipBubbleLeft = charPos.x > 75;

    return (
        <>
            {showRestartBtn && <RestartButton onClick={restartTour} spawning={btnSpawning} />}

            <style>{`
                /* ── Cursor body animations ── */
                @keyframes cursorBob {
                    from { transform: rotate(-7deg) translateY(0); }
                    to   { transform: rotate( 7deg) translateY(-5px); }
                }
                @keyframes cursorIdle {
                    0%,100% { transform: rotate(0deg)  translateY(0); }
                    25%     { transform: rotate(-3deg) translateY(-2px); }
                    75%     { transform: rotate( 3deg) translateY( 1px); }
                }
                @keyframes cursorClick {
                    0%   { transform: scale(1)    rotate(0deg); }
                    40%  { transform: scale(0.8)  rotate(-10deg); }
                    100% { transform: scale(1)    rotate(0deg); }
                }
                @keyframes sparkle {
                    0%   { opacity: 0.7; transform: scale(1)   translateX(0); }
                    100% { opacity: 0;   transform: scale(0.2) translateX(7px); }
                }

                /* ── Wrapper entrance / exit ── */
                @keyframes naviEntrance {
                    0%   { opacity: 0; transform: scale(0.25) rotate(-25deg); }
                    70%  { opacity: 1; transform: scale(1.1)  rotate(5deg); }
                    100% { opacity: 1; transform: scale(1)    rotate(0deg); }
                }
                @keyframes naviExit {
                    0%   { opacity: 1; transform: scale(1)    rotate(0deg); }
                    100% { opacity: 0; transform: scale(0.15) rotate(18deg); }
                }

                /* ── Bubble ── */
                @keyframes bubbleIn {
                    from { opacity: 0; transform: scale(0.85) translateY(6px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0); }
                }
                @keyframes dotPulse {
                    0%,100% { transform: scale(1); }
                    50%     { transform: scale(1.5); }
                }

                /* ── Restart button ── */
                @keyframes btnSpawn {
                    0%   { opacity: 0; transform: scale(0.35) translateY(10px); }
                    65%  { opacity: 1; transform: scale(1.1)  translateY(-3px); }
                    100% { opacity: 1; transform: scale(1)    translateY(0); }
                }
                @keyframes restartBtnIn {
                    from { opacity: 0; transform: scale(0.7) translateY(10px); }
                    to   { opacity: 1; transform: scale(1)   translateY(0); }
                }

                /* ── Wrapper ── */
                .navi-wrapper {
                    position: fixed;
                    z-index: 99999;
                    pointer-events: none;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .navi-wrapper--entrance .navi-character {
                    animation: naviEntrance 0.55s cubic-bezier(0.34,1.56,0.64,1) both !important;
                }
                .navi-wrapper--exit .navi-character {
                    animation: naviExit 0.32s ease-in forwards !important;
                }

                /* ── Character ── */
                .navi-character {
                    pointer-events: all;
                    cursor: pointer;
                    filter: drop-shadow(0 4px 14px rgba(91,141,239,0.45));
                    display: block;
                }

                /* ── Bubble ── */
                .tour-bubble {
                    pointer-events: all;
                    position: absolute;
                    width: 224px;
                    background: white;
                    border-radius: 16px;
                    padding: 14px 16px 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(91,141,239,0.16);
                    opacity: 0;
                    border: 1.5px solid rgba(91,141,239,0.12);
                }
                .tour-bubble--flip-left {
                    left: auto;
                    right: 12px;
                }
                .tour-bubble--visible {
                    animation: bubbleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
                .tour-bubble--above {
                    bottom: calc(100% + 8px);
                    transform-origin: bottom left;
                }
                .tour-bubble--below {
                    top: calc(100% + 8px);
                    transform-origin: top left;
                }

                .tour-bubble__tail {
                    position: absolute;
                    width: 0; height: 0;
                    border-style: solid;
                }
                .tour-bubble__dots {
                    display: flex; gap: 5px;
                    justify-content: center;
                    margin-bottom: 10px;
                }
                .tour-bubble__dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #dce6fb;
                    transition: background 0.3s;
                }
                .tour-bubble__dot--active {
                    background: #5B8DEF;
                    animation: dotPulse 0.5s ease-in-out;
                }
                .tour-bubble__message {
                    font-size: 13px; font-weight: 600;
                    color: #1a2a4a; line-height: 1.55;
                    text-align: center; margin-bottom: 5px;
                    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
                }
                .tour-bubble__subtext {
                    font-size: 11px; color: #7a8aaa;
                    text-align: center; margin-bottom: 12px;
                    line-height: 1.45;
                    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
                }
                .tour-bubble__actions {
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 8px;
                }
                .tour-bubble__skip {
                    font-size: 11px; color: #9aabcc;
                    background: none; border: none; cursor: pointer;
                    padding: 4px 2px; transition: color 0.2s;
                    font-family: inherit;
                }
                .tour-bubble__skip:hover { color: #5B8DEF; }
                .tour-bubble__next {
                    font-size: 12px; font-weight: 600; color: white;
                    background: #5B8DEF; border: none;
                    border-radius: 20px; padding: 6px 14px;
                    cursor: pointer; font-family: inherit;
                    transition: background 0.2s, transform 0.15s;
                    box-shadow: 0 2px 8px rgba(91,141,239,0.35);
                }
                .tour-bubble__next:hover { background: #4a7de0; transform: scale(1.04); }
                .tour-bubble__next:active { transform: scale(0.97); }

                /* ── Restart button ── */
                .navi-restart-btn {
                    position: fixed;
                    bottom: 92px; right: 20px;
                    z-index: 50;
                    display: flex; align-items: center; gap: 7px;
                    background: rgba(255,255,255,0.18);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border: 1px solid rgba(255,255,255,0.28);
                    border-radius: 22px;
                    padding: 7px 14px 7px 10px;
                    cursor: pointer; color: white;
                    font-size: 12px; font-weight: 500;
                    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
                    animation: restartBtnIn 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
                .navi-restart-btn--spawn {
                    animation: btnSpawn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards !important;
                }
                .navi-restart-btn:hover {
                    background: rgba(91,141,239,0.35);
                    border-color: rgba(91,141,239,0.5);
                    transform: scale(1.05) translateY(-1px);
                    box-shadow: 0 6px 24px rgba(91,141,239,0.3);
                }
                .navi-restart-btn:active { transform: scale(0.97); }
                .navi-restart-btn__icon {
                    width: 26px; height: 26px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #5B8DEF, #3D6FD4);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 2px 6px rgba(91,141,239,0.4);
                    flex-shrink: 0;
                }

                /* ── Dock highlight ── */
                .tour-dock-highlight {
                    animation: tourHighlight 1s ease-in-out infinite alternate !important;
                    filter: drop-shadow(0 0 10px rgba(91,141,239,0.9)) !important;
                }
                @keyframes tourHighlight {
                    from { filter: drop-shadow(0 0 6px rgba(91,141,239,0.6)); transform: scale(1); }
                    to   { filter: drop-shadow(0 0 16px rgba(91,141,239,1)); transform: scale(1.12) translateY(-4px); }
                }
            `}</style>

            {visible && (
                <div
                    className={`navi-wrapper ${exiting ? "navi-wrapper--exit" : "navi-wrapper--entrance"}`}
                    style={{ left: `${charPos.x}%`, top: `${charPos.y}%` }}
                >
                    {bubbleAbove && currentStep && (
                        <SpeechBubble
                            flipLeft={flipBubbleLeft}
                            message={currentStep.message}
                            subtext={currentStep.subtext}
                            direction="bottom"
                            step={displayStep}
                            total={TOUR_STEPS.length}
                            onNext={handleNext}
                            onSkip={dismiss}
                            isVisible={bubbleVisible && !walkingOut}
                        />
                    )}

                    <div
                        className="navi-character"
                        onClick={handleNext}
                        title="Click to continue"
                    >
                        <CursorCharacter
                            isWalking={isWalking}
                            isClicking={isClicking}
                            isIdle={isIdle}
                        />
                    </div>

                    {!bubbleAbove && currentStep && (
                        <SpeechBubble
                            flipLeft={flipBubbleLeft}
                            message={currentStep.message}
                            subtext={currentStep.subtext}
                            direction="top"
                            step={displayStep}
                            total={TOUR_STEPS.length}
                            onNext={handleNext}
                            onSkip={dismiss}
                            isVisible={bubbleVisible && !walkingOut}
                        />
                    )}
                </div>
            )}
        </>
    );
});

TourGuide.displayName = "TourGuide";
export default TourGuide;