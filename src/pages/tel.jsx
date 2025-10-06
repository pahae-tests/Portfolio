import React, { useState, useEffect } from 'react';
import { Me, Achievements, Computer, Contact, Feedbacks, Projects, Skills, Stars, Docs, AI, PFE } from "../utils/exporter";
import { Menu, X } from "lucide-react"; // icônes de menu burger

const Index = () => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false); // état menu mobile

  const sections = [
    { id: 0, name: "Me" },
    { id: 1, name: "Achievements" },
    { id: 2, name: "Skills" },
    { id: 3, name: "Docs" },
    { id: 4, name: "Projects" },
    { id: 5, name: "Feedbacks" },
    { id: 6, name: "Contact" },
    { id: 7, name: "AI" },
    { id: 8, name: "PFE" },
  ];

  //////////////////////////////////////////////////

  const [documents, setDocuments] = useState({
    cv: null,
    universitaires: [],
    autoFormations: [],
    sports: []
  });

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/getDocs');
        if (!response.ok) {
          throw new Error('Échec de la récupération des documents');
        }
        const data = await response.json();
        setDocuments(data.documents);
      } catch (err) {
        alert(err.message);
        console.error('Erreur:', err);
      }
    };

    fetchDocuments();
  }, []);

  //////////////////////////////////////////////////

  return (
    <div className="h-screen relative">
      {/* bouton menu mobile */}
      <button
        className="md:hidden fixed top-0 right-0 m-3 z-50 bg-black/60 p-2 rounded-xl text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* navbar mobile */}
      {open && (
        <div className="md:hidden fixed top-12 right-0 w-40 bg-black/80 text-white rounded-xl shadow-lg z-40 p-2 animate-fadeIn">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className={`px-3 py-2 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${step === sec.id ? "bg-amber-500" : "hover:bg-amber-400/40"
                }`}
              onClick={() => {
                setStep(sec.id);
                setOpen(false); // fermer après clic
              }}
            >
              {sec.name}
            </div>
          ))}
        </div>
      )}

      {/* contenu */}
      <Stars />
      {step === 0 && <Me />}
      {step === 1 && (
        <div className="bg-black">
          <Achievements />
        </div>
      )}
      {step === 2 && <Skills />}
      {step === 3 && <Docs documents={documents} />}
      {step === 4 && <Projects />}
      {step === 5 && <Feedbacks />}
      {step === 6 && <Contact />}
      {step === 7 && <AI />}
      {step === 8 && <PFE />}
    </div>
  );
};


export default Index;

