import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const STATUS = { IDLE: 'idle', SENDING: 'sending', OK: 'ok', ERROR: 'error' }

const contactLinks = [
  {
    label: 'LinkedIn',
    value: 'Andrés Ramírez',
    href: 'https://www.linkedin.com/in/andr%C3%A9s-ram%C3%ADrez-011936349/',
    icon: '/images/linkedin.png',
    color: '#0a66c2',
  },
  {
    label: 'GitHub',
    value: '@Ramizzz8',
    href: 'https://github.com/Ramizzz8',
    icon: '/images/github.png',
    color: '#ffffff',
  },
  {
    label: 'Email',
    value: 'ajulianrague@gmail.com',
    href: 'mailto:ajulianrague@gmail.com',
    icon: '/images/mail.png',
    color: '#e63946',
  },
]

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(STATUS.IDLE)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(STATUS.SENDING)
    try {
      await emailjs.sendForm(
        'service_mu9ujxo',
        'template_i3gwhfh',
        formRef.current,
        '8ABk8CNb9_oHzi8bc'
      )
      setStatus(STATUS.OK)
      formRef.current.reset()
    } catch {
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <section id="contacto" className="py-24 px-6 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e63946] rounded-full opacity-[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-5xl text-center mb-4 tracking-wide"
        >
          HABLEMOS <span className="text-[#e63946]">:)</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center text-white/40 mb-16 text-sm"
        >
          ¿Tienes un proyecto en mente? Escríbeme, estoy disponible.
        </motion.p>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Columna izquierda: info de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            <div className="mb-2">
              <h3 className="font-bebas text-3xl mb-2">CONTACTO DIRECTO</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Puedes escribirme por cualquiera de estos canales. Respondo en menos de 24 horas.
              </p>
            </div>

            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="group flex items-center gap-4 p-4 bg-[var(--bg-card)] border border-white/5 rounded-xl hover:border-white/15 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${link.color}15`, border: `1px solid ${link.color}30` }}
                >
                  <img src={link.icon} alt={link.label} className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">{link.label}</p>
                  <p className="text-white text-sm font-medium group-hover:text-[#e63946] transition-colors duration-200">
                    {link.value}
                  </p>
                </div>
                <span className="ml-auto text-white/20 group-hover:text-white/60 transition-colors">↗</span>
              </motion.a>
            ))}

            {/* Disponibilidad */}
            <div className="flex items-center gap-2 mt-2 px-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/40 text-xs">Disponible para proyectos freelance</span>
            </div>
          </motion.div>

          {/* Columna derecha: formulario */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 flex flex-col gap-5"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="user_name" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Nombre
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="bg-[var(--bg-card)] border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#e63946]/60 focus:bg-[var(--bg-hover)] transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="user_email" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Correo
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  className="bg-[var(--bg-card)] border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#e63946]/60 focus:bg-[var(--bg-hover)] transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Asunto
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="¿En qué puedo ayudarte?"
                className="bg-[var(--bg-card)] border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#e63946]/60 focus:bg-[var(--bg-hover)] transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Cuéntame sobre tu proyecto..."
                className="bg-[var(--bg-card)] border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#e63946]/60 focus:bg-[var(--bg-hover)] transition-all duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === STATUS.SENDING}
              className="w-full py-4 bg-[#e63946] text-white font-bold rounded-xl hover:bg-[#c62c38] transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#e63946]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-sm tracking-wide uppercase"
            >
              {status === STATUS.SENDING ? 'Enviando...' : 'Enviar mensaje →'}
            </button>

            {status === STATUS.OK && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 text-sm font-medium"
              >
                ¡Mensaje enviado! Te responderé pronto.
              </motion.p>
            )}
            {status === STATUS.ERROR && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-[#e63946] text-sm"
              >
                Algo salió mal. Escríbeme a{' '}
                <a href="mailto:ajulianrague@gmail.com" className="underline font-medium">
                  ajulianrague@gmail.com
                </a>
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
