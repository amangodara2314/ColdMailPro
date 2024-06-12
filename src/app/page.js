"use client";
import React, { useLayoutEffect, useState } from "react";
import FileUploadForm from "./components/FileUploadForm";
import { redirect, useRouter } from "next/navigation";

const Home = () => {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useLayoutEffect(() => {
    if (!JSON.parse(localStorage.getItem("cold-user"))) {
      redirect("/login");
    }
  }, []);

  const handleFileLoaded = (data) => {
    const emailData = data.slice(1, -1).map((row) => ({
      name: row[0],
      email: row[1],
    }));
    console.log(emailData);
    setData(emailData);
  };
  const processMessage = (input, name) => {
    const regex = /\b(Hi|hi)\b/g;
    const cleanedMessage = input.replace(regex, (match) => `${match} ${name}`);
    return cleanedMessage;
  };

  const sendEmails = async () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("cold-user"));
    for (let entry of data) {
      let updatedMessage = processMessage(message, entry.name);
      console.log(updatedMessage);
      return;
      if (entry.name == undefined || entry.email == undefined) {
        continue;
      }
      const data = JSON.stringify({
        name: entry.name,
        email: entry.email,
        senderEmail: user.email,
        password: user.password,
        message: updatedMessage,
        subject,
      });
      const response = await fetch("/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      if (!response.ok) {
        setIsLoading(false);
        console.error("Failed to send email:", entry.email);
      }
    }
    setIsLoading(false);
    alert("Emails sent successfully!");
  };

  return (
    <>
      {isLoading && (
        <div
          className="fixed top-0 left-0 w-full flex justify-center items-center h-screen"
          style={{ background: "rgba(0,0,0,0.7" }}
        >
          <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping" />
        </div>
      )}
      <div className="min-h-screen bg-background text-text flex flex-col items-center">
        <header className="w-full bg-card py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">ColdMailPro</h1>
            <nav className="flex space-x-4">
              <a href="#send-emails" className="text-muted hover:text-primary">
                Send Emails
              </a>
              <a href="#creator" className="text-muted hover:text-primary">
                Creator
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem("cold-user");
                  router.push("/login");
                }}
                className="text-muted hover:text-primary"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
          <section className="text-center mb-12">
            <h2 className="text-5xl font-bold text-primary mb-4">
              Welcome to ColdMailPro
            </h2>
            <p className="text-xl text-muted">
              Easily send cold emails to your business prospects
            </p>
          </section>
          <section id="send-emails" className="w-full max-w-lg mb-12">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Send Cold Emails
            </h2>
            <div className="bg-card p-6 rounded shadow-md w-full mb-6">
              <label className="block mb-2 text-sm font-medium">Subject</label>
              <input
                type="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 mb-4 bg-background rounded text-text"
                placeholder="Enter your subject"
              />
              <label className="block mb-2 text-sm font-medium">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 bg-background rounded text-text"
                rows="4"
                placeholder="Enter your message. Business name will be automatically added after every 'Hi'."
              />
              <FileUploadForm onFileLoaded={handleFileLoaded} />
              <button
                onClick={sendEmails}
                className="mt-4 w-full bg-primary text-text py-2 px-4 rounded hover:bg-secondary transition-colors"
              >
                Send Emails
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">
                CSV Format Example
              </h3>
              <img
                src="/format.png"
                alt="CSV Format Example"
                className="w-full max-w-xs mx-auto rounded"
              />
              <p className="text-white mt-2">
                Please ensure your CSV file follows this exact format.
              </p>
            </div>
          </section>
          <section id="creator" className="w-full max-w-lg">
            <h2 className="text-4xl font-bold mb-6">Creator</h2>
            <div className="bg-card p-6 rounded shadow-md flex flex-col items-center">
              <img
                src="/aman.jpg"
                alt="Creator"
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />

              <h3 className="text-2xl font-semibold">Aman Godara</h3>
              <p className="text-muted mb-4">amangodara5686@gmail.com</p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/aman-godara-8160ba2b7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.25 19h-3v-11h3v11zm-1.5-12.35c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75c.97 0 1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.75 12.35h-3v-5.5c0-1.32-.03-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.59h-3v-11h2.88v1.5h.04c.4-.75 1.38-1.54 2.85-1.54 3.05 0 3.62 2.01 3.62 4.63v6.41z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/AmanGodara07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.56c-.89.39-1.83.65-2.82.77 1.01-.61 1.79-1.58 2.15-2.73-.95.57-2.01.99-3.14 1.22-.9-.95-2.17-1.55-3.58-1.55-2.71 0-4.91 2.2-4.91 4.91 0 .38.04.75.12 1.1-4.08-.2-7.7-2.16-10.12-5.13-.42.72-.66 1.56-.66 2.45 0 1.69.86 3.18 2.17 4.05-.8-.03-1.55-.25-2.21-.61v.06c0 2.36 1.68 4.33 3.91 4.78-.41.11-.84.17-1.28.17-.31 0-.62-.03-.92-.09.63 1.97 2.44 3.41 4.35 3.45-1.68 1.31-3.8 2.1-6.1 2.1-.39 0-.77-.02-1.15-.06 2.17 1.39 4.75 2.2 7.52 2.2 9.02 0 13.95-7.46 13.95-13.95 0-.21 0-.43-.01-.64.96-.7 1.79-1.57 2.44-2.56z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/amangodara2314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.63-2.66-.3-5.47-1.33-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.51.12-3.16 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.41 3-.41 1.02 0 2.04.14 3 .41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22 0 1.61-.01 2.91-.01 3.31 0 .32.22.7.83.58 4.77-1.58 8.21-6.08 8.21-11.38 0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
