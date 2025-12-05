import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Replace these with your own values or move to env variables
  const SERVICE_ID = "service_b7o85vi";
  const TEMPLATE_ID = "template_zweky15";
  const PUBLIC_KEY = "XXERAmQWva417C0qQ";

  // Optional: initialize the EmailJS client once. This is safe to call multiple times.
  try {
    if (emailjs && typeof emailjs.init === "function") {
      emailjs.init(PUBLIC_KEY);
    }
  } catch (e) {
    // non-fatal
    // console.warn('EmailJS init failed', e);
  }

  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  async function sendEmail(e) {
    e.preventDefault();
    setErrorMsg("");

    const form = formRef.current;
    if (!form) {
      setErrorMsg("Form not available.");
      return;
    }

    const name = form.name?.value?.trim();
    const email = form.email?.value?.trim();
    const message = form.message?.value?.trim();

    if (!name || !email || !message) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Use sendForm with explicit public key if necessary. @emailjs/browser supports both patterns.
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);

      setIsSent(true);
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="w-full py-24 px-10 bg-[#f5f5f3] text-gray-800 mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>

        <p className="opacity-70 mb-10 leading-relaxed max-w-2xl">
          Whether you have a project idea, want to collaborate, or just want to say hello — feel free to reach out. I usually respond within a few hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT: FORM CARD */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            {isSent ? (
              <div className="flex flex-col items-start gap-4">
                <h3 className="text-2xl font-semibold">Message Sent Successfully! 🎉</h3>
                <p className="opacity-70">Thanks for reaching out — I’ll get back to you shortly.</p>

                <div className="w-full mt-4">
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setErrorMsg("");
                    }}
                    className="w-full bg-black text-white py-3 rounded-md"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <>
                <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5" noValidate>
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <textarea
                      name="message"
                      rows="6"
                      placeholder="Write your message..."
                      className="w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  {/* Error */}
                  {errorMsg && <div className="text-sm text-red-600">{errorMsg}</div>}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-1 py-3 rounded-md text-white font-medium ${
                      loading ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-900"
                    }`}
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* RIGHT: CONTACT DETAILS */}
          <div className="flex flex-col gap-6 p-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
              <p className="opacity-70">📧 vanshchwdhary@gmail.com</p>
              <p className="opacity-70">📞 +91 7740987700</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Social Links</h3>
              <ul className="flex flex-col gap-3 opacity-90">
                <li>
                  <a
                    href="https://github.com/vanshchwdhary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    GitHub →
                  </a>
                </li>
                <li>
                  <a
                    href="https://leetcode.com/vanshchwdhary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    LeetCode →
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/vanshchwdhary/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    LinkedIn →
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="opacity-70">Chandigarh, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}