import { Container, ContainerSucces } from './styles'
import { useForm, ValidationError } from '@formspree/react'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import validator from 'validator'

export function Form() {
  const [state, handleSubmit] = useForm('xnndlalv') // Make sure this Formspree ID is correct
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [isHuman, setIsHuman] = useState(true) // set to true if you're not using ReCAPTCHA

  // Email validation
  function verifyEmail(email: string) {
    setValidEmail(validator.isEmail(email))
  }

  // Show toast on success
  useEffect(() => {
    if (state.succeeded) {
      toast.success('Email successfully sent!', {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: 'succeeded',
      })
    }
  }, [state]) // ✅ added dependency to avoid firing on every render

  // Show success screen
  if (state.succeeded) {
    return (
      <ContainerSucces>
        <h3>Thanks for getting in touch!</h3>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Back to the top
        </button>
        <ToastContainer />
      </ContainerSucces>
    )
  }

  return (
    <Container>
      <h2>Get in touch using the form</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            const val = e.target.value
            setEmail(val)
            verifyEmail(val)
          }}
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <textarea
          required
          placeholder="Send a message to get started."
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        {/* ReCAPTCHA (optional, commented out) */}
        {/* <ReCAPTCHA
          sitekey="your-site-key"
          onChange={() => setIsHuman(true)}
        /> */}

        <button
          type="submit"
          disabled={state.submitting || !validEmail || !message || !isHuman}
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </Container>
  )
}
