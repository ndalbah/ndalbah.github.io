import useWindowStore from "#store/window.js";
import {useLayoutEffect, useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex, isMaximized } = windows[windowKey];
        const savedTransform = useRef({ x: 0, y: 0 });
        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block";

            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }
            );
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                cancel: "input, textarea, button, a, select, label, [contenteditable]",
                onPress: () => focusWindow(windowKey),
                allowEventDefault: true,
            });

            if (isMaximized) {
                savedTransform.current = {
                    x: gsap.getProperty(el, "x"),
                    y: gsap.getProperty(el, "y"),
                };
                gsap.set(el, { x: 0, y: 0 });
                instance.disable();
            } else {
                gsap.set(el, {
                    x: savedTransform.current.x,
                    y: savedTransform.current.y,
                });
                instance.enable();
            }

            return () => instance.kill();
        }, [isOpen, isMaximized]);

        useLayoutEffect(() => {
            const el = ref.current;
            if(!el) return;

            el.style.display = isOpen ? "block" : "none";

            if(isMaximized) {
                gsap.set(el, {x: 0, y: 0})
            }
        }, [isOpen, isMaximized]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className={`absolute ${
                    isMaximized ? "!inset-0 !w-screen !h-screen !max-h-screen !top-0 !left-0 !translate-x-0 !translate-y-0 !rounded-none" : ""
                }`}
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default WindowWrapper;