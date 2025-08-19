import Contact from "@/src/components/Contact"

// Static metadata for the Contact Us page
export const metadata = {
  title: "Contact Us | Viet technologie",
  description: "Get in touch with Viet technologie for support, sales inquiries, or any other questions. We are located in Agadir, Morocco.",
};

function ContactPage() {
  return (
    <div>
      <Contact/>
    </div>
  )
}

export default ContactPage