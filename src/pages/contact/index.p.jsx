import { motion } from "framer-motion";
import Head from "next/head";
import link from "next/link";
import { useState } from "react";
import Default from "ui/layouts/Default";
import Contact from "./components/Contact";
import Form from "./components/Form";
import isEmail from "./functions/isEmail";
import isString from "./functions/isString";
import sendMessage from "./services";
export default function Contacts(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const contactObj = [
    {
      iconPath: "/icons/phone.svg",
      text: "+1 (480) 555-0103", // change this to your phone number
      link: "tel:+1 (480) 555-0103", // replace this with your phone number
    },
    {
      iconPath: "icons/email.svg",
      text: "alma.lawson@example.com", // change this to your email
      link: "mailto:alma.lawson@example.com", // replace this with your email
    },
    {
      iconPath: "icons/location.svg",
      text: "1901 Thornridge Cir. Shiloh, Hawaii 81063", // change this to your address
    },
  ];
  function handleSubmit() {
    setLoading(true);
    if (!isString(name) || !isEmail(email) || !isString(message)) {
      setLoading(false);
      if (!isString(name)) {
        setNameError(true);
        setTimeout(() => setNameError(false), 3000);
      }
      if (!isEmail(email)) {
        setEmailError(true);
        setTimeout(() => setEmailError(false), 3000);
      }
      if (!isString(message)) {
        setMessageError(true);
        setTimeout(() => setMessageError(false), 3000);
      }
      return 
    }
    return sendMessage({
      my_email: "udochukwukaonyela@gmail.com", // Change this to your email address
      user_name: name,
      user_email: email,
      message: message
    }).finally(() => setLoading(false));

  }
  return (
    <Default>
      <Head>
        <title>Contact • Aditya Singh</title>
        <meta name="title" content="Projects • Aditya Singh" />
        <meta property="og:title" content="Projects • Aditya Singh" />
        <meta property="twitter:title" content="Projects • Aditya Singh" />
      </Head>
      <section className="flex items-center text-white w-full lg:flex-row flex-col gap-12">
        <div className="flex flex-col items-start lg:w-full w-11/12 justify-start space-y-4 basis-50% gap-12 max-h-screen">
          <div className="flex items-center space-x-2 tracking-[-0.02rem]">
            <img
              src="/icons/email.svg"
              className="h-[40px] select-none"
              draggable="false"
            />
            <p className="font-bold text-4xl text-opacity-80 ">Contact Me</p>
          </div>
          {contactObj.map((contact, index) => (
            <Contact key={"contact-" + index} {...contact} index={index} />
          ))}
        </div>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col items-start justify-start gap-6 basis-50% lg:w-3/4 w-11/12 bg-[#1E222F] border-2 border-white/25 lg:px-12 px-6 py-8 rounded-md"
        >
          <p className="w-full">Fill the form and i'll get back to you</p>
          <Form
            {...{
              id: "nameInput",
              label: "Name",
              type: "text",
              iconPath: "icons/user.svg",
              value: name,
              setValue: setName,
              error: nameError,
            }}
          />
          <Form
            {...{
              id: "emailInput",
              label: "Email",
              type: "email",
              iconPath: "icons/email.svg",
              value: email,
              setValue: setEmail,
              error: emailError,
            }}
          />
          <Form
            {...{
              id: "emailInput",
              label: "Message",
              type: "text",
              iconPath: "icons/email.svg",
              value: message,
              setValue: setMessage,
              isMessage: true,
              error: messageError,
            }}
          />
          <button
            onClick={handleSubmit}
            className="w-full text-center py-6 rounded-md hover:bg-indigo-700 bg-indigo-500 transition-colors duration-500 ease-in font-bold flex items-center justify-center"
          >
            {
              loading
              ?
                <img src="/icons/loading.svg" className="h-4 animate-spin self-center" />
                :
            "Submit" 
}
          </button>
        </motion.div>
      </section>
    </Default>
  );
}
