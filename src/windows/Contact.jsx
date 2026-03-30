import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { socials } from "#constants";
import { WindowControls } from "#components";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const validate = ({ name, email, message }) => {
    const errors = {};
    if (!name.trim())
        errors.name = "Name is required.";
    else if (name.trim().length < 2)
        errors.name = "Name must be at least 2 characters.";

    if (!email.trim())
        errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.email = "Please enter a valid email.";

    if (!message.trim())
        errors.message = "Message is required.";
    else if (message.trim().length < 10)
        errors.message = "Message must be at least 10 characters.";

    return errors;
};

const EMPTY = { name: "", email: "", message: "" };

const Contact = () => {
    const formRef= useRef(null);
    const [fields, setFields] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        const { name, value } = e.target;
        const next = { ...fields, [name]: value };
        setFields(next);

        if (touched[name]) {
            const errs = validate(next);
            setErrors((prev) => ({ ...prev, [name]: errs[name] }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const errs = validate(fields);
        setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTouched({ name: true, email: true, message: true });
        const errs = validate(fields);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setStatus("sending");
        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setStatus("success");
            setFields(EMPTY);
            setTouched({});
            setErrors({});
        } catch {
            setStatus("error");
        }
    };

    const inputBase =
        "w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all duration-150 bg-gray-50 focus:bg-white placeholder:text-gray-300";
    const inputNormal = "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
    const inputError  = "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50";

    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>

            <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(85vh-48px)]">
                {/* Profile */}
                <div className="flex items-center gap-4">
                    <img
                        src="/images/me.jpeg"
                        alt="Noah"
                        className="w-16 h-16 rounded-full object-cover flex-none"
                    />
                    <div>
                        <h3 className="text-lg font-semibold leading-tight">Let's Connect</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                            I'm always open to new opportunities. Feel free to reach out!
                        </p>
                    </div>
                </div>

                <ul className="flex flex-wrap gap-3">
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} style={{ backgroundColor: bg }} className="rounded-lg p-3 w-36 hover:-translate-y-0.5 hover:scale-105 origin-center transition-all duration-300">
                            <a href={link} target={link.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer" className="flex flex-col gap-2">
                                <img src={icon} alt={text} className="size-5" />
                                <p className="font-semibold text-sm text-white">{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                        Send a message
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={fields.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="John Smith"
                            className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={fields.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="john@example.com"
                            className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={fields.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                            placeholder="Hey Noah, I'd love to..."
                            className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                        />
                        {errors.message && (
                            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 transition-all duration-150"
                    >
                        {status === "sending" ? "Sending…" : "Send Message"}
                    </button>

                    {status === "success" && (
                        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 font-medium text-center">
                            ✓ Message sent! I'll get back to you soon.
                        </div>
                    )}
                    {status === "error" && (
                        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium text-center">
                            Something went wrong. Please try again or email me directly.
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;