// API Integration: Contact form submits to POST /api/inquiries
import { useState } from 'react'
import { Send, Mail, Phone, MapPin, Clock, Shield, Users } from 'lucide-react'
import contactImg from '../assets/contact.jpeg'
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
// API import
import { submitInquiry } from '../api/contactApi'

const contactInfo = [
  {
    icon: <Mail size={22} className="text-white" />,
    title: 'EMAIL US',
    lines: ['contact@siaresociety.org'],
    bg: 'bg-navy',
  },
  {
    icon: <Phone size={22} className="text-white" />,
    title: 'CALL US',
    lines: ['+91 738 735 5544'],
    bg: 'bg-navy',
  },

  {
    icon: <MapPin size={22} className="text-white" />,
    title: 'OUR OFFICE',
    lines: ['Society of Integrated Academic Research and Education', '109/C, Sukhdev Nagar Ex2, Airport Rd, Indore, Madhya Pradesh 452005'],
    bg: 'bg-navy',
  },
  {
    icon: <Clock size={22} className="text-white" />,
    title: 'OFFICE HOURS',
    lines: ['Monday - Friday', '9:30 AM - 6:00 PM (IST)', '', 'Saturday - Sunday', 'Closed'],
    bg: 'bg-navy',
  },
]

const helpTopics = [
  { icon: <Mail size={18} className="text-gold" />, title: 'Membership & Registration', desc: 'Get help with membership plans and benefits.' },
  { icon: <Send size={18} className="text-gold" />, title: 'Proceedings & Publications', desc: 'Inquiries about our proceedings series and publication support.' },
  { icon: <Users size={18} className="text-gold" />, title: 'Events & Collaborations', desc: 'Partner with us for conferences, workshops, and academic events.' },
  { icon: <Shield size={18} className="text-gold" />, title: 'General Inquiries', desc: "Any other questions or feedback you'd like to share." },
]


export default function Contact() {
  // API Integration: controlled form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreed: false,
  })
  // API Integration: loading / success / error states
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // API Integration: handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (error) setError('')
    if (success) setSuccess(false)
  }

  // API Integration: form submission to POST /api/inquiries
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   // Basic client-side validation
  //   if (!form.name.trim()) return setError('Full name is required.')
  //   if (!form.email.trim()) return setError('Email address is required.')
  //   if (!form.subject.trim()) return setError('Subject is required.')
  //   if (!form.message.trim()) return setError('Message is required.')
  //   if (!form.agreed) return setError('Please agree to the Privacy Policy and Terms of Use.')

  //   setLoading(true)
  //   setError('')

  //   try {
  //     // API Integration: submit inquiry
  //     await submitInquiry({
  //       name: form.name.trim(),
  //       email: form.email.trim(),
  //       phone: form.phone.trim() || undefined,
  //       subject: form.subject.trim(),
  //       message: form.message.trim(),
  //       purpose: 'general',
  //     })

  //     // API Integration: on success, reset form and show success message
  //     setSuccess(true)
  //     setForm({ name: '', email: '', phone: '', subject: '', message: '', agreed: false })
  //   } catch (err) {
  //     // API Integration: show error from backend
  //     setError(err.message || 'Failed to send message. Please try again.')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic client-side validation
    if (!form.name.trim()) return setError('Full name is required.')
    if (!form.email.trim()) return setError('Email address is required.')
    if (!form.subject.trim()) return setError('Subject is required.')
    if (!form.message.trim()) return setError('Message is required.')
    if (!form.agreed) return setError('Please agree to the Privacy Policy and Terms of Use.')

    setLoading(true)
    setError('')

    try {
      // API Integration: submit inquiry
      await submitInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        subject: form.subject.trim(),
        message: form.message.trim(),
        purpose: 'general',
      })

      // API Integration: on success, reset form and show success message
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '', agreed: false })
    } catch (err) {
      // API Integration: show error from backend
      setError(err.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in">
    {/* Hero */}
      <section
        className="relative min-h-[340px] md:min-h-[360px] lg:h-[400px] flex items-center overflow-hidden bg-[#001247]"
        style={{
          backgroundImage: `url(${contactImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#001247]/20"></div>

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8">
          <div className="max-w-[560px]">
            <h1 className="text-[30px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[40px] font-bold uppercase text-white tracking-tight">
              CONTACT <span className="text-[#f6a313]">US</span>
            </h1>

            <div className="flex mt-2 mb-4 overflow-hidden rounded-full w-fit">
              <span className="h-[4px] w-[28px] sm:w-[40px] bg-[#43aa37]"></span>
              <span className="h-[4px] w-[28px] sm:w-[40px] bg-[#f6a313]"></span>
              <span className="h-[4px] w-[28px] sm:w-[40px] bg-[#ff352e]"></span>
              <span className="h-[4px] w-[28px] sm:w-[40px] bg-[#0875c9]"></span>
            </div>

            <h3 className="text-white text-[14px] sm:text-[14px] md:text-[15px] lg:text-[17px] leading-[1.55] font-normal mb-4">
              We'd love to hear from you!
            </h3>

            <p className="text-white text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] leading-[1.55] font-normal mb-4">
              Whether you have a question about our services, need assistance
              with membership, or want to collaborate, our team is here to help.
            </p>

            {/* Bottom Features */}
            <div
              className="
    mt-[34px]

    grid grid-cols-2
    sm:grid-cols-2
    gap-y-[18px]
    gap-x-[18px]

    lg:flex lg:flex-nowrap lg:items-center
  "
            >
              {[
                {
                  icon: icon3,
                  title: "Quick\nResponse",
                },
                {
                  icon: icon2,
                  title: "Expert\nSupport",
                },
                {
                  icon: icon5,
                  title: "Global \nNetwork",
                },
                {
                  icon: icon4,
                  title: "Academic\nExcellence",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`
        flex items-center gap-[12px]

        lg:pr-[26px]

        ${i !== 3 ? "lg:border-r lg:border-white/18" : ""}
      `}
                >
                  {/* Icon Circle */}
                  <div
                    className="
          w-[39px] h-[39px]
          rounded-full
          border-2 border-[#c8932a]

          flex items-center justify-center

          shrink-0

          shadow-[0_8px_18px_rgba(0,0,0,0.22)]

          transition-all duration-300
          hover:scale-105
        "
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className="
            w-[22px] h-[22px]
            object-contain
            brightness-0 invert
          "
                    />
                  </div>

                  {/* Text */}
                  <span
                    className="
          whitespace-pre-line

          text-white

          text-[12px]
          lg:text-[12px]

          font-medium

         
        "
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     
     {/* Contact Info Cards */}
<section className="w-full bg-white py-6 sm:py-8 overflow-hidden">
  <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {contactInfo.map((c, i) => (
        <div
          key={i}
          className="
            bg-white
            border border-[#eee4d6]
            rounded-[10px]

            min-h-[150px]

            px-5 py-6

            flex items-start gap-4

            shadow-[0_4px_18px_rgba(0,0,0,0.04)]

            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_12px_28px_rgba(12,48,103,0.12)]
            hover:border-[#0c3067]/35
          "
        >
          {/* Icon */}
          <div
            className="
              w-[48px] h-[48px]
              rounded-full
              bg-[#071d4f]
              text-white
              flex items-center justify-center
              shrink-0
            "
          >
            {c.icon}
          </div>

          {/* Text */}
          <div className="pt-1">
            <h4
              className="
                font-bold
                text-[#071d4f]
                text-[0.9rem]
                uppercase
                mb-3
                leading-none
              "
            >
              {c.title}
            </h4>

            {c.lines.map((line, j) => (
              <p
                key={j}
                className="
                  text-[#071d4f]
                  text-[0.78rem]
                  leading-[1.55]
                  font-medium
                "
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}

    </div>
  </div>
</section>

{/* Form + Help */}
<section className="w-full bg-white py-2 sm:py-3 overflow-hidden">
  <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">

    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

      {/* Contact Form — API Integration: onSubmit connected to submitInquiry */}
      <form
        onSubmit={handleSubmit}
        className="
    bg-white
    border border-[#e5e7eb]
    rounded-[12px]
    p-4 sm:p-5

    shadow-[0_6px_18px_rgba(0,27,87,0.05)]

    transition-all duration-500

    hover:-translate-y-1
    hover:shadow-[0_18px_40px_rgba(0,27,87,0.12)]
    hover:border-[#0c3067]/20
  "
      >
        <h3
          className="
      font-bold
      text-[#071d4f]
      text-[1.05rem]
      uppercase
      mb-1

      transition-all duration-300

      hover:text-[#0d57b7]
    "
        >
          SEND US A MESSAGE
        </h3>

        <div
          className="
      h-[2px]
      w-[48px]
      bg-[#e2ac39]
      mb-4

      transition-all duration-500

      hover:w-[70px]
    "
        />

        {/* API Integration: Success message */}
        {success && (
          <div className="mb-3 px-3 py-2 rounded-[7px] bg-green-50 border border-green-200 text-green-700 text-[13px] font-medium animate-fade-in">
            ✓ Your message has been sent! We will get back to you shortly.
          </div>
        )}

        {/* API Integration: Error message */}
        {error && (
          <div className="mb-3 px-3 py-2 rounded-[7px] bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium animate-fade-in">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">

          {/* API Integration: controlled input */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className="
        h-[42px]
        border border-[#d9e1ec]
        rounded-[7px]
        px-3
        text-[13px]
        text-[#071d4f]

        transition-all duration-300

        focus:outline-none
        focus:border-[#e2ac39]
        focus:ring-2 focus:ring-[#e2ac39]/20

        hover:border-[#0d57b7]/40
        hover:shadow-[0_4px_12px_rgba(13,87,183,0.08)]
      "
          />

          {/* API Integration: controlled input */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address *"
            className="
        h-[42px]
        border border-[#d9e1ec]
        rounded-[7px]
        px-3
        text-[13px]
        text-[#071d4f]

        transition-all duration-300

        focus:outline-none
        focus:border-[#e2ac39]
        focus:ring-2 focus:ring-[#e2ac39]/20

        hover:border-[#0d57b7]/40
        hover:shadow-[0_4px_12px_rgba(13,87,183,0.08)]
      "
          />

          {/* API Integration: controlled input */}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="
        h-[42px]
        border border-[#d9e1ec]
        rounded-[7px]
        px-3
        text-[13px]
        text-[#071d4f]

        transition-all duration-300

        focus:outline-none
        focus:border-[#e2ac39]
        focus:ring-2 focus:ring-[#e2ac39]/20

        hover:border-[#0d57b7]/40
        hover:shadow-[0_4px_12px_rgba(13,87,183,0.08)]
      "
          />

          {/* API Integration: controlled input */}
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject *"
            className="
        h-[42px]
        border border-[#d9e1ec]
        rounded-[7px]
        px-3
        text-[13px]
        text-[#071d4f]

        transition-all duration-300

        focus:outline-none
        focus:border-[#e2ac39]
        focus:ring-2 focus:ring-[#e2ac39]/20

        hover:border-[#0d57b7]/40
        hover:shadow-[0_4px_12px_rgba(13,87,183,0.08)]
      "
          />
        </div>

        {/* API Integration: controlled textarea */}
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message *"
          rows={4}
          className="
      w-full
      min-h-[110px]

      border border-[#d9e1ec]
      rounded-[7px]

      px-3 py-3

      text-[13px]
      text-[#071d4f]

      transition-all duration-300

      focus:outline-none
      focus:border-[#e2ac39]
      focus:ring-2 focus:ring-[#e2ac39]/20

      hover:border-[#0d57b7]/40
      hover:shadow-[0_4px_12px_rgba(13,87,183,0.08)]

      mb-3
      resize-none
    "
        />

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-4">
          {/* API Integration: controlled checkbox */}
          <input
            type="checkbox"
            id="agree"
            name="agreed"
            checked={form.agreed}
            onChange={handleChange}
            className="
        w-3.5 h-3.5

        accent-[#0c3067]

        transition-all duration-300

        hover:scale-110
      "
          />

          <label
            htmlFor="agree"
            className="
        text-[11px]
        sm:text-[12px]
        text-[#334968]
      "
          >
            I agree to the{" "}

            <span
              className="
          text-[#0d57b7]
          cursor-pointer

          transition-all duration-300

          hover:text-[#e2ac39]
        "
            >
              Privacy Policy
            </span>{" "}

            and{" "}

            <span
              className="
          text-[#0d57b7]
          cursor-pointer

          transition-all duration-300

          hover:text-[#e2ac39]
        "
            >
              Terms of Use
            </span>.
          </label>
        </div>

        {/* API Integration: submit button with loading state */}
        <button
          type="submit"
          disabled={loading}
          className="
      h-[42px]
      px-5

      rounded-[7px]

      bg-[linear-gradient(180deg,#1251a0_0%,#0f468d_45%,#0c3067_100%)]

      text-white
      font-bold
      text-[12px]
      uppercase

      flex items-center justify-center gap-2

      shadow-[0_8px_18px_rgba(12,48,103,0.28)]

      transition-all duration-300

      hover:-translate-y-1
      hover:shadow-[0_14px_28px_rgba(12,48,103,0.40)]
      hover:brightness-110

      active:scale-[0.98]

      disabled:opacity-60
      disabled:cursor-not-allowed
      disabled:hover:translate-y-0
    "
        >
          {/* API Integration: loading spinner or send icon */}
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send
              size={14}
              className="
          transition-all duration-300
          group-hover:rotate-[-12deg]
        "
            />
          )}
          {loading ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
      </form>

      {/* Help Panel */}
   <div
  className="
    bg-[linear-gradient(180deg,#082a63_0%,#061b45_100%)]

    rounded-[12px]

    p-4 sm:p-5

    border border-[#123b77]

    shadow-[0_10px_24px_rgba(7,29,79,0.18)]

    transition-all duration-500

    hover:-translate-y-1
    hover:shadow-[0_18px_40px_rgba(7,29,79,0.30)]
    hover:border-[#e2ac39]/50
  "
>
  <h4 className="text-white font-bold text-[0.95rem] uppercase mb-1">
    WE ARE HERE TO HELP YOU WITH
  </h4>

  <div
    className="
      h-[2px]
      w-[46px]
      bg-[#e2ac39]
      mb-4

      transition-all duration-500

      hover:w-[70px]
    "
  />

  <ul className="space-y-0">
    {helpTopics.map((t, i) => (
      <li
        key={i}
        className="
          group

          flex gap-3 items-start

          border-b border-white/15

          py-3

          last:border-0
          last:pb-0

          transition-all duration-300

          hover:translate-x-1
        "
      >
        {/* Icon */}
        <div
          className="
            w-[38px]
            h-[38px]

            rounded-full

            border border-[#e2ac39]

            text-[#e2ac39]

            flex items-center justify-center

            shrink-0

            transition-all duration-300

           
            group-hover:text-[#061b45]
            group-hover:scale-110
            group-hover:shadow-[0_0_18px_rgba(226,172,57,0.45)]
          "
        >
          {t.icon}
        </div>

        {/* Text */}
        <div>
          <div
            className="
              text-white
              font-semibold
              text-[13px]
              mb-1

              transition-all duration-300

              group-hover:text-[#e2ac39]
            "
          >
            {t.title}
          </div>

          <p
            className="
              text-white/80
              text-[11px]
              leading-[1.5]

              transition-all duration-300

              group-hover:text-white
            "
          >
            {t.desc}
          </p>
        </div>
      </li>
    ))}
  </ul>
</div>

    </div>
  </div>
</section>
{/* Map Section */}

    </div>
  )
}
